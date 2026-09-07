# ReForge

ReForge is a nature-led recovery companion that helps people notice the next honest step across daily check-ins, private reflection, goals, boundaries, progress, and practical guides. The project is open source and released under the MIT License.

The current public preview runs in **no-sign-in demo mode**. Visitors can open the app directly without a Manus, Supabase, or passkey account. Demo journal entries, check-ins, goal progress, and boundary reviews are stored in the browser's local storage for that site origin; they are not sent to the shared ReForge database. This mode is intended for product demonstrations and local exploration, not clinical records or production storage of sensitive information.

## What is included

| Area | Demo experience |
| --- | --- |
| Overview | A quiet landing place with daily rhythm, quick actions, and demo status cards |
| Today | A local morning check-in with a browser-only completion state |
| Journal | A local reflection composer with private browser storage and reset controls |
| Progress | Nature-led dimension cards and demo progress signals |
| Goals | A 30-day example goal with a locally persisted next step |
| Boundaries | A daily boundary review with a local completion state |
| Guides | Practical recovery prompts and reflection entry points |
| Community Circle | Prompt-based peer-style notes with topic filters, stored only in this browser |
| Settings | Privacy explanation and one-click local demo reset |

The full-stack implementation remains in the repository. Its protected tRPC procedures, PostgreSQL/Drizzle schema, ownership checks, field-level encryption, Manus authentication, and staged Supabase authentication path are retained for a future authenticated build. Guest demo mode deliberately does not invoke those protected procedures.

## Run the public demo locally

The only requirement for the browser-isolated demo is Node.js and pnpm.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by the development server and choose **Explore the demo**. The application defaults to public demo mode. To exercise the retained authenticated/full-stack path in a controlled environment, set `VITE_DEMO_MODE=false` and provide the required database, session, OAuth, and encryption configuration described in `.env.example`.

Useful commands are shown below.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm check` | Run the TypeScript compiler without emitting files |
| `pnpm test` | Run the Vitest suite |
| `pnpm build` | Build the Vite client and bundled server |
| `pnpm start` | Start the production bundle |

## Privacy and demo safety

> **The no-sign-in mode is a product demo, not a secure personal account.** Do not enter real names, clinical details, crisis disclosures, treatment records, or other sensitive information into a public demo deployment.

The demo uses browser-local storage under ReForge-specific keys, including a separate Community Circle namespace, and includes a reset action in Settings. Clearing the site's browser data also clears the demo state for that browser. Because no account is established, demo data cannot be recovered across devices and is not available to another browser profile.

The server-side encrypted workflows remain protected rather than being weakened for anonymous access. This is intentional: anonymous shared persistence would not provide a trustworthy ownership boundary for journals, check-ins, assessment responses, goals, or rule reviews.

## Full-stack development

The retained production path uses React 19, Vite, Tailwind CSS v4, shadcn/ui, wouter, TanStack Query, tRPC 11, Express, Drizzle ORM, PostgreSQL-compatible storage, JWT session cookies, and optional Supabase Auth staging. Sensitive fields use the project's Tier-1 AES-256-GCM encryption boundary. Review the engineering material under `docs/` before enabling authenticated storage.

```text
client/       React pages, components, guest demo workspace, and client policies
server/       Express/tRPC procedures and protected data-access helpers
drizzle/      Drizzle schema and reviewed migration artifacts
shared/       Shared types and constants
docs/         Engineering, handoff, demo safety, and migration notes
```

## Open-source contribution

Please open an issue before a large architectural change. Contributions should include focused tests for security boundaries, ownership checks, and data-isolation behavior. Do not add fabricated testimonials, reviews, or recovery outcomes. Do not commit `.env`, database credentials, session keys, generated build output, or user data.

## License

ReForge is available under the MIT License. See [`LICENSE`](./LICENSE).

## Project status

The public no-sign-in demo is the active preview surface. The authenticated Manus flow and staged Supabase integration remain available behind the demo flag for continued engineering, but they are not required for visitors who only want to explore the product.
