# Responsive verification notes

The public home and dedicated sign-in routes were captured at 375×812 and 768×1024. At 375px, the public header collapses into a compact brand row with a horizontally scrollable navigation rail, the hero actions stack with a full-width primary CTA, and the sign-in card remains readable with generous touch targets. At 768px, navigation remains legible across two compact rows, the hero headline and metric panel preserve hierarchy without clipping, and the sign-in card expands comfortably while retaining clear return and OAuth actions.

Desktop 1440px capture and authenticated protected-route verification remain outstanding because the current browser session is not authenticated. These notes intentionally do not claim those checks as complete.

## Public route mobile sweep — 375px

The public routes `/`, `/about`, `/how-it-works`, `/dimensions`, `/daily-practice`, `/success`, `/supporters`, and `/faq` were captured at 375×812. The shared compact navigation remains reachable, primary actions fit within the viewport, long editorial sections stack without horizontal overflow, and the footer remains readable. The dimensions and FAQ pages are intentionally long but retain clear section rhythm and usable tap targets in the captured flow.

## Public route tablet sweep — 768px

The same eight public routes were captured at 768×1024. Editorial layouts use readable two-column cards where appropriate, the compact navigation rail wraps without clipping, hero actions remain comfortably sized, and footer columns remain legible. Long pages preserve vertical rhythm without horizontal overflow.

## Expanded public-route sweep — 2026-09-07

The public marketing and entry routes were additionally reviewed at 1440×900 and the remaining routes were checked at 375×812, 768×1024, and 1440×900: `/`, `/about`, `/how-it-works`, `/dimensions`, `/daily-practice`, `/success`, `/faq`, `/supporters`, `/contact`, `/sign-in`, `/privacy`, `/terms`, and `/community`.

The reviewed routes retained readable typography, wrapped navigation controls without horizontal clipping, and kept primary actions within the viewport. The Community Circle composer and topic filters remained usable at tablet width; the sign-in route preserved the no-account demo call to action. Authenticated-only routes remain intentionally unverified until a controlled sign-in session is available.

## Motion accessibility contract

Nature-led float and reveal animations are enabled only inside `@media (prefers-reduced-motion: no-preference)`. OAuth overlay entrance and exit animations use the same opt-in pattern. When reduced motion is requested, these animations are not applied; layout and interactive controls remain available without relying on motion.

This is a code-level accessibility verification. The authenticated responsive browser sweep remains pending until a controlled sign-in session is available.
