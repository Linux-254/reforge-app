import { beforeEach, describe, expect, it, vi } from "vitest";

const { authenticateSupabaseRequest, authenticateManusRequest, getUserRoles } = vi.hoisted(() => ({
  authenticateSupabaseRequest: vi.fn(),
  authenticateManusRequest: vi.fn(),
  getUserRoles: vi.fn(),
}));

const supabaseUser = {
  id: 42,
  openId: "supabase-subject-42",
  name: "Staged User",
  email: "staged@example.com",
  loginMethod: "supabase",
  role: "user",
  createdAt: new Date(0),
  updatedAt: new Date(0),
  lastSignedIn: new Date(0),
} as any;

const manusUser = { ...supabaseUser, id: 43, openId: "manus-subject-43", loginMethod: "manus" };
vi.mock("./_core/supabaseAuth", () => ({ authenticateSupabaseRequest }));
vi.mock("./_core/sdk", () => ({ sdk: { authenticateRequest: authenticateManusRequest } }));
vi.mock("./db/users", () => ({ getUserRoles }));

import { createContext } from "./_core/context";

describe("Supabase request context integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authenticateSupabaseRequest.mockResolvedValue(null);
    authenticateManusRequest.mockResolvedValue(null);
    getUserRoles.mockResolvedValue([]);
  });

  it("resolves a Supabase bearer user and loads application RBAC roles", async () => {
    authenticateSupabaseRequest.mockResolvedValue(supabaseUser);
    getUserRoles.mockResolvedValue(["supporter"]);

    const context = await createContext({
      req: { headers: { authorization: "Bearer staged-token" } },
      res: {},
      info: {} as any,
    } as any);

    expect(context.user).toEqual(supabaseUser);
    expect(context.userRoles).toEqual(["supporter"]);
    expect(authenticateSupabaseRequest).toHaveBeenCalledOnce();
    expect(authenticateManusRequest).not.toHaveBeenCalled();
  });

  it("keeps Manus cookie sessions authoritative and does not reinterpret them as Supabase", async () => {
    authenticateManusRequest.mockResolvedValue(manusUser);
    getUserRoles.mockResolvedValue(["admin"]);

    const context = await createContext({
      req: {
        headers: {
          cookie: "app_session_id=present",
          authorization: "Bearer staged-token",
        },
      },
      res: {},
      info: {} as any,
    } as any);

    expect(context.user).toEqual(manusUser);
    expect(context.userRoles).toEqual(["admin"]);
    expect(authenticateSupabaseRequest).not.toHaveBeenCalled();
    expect(authenticateManusRequest).toHaveBeenCalledOnce();
  });
});
