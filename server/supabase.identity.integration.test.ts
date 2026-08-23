import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  jwtVerify: vi.fn(),
  createRemoteJWKSet: vi.fn(() => ({})),
  getUserByAuthIdentity: vi.fn(),
  getUserByOpenId: vi.fn(),
  getUserByEmail: vi.fn(),
  createAuthIdentity: vi.fn().mockResolvedValue(true),
  upsertUser: vi.fn(),
}));

vi.mock("jose", () => ({
  createRemoteJWKSet: mocks.createRemoteJWKSet,
  jwtVerify: mocks.jwtVerify,
}));
vi.mock("./_core/env", () => ({
  ENV: {
    supabaseAuthEnabled: true,
    supabaseJwksUrl: "https://staged.supabase.co/auth/v1/.well-known/jwks.json",
    supabaseUrl: "https://staged.supabase.co",
  },
}));
vi.mock("./db/users", () => ({
  getUserByAuthIdentity: mocks.getUserByAuthIdentity,
  getUserByOpenId: mocks.getUserByOpenId,
  getUserByEmail: mocks.getUserByEmail,
  createAuthIdentity: mocks.createAuthIdentity,
  upsertUser: mocks.upsertUser,
}));

import { authenticateSupabaseRequest } from "./_core/supabaseAuth";

const existingUser = {
  id: 7,
  openId: "manus-subject-7",
  name: "Existing Member",
  email: "member@example.com",
  loginMethod: "manus",
  role: "admin",
  createdAt: new Date(0),
  updatedAt: new Date(0),
  lastSignedIn: new Date(0),
} as any;

describe("Supabase identity mapping integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getUserByAuthIdentity.mockResolvedValue(undefined);
    mocks.getUserByOpenId.mockResolvedValue(undefined);
    mocks.getUserByEmail.mockResolvedValue(existingUser);
    mocks.jwtVerify.mockResolvedValue({
      payload: {
        sub: "supabase-subject-7",
        email: "member@example.com",
        email_verified: true,
        user_metadata: { full_name: "Existing Member" },
      },
    });
  });

  it("resolves an existing application user and creates a dual-provider identity without overwriting Manus openId or role", async () => {
    const result = await authenticateSupabaseRequest({
      headers: { authorization: "Bearer staged-supabase-token" },
    } as any);

    expect(result).toEqual(existingUser);
    expect(mocks.getUserByAuthIdentity).toHaveBeenCalledWith("supabase", "supabase-subject-7");
    expect(mocks.getUserByEmail).toHaveBeenCalledWith("member@example.com");
    expect(mocks.createAuthIdentity).toHaveBeenCalledWith(7, "supabase", "supabase-subject-7");
    expect(mocks.upsertUser).not.toHaveBeenCalled();
  });
});
