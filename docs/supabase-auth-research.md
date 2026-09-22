# Supabase Auth and Drizzle research notes

## Sources reviewed

1. Supabase, [Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls). Supabase Auth uses an explicit `redirectTo` value for OAuth and passwordless flows, and that URL must be included in the project’s allowed Redirect URLs list. The Site URL is the default redirect and is important for email confirmations and password resets. Production should use exact redirect paths; wildcard patterns are more appropriate for local or preview environments.

2. Supabase, [Login with Google](https://supabase.com/docs/guides/auth/social-login/auth-google). Google sign-in requires a Google Cloud OAuth client, configured JavaScript origins, the Supabase Auth callback URI, and the client ID/secret configured in the Supabase project. In a PKCE flow, the application supplies a callback redirect URL and exchanges the returned code for a session.

3. Supabase, [Creating a client for server-side Auth](https://supabase.com/docs/guides/auth/server-side/creating-a-client). Browser and server clients should be configured for cookie-based sessions when server-side Auth is used. Supabase distinguishes `getClaims()` for verified JWT identity, `getUser()` for a current Auth-server user record, and `getSession()` for raw tokens; server authorization should not trust an unvalidated session user object.

4. Drizzle ORM, [Drizzle with Supabase Database](https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase). Supabase provides a PostgreSQL database that Drizzle can access through a pooled connection string and the `postgres` driver. Drizzle Kit can generate reviewed migrations for the PostgreSQL schema, and existing tables/migrations must be inspected before applying changes.

## ReForge implications

The migration should use Supabase Auth for identity and session issuance while retaining Drizzle for application tables and typed queries. The existing ReForge `users` table, role fields, supporter consent records, encrypted journal/check-in payloads, and audit logs must remain application-owned. A server-side adapter should validate Supabase JWT claims, resolve the corresponding application user by a stable Auth subject identifier, and preserve the existing protected, admin, and supporter procedure guards.

Required setup values are the Supabase project URL, publishable/anon key for browser use, server-side key material only if a privileged server operation is necessary, Google OAuth client ID and secret, and environment-specific Site URL and allowed redirect URLs. These values should be supplied through the project secret manager and must not be committed to GitHub.

The first implementation should be staging-only. Production should continue to use Manus Auth until Supabase sign-in, callback error handling, session refresh, user provisioning, role enforcement, encryption access, supporter consent, logout, and rollback are verified in staging.

## Session configuration status

The Supabase project URL, publishable key, JWKS URL, and a URL-encoded transaction-pooler database URL were added through the project secret manager as staging values. A Vitest smoke test reached the configured JWKS endpoint and confirmed a valid JSON Web Key Set response. The existing production `DATABASE_URL`, Manus OAuth variables, and production session flow were not changed.

The pasted setup suggested `@supabase/server`; the staged implementation will follow the current official JavaScript guidance and use the smallest compatible Supabase client package for this Express/tRPC application, rather than installing an unverified package or copying a framework-specific Next.js proxy pattern into the project.
