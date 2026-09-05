# ReForge Platform - Development Roadmap

## Phase 1: Foundation (Weeks 1-6)

### Database & Schema
- [x] Create comprehensive Drizzle schema for users, profiles, roles, and dimensions
- [x] Create assessment and dimension scoring tables
- [x] Create check-in, streak, and milestone tables
- [x] Create journal, rules, and goals tables
- [x] Create newsletter subscription and content tables
- [x] Create music profile and playlist tables
- [x] Set up row-level security policies and access control
- [x] Generate and apply all migrations

### Authentication & Security
- [x] Set up OAuth login flow with Manus auth (template-provided)
- [x] Add RBAC role fields to schema (user, supporter, mentor, moderator, admin)
- [x] Implement role-gated procedure authorization
- [x] Implement supporter consent-scope enforcement
- [x] Add rate limiting on auth endpoints
- [x] Implement CORS and CSRF protection
- [x] Add input validation with Zod schemas
- [x] Create protected and public procedure wrappers

### Public Marketing Website
- [x] Define comprehensive visual direction (warm, non-clinical, compassionate)
- [x] Build landing page hero section
- [x] Build about page with mission and values
- [x] Build how-it-works page (4-phase journey)
- [x] Build dimensions explainer page
- [x] Build daily-practice walkthrough page
- [x] Build success indicators page
- [x] Build FAQ page
- [x] Build for-supporters page
- [x] Build contact page
- [ ] Add newsletter signup to all pages
- [x] Verify responsive design at 375px, 768px, 1440px breakpoints
- [x] Create shared site layout with functional header/footer

### Newsletter System
- [ ] Create newsletter subscription management UI
- [ ] Implement double opt-in flow
- [ ] Build subscription preferences page
- [ ] Create newsletter archive page
- [ ] Set up email templates for daily, weekly, milestone, dimension, and situation sends

## Phase 2: Core Journey (Weeks 7-12)

### Conversational Onboarding
- [x] Build substance selection flow (alcohol, nicotine, marijuana, codeine, prescription)
- [x] Build 21-dimension assessment with conversational UI
- [x] Implement progress indicator through assessment
- [x] Create profile setup (name, timezone, faith preference)
- [x] Add skip/back navigation
- [x] Implement assessment response storage
- [x] Create initial dimension scoring from assessment

### App Dashboard
- [x] Build dashboard layout with sidebar navigation
- [x] Display whole-life progress across 21 dimensions
- [x] Add sober-day streak counter
- [x] Add mood trend visualization
- [x] Add today's check-in prompt
- [x] Add upcoming goals preview
- [x] Implement skeleton loading states
- [x] Implement empty states
- [x] Add quick-exit affordance for privacy

### Daily Check-ins
- [x] Build morning check-in form (mood, energy, cravings)
- [x] Build evening check-in form
- [x] Implement streak tracking and milestone celebrations
- [x] Add optimistic updates for check-in submission
- [x] Create check-in history view
- [x] Add check-in time preferences

### Progress Tracker
- [x] Build dimension score visualization
- [x] Create dimension score history charts
- [x] Implement phase progression display
- [ ] Add responsive charts at all breakpoints
- [x] Create dimension detail view with scoring explanation

### Journal Feature
- [x] Build journal entry creation with guided prompts
- [x] Implement dimension-linked journal entries
- [ ] Add rich text editor for journal bodies
- [x] Create journal entry list view
- [x] Implement Tier-1 sensitive data encryption
- [x] Add journal search and filtering

### Rules & Boundaries
- [x] Build rules creation and editing UI
- [x] Implement daily review cadence
- [x] Create rule review history
- [x] Add rule status tracking (active/inactive)
- [x] Build review completion flow

### Goal Tracker
- [x] Build goal creation (30/90/180 day horizons)
- [x] Implement goal step breakdown
- [x] Create goal progress visualization
- [x] Add goal status tracking (active/completed/abandoned)
- [x] Build goal history view
- [x] Link goals to dimensions

## Phase 3: Content & Personalization (Weeks 13-18)

### Activity Guides
- [x] Create activity guide content structure
- [ ] Build activity guide recommendation engine
- [ ] Implement context-based filtering (job type, energy, time, interests)
- [x] Create activity guide detail view
- [ ] Add activity tracking

### Situation Guides
- [x] Create situation guide content structure
- [ ] Build situation trigger detection
- [ ] Implement situation guide recommendation
- [x] Create situation guide detail view

### Relationship Repair Guides
- [x] Create relationship guide content structure
- [ ] Build relationship context assessment
- [ ] Implement relationship guide recommendation
- [x] Create guide detail view

### Faith/Secular Devotional Space
- [ ] Build faith preference selection in onboarding
- [ ] Create devotional content structure (faith and secular variants)
- [ ] Build daily devotional delivery
- [ ] Implement devotional archive
- [ ] Add devotional reflection prompts

### Resource Library
- [x] Create resource content structure
- [x] Build resource search and filtering
- [x] Implement dimension-based resource organization
- [x] Create resource detail view
- [ ] Add resource bookmarking

### Music Rehabilitation
- [ ] Build trigger genre/artist assessment
- [ ] Create safe genre profile
- [ ] Implement gradual genre shift algorithm
- [ ] Build curated playlist generation
- [ ] Create playlist context selection
- [ ] Add music discovery recommendations
- [ ] Build music preference history

## Phase 4: Community & Scale (Weeks 19-24)

### Supporter Features
- [x] Build supporter link creation and management
- [x] Implement consent-scoped access
- [ ] Create supporter dashboard
- [x] Add supporter access logging
- [ ] Build supporter messaging (future)

### Community Features
- [ ] Implement readiness milestone gating
- [ ] Build community membership management
- [ ] Create peer encouragement features
- [ ] Implement group challenges
- [ ] Add moderation tooling
- [ ] Build mentor pairing system

### Monitoring & Observability
- [ ] Set up structured logging
- [ ] Implement performance metrics
- [ ] Create monitoring dashboards
- [ ] Set up alerting on SLOs
- [ ] Add request tracing

### Testing & QA
- [ ] Write unit tests for domain logic
- [ ] Write integration tests for procedures
- [ ] Write e2e tests for core flows
- [ ] Implement accessibility testing
- [ ] Run performance testing (p90 < 200ms)
- [ ] Run load testing (10x capacity)

## Cross-cutting Concerns

### Security & Compliance
- [x] Implement Tier-1 sensitive data encryption (journal, assessment)
- [ ] Add log scrubbing to prevent sensitive data leakage
- [ ] Implement break-glass audit logging for admin access
- [ ] Set up OWASP security checklist
- [ ] Conduct pre-launch security review

### Design System & Styling
- [ ] Define color palette (warm, compassionate)
- [ ] Create typography scale
- [ ] Define spacing and radius scales
- [ ] Create component library with shadcn/ui
- [x] Implement dark/light theme support
- [x] Add animation guidelines

### Responsive Design
- [x] Verify 375px mobile layout
- [x] Verify 768px tablet layout
- [x] Verify 1440px desktop layout
- [ ] Test touch targets (≥44px)
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

### Documentation
- [ ] Create API documentation (OpenAPI/Swagger)
- [ ] Write database schema documentation
- [ ] Create deployment runbook
- [ ] Write rollback procedures
- [ ] Create incident response guide

## Completed Items (from Lovable prototype)
- [x] Static landing page layout
- [x] Static how-it-works page
- [x] Static dimensions page
- [x] Static daily-practice page
- [x] Static stories/testimonials page
- [x] Basic onboarding flow (local state only)
- [x] UI component library setup
- [x] Tailwind CSS configuration
- [x] TypeScript setup
- [ ] Fix TRPCClientError: db.getSubstanceFocus is not a function on the dashboard route
- [ ] Redesign ReForge UI/UX around a nature-led restorative visual language
- [ ] Replace autumn-only surfaces with botanical earth, moss, clay, mist, and forest tokens
- [ ] Create and upload nature-led page atmosphere assets for public, sign-in, dashboard, journal, check-in, goals, guides, music, rules, newsletter, and settings
- [ ] Rebuild public landing and sign-in composition with nature imagery, calm motion, and accessible controls
- [ ] Rework authenticated shell, navigation, dashboard, and all recovery workspace pages with contextual nature cues
- [ ] Add responsive and reduced-motion polish for the nature redesign
- [ ] Validate the redesign with type checks, tests, production build, and screenshots
- [ ] Reconcile PostgreSQL schema fields with backend helpers and tRPC client contracts so the full-stack build compiles cleanly
- [ ] Finish nature-led redesign for dashboard, settings, newsletter, and onboarding routes
- [ ] Diagnose and repair OAuth callback failure in server/_core/oauth.ts or session cookie configuration
- [x] Implement a restorative loading spinner and overlay on the frontend while OAuth handoff and session verification are processing
- [x] Add a safe timeout fallback so stale OAuth handoff state returns users to the sign-in gate
- [x] Add smooth CSS fade-in and fade-out keyframes for the OAuth loading overlay
- [x] Introduce burnt-wood typography tokens (e.g. text-[oklch(0.38_0.07_52)]) for nature-led headings
- [x] Redesign the admin dashboard with glassmorphic cards, RBAC-aware user-to-admin navigation, role grant/revoke controls, and newsletter issue CRUD operations
- [x] Add admin user and newsletter search/filter controls
- [x] Add glassmorphic confirmation modal for destructive admin actions
- [x] Add nature-toned toast notifications for admin CRUD feedback
- [x] Fortify admin authorization, mutation validation, and safe audit behavior
- [ ] Add practical modern admin affordances and responsive verification
- [x] Add server-side audit logging for admin role grants/revokes and newsletter create/update/delete actions without sensitive content
- [x] Add regression tests covering successful and rejected admin audit events
- [x] Tighten default CORS behavior and enforce same-origin checks on state-changing API requests
- [x] Reject state-changing tRPC requests when Origin and Referer are absent or invalid
- [x] Add regression tests for same-origin, cross-origin, and missing-origin mutations
- [x] Review non-tRPC state-changing endpoints for equivalent origin protection
- [x] Audit all non-tRPC Express routes and document protections for any state-changing handlers
- [x] Add a focused route-safety test or checklist proving non-tRPC routes are GET-only or equivalently protected
- [x] Implement consent-scoped supporter access with explicit scope checks and access logging
- [x] Enforce consent scope on the implemented supporter journal member-data procedure
- [ ] Enforce consent scope on every future supporter-facing member-data procedure
- [x] Add non-sensitive supporter access logging for link reads, scoped data access, and revocations
- [x] Add helper-level regression tests for supporter scope and link status
- [x] Add procedure-level regression tests for supporter journal and access-summary authorization and audit outcomes
- [x] Add successful supporter access-summary procedure coverage and verify its success audit event
- [x] Add procedure-level success and rejection tests for supporter link listing and revocation audit outcomes
- [x] Add supporter link-list rejection coverage for a non-supporter caller and rejected audit event
- [x] Add secure supporter-link creation with explicit consent scope, ownership checks, and pending status
- [x] Update supporter-link creation to use PostgreSQL-safe returning semantics and add persistence coverage
- [x] Add a database-level uniqueness or transactional guard against duplicate active or pending supporter links
- [ ] Add runtime-backed supporter-link persistence verification against the deployed database driver
- [x] Add dedicated restorative sign-in route with accessible OAuth entry and home escape link
- [x] Promote verified ReForge changes through GitHub branches features -> dev -> staging -> main
- [x] Add a discreet quick-exit affordance to the authenticated shell with keyboard-accessible navigation away from private screens
- [x] Add an accessible dashboard mood trend visualization backed by recent check-in history
- [x] Add an explicit empty state to the dashboard goals preview
- [x] Replace misleading hardcoded goal progress with real progress or a clearly non-progress presentation
- [x] Surface upcoming-goal information with an honest next-step or horizon summary
- [x] Replace the goals workspace hardcoded progress bar with real step completion data
- [ ] Verify all public marketing pages at 375px, 768px, and 1440px and document route findings
- [ ] Verify protected routes at 375px, 768px, and 1440px and document route findings

## Supabase Auth migration preparation

- [x] Create a private GitHub repository for ReForge and push the current verified checkpoint as the baseline
- [x] Inspect Supabase connector/project availability and capture required setup values
- [x] Prepare a staging-only Supabase Auth migration plan without changing production authentication
- [ ] Validate Supabase Auth compatibility with existing Drizzle schema, RBAC, encryption, and supporter consent flows
- [x] Document Supabase setup, redirect URLs, migration risks, and rollback steps
- [x] Verify private repository metadata, intended baseline SHA, remote branch presence, and save a checkpoint
- [x] Save a new reviewable checkpoint after the GitHub repository-baseline verification files and TODO updates
- [x] Add a disabled-by-default Supabase Auth adapter and feature flag alongside Manus Auth
- [x] Add staging Supabase browser client configuration without exposing server-only credentials
- [x] Add Supabase JWT claim verification and application-user resolution behind the staging flag
- [x] Ensure Supabase bearer verification runs before Manus bearer verification when no Manus cookie is present
- [x] Add a staging-only Supabase PKCE callback route with safe next-path handling and session completion signaling
- [x] Add deterministic regression coverage for the disabled Supabase adapter and malformed bearer handling
- [x] Add a verified-email identity bridge for staged Supabase sign-in with collision-safe ownership preservation
- [x] Add integration coverage proving Supabase-authenticated requests resolve to existing ReForge users and preserve RBAC across protected/admin/supporter procedures
- [x] Add Supabase-authenticated tests or staged manual verification for encrypted journal/check-in access and supporter consent-scoped data flows
- [ ] Complete a real staged Supabase sign-in/callback verification after provider setup and document the results before marking compatibility validated
- [x] Add deterministic Supabase request-context coverage for bearer resolution, Manus-cookie precedence, and application RBAC role loading
- [x] Add an integration test that starts from a Supabase bearer request and resolves through the identity-mapping path to an existing ReForge user row
- [x] Add plain protected-procedure coverage for a non-admin/non-supporter Supabase-authenticated user
- [x] Add Supabase-authenticated coverage for encrypted check-in access paths or document a real staged manual verification covering check-ins
- [x] Add a Supabase-authenticated integration test that exercises the real check-in helper with an encrypted notes payload and proves decrypted notes are returned for the authenticated owner
- [x] Add a Supabase-authenticated protected checkIn.history integration test that uses the real listCheckIns decryption path
- [x] Assert the protected check-in query receives the authenticated owner ID and returns no decrypted notes for a different user context
- [x] Add profile setup controls for name, timezone, and faith preference with persisted values
- [x] Add keyboard-accessible skip and back navigation to the onboarding assessment flow
- [x] Make the active Today route open a functional morning/evening check-in form and provide a discoverable history route
- [x] Restyle the daily check-in form with the ReForge nature-led shell, accessible feedback, and retry-safe submission states
- [x] Wire the active /settings route to the settings screen that exposes morning/evening check-in time controls
- [x] Verify the active /settings route exposes persisted morning/evening schedule fields and valid HH:MM validation
- [x] Build the active journal workspace with guided prompts, encrypted creation, list/search, and empty/error states
- [x] Add regression coverage for journal creation validation, encryption boundaries, and owner-scoped retrieval
- [x] Clarify and implement journal search scope: owner-scoped server-side dimension filters plus client-side keyword search over decrypted entries
- [x] Encrypt assessment response payloads at rest and expose only owner-checked decrypted responses through a protected procedure
- [x] Complete the rules workspace with edit, active/inactive status, review completion, and review history
- [x] Add owner-scoped rule review procedures and validation coverage
- [x] Restore the backward-compatible identity-bridge export and restart the dev runtime without the stale module failure
- [x] Verify that unauthenticated /rules requests safely redirect to the private sign-in gate
- [ ] Complete an authenticated browser walkthrough of /rules create, edit, active toggle, review, and history flows
- [ ] Add an optional non-mocked rule-review database integration check using explicitly supplied test identifiers
- [x] Complete the goals workspace with horizon selection, dimension linkage, editable steps, status transitions, and history
- [x] Add owner-scoped goal status/history procedures and validation coverage
- [x] Implement and validate cadence-aware rule review behavior with due/overdue daily review states and cadence-driven UI
- [ ] Complete an authenticated browser walkthrough of the /rules review flow covering cadence, active toggle, submission, and history
- [x] Add a score-derived four-phase progression model to the active progress workspace
- [x] Add responsive, keyboard-accessible dimension detail expansion with score history and explanation
- [x] Extract and regression-test the score-derived progress phase policy used by the progress workspace
- [x] Add a feature-flagged no-sign-in public demo mode with browser-isolated guest data and a clear demo disclosure
- [x] Ensure protected recovery routes open directly in guest mode without invoking Manus or Supabase authentication
- [x] Add regression coverage proving guest data stays isolated per browser and sensitive fields are not sent to shared anonymous server procedures
- [x] Add open-source README, license, local setup instructions, and no-auth demo safety documentation
- [x] Create a downloadable source archive for the open-source ReForge demo
- [x] Read and verify the routed Guides library and guide metadata helper against the active App route
- [x] Run successful typecheck, tests, and production build after the guides implementation
- [x] Add focused regression tests for guide filtering, dimension organization, and detail-route behavior
