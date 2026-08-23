export type JournalFilterEntry = {
  body: string;
  dimensionId: number | null;
};

export type JournalFilterOptions = {
  search?: string;
  dimensionId?: number;
};

/**
 * Keyword search runs only after the protected endpoint has decrypted entries
 * for the owner in the browser. Metadata filtering is also applied here so
 * optimistic/local data follows the same visible-result policy.
 */
export function filterJournalEntries<T extends JournalFilterEntry>(
  entries: readonly T[],
  options: JournalFilterOptions = {}
): T[] {
  const search = options.search?.trim().toLocaleLowerCase();
  return entries.filter((entry) => {
    const matchesDimension = options.dimensionId === undefined || entry.dimensionId === options.dimensionId;
    const matchesSearch = !search || entry.body.toLocaleLowerCase().includes(search);
    return matchesDimension && matchesSearch;
  });
}

export function parseJournalDimensionFilter(value: string): number | undefined {
  if (value === "all") return undefined;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}
