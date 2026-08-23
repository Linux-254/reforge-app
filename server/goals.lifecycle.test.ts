import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  createGoal: vi.fn().mockResolvedValue(undefined),
  getGoals: vi.fn().mockResolvedValue([]),
  getGoalSteps: vi.fn().mockResolvedValue([]),
  addGoalStep: vi.fn().mockResolvedValue(undefined),
  toggleGoalStep: vi.fn().mockResolvedValue(undefined),
  updateGoalStatus: vi.fn().mockResolvedValue(undefined),
  getGoalStatusHistory: vi.fn().mockResolvedValue([
    { id: 1, goalId: 10, userId: 77, status: "active", changedAt: new Date("2026-08-23T08:00:00Z") },
  ]),
}));

vi.mock("./db", async () => {
  const actual = await vi.importActual<typeof import("./db")>("./db");
  return { ...actual, ...mocks };
});

import { appRouter } from "./routers";

function context(id = 77): TrpcContext {
  return {
    user: {
      id,
      openId: `goal-user-${id}`,
      name: "Goal User",
      email: `goal-${id}@example.com`,
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

describe("goal lifecycle boundaries", () => {
  beforeEach(() => vi.clearAllMocks());

  it("passes the authenticated owner and normalized goal fields to persistence", async () => {
    const caller = appRouter.createCaller(context());

    await expect(caller.goals.create({
      title: "  Rebuild my evenings  ",
      horizon: "90",
      dimensionId: 12,
      description: "  Make space for a calmer routine.  ",
    })).resolves.toEqual({ success: true });

    expect(mocks.createGoal).toHaveBeenCalledWith(77, "Rebuild my evenings", "90", 12, "Make space for a calmer routine.");
  });

  it("passes the authenticated owner through step and status lifecycle operations", async () => {
    const caller = appRouter.createCaller(context(91));

    await caller.goals.addStep({ goalId: 10, title: "  Put shoes by the door  " });
    await caller.goals.steps({ goalId: 10 });
    await caller.goals.toggleStep({ goalId: 10, stepId: 4 });
    await caller.goals.updateStatus({ goalId: 10, status: "completed" });
    await expect(caller.goals.history({ goalId: 10 })).resolves.toHaveLength(1);

    expect(mocks.addGoalStep).toHaveBeenCalledWith(91, 10, "Put shoes by the door");
    expect(mocks.getGoalSteps).toHaveBeenCalledWith(91, 10);
    expect(mocks.toggleGoalStep).toHaveBeenCalledWith(91, 10, 4);
    expect(mocks.updateGoalStatus).toHaveBeenCalledWith(91, 10, "completed");
    expect(mocks.getGoalStatusHistory).toHaveBeenCalledWith(91, 10);
  });

  it("rejects malformed goal and step inputs before persistence", async () => {
    const caller = appRouter.createCaller(context());

    await expect(caller.goals.create({ title: "   ", horizon: "30" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.goals.create({ title: "x".repeat(256), horizon: "30" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.goals.addStep({ goalId: 10, title: "x".repeat(256) })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.goals.history({ goalId: 0 })).rejects.toMatchObject({ code: "BAD_REQUEST" });

    expect(mocks.createGoal).not.toHaveBeenCalled();
    expect(mocks.addGoalStep).not.toHaveBeenCalled();
  });
});
