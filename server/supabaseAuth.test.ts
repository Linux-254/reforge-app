import { describe, expect, it } from "vitest";
import { authenticateSupabaseRequest } from "./_core/supabaseAuth";

describe("staged Supabase Auth adapter", () => {
  it("does not authenticate requests while the feature flag is disabled", async () => {
    const request = { headers: { authorization: "Bearer not-a-real-token" } } as any;
    await expect(authenticateSupabaseRequest(request)).resolves.toBeNull();
  });

  it("does not authenticate malformed bearer headers in disabled staging mode", async () => {
    const request = { headers: { authorization: "Basic not-a-bearer-token" } } as any;
    await expect(authenticateSupabaseRequest(request)).resolves.toBeNull();
  });
});
