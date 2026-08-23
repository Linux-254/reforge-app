# ReForge Supabase Auth staging migration plan

## Decision

ReForge will evaluate **Supabase Postgres plus Supabase Auth** as a staged alternative to the current Manus OAuth path. The current Manus session flow remains the production default until the Supabase path passes end-to-end verification.

| Area | Current production path | Staging migration path |
|---|---|---|
| Identity | Manus OAuth `openId` | Supabase Auth JWT `sub` |
| Session | Manus signed session cookie | Supabase PKCE session and bearer token |
| Application data | Drizzle and existing database | Drizzle with the staged Supabase connection when explicitly enabled |
| Authorization | Existing protected/admin/supporter tRPC guards | Same guards after Supabase JWT verification and application-user lookup |
| Sensitive data | Existing server-side encryption | Same encryption helpers and key material; no plaintext migration |
| Browser sign-in | Manus secure sign-in | Feature-flagged Supabase Google sign-in button |

## What is implemented now

The server has a disabled-by-default Supabase adapter. When `SUPABASE_AUTH_ENABLED` is not exactly `true`, it returns no user and cannot change the current Manus path. When enabled, it verifies bearer tokens with the configured Supabase JWKS URL, checks the Supabase issuer and `authenticated` audience, resolves the JWT subject to the existing application user model, and refreshes non-sensitive profile fields. The application’s existing RBAC and supporter-consent procedures remain the authorization boundary.

The sign-in page has an optional Supabase Google button controlled by `VITE_SUPABASE_AUTH_ENABLED`. It uses the PKCE flow and redirects to an application callback path containing a constrained internal `next` value. The flag is currently `false`, so users see only the existing Manus sign-in action.

## Required staging verification before enabling the flag

The Supabase dashboard must be configured with Google as an OAuth provider. The production and preview origins must be added to Supabase Auth’s allowed redirect URLs, including the exact ReForge callback path. The Google Cloud OAuth client must include the Supabase Auth callback URI and the permitted application origins.

After provider setup, staging verification must cover a fresh Google sign-in, callback code exchange, session refresh, logout, invalid and expired JWT rejection, first-time application-user provisioning, existing-user role preservation, admin-only procedure rejection, supporter consent boundaries, encrypted journal/check-in access, same-origin mutation guards, and safe return navigation. No production flag should be enabled until these checks pass.

## Rollback

Rollback is a configuration change: set `SUPABASE_AUTH_ENABLED=false` and `VITE_SUPABASE_AUTH_ENABLED=false`, redeploy the current checkpoint, and retain the Manus OAuth variables. The Supabase adapter is additive and does not delete Manus sessions, application rows, encrypted payloads, roles, consent records, or audit logs.

## Current status

The Supabase project values are stored through the project secret manager. The JWKS endpoint smoke test passes, TypeScript passes, the focused Auth/security tests pass, and the production build passes. Google provider setup and a real authenticated staging callback remain user-side prerequisites; the Supabase feature flags must remain disabled until they are completed.
