import { describe, expect, it } from "vitest";
import { getRuleReviewStatus } from "./ruleCadence";

const createdAt = new Date("2026-08-20T09:00:00Z");
const now = new Date("2026-08-23T09:00:00Z");

describe("rule review cadence policy", () => {
  it("marks a new active rule as due immediately", () => {
    const status = getRuleReviewStatus({ active: true, reviewCadence: "daily", createdAt, lastReviewedAt: null }, now);
    expect(status.reviewState).toBe("due");
    expect(status.nextReviewAt).toEqual(createdAt);
  });

  it("uses cadence intervals to distinguish upcoming from overdue", () => {
    const weeklyUpcoming = getRuleReviewStatus({
      active: true,
      reviewCadence: "weekly",
      createdAt,
      lastReviewedAt: new Date("2026-08-20T09:00:00Z"),
    }, now);
    const monthlyOverdue = getRuleReviewStatus({
      active: true,
      reviewCadence: "monthly",
      createdAt,
      lastReviewedAt: new Date("2026-07-01T09:00:00Z"),
    }, now);

    expect(weeklyUpcoming.reviewState).toBe("upcoming");
    expect(weeklyUpcoming.nextReviewAt).toEqual(new Date("2026-08-27T09:00:00Z"));
    expect(monthlyOverdue.reviewState).toBe("overdue");
  });

  it("keeps inactive rules out of the due queue", () => {
    const status = getRuleReviewStatus({ active: false, reviewCadence: "daily", createdAt, lastReviewedAt: null }, now);
    expect(status.reviewState).toBe("paused");
  });

  it("defaults a missing cadence to daily", () => {
    const status = getRuleReviewStatus({
      active: true,
      reviewCadence: null,
      createdAt,
      lastReviewedAt: new Date("2026-08-22T09:00:00Z"),
    }, now);
    expect(status.nextReviewAt).toEqual(new Date("2026-08-23T09:00:00Z"));
    expect(status.reviewState).toBe("overdue");
  });
});
