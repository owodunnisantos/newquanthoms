> CANONICAL: quanthom-registry/docs/UI-SYSTEMS-DESIGN.md
> Version: 1.0 | Owner: Quanthom Registry | Mirrored to every wing. Wings do not edit their mirror.
> Derived from QWK-098 (Universal Settings & UI Systems Design). This file is the authority for every UI ticket.

# UI-SYSTEMS-DESIGN.md

*"UI & UX has to be sleek and uniquely modern which is the reason why I will place an expansive software and system design vocabularies md in all repos for citing. Please obey and be surgical. Consider all breakpoints at all time. Thank You."*

Every wing uses the same names (docs/SYSTEM-DESIGN-VOCABULARY.md), the same tokens, the same layout, the same disciplines. Every derived specification cites this document and the vocabulary. This section is mandatory when CSS is more than 10% of the implementation task.

## 1. The Design Tokens

Tokens are the CSS variables that hold every design decision. Every wing uses the same token names. Every wing can override the values. Every token is a variable. Every variable is used. No hardcoded values in any component.

### 1.1 Colour
- Primitives: --color-black #000000, --color-white #FFFFFF, greys 50-900 (#F9FAFB, #F3F4F6, #E5E7EB, #D1D5DB, #9CA3AF, #6B7280, #4B5563, #374151, #1F2937, #111827), --color-blue-500 #3B82F6, --color-green-500 #10B981, --color-yellow-500 #F59E0B, --color-red-500 #EF4444, --color-purple-500 #8B5CF6.
- Semantic: --color-background: grey-900; --color-surface: grey-800; --color-surface-raised: grey-700; --color-foreground: grey-50; --color-foreground-muted: grey-400; --color-foreground-subtle: grey-500; --color-border: grey-700; --color-border-strong: grey-600; --color-accent: blue-500; --color-success: green-500; --color-warning: yellow-500; --color-danger: red-500; --color-info: purple-500.
- The Four Marks: --color-cut red, --color-hide yellow, --color-merge blue, --color-reason purple.

### 1.2 Typography
--font-sans Inter/system-ui; --font-mono JetBrains Mono/Menlo. Sizes: xs 11, sm 12, base 14, md 16, lg 20, xl 24, 2xl 32, 3xl 48. Weights: 400/500/600/700. Line heights: tight 1.2, base 1.5, loose 1.75. Letter spacing: tight -0.01em, base 0, wide 0.02em.

### 1.3 Space
0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px (--space-0 through --space-24).

### 1.4 Radius
none 0, sm 4px, md 8px, lg 12px, xl 16px, full 9999px.

### 1.5 Elevation
0 none; 1: 0 1px 2px rgba(0,0,0,0.05); 2: 0 2px 4px rgba(0,0,0,0.08); 3: 0 4px 8px rgba(0,0,0,0.10); 4: 0 8px 16px rgba(0,0,0,0.12); 5: 0 16px 32px rgba(0,0,0,0.16).

### 1.6 Motion
Durations: instant 0, fast 100ms, base 200ms, slow 300ms, slower 500ms. Easings: linear; in cubic-bezier(0.4,0,1,1); out cubic-bezier(0,0,0.2,1); in-out cubic-bezier(0.4,0,0.2,1); spring cubic-bezier(0.175,0.885,0.32,1.275).

### 1.7 Breakpoints
xs 320, sm 480, md 768, lg 1024, xl 1280, 2xl 1536, 3xl 1920.

### 1.8 Z-index
base 0, raised 10, sticky 100, rail 200, config-rail 210, topbar 300, overlay 400, modal 500, flyout 600, tooltip 700, toast 800.

## 2. The Two-Column Layout

+--------------------------------------------------------------+
| TOPBAR (optional; the wing decides)                           |
+-----------------+--------------------------------------------+
| PRIMARY RAIL    |  CONTENT PANE                              |
|                 |                                            |
|  Section 1   <  |  Section title (large)                     |
|  Section 2      |  Section description (muted)               |
|  Section 3      |  ------------------------------           |
|                 |  Group title / description / [control]    |
|                 |  ------------------------------           |
|                 |  Group title / description / [control]    |
|  [gear][book]   |                                            |
|  [power]        |                                            |
+-----------------+--------------------------------------------+

Rules:
R1. Two columns. Left rail, right pane.
R2. The rail is a fixed width (a token).
R3. The pane takes the remaining width.
R4. The pane has a max-width: --pane-max-width: 720px, padding --space-8. Centered in its column.
R5. The rail is sticky. It does not scroll with the pane unless the rail is taller than the viewport.
R6. The utility row is the last child of the rail.
R7. The active rail item is a filled pill.
R8. The pane shows one section at a time.
R9. Sections are driven by the URL hash.
R10. The browser back button returns to the previous section.

## 3. The Rail

### 3.1 Rail variants
- Fixed (default; always visible)
- Collapsible (user toggles via a control)
- Auto-hide (hides on scroll; returns on hover or keyboard focus)
- Overlay (slides over content; narrow viewports)
- Drawer (slides from the edge; mobile)

### 3.2 Rail item states
Idle: muted foreground, no background. Hover: subtle background, foreground emphasised. Focus: focus ring. Active: filled pill background, foreground emphasised. Disabled: lower opacity, cursor not-allowed. Loading: skeleton.

### 3.3 Rail group
A headed collection of items. Heading: --font-size-xs, semibold, wide letter spacing, subtle colour, uppercase. Items: flex, --space-3 gap, --space-2/--space-4 padding, --radius-md, muted foreground, fast background transition.

### 3.4 The utility row
The last child of the rail. Icon-only controls: [gear] [book] [power].
Rules:
- Icon-only, always. No labels in the rail.
- Each icon has a tooltip on hover and focus, and an aria-label.
- The row is role="group", aria-label="Settings and account".
- The log out icon is visually separated (divider above) and carries the danger token, not the accent.
- The log out icon is an action, not navigation. It never opens the rail.
- No fourth icon. No placeholder icon.

## 4. The Overlay Shapes

Every overlay is one of four shapes. The wing declares which shape each overlay is.
- Blanket: covers the entire viewport, blocks everything. The overlay is the only thing the user should see (e.g. a wizard).
- Overlay: covers the content area only. The user still sees the rail and topbar (e.g. a detail panel).
- Flyout: floats, anchored to its initiator. Covers only what it covers (e.g. a menu, a picker).
- Drawer: slides from an edge over the content area. Navigation or detail panel on mobile.

Shape rules:
S1. Every overlay declares its shape.
S2. A Blanket must never cover the topbar unless the wing explicitly allows it.
S3. An Overlay must never cover the topbar.
S4. A Flyout must be anchored to its initiator.
S5. A Drawer must slide from an edge.
S6. Every overlay must be dismissable by Escape, by clicking outside, or by an explicit close control. At least one.
S7. Every overlay must trap focus while it is open.
S8. Every overlay must restore focus to its initiator on close.
S9. Every overlay must respect prefers-reduced-motion.
S10. Every overlay must be a dialog element or carry role="dialog" with aria-modal="true".

Breakpoint rule for overlays: below --bp-md the overlay shape defaults to Drawer. Above --bp-md it defaults to Overlay or Flyout per the declaration. The wing and the initiator can override.

## 5. The Breakpoints

xs 320-479 (small phone), sm 480-767 (phone), md 768-1023 (tablet portrait), lg 1024-1279 (tablet landscape), xl 1280-1535 (laptop), 2xl 1536-1919 (desktop), 3xl 1920+ (large desktop).

B1.  The rail is fixed above --bp-lg.
B2.  The rail collapses to icons above --bp-md.
B3.  The rail becomes a drawer below --bp-md.
B4.  The config rail becomes an overlay below --bp-xl.
B5.  The pane padding decreases below --bp-md.
B6.  The pane max-width is respected above --bp-lg.
B7.  Tables convert to cards below --bp-md.
B8.  Tooltips appear on focus, not just hover, at all breakpoints.
B9.  Touch targets are at least 44x44px below --bp-lg.
B10. Every screen is tested at every breakpoint.

Container queries: where a component's layout depends on its container's size (not the viewport's), use a container query (container-type: inline-size; @container (min-width: 400px)).

## 6. The State Machine

Every interactive surface has a state machine. States are named. Transitions are declared.

IDLE --click rail item--> ACTIVE
ACTIVE --click rail item--> ACTIVE (new item); --press Escape--> IDLE (if an overlay is open); --navigate away--> UNMOUNTED
OVERLAY_OPEN --press Escape / click outside / click close--> ACTIVE
LOADING --success--> ACTIVE; --failure--> ERROR
ERROR --retry--> LOADING; --dismiss--> ACTIVE

SM1. Every interactive surface declares its states.
SM2. Every transition is triggered by a named event.
SM3. No unreachable states.
SM4. No states without an exit.
SM5. The state machine is testable.

## 7. The Disciplines

Design: consistency (same component, same purpose); hierarchy (one primary action per screen); whitespace (space tokens only, never guess); rhythm; contrast (WCAG AA); motion (meaningful, not decorative); reduced motion; no skeuomorphism; no decoration; no chrome. The content is the interface.

Engineering: tokens only, no hardcoded values; composition over inheritance; idempotent rendering; style isolation; accessibility; performance; testability; documentation.

Product: user first; simplicity; reversibility; explicitness; consistency; predictability; feedback (every action has feedback); recovery (every error is recoverable).

Documentation: every component, variant, token, breakpoint, state machine, and overlay shape is documented.

## 8. The Scenarios

1. First visit: rail visible, pane empty or default section, utility row visible, no overlays open.
2. Navigate: click a rail item; pane updates without reload; active item is a filled pill; URL hash updates; back button returns.
3. Config rail: gear opens the second rail; clicking gear again closes it; Escape closes it when focus is inside.
4. Flyout: trigger opens it anchored; focus moves in; Escape closes and restores focus to the trigger; click outside closes.
5. Deep link: settings#privacy opens the Privacy section with the pill on the matching rail item.
6. Error and recovery: save fails, toggle rolls back, toast "Could not save. Try again.", retry succeeds, toast "Saved."

## 9. The Approaches

Every wing declares its approach per settings surface: Full page (extensive settings), Modal (quick settings, return to task), Drawer (medium settings, stay on page), Flyout (a single value), Inline (part of the page's content).
A1. Every wing declares its approach for each settings surface.
A2. The approach is consistent within a wing.
A3. The approach can vary by breakpoint.
A4. The approach is documented.
A5. The approach is testable.

## 10. The Fork Points

Every decision has fork points. The initiator declares which fork is taken. The default is documented.
1. Rail placement: Left (default) | Right, top, bottom
2. Rail variant: Fixed (default) | Collapsible, auto-hide, overlay, drawer
3. Config rail variant: Overlay (default) | Push, drawer
4. Overlay shape: Overlay (default) | Blanket, flyout, drawer
5. Overlay breakpoint behaviour: Drawer below md (default) | None
6. Section navigation: Hash route (default) | Query route, in-memory
7. Toggle save pattern: Optimistic (default) | Pessimistic
8. Toggle rollback: Yes (default) | No
9. Deep link scheme: Hash (default) | Query
10. Focus trap: Yes (default) | No
11. Motion: Enabled (default) | Reduced
12. Density: Comfortable (default) | Compact, spacious
13. Theme: Dark (default) | Light, auto
14. Accent: Brand (default) | Custom
15. Utility row contents: Settings, Knowledgebase, Log out (default) | Configurable

## 11. The Verify Plan

scripts/verify-v0-ui-systems.ps1 checks every wing that adopts this specification: vocabulary consistency; tokens present and used; no hardcoded colour or spacing values; two-column layout present; rail present with utility row (three icons, tooltip + aria-label each); active rail item a filled pill; one section at a time; overlay declares shape, traps focus, restores focus, respects reduced motion; every breakpoint handled; every state machine, component, scenario, and fork documented. Exit 0 on all pass. Non-zero with a list of failures.

## 12. The Mirror Discipline

1. This file is stored in the Registry.
2. Every wing mirrors it into its own docs/UI-SYSTEMS-DESIGN.md.
3. The mirror is updated whenever the Registry version changes.
4. The mirror carries the header: > CANONICAL: quanthom-registry/docs/UI-SYSTEMS-DESIGN.md
5. No wing edits its mirror. Edits go to the Registry.
6. The Registry version is the single source of truth.
The vocabulary (docs/SYSTEM-DESIGN-VOCABULARY.md) mirrors the same way.
