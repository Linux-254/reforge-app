import { describe, expect, it } from "vitest";
import { getMoodTrendState } from "./moodTrend";

describe("getMoodTrendState", () => {
  it("prioritizes loading while history is being fetched", () => {
    expect(getMoodTrendState({ isLoading: true, isError: false, moodCount: 0 })).toBe("loading");
  });

  it("reports an API error separately from an empty history", () => {
    expect(getMoodTrendState({ isLoading: false, isError: true, moodCount: 0 })).toBe("error");
  });

  it("shows an empty state when no mood values exist", () => {
    expect(getMoodTrendState({ isLoading: false, isError: false, moodCount: 0 })).toBe("empty");
  });

  it("shows the trend when at least one mood value exists", () => {
    expect(getMoodTrendState({ isLoading: false, isError: false, moodCount: 3 })).toBe("ready");
  });
});
