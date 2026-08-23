export type MoodTrendState = "loading" | "error" | "empty" | "ready";

export function getMoodTrendState(input: {
  isLoading: boolean;
  isError: boolean;
  moodCount: number;
}): MoodTrendState {
  if (input.isLoading) return "loading";
  if (input.isError) return "error";
  return input.moodCount > 0 ? "ready" : "empty";
}
