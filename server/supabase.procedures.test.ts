import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  getActiveSupporterLink: vi.fn(),
  getJournalEntries: vi.fn().mockResolvedValue([{ id: 1, body: "encrypted-safe-test" }]),
  listCheckIns: vi.fn().mockResolvedValue([{ id: 2, payload: { notes: "decrypted-safe-test" } }]),
  recordAdminAudit: vi.fn().mockResolvedValue(true),
  grantUserRole: vi.fn().mockResolvedValue(true),
}));

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  return { ...actual, ...mocks };
});

import { appRouter } from "./routers";

function context(userRoles: string[], id = 42): TrpcContext {
  return {
    user: {
      id,
      openId: "supabase-subject-42",
      name: "Supabase User",
      email: "supabase@example.com",
      loginMethod: "supabase",
      role: userRoles.includes("admin") ? "admin" : "user",
      createdAt: new Date(0),
      updatedAt: new Date(0),
      lastSignedIn: new Date(0),
    },
    userRoles,
    req: { protocol: "https", headers: { authorization: "Bearer staged-token" } } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("Supabase-authenticated tRPC procedures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getActiveSupporterLink.mockResolvedValue({
      id: 31,
      supporterId: 42,
      memberId: 21,
      status: "active",
      consentScope: "dashboard_and_journal",
    });
  });

  it("preserves Supabase supporter authorization and consent-scoped journal access", async () => {
    const supabaseContext = context(["supporter"]);
    expect(supabaseContext.user?.loginMethod).toBe("supabase");
    const caller = appRouter.createCaller(supabaseContext);

    await expect(caller.supporter.journal({ memberId: 21 })).resolves.toHaveLength(1);
    expect(mocks.getJournalEntries).toHaveBeenCalledWith(21, 20, 0);
    expect(mocks.recordAdminAudit).toHaveBeenCalledWith(expect.objectContaining({
      actorUserId: 42,
      action: "supporter.access.journal",
      outcome: "success",
    }));
  });

  it("preserves admin authorization for a Supabase-mapped admin identity", async () => {
    const caller = appRouter.createCaller(context(["admin"]));

    await expect(caller.admin.grantRole({ userId: 21, role: "mentor" })).resolves.toEqual({ success: true });
    expect(mocks.grantUserRole).toHaveBeenCalledWith(21, "mentor");
    expect(mocks.recordAdminAudit).toHaveBeenCalledWith(expect.objectContaining({
      actorUserId: 42,
      action: "user.role.grant",
      outcome: "success",
    }));
  });

  it("allows a Supabase-mapped regular user through a plain protected procedure", async () => {
    const caller = appRouter.createCaller(context(["user"]));

    await expect(caller.auth.getRoles()).resolves.toEqual(["user"]);
  });

  it("allows a Supabase-mapped user to read their encrypted check-in history", async () => {
    const caller = appRouter.createCaller(context(["user"]));

    await expect(caller.checkIn.history({ limit: 30, offset: 0 })).resolves.toEqual([
      { id: 2, payload: { notes: "decrypted-safe-test" } },
    ]);
    expect(mocks.listCheckIns).toHaveBeenCalledWith(42, 30, 0);
  });

  it("does not allow a Supabase-mapped regular user to access admin procedures", async () => {
    const caller = appRouter.createCaller(context(["user"]));

    await expect(caller.admin.grantRole({ userId: 21, role: "mentor" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(mocks.grantUserRole).not.toHaveBeenCalled();
  });
});
