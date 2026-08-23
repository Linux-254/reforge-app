import { describe, expect, it } from "vitest";
import { filterJournalEntries, parseJournalDimensionFilter } from "./journalFilters";

const entries = [
  { id: 1, body: "A quiet walk helped today", dimensionId: 3 },
  { id: 2, body: "I called someone I trust", dimensionId: 7 },
  { id: 3, body: "Tomorrow I will make room for rest", dimensionId: 3 },
] as const;

describe("journal filters", () => {
  it("searches decrypted entries case-insensitively and trims the query", () => {
    expect(filterJournalEntries(entries, { search: "  TRUST " }).map(entry => entry.id)).toEqual([2]);
  });

  it("filters by life dimension while retaining matching entry content", () => {
    expect(filterJournalEntries(entries, { dimensionId: 3 }).map(entry => entry.id)).toEqual([1, 3]);
  });

  it("combines keyword and dimension filters", () => {
    expect(filterJournalEntries(entries, { search: "room", dimensionId: 3 }).map(entry => entry.id)).toEqual([3]);
    expect(filterJournalEntries(entries, { search: "room", dimensionId: 7 })).toEqual([]);
  });

  it("normalizes only positive integer dimension filters", () => {
    expect(parseJournalDimensionFilter("all")).toBeUndefined();
    expect(parseJournalDimensionFilter("3")).toBe(3);
    expect(parseJournalDimensionFilter("0")).toBeUndefined();
    expect(parseJournalDimensionFilter("not-a-dimension")).toBeUndefined();
  });
});
