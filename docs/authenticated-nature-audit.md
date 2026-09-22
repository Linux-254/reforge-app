# Authenticated nature-led audit

This audit is a code-level review of the retained authenticated path. It is not a substitute for a signed-in browser walkthrough.

| Surface | Code-level finding | Verification boundary |
|---|---|---|
| Shared authenticated shell | `DashboardLayout.tsx` uses the nature-card loading and access states, persistent navigation, and the shared theme tokens. | Browser interaction still requires a controlled authenticated session. |
| Dashboard | The dashboard retains the nature-led card, atmosphere, progress, and recovery summary treatment. | Guest mode is visually verified; authenticated data hydration is not browser-verified here. |
| Journal | The authenticated journal workspace retains the guided/private workspace structure and shared nature-card vocabulary. | Encryption and owner scoping are covered by tests; signed-in visual verification remains pending. |
| Check-ins | The active check-in route has functional morning/evening states and nature-led feedback surfaces. | Signed-in submission and history require authenticated browser verification. |
| Goals and progress | Goals lifecycle, step completion, progress phases, and dimension detail use the shared design tokens and responsive card patterns. | Guest routes are visually verified; authenticated persistence requires a signed-in session. |
| Rules | The rules workspace has a dedicated nature-led boundary presentation and cadence-aware review states. | Authenticated create/edit/review/history walkthrough remains pending. |
| Guides, music, devotional, newsletter, and settings | These routes reuse the shared shell, card system, typography, and registered atmosphere assets where applicable. | Some routes require authenticated data or provider configuration; no claim of completed signed-in visual coverage is made. |

The current public demo remains the supported no-sign-in walkthrough. The full-stack authenticated architecture is preserved, but authenticated responsive verification and non-mocked OAuth/provider verification remain explicit follow-up work.
