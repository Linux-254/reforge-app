import { describe, expect, it } from "vitest";

describe("Supabase staging configuration", () => {
  it("loads the configured project and exposes a reachable JWKS endpoint", async () => {
    // Staging env is no longer shipped with the repo; skip gracefully when absent.
    const projectUrl = process.env.SUPABASE_URL;
    if (!projectUrl) {
      console.log("[SKIP] SUPABASE_URL not set — skipping staging smoke test");
      return;
    }
    const jwksUrl = process.env.SUPABASE_JWKS_URL;
    const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
    const databaseUrl = process.env.SUPABASE_DATABASE_URL;
    const clientProjectUrl = process.env.VITE_SUPABASE_URL;
    const clientPublishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const clientAuthEnabled = process.env.VITE_SUPABASE_AUTH_ENABLED;

    expect(clientProjectUrl).toBe(projectUrl);
    expect(clientPublishableKey).toMatch(/^sb_publishable_/);
    expect(clientAuthEnabled).toBe("false");
    expect(jwksUrl).toBe(`${projectUrl}/auth/v1/.well-known/jwks.json`);
    expect(publishableKey).toMatch(/^sb_publishable_/);
    expect(databaseUrl).toMatch(/^postgresql:\/\/postgres\.[a-z0-9]+:/);

    const response = await fetch(jwksUrl);
    expect(response.ok).toBe(true);
    const body = (await response.json()) as { keys?: unknown[] };
    expect(Array.isArray(body.keys)).toBe(true);
  }, 15_000);
});
