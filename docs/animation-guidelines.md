# ReForge animation guidelines

ReForge uses motion as a quiet orientation cue rather than decoration. Transitions should help people understand where they are, what changed, and how to return to a steady state.

## Timing

Use 100–160 ms for button feedback, 150–250 ms for menus and popovers, and 200–350 ms for cards, drawers, and restorative overlays. Prefer `cubic-bezier(0.23, 1, 0.32, 1)` for entrances and `cubic-bezier(0.77, 0, 0.175, 1)` for intentional movement. Avoid `ease-in` for interface motion.

## Properties

Animate `transform` and `opacity` wherever possible. Do not animate layout properties such as width, height, margin, or padding for routine interaction. Entering elements should begin near their final position and scale, typically around `scale(0.95)`, rather than appearing from `scale(0)`.

## Interaction

Buttons should provide a restrained pressed response around `scale(0.97)` and should retain a visible keyboard focus ring. Hover movement must remain subtle and should never be the only indication of state. Grouped content may stagger by 30–80 ms, but repeated or high-frequency interactions should remain nearly immediate.

## Reduced motion

All non-essential transitions and entrance animations must be disabled or minimized under `@media (prefers-reduced-motion: reduce)`. Content, focus order, loading status, and action feedback must remain understandable without animation. The OAuth handoff overlay may retain a static progress indicator, but must not depend on motion to communicate that work is occurring.

## Tone

Motion should feel like a breath: calm, short, and reversible. Avoid bouncing, parallax, flashing, auto-playing media, and motion that implies urgency. Any future celebration should be optional, brief, and dismissible.
