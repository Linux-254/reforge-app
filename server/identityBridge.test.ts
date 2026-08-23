import { describe, expect, it } from "vitest";
import { decideSupabaseIdentityBridge } from "./_core/identityBridge";
import type { User } from "../drizzle/schema";

const manusUser = {
  id: 7,
  openId: "manus-subject-7",
  name: "Brian Mwangi",
  email: "brian@example.com",
  loginMethod: "manus",
  role: "admin",
  createdAt: new Date(0),
  updatedAt: new Date(0),
  lastSignedIn: new Date(0),
} as User;

const supabaseUser = { ...manusUser, openId: "supabase-subject-7", loginMethod: "supabase" } as User;

describe("Supabase identity bridge policy", () => {
  it("bridges a verified email without replacing the Manus user identity", () => {
    const decision = decideSupabaseIdentityBridge({ existingByEmail: manusUser, emailVerified: true });
    expect(decision).toEqual({ kind: "bridge", user: manusUser });
    expect(manusUser.openId).toBe("manus-subject-7");
  });

  it("rejects an unverified email instead of linking accounts", () => {
    expect(
      decideSupabaseIdentityBridge({ existingByEmail: manusUser, emailVerified: false }),
    ).toEqual({ kind: "reject", reason: "unverified-email" });
  });

  it("uses an existing mapped identity and never attempts a duplicate bridge", () => {
    expect(
      decideSupabaseIdentityBridge({
        mappedUser: supabaseUser,
        existingByEmail: manusUser,
        emailVerified: true,
      }),
    ).toEqual({ kind: "use-existing", user: supabaseUser });
  });

  it("creates a new identity only when no existing user or mapping exists", () => {
    expect(decideSupabaseIdentityBridge({ emailVerified: true })).toEqual({ kind: "create" });
  });
});
