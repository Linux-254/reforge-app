export type RuleCadence = "daily" | "weekly" | "monthly";
export type RuleReviewState = "due" | "overdue" | "upcoming" | "paused";

const CADENCE_DAYS: Record<RuleCadence, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
};

export function getRuleReviewStatus(input: {
  active: boolean | null;
  reviewCadence: RuleCadence | null;
  createdAt: Date;
  lastReviewedAt: Date | null;
}, now = new Date()) {
  const cadence = input.reviewCadence ?? "daily";
  const intervalMs = CADENCE_DAYS[cadence] * 24 * 60 * 60 * 1000;
  const nextReviewAt = input.lastReviewedAt
    ? new Date(input.lastReviewedAt.getTime() + intervalMs)
    : input.createdAt;
  const reviewState: RuleReviewState = input.active === false
    ? "paused"
    : !input.lastReviewedAt || now.getTime() >= nextReviewAt.getTime()
      ? input.lastReviewedAt ? "overdue" : "due"
      : "upcoming";

  return { lastReviewedAt: input.lastReviewedAt, nextReviewAt, reviewState };
}
