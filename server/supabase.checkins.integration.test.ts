import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getDb: vi.fn(),
  listCheckInsArgs: [] as unknown[],
  whereCalls: [] as unknown[],
}));

vi.mock("./_core/env", () => ({
  ENV: {
    encryptionKey: "staged-checkin-test-key",
    cookieSecret: "staged-cookie-secret",
  },
}));
vi.mock("./db/client", () => ({ getDb: mocks.getDb }));
vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  const checkins = await vi.importActual<typeof import("./db/checkins")>("./db/checkins");
  return {
    ...actual,
    listCheckIns: async (userId: number, limit: number, offset: number) => {
      mocks.listCheckInsArgs.push([userId, limit, offset]);
      return checkins.listCheckIns(userId, limit, offset);
    },
  };
});

import { encryptText } from "./lib/encryption";
import type { TrpcContext } from "./_core/context";
import { appRouter } from "./routers";

function context(id: number): TrpcContext {
  return {
    user: {
      id,
      openId: `supabase-subject-${id}`,
      name: "Supabase User",
      email: `supabase-${id}@example.com`,
      loginMethod: "supabase",
      role: "user",
      createdAt: new Date(0),
      updatedAt: new Date(0),
      lastSignedIn: new Date(0),
    },
    userRoles: ["user"],
    req: { protocol: "https", headers: { authorization: "Bearer staged-token" } } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

function selectDb(rows: unknown[]) {
  return {
    select: () => ({
      from: () => ({
        where: (condition: unknown) => {
          mocks.whereCalls.push(condition);
          return {
            orderBy: () => ({
              limit: () => ({
                offset: async () => rows,
              }),
            }),
          };
        },
      }),
    }),
  };
}

describe("Supabase protected encrypted check-ins", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.listCheckInsArgs.length = 0;
    mocks.whereCalls.length = 0;
  });

  it("passes the authenticated owner into the real listCheckIns helper and decrypts its notes", async () => {
    const encryptedNotes = encryptText("owner-only restorative note");
    mocks.getDb
      .mockResolvedValueOnce(selectDb([{ id: 12, userId: 42, payload: { notes: encryptedNotes } }]))
      .mockResolvedValueOnce(selectDb([]));

    const owner = appRouter.createCaller(context(42));
    const otherUser = appRouter.createCaller(context(99));

    await expect(owner.checkIn.history({ limit: 30, offset: 0 })).resolves.toEqual([
      expect.objectContaining({ userId: 42, payload: { notes: "owner-only restorative note" } }),
    ]);
    await expect(otherUser.checkIn.history({ limit: 30, offset: 0 })).resolves.toEqual([]);

    expect(mocks.listCheckInsArgs).toEqual([[42, 30, 0], [99, 30, 0]]);
    expect(mocks.getDb).toHaveBeenCalledTimes(2);
    expect(mocks.whereCalls).toHaveLength(2);
    expect(encryptedNotes).toMatch(/^enc:v1:/);
  });
});
