# ReForge public demo mode

## Purpose

ReForge currently defaults to a public, no-sign-in demo so a visitor can inspect the product without creating a Manus, Supabase, or passkey account. The demo is designed for product walkthroughs, design review, and local experimentation.

## Data boundary

Guest state is kept in browser `localStorage` under ReForge-specific keys. The guest workspace does not call protected tRPC procedures and does not write anonymous journal, check-in, assessment, goal, or rule data to the shared database. A browser profile therefore sees only its own demo state for that site origin.

This is browser isolation, not account security. Anyone with access to the same browser profile can inspect or clear local storage. Visitors should not enter real recovery records, medical information, names, crisis disclosures, or other sensitive content into a public demo deployment.

## Visitor flow

The public landing page links to `/sign-in`, which now acts as a demo entry page rather than an authentication gate. The call to action opens `/dashboard`. Every private-looking route is handled by `GuestDemoWorkspace` while demo mode is active, including `/journal`, `/check-ins`, `/progress`, `/goals`, `/rules`, `/guides`, and `/settings`.

Settings includes a reset action that removes the demo keys and reloads the workspace. The public demo banner and the Settings explanation make the storage boundary visible without blocking exploration.

## Configuration

The client defaults to demo mode unless `VITE_DEMO_MODE=false` is explicitly supplied. The flag is intentionally opt-out so a fresh open-source checkout does not accidentally expose a half-configured authenticated deployment.

```bash
# Public demo, default behavior
VITE_DEMO_MODE=true

# Controlled authenticated/full-stack development
VITE_DEMO_MODE=false
```

When demo mode is disabled, the existing protected route components and server contracts become active again. That mode requires the database, session, encryption, OAuth, and optional Supabase configuration described in `.env.example`. It should be tested in a controlled environment with real ownership and authorization checks.

## Contributor checklist

A change to guest mode should preserve the following properties:

1. Guest routes must not invoke protected server procedures merely to render.
2. Guest journal and check-in content must remain local to the browser.
3. The interface must state that the experience is a demo and that local data can be reset.
4. Authenticated procedures must remain protected; do not weaken `protectedProcedure` to support guest rendering.
5. Tests should cover both the guest data boundary and the authenticated ownership boundary when a shared component or contract changes.
