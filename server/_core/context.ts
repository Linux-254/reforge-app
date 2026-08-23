import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { getUserRoles } from "../db/users";
import { authenticateSupabaseRequest } from "./supabaseAuth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
  userRoles: string[];
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;
  let userRoles: string[] = [];

  try {
    user = await sdk.authenticateRequest(opts.req);
    if (!user) {
      user = await authenticateSupabaseRequest(opts.req);
    }
    if (user) {
      userRoles = await getUserRoles(user.id).catch(() => []);
    }
  } catch (error) {
    // Authentication is optional for public procedures. The Supabase adapter is
    // disabled by default and returns null for invalid or absent bearer tokens.
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
    userRoles,
  };
}
