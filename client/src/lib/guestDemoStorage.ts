export type GuestJournalEntry = { id: number; body: string; createdAt: string };

export const GUEST_STORAGE_KEYS = {
  journal: "reforge-guest-journal",
  checkIn: "reforge-guest-checkin",
  goalStep: "reforge-guest-goal-step",
  rule: "reforge-guest-rule",
} as const;

function getStorage(): Storage | null {
  if (typeof window !== "undefined") return window.localStorage;
  if (typeof globalThis.localStorage !== "undefined") return globalThis.localStorage;
  return null;
}

export function readGuestJournal(): GuestJournalEntry[] {
  const storage = getStorage();
  if (!storage) return [];
  try {
    const parsed = JSON.parse(storage.getItem(GUEST_STORAGE_KEYS.journal) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((entry): entry is GuestJournalEntry => Boolean(entry && typeof entry.body === "string" && typeof entry.createdAt === "string")) : [];
  } catch {
    return [];
  }
}

export function writeGuestJournal(entries: GuestJournalEntry[]) {
  getStorage()?.setItem(GUEST_STORAGE_KEYS.journal, JSON.stringify(entries));
}

export function readGuestBoolean(key: keyof Pick<typeof GUEST_STORAGE_KEYS, "checkIn" | "goalStep" | "rule">) {
  return getStorage()?.getItem(GUEST_STORAGE_KEYS[key]) === "true";
}

export function writeGuestBoolean(key: keyof Pick<typeof GUEST_STORAGE_KEYS, "checkIn" | "goalStep" | "rule">, value: boolean) {
  getStorage()?.setItem(GUEST_STORAGE_KEYS[key], String(value));
}

export function clearGuestDemoData() {
  const storage = getStorage();
  if (!storage) return;
  Object.values(GUEST_STORAGE_KEYS).forEach((key) => storage.removeItem(key));
}
