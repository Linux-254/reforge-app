import { describe, expect, it } from "vitest";
import { optimisticTodayCheckIns } from "./checkInOptimistic";

const now = new Date("2026-08-23T06:30:00.000Z");

describe("optimisticTodayCheckIns", () => {
  it("creates a temporary first-time morning entry without removing the evening slot", () => {
    const evening = {
      id: 9,
      userId: 7,
      localDate: "2026-08-23",
      part: "evening" as const,
      mood: 6,
      energy: 4,
      cravings: 2,
      payload: { notes: "Evening note" },
      createdAt: now,
      updatedAt: null,
    };

    const next = optimisticTodayCheckIns({ morning: undefined, evening }, { part: "morning", mood: 8, energy: 7, cravings: 3, notes: "A steady start" }, 7, now);

    expect(next.morning).toMatchObject({ id: -1787466600000, userId: 7, localDate: "2026-08-23", part: "morning", mood: 8, energy: 7, cravings: 3, payload: { notes: "A steady start" } });
    expect(next.evening).toEqual(evening);
  });

  it("updates only the selected existing entry", () => {
    const morning = {
      id: 4,
      userId: 7,
      localDate: "2026-08-23",
      part: "morning" as const,
      mood: 5,
      energy: 5,
      cravings: 5,
      payload: { notes: "Old note" },
      createdAt: now,
      updatedAt: null,
    };
    const evening = { ...morning, id: 5, part: "evening" as const };

    const next = optimisticTodayCheckIns({ morning, evening }, { part: "evening", mood: 2, energy: 3, cravings: 9 }, 7, now);

    expect(next.morning).toEqual(morning);
    expect(next.evening).toMatchObject({ id: 5, part: "evening", mood: 2, energy: 3, cravings: 9, payload: null });
  });
});
