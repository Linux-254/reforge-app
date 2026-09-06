import { afterEach, describe, expect, it } from "vitest";
import { clearGuestDemoData, GUEST_STORAGE_KEYS, readGuestBoolean, readGuestJournal, readGuestNewsletterPreferences, writeGuestBoolean, writeGuestJournal, writeGuestNewsletterPreferences } from "./guestDemoStorage";

const originalStorage = globalThis.localStorage;

function installMemoryStorage() {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
    clear: () => values.clear(),
    key: (index: number) => [...values.keys()][index] ?? null,
    get length() { return values.size; },
  } as Storage;
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: storage });
  return storage;
}

afterEach(() => {
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: originalStorage });
});

describe("guest demo storage", () => {
  it("round-trips only the namespaced journal payload", () => {
    installMemoryStorage();
    const entries = [{ id: 1, body: "A private demo note", createdAt: "2026-09-06T00:00:00.000Z" }];
    writeGuestJournal(entries);
    expect(readGuestJournal()).toEqual(entries);
    expect(localStorage.getItem("unrelated-site-key")).toBeNull();
  });

  it("round-trips newsletter preferences and resets them with the guest namespace", () => {
    installMemoryStorage();
    writeGuestNewsletterPreferences({ subscribed: true, daily: false, weekly: true, milestones: false });
    expect(readGuestNewsletterPreferences()).toEqual({ subscribed: true, daily: false, weekly: true, milestones: false });
    clearGuestDemoData();
    expect(readGuestNewsletterPreferences()).toEqual({ subscribed: false, daily: true, weekly: true, milestones: true });
  });

  it("ignores malformed journal payloads and clears every guest key without touching unrelated keys", () => {
    installMemoryStorage();
    localStorage.setItem(GUEST_STORAGE_KEYS.journal, "not-json");
    localStorage.setItem(GUEST_STORAGE_KEYS.newsletter, "not-json");
    localStorage.setItem("unrelated-site-key", "keep-me");
    expect(readGuestJournal()).toEqual([]);
    writeGuestBoolean("checkIn", true);
    expect(readGuestBoolean("checkIn")).toBe(true);
    clearGuestDemoData();
    expect(readGuestJournal()).toEqual([]);
    expect(readGuestBoolean("checkIn")).toBe(false);
    expect(localStorage.getItem("unrelated-site-key")).toBe("keep-me");
  });
});
