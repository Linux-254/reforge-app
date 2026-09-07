export type GuestJournalEntry = { id: number; body: string; createdAt: string };
export type GuestCommunityPost = { id: number; body: string; createdAt: string; topic: string };

export const GUEST_STORAGE_KEYS = {
  journal: "reforge-guest-journal",
  checkIn: "reforge-guest-checkin",
  goalStep: "reforge-guest-goal-step",
  rule: "reforge-guest-rule",
  newsletter: "reforge-guest-newsletter",
  community: "reforge-guest-community",
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

export type GuestNewsletterPreferences = {
  subscribed: boolean;
  daily: boolean;
  weekly: boolean;
  milestones: boolean;
};

const DEFAULT_NEWSLETTER_PREFERENCES: GuestNewsletterPreferences = { subscribed: false, daily: true, weekly: true, milestones: true };

export function readGuestNewsletterPreferences(): GuestNewsletterPreferences {
  const storage = getStorage();
  if (!storage) return DEFAULT_NEWSLETTER_PREFERENCES;
  try {
    const parsed = JSON.parse(storage.getItem(GUEST_STORAGE_KEYS.newsletter) ?? "null");
    if (!parsed || typeof parsed !== "object") return DEFAULT_NEWSLETTER_PREFERENCES;
    return { subscribed: parsed.subscribed === true, daily: parsed.daily !== false, weekly: parsed.weekly !== false, milestones: parsed.milestones !== false };
  } catch {
    return DEFAULT_NEWSLETTER_PREFERENCES;
  }
}

export function writeGuestNewsletterPreferences(preferences: GuestNewsletterPreferences) {
  getStorage()?.setItem(GUEST_STORAGE_KEYS.newsletter, JSON.stringify(preferences));
}

export function readGuestCommunityPosts(): GuestCommunityPost[] {
  const storage = getStorage();
  if (!storage) return [];
  try {
    const parsed = JSON.parse(storage.getItem(GUEST_STORAGE_KEYS.community) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((post): post is GuestCommunityPost => Boolean(post && typeof post.body === "string" && typeof post.createdAt === "string" && typeof post.topic === "string" && typeof post.id === "number")) : [];
  } catch {
    return [];
  }
}

export function writeGuestCommunityPosts(posts: GuestCommunityPost[]) {
  getStorage()?.setItem(GUEST_STORAGE_KEYS.community, JSON.stringify(posts));
}

export function clearGuestDemoData() {
  const storage = getStorage();
  if (!storage) return;
  Object.values(GUEST_STORAGE_KEYS).forEach((key) => storage.removeItem(key));
}
