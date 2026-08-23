import { beforeEach, describe, expect, it, vi } from "vitest";
import { decryptSensitive, encryptSensitive } from "./db";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  createRuleReview: vi.fn().mockResolvedValue(undefined),
  getRuleReviews: vi.fn().mockResolvedValue([
    { id: 5, ruleId: 8, kept: true, notes: "decrypted private note", reviewDate: new Date("2026-08-22T08:00:00Z") },
  ]),
}));

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  return { ...actual, ...mocks };
});

import { appRouter } from "./routers";

function context(id = 42): TrpcContext {
  return {
    user: {
      id,
      openId: `rule-review-user-${id}`,
      name: "Rule Review User",
      email: `rule-review-${id}@example.com`,
      loginMethod: "test",
      role: "user",
      createdAt: new Date(0),
      updatedAt: new Date(0),
      lastSignedIn: new Date(0),
    },
    userRoles: [],
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => undefined } as TrpcContext["res"],
  };
}

describe("rule review boundaries", () => {
  beforeEach(() => vi.clearAllMocks());

  it("encrypts review notes before persistence and decrypts them only on the owner read path", () => {
    const original = "A private note about a difficult evening.";
    const encrypted = encryptSensitive(original);
    expect(encrypted).not.toContain(original);
    expect(decryptSensitive(encrypted)).toBe(original);
  });

  it("passes the authenticated owner id to review creation and history reads", async () => {
    const caller = appRouter.createCaller(context(77));

    await expect(caller.rules.review({ ruleId: 8, kept: false, notes: "  Needed more support.  " })).resolves.toEqual({ success: true });
    await expect(caller.rules.reviews({ ruleId: 8 })).resolves.toHaveLength(1);

    expect(mocks.createRuleReview).toHaveBeenCalledWith(77, 8, false, "Needed more support.");
    expect(mocks.getRuleReviews).toHaveBeenCalledWith(77, 8);
  });

  it("rejects oversized review notes before calling persistence", async () => {
    const caller = appRouter.createCaller(context());
    await expect(caller.rules.review({ ruleId: 8, kept: true, notes: "x".repeat(2001) })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.createRuleReview).not.toHaveBeenCalled();
  });
});
