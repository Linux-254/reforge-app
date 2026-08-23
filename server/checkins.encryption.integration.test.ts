import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getDb: vi.fn(),
}));

vi.mock("./_core/env", () => ({
  ENV: {
    encryptionKey: "staged-checkin-test-key",
    cookieSecret: "staged-cookie-secret",
  },
}));
vi.mock("./db/client", () => ({ getDb: mocks.getDb }));

import { encryptText } from "./lib/encryption";
import { listCheckIns } from "./db/checkins";

function selectDb(rows: unknown[]) {
  return {
    select: () => ({
      from: () => ({
        where: () => ({
          orderBy: () => ({
            limit: () => ({
              offset: async () => rows,
            }),
          }),
        }),
      }),
    }),
  };
}

describe("encrypted check-in helper path", () => {
  beforeEach(() => vi.clearAllMocks());

  it("decrypts an encrypted notes payload returned for the authenticated owner", async () => {
    const encryptedNotes = encryptText("I chose a restorative response today");
    mocks.getDb.mockResolvedValue(selectDb([
      {
        id: 12,
        userId: 42,
        localDate: "2026-08-23",
        part: "morning",
        mood: 8,
        payload: { notes: encryptedNotes },
      },
    ]));

    const rows = await listCheckIns(42, 30, 0);

    expect(rows).toEqual([
      expect.objectContaining({
        userId: 42,
        payload: { notes: "I chose a restorative response today" },
      }),
    ]);
    expect(encryptedNotes).toMatch(/^enc:v1:/);
  });
});
