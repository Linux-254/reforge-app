import { beforeEach, describe, expect, it, vi } from "vitest";
import { decryptAssessmentPayload, encryptAssessmentPayload } from "./db";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  getAssessmentResponses: vi.fn(),
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
      openId: `assessment-user-${id}`,
      name: "Assessment User",
      email: `assessment-${id}@example.com`,
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

describe("assessment sensitive data boundaries", () => {
  beforeEach(() => vi.clearAllMocks());

  it("stores assessment response payloads as ciphertext and decrypts valid objects", () => {
    const original = { answer: "I need private support", score: 7 };
    const encrypted = encryptAssessmentPayload(original);

    expect(encrypted.ciphertext).not.toContain("private support");
    expect(encrypted.ciphertext.startsWith("enc:v1:")).toBe(true);
    expect(decryptAssessmentPayload(encrypted)).toEqual(original);
  });

  it("returns responses through the protected owner-scoped procedure", async () => {
    mocks.getAssessmentResponses.mockResolvedValue([
      { id: 4, assessmentId: 9, dimensionId: 2, payload: { answer: "decrypted-owner-data" } },
    ]);
    const caller = appRouter.createCaller(context(77));

    await expect(caller.onboarding.responses({ assessmentId: 9 })).resolves.toEqual([
      expect.objectContaining({ payload: { answer: "decrypted-owner-data" } }),
    ]);
    expect(mocks.getAssessmentResponses).toHaveBeenCalledWith(77, 9);
  });

  it("rejects unauthenticated response reads before accessing the database", async () => {
    const caller = appRouter.createCaller({
      user: undefined,
      userRoles: [],
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => undefined } as TrpcContext["res"],
    });

    await expect(caller.onboarding.responses({ assessmentId: 9 })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    expect(mocks.getAssessmentResponses).not.toHaveBeenCalled();
  });
});
