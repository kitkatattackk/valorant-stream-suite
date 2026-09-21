# OverlayNode Valorant Stream Bundle

## Goal
Build a polished, responsive customization dashboard for three coordinated OBS-ready widgets: Rank Tracker, Chat Box, and Stream Goal.

## Experience
- Replace the placeholder home page with the working dashboard.
- Add navigation for Bundle Preview, Rank Tracker, Chat Box, and Stream Goal.
- Show a large live bundle preview over a generated, original tactical gameplay-style background with dark, light, and checkerboard viewing modes.
- Keep widgets compact, readable, and visually unified without implying Riot affiliation.

## Widgets
- **Rank Tracker:** player name, rank, RR progress, session wins/losses, and win streak.
- **Chat Box:** readable chat messages, usernames, role badges, plus distinct follow, subscription, and tip alerts.
- **Stream Goal:** follower/subscriber mode, current and target counts, progress bar, and a restrained completion animation.
- Each widget view will include an isolated transparent preview suitable for OBS composition.

## Customization
- Shared controls for accent color, text color, panel opacity, font, corner radius, scale, and animation intensity.
- Three coordinated presets: Competitive Dark, Clean Light, and Pastel.
- Optional per-widget overrides that inherit from the shared theme by default.
- Reduced-motion support through both user controls and system preferences.

## Visual Direction
- Dark translucent surfaces, warm coral default accent, crisp typography, restrained borders, and compact geometry.
- Original tactical background artwork generated specifically for this project.
- Subtle motion reserved for view changes, progress updates, alerts, and goal completion.

## Technical Notes
- Implement as a single responsive TanStack Start page with focused React components and semantic Tailwind design tokens.
- Keep state local to the dashboard so every control updates all visible previews immediately.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Validate the finished page at desktop and mobile sizes, including interactions and reduced-motion behavior.
