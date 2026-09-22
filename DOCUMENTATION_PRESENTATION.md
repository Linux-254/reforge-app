# REFORGE: Complete Application Architecture & User Journey Presentation Guide
*A Step-by-Step Sequence of Events Documentation for Client & Stakeholders*

---

## Executive Summary & System Philosophy

**REFORGE** is a multi-role, holistic recovery and wellness platform built upon a **21-Dimension Framework**. It bridges the gap between daily self-regulation, trusted family supporter involvement, professional coaching oversight, and centralized administrative governance.

This document serves as an exhaustive, sequential walk-through of the platform's features, pages, tabs, navigation pathways, and operational tools—structured as a natural **Sequence of Events** from initial public onboarding to daily member practice, supporter care, and admin management.

---

## Master Table of Contents (Sequence of Events)

1. **Event 1: Public Discovery & Entry Portal** (`/`)
2. **Event 2: Guided Onboarding & Baseline Assessment** (`/onboarding`)
3. **Event 3: Member Recovery Dashboard & Command Center** (`/dashboard`)
4. **Event 4: Daily Check-In & Mood Evaluation** (`/check-ins`)
5. **Event 5: Check-In History & Longitudinal Vitals** (`/check-in-history`)
6. **Event 6: Personal Boundary Rules Engine** (`/rules`)
7. **Event 7: Integrated Recovery Workspace & Mindfulness Suite** (`/journal`, `/goals`, `/music`, `/guides`, `/community`, `/newsletter`)
8. **Event 8: Supporter Portal & Consented Care Network** (`/supporters` or Supporter Role)
9. **Event 9: Professional Coach & Supervision Roster** (Coach Role)
10. **Event 10: Admin Command Center & System Governance** (`/admin`)

---

## Event 1: Public Discovery & Entry Portal (`/`)

### Overview & Intent
The public landing page introduces visitors to the REFORGE philosophy, establishing immediate credibility and clear calls to action without forcing mandatory login barriers.

### Key Navigation & UI Elements
- **Sticky Header Navbar**: Brand logo, quick links (`How It Works`, `21 Dimensions`, `Supporters`, `FAQ`, `Contact`), Theme Switcher (Dark/Light), and `Sign In` / `Get Started` buttons.
- **Top Demo Role Bar**: Floating interactive bar allowing instant persona switching (`Admin`, `Member`, `Supporter`, `Coach`).
- **Hero Banner**: High-contrast, serene typography introducing the 21-Dimension Framework.
- **21 Dimensions Explorer Grid**: Interactive cards grouped by category (`Physical & Biological`, `Emotional & Psychological`, `Relational & Community`, `Purpose & Spirit`).
- **Family Supporter CTA Section**: Dedicated block introducing the Consented Supporter feature.

### Sequence of Usage
1. Visitor lands on the homepage (`/`).
2. Explores the 21 Dimensions cards to understand the holistic scope of recovery.
3. Clicks **"Try Live Sandbox"** or selects a role from the top **Demo Role Bar**.
4. Clicks **"Get Started"** to launch Guided Onboarding.

---

## Event 2: Guided Onboarding & Baseline Assessment (`/onboarding`)

### Overview & Intent
A 4-step intake survey designed to establish a new member's baseline Vitality Score and initial boundary commitments.

### Step-by-Step Flow
- **Step 1: Focus Selection**: User chooses primary recovery goals (e.g., *Physical Sobriety*, *Emotional Regulation*, *Sleep Hygiene*).
- **Step 2: Dimension Baseline Survey**: 1-10 slider scales evaluating current state across core dimensions.
- **Step 3: Starter Boundary Rules**: Selection of initial boundary rules (e.g., *No Calls After 9 PM*, *Dry Dinners*).
- **Step 4: Confirmation & Vitality Score Calculation**: System generates the initial Vitality Score and redirects to the Member Dashboard.

---

## Event 3: Member Recovery Dashboard (`/dashboard`)

### Overview & Intent
The primary daily operational hub for active recovery practice.

### Key UI Modules & Features
- **Vitality Gauge Wheel**: Real-time score (0-100) calculated from recent check-ins and boundary adherence.
- **Streak Counter**: Badge tracking consecutive days of mindful check-ins.
- **Quick Check-In Banner**: Call-to-action button prompting today's reflection.
- **Active Boundary Rules Panel**: List of active rules with toggle switches and category tags.
- **Supporter Connection Status**: Live badge indicating if a supporter is linked and what data is shared.
- **Workspace Shortcuts**: Quick links to *Reflective Journal*, *Goals*, *Ambient Music*, *Guides*, and *Community*.

---

## Event 4: Daily Check-In & Mood Evaluation (`/check-ins`)

### Overview & Intent
A 60-second micro-evaluation logging emotional, physical, and mental states.

### Feature Breakdown
- **5-Point Mood Selector**: Visual buttons (*Restorative*, *Grounded*, *Steady*, *Vulnerable*, *Struggling*).
- **Dual Energy Sliders**: Physical Energy (1-10) and Emotional Clarity (1-10).
- **Contextual Tags**: Win/Trigger selectors (*Good Sleep*, *Nature Walk*, *Work Stress*, *Fatigue*).
- **Freeform Journal Note**: Optional text field for private written reflections.
- **Automated Sync**: Upon clicking **"Save Reflection"**, data updates in `DemoDataManager`, refreshing dashboard gauges and historical logs.

---

## Event 5: Check-In History & Longitudinal Vitals (`/check-in-history`)

### Overview & Intent
Provides members and coaches with long-term visual trends and past check-in logs.

### Key Visualizations
- **Mood Pulse Bar Chart**: Displays daily state fluctuations over a 7-day or 30-day window.
- **Calendar Density Heatmap**: Visual grid highlighting check-in frequency and consistency.
- **Chronological Reflection Feed**: Detailed list of past logs with mood badges, energy ratings, and written notes.

---

## Event 6: Personal Boundary Rules Engine (`/rules`)

### Overview & Intent
Enables members to construct personalized guardrails to prevent triggers and maintain emotional safety.

### System Capabilities
- **20+ Boundary Presets**: Pre-populated rules across categories like *Evening Rest*, *Social Boundaries*, *Digital Wellness*.
- **Active / Paused Switches**: One-click toggling to activate or deactivate rules as needs evolve.
- **Custom Rule Creator Modal**: Allows members to draft custom rule titles, guidance notes, category tags, and priority levels.
- **Supporter Privacy Badge**: Indicates whether a rule is visible on the Supporter Portal.

---

## Event 7: Recovery Workspace & Mindfulness Suite

### Component Breakdowns
1. **Goals & Milestones (`/goals`)**: Short-term and long-term sobriety milestones with progress meters.
2. **Reflective Journal (`/journal`)**: Full-featured markdown editor with private/shared scope toggles.
3. **Ambient Soundscapes (`/music`)**: Interactive audio synth producing binaural focus tones and sleep sounds.
4. **Restorative Guides (`/guides`)**: Library of situational guides offering step-by-step coping strategies for high-stress moments.
5. **Community Reflections (`/community`)**: Moderated discussion forum for peer encouragement.
6. **Editorial Newsletter (`/newsletter`)**: Weekly published essays on holistic recovery.

---

## Event 8: Supporter Portal & Consented Care Network (`/supporters`)

### Overview & Intent
Provides family members and sponsors with a non-intrusive, consented window into member wellness while respecting personal privacy.

### Core Features & Visual Indicators
- **7-Day Vitality Pulse Visualizer**: Displays a non-intrusive wellness trend line without exposing private journal text.
- **Consent Scope Matrix**: Explicit badges detailing exactly what data is shared:
  - *Daily Check-ins*: Shared
  - *Boundary Rules*: Shared
  - *Emergency Alerts*: Active
  - *Raw Journal*: Private (Protected)
- **Active Boundaries Monitor**: Displays the member's current active boundaries so supporters can respect and uphold commitments.
- **Supporter Field Guides**: Educational articles on non-judgmental accountability and recognizing subtle stress triggers.

---

## Event 9: Professional Coach & Supervision Roster (Coach Role)

### Overview & Intent
Empowers recovery coaches and clinicians to oversee client caseloads and provide timely intervention.

### Core Capabilities
- **Client Caseload Table**: Displays assigned members, last check-in timestamps, and vitality risk flags.
- **One-Click Profile Inspection**: View client dimension scores and check-in history.
- **Boundary & Guide Recommendations**: Suggest specific boundary rules or guides tailored to client needs.

---

## Event 10: Admin Command Center & System Governance (`/admin`)

### Overview & Intent
The complete operational control center for program directors and platform administrators.

### Detailed Tab-by-Tab Breakdown
1. **Tab 1: 21 Core Dimensions CRUD**: Add new dimensions, edit descriptions, change categories, or delete dimensions.
2. **Tab 2: Restorative Guides Management**: Create, edit, search, and manage situational guides.
3. **Tab 3: Boundary Rules Engine**: Edit system-wide boundary presets and guidance documentation.
4. **Tab 4: Community Moderation**: Pin featured posts, review reported content, or remove inappropriate posts.
5. **Tab 5: User Accounts & Role Governance**: Real-time user roster with instant role switching (`Admin`, `Member`, `Supporter`, `Coach`) and cohort management.
6. **Tab 6: Supporter Links & Consent Governance**:
   - Issue new supporter pairings (*Supporter Name/Email* ↔ *Member Name/Email*).
   - Configure Consent Scope Levels (*Dashboard & Rules*, *Full Consented Access*, *Emergency Only*).
   - Toggle individual permissions (*Check-ins*, *Boundaries*, *Emergency Alerts*, *Raw Journal*).
   - Pause or Revoke connection links in real time.
7. **Tab 7: Editorial Newsletter Publisher**: Draft, preview, format, and publish weekly editorial newsletters.
8. **Tab 8: System Audit Logs**: Immutable audit trail logging administrative, clinical, and data modification events.
9. **Global System Control: Factory Reset**: One-click **"Reset All Demo Data"** button to restore initial sample dataset for fresh presentations.

---

## Live Presentation URL & Verification
- **Interactive Sequence Presentation Page**: Available in-app at `/presentation` or by clicking the **"Sequence Presentation"** button in the top Demo Bar on any page.
- **Admin Command Center**: Accessible directly at `/admin`.
- **Live Demo sandbox**: Instant role switching available on all screens.
