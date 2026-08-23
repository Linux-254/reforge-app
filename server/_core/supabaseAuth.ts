import { createRemoteJWKSet, jwtVerify } from "jose";
import type { Request } from "express";
import type { User } from "../../drizzle/schema";
import { getUserByOpenId, upsertUser } from "../db/users";
import { ENV } from "./env";

let remoteJwks: ReturnType<typeof createRemoteJWKSet> | null = null;
let remoteJwksUrl = "";

function getRemoteJwks() {
  if (!ENV.supabaseJwksUrl) return null;
  if (!remoteJwks || remoteJwksUrl !== ENV.supabaseJwksUrl) {
    remoteJwks = createRemoteJWKSet(new URL(ENV.supabaseJwksUrl));
    remoteJwksUrl = ENV.supabaseJwksUrl;
  }
  return remoteJwks;
}

function getBearerToken(req: Request) {
  const header = req.headers.authorization;
  return header?.startsWith("Bearer ") ? header.slice(7).trim() : null;
}

export async function authenticateSupabaseRequest(req: Request): Promise<User | null> {
  if (!ENV.supabaseAuthEnabled) return null;

  const token = getBearerToken(req);
  const jwks = getRemoteJwks();
  if (!token || !jwks || !ENV.supabaseUrl) return null;

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: `${ENV.supabaseUrl}/auth/v1`,
      audience: "authenticated",
    });

    if (typeof payload.sub !== "string" || !payload.sub) return null;

    const metadata = payload.user_metadata;
    const nameFromMetadata =
      metadata && typeof metadata === "object" && "full_name" in metadata
        ? metadata.full_name
        : metadata && typeof metadata === "object" && "name" in metadata
          ? metadata.name
          : null;
    const name = typeof nameFromMetadata === "string" ? nameFromMetadata : null;
    const email = typeof payload.email === "string" ? payload.email : null;

    let user = await getUserByOpenId(payload.sub);
    if (!user) {
      await upsertUser({
        openId: payload.sub,
        name,
        email,
        loginMethod: "supabase",
      });
      user = await getUserByOpenId(payload.sub);
    }

    if (!user) return null;

    if (user.name !== name || user.email !== email || user.loginMethod !== "supabase") {
      await upsertUser({
        openId: payload.sub,
        name: name ?? user.name,
        email: email ?? user.email,
        loginMethod: "supabase",
        lastSignedIn: new Date(),
      });
      user = (await getUserByOpenId(payload.sub)) ?? user;
    }

    return user;
  } catch (error) {
    console.warn("[Supabase Auth] Request verification failed", error);
    return null;
  }
}
