> CANONICAL: quanthom-registry/docs/SYSTEM-DESIGN-VOCABULARY.md
> Version: 1.0 | Owner: Quanthom Registry | Mirrored to every wing. Wings do not edit their mirror.

# SYSTEM-DESIGN-VOCABULARY.md

*"UI & UX has to be sleek and uniquely modern which is the reason why I will place an expansive software and system design vocabularies md in all repos for citing. Please obey and be surgical. Consider all breakpoints at all time. Thank You."*

One line per term. Plain list for grep-ability. Do not invent synonyms. New terms are added here by the Registry only.

## Navigation
Rail -- The primary vertical navigation column on the left.
Primary rail -- The rail that lists the wing's main destinations.
Config rail -- The second rail, opened by the utility row, that carries configuration and account pages.
Utility row -- The row of icon-only controls at the bottom of the primary rail.
Rail item -- A single entry in a rail.
Rail group -- A headed collection of rail items.
Rail collapse control -- The control that hides or shows the primary rail.
Breadcrumb -- The trail that names the current location.
Command palette -- The keyboard-driven search that navigates to any destination.

## Surfaces
Page -- A full-height destination rendered in the main content area.
View -- A page's rendered content.
Panel -- A region of a page.
Card -- A bordered container of grouped content.
Overlay -- A layer rendered above the page.
Modal -- An overlay that blocks interaction with the page beneath until dismissed.
Drawer -- An overlay that slides in from an edge.
Flyout -- A small overlay anchored to a control.
Popover -- A flyout with richer content and its own focus trap.
Tooltip -- A small text hint shown on hover or focus.
Toast -- A transient notification that appears and disappears.
Banner -- A persistent strip at the top of a page or a panel.
Sheet -- A bottom-anchored overlay on mobile.
Fullscreen -- A page or overlay that occupies the entire viewport.
Blanket -- A full-area cover that hides everything behind it.
Stub -- A placeholder rendered before the real content loads.
Skeleton -- A stub that mimics the shape of the loading content.
Empty state -- A page or panel shown when there is no content yet.

## Controls
Toggle -- A two-state control.
Switch -- A synonym for toggle. Prefer toggle.
Checkbox -- A two-state control used in lists.
Radio -- A one-of-many control.
Slider -- A range control.
Stepper -- A numeric control with plus and minus.
Combobox -- A text input with a dropdown.
Select -- A one-of-many dropdown.
Segmented control -- A row of radio buttons styled as a bar.
Chip -- A small pill-shaped label or action.
Pill -- A rounded container, often used for the active state.
Badge -- A small count or state indicator.
Tag -- A label attached to an item.
Button -- A labelled action.
Icon button -- A button with only an icon. Requires a tooltip and an aria-label.
Link -- A navigation action.
Menu -- A list of actions.
Context menu -- A menu opened by right-click or long-press.
Command bar -- A horizontal strip of actions.
Action bar -- A synonym for command bar.
Tab -- A switch between sibling views.
Accordion -- A collapsible group of sections.
Disclosure -- A control that expands or collapses a section.

## Containers
Header -- The top strip of a page or panel.
Topbar -- The wing's global header.
Footer -- The bottom strip of a page or panel.
Sidebar -- A synonym for rail. Prefer rail in new copy.
Pane -- A region of a page.
Split pane -- A pane divided into two.
Grid -- A layout of rows and columns.
Masonry -- A layout of columns of unequal heights.
Stack -- A vertical list.
Row -- A horizontal list.
Card grid -- A grid of cards.
List view -- A vertical list of items.
Table view -- A tabular list of items.
Kanban -- A columnar board.
Timeline -- A chronological list.
Feed -- A chronological stream.

## States
Idle -- The default state.
Hover -- The state when the pointer is over an element.
Focus -- The state when the element has keyboard focus.
Focus-visible -- The state when focus should be visually indicated.
Active -- The state when the element is being pressed.
Selected -- The state when the element is chosen.
Disabled -- The state when the element cannot be used.
Loading -- The state when the element is fetching.
Stale -- The state when the element's data is out of date.
Empty -- The state when the element has no content.
Error -- The state when the element failed.
Success -- The state when the element succeeded.
Warning -- The state when the element needs attention.
Skeleton -- The state when the element is a placeholder.

## Interactions
Click -- A single press and release.
Double-click -- Two clicks in rapid succession.
Right-click -- A press with the secondary mouse button.
Long-press -- A press held for a defined duration.
Drag -- Moving an element by pressing and moving.
Drop -- Releasing a dragged element.
Swipe -- A horizontal gesture on touch.
Scroll -- Moving content vertically or horizontally.
Pinch -- A two-finger zoom on touch.
Tap -- A touch press and release.
Focus trap -- Keeping keyboard focus inside an overlay.
Dismiss -- Closing an overlay.
Confirm -- Accepting an action.
Cancel -- Rejecting an action.
Rollback -- Reverting an optimistic change.
Optimistic update -- Applying a change before the server confirms.
Debounce -- Delaying an action until input stops.
Throttle -- Limiting the rate of an action.

## Design
Token -- A named value for a design decision.
Primitive token -- A raw value (#1F2937, 16px).
Semantic token -- A named decision (--color-surface, --space-md).
Component token -- A value scoped to a component (--button-padding-x).
Breakpoint -- A viewport width where the layout changes.
Density -- How tightly elements are packed.
Rhythm -- The vertical spacing pattern.
Elevation -- The perceived depth of an element.
Shadow -- The visual layer that implies elevation.
Radius -- The corner rounding of an element.
Stroke -- A border line.
Hairline -- A 1-pixel stroke.
Divider -- A line that separates two regions.
Rule -- A synonym for divider.
Accent -- The primary brand colour.
Surface -- A background layer.
Background -- The bottom-most surface.
Foreground -- The text and icon layer.
Muted -- A lower-emphasis foreground.
Emphasis -- A higher-emphasis foreground.
Contrast -- The difference in luminance between two elements.
WCAG AA -- The accessibility standard requiring 4.5:1 for text.
Motion -- The animation of elements.
Easing -- The curve of a motion.
Duration -- The length of a motion.
Reduced motion -- The user preference to minimise motion.

## Layout
Viewport -- The visible area of the browser or app.
Safe area -- The region that avoids notches and system bars.
Gutter -- The space between two columns.
Margin -- The space outside a container.
Padding -- The space inside a container.
Column -- A vertical division of the layout.
Row -- A horizontal division of the layout.
Grid track -- A row or column of a CSS grid.
Gap -- The space between grid tracks.
Container query -- A media query based on a container's size.
Fluid layout -- A layout that adapts to the viewport.
Fixed layout -- A layout with fixed dimensions.
Responsive -- A layout that responds to the viewport.
Adaptive -- A layout that changes based on conditions.

## Behaviour
Deep link -- A URL that opens a specific view.
Hash route -- A route driven by the URL hash.
Query route -- A route driven by the URL query string.
Persisted state -- State saved across sessions.
Session state -- State saved for the current session.
Ephemeral state -- State that lives only while the view is mounted.
State machine -- A formal model of allowed states and transitions.
Optimistic UI -- A UI that applies changes before confirmation.
Retry -- Attempting an action again after failure.
Backoff -- Increasing the delay between retries.
Circuit breaker -- A pattern that stops repeated failures.

## Accessibility
ARIA -- The standard for accessible rich internet applications.
Role -- The semantic meaning of an element.
Label -- The accessible name of an element.
Described by -- The accessible description of an element.
Live region -- A region that announces changes.
Landmark -- A navigational region.
Focus ring -- The visible indicator of focus.
Focus order -- The order in which focus moves.
Skip link -- A link that bypasses navigation.
Screen reader -- Software that reads the UI aloud.

## Data
Record -- A single item of data.
Field -- A single attribute of a record.
Column -- A field in a table.
Row -- A record in a table.
Index -- A data structure that speeds up queries.
Materialized view -- A precomputed query result.
Cache -- A fast copy of slow data.
Invalidation -- Removing stale data from a cache.
Pagination -- Splitting data into pages.
Cursor -- A pointer to a position in a list.
Infinite scroll -- Loading more data as the user scrolls.

## Time
Timestamp -- A recorded moment in time.
Timezone -- The local time offset.
Relative time -- "5 minutes ago."
Absolute time -- "2026-09-24 14:32 UTC."
Duration -- A length of time.
Interval -- A repeating span of time.
Cadence -- The rhythm of a repeating action.

## Quanthom
Wing -- A product under Quanthom Lumina.
Registry -- The institutional memory of the ecosystem.
The Charter -- The constitution of the ecosystem.
Highlight -- An observation of value.
Argument -- A before-to-after improvement.
Diagnosis -- A task with a stage, an assignee, and a strategy.
Flow chain -- The sequence of linked artifacts.
TRAP -- A technical research protocol.
Vertical Profile -- A profile of a discipline.
Catalogue -- The product and reward catalogue.
Competitor -- The competitor intelligence surface.
Knowledge Marketplace -- Where knowledge is bought and sold.
AME Ledger -- The credit ledger.
Trust Report -- The provenance record.
Four Marks -- Red cut, yellow hide, blue merge, purple reason.

## CSS Core
Selector -- The pattern that targets elements for styling.
Specificity -- The weight that decides which competing rule wins.
Cascade -- The algorithm that resolves conflicts between rules.
Inheritance -- Values passed from parent to child elements.
At-rule -- A statement beginning with @ (media, font-face, supports).
Pseudo-class -- A selector matching element state (:hover, :focus).
Pseudo-element -- A selector targeting a virtual part (::before, ::after).
Combinator -- The relationship between selectors (descendant, child, sibling).
Box model -- The margin, border, padding, content model of an element.
Flexbox -- The one-dimensional layout system (display: flex).
CSS Grid -- The two-dimensional layout system (display: grid).
Positioning -- The scheme that places elements (static, relative, absolute, fixed, sticky).
Stacking context -- The three-dimensional ordering of positioned elements.
Overflow -- How content that exceeds its box is handled.
Transform -- Visual geometry changes without layout reflow.
Transition -- The animated change between property values.
Keyframe -- A defined frame in an animation sequence.
Variable -- A named custom property holding a reusable value (--name).
Shorthand -- A property that sets several values at once.
Unit -- A measurement type (px, rem, em, %, vh, vw, ch).
Rem -- A unit relative to the root font size. Prefer rem over px for type.
Clamp -- A function that bounds a value between a min and a max.
Media query -- A conditional block applying styles based on device features.
Vendor prefix -- A browser-specific property prefix (-webkit-, -moz-).
Purge -- Removing unused CSS rules from the production build.
Dark mode -- A theme variant with dark surfaces and light foregrounds.

## JavaScript Core
Closure -- A function bundled with its lexical scope.
Promise -- An object representing a future value.
Async function -- A function that returns a promise implicitly.
Event loop -- The mechanism that schedules JavaScript execution.
Call stack -- The stack of currently executing functions.
Microtask -- A callback queued after the current task (promise handlers).
Callback -- A function passed to be invoked later.
Hoisting -- Declarations moved to the top of their scope at parse time.
Scope -- The region where a binding is visible.
Prototype -- The object a function inherits from.
Immutability -- Values that never change after creation.
Shallow copy -- A copy that preserves nested references.
Deep copy -- A copy that recursively duplicates nested values.
Debounce (JS) -- Delaying execution until rapid calls stop.
Throttle (JS) -- Executing at most once per time window.
Event delegation -- Handling events at an ancestor for many descendants.
Event bubbling -- Events propagating from target up through ancestors.
Event capture -- Events descending from ancestors to the target.
DOM -- The document object model; the tree of rendered elements.
Virtual DOM -- An in-memory tree diffed before applying real DOM changes.
Memoization -- Caching a function result keyed by its inputs.
Race condition -- Outcome dependent on unpredictable timing.
Abort controller -- A controller that can cancel an in-flight fetch.
Fetch -- The browser API for HTTP requests.
Mutation observer -- An API that reacts to DOM changes.
Intersection observer -- An API that reacts to elements entering the viewport.
Storage event -- A window event fired by localStorage changes in other tabs.

## Systems Design Core
Rate limit -- A cap on requests per time window.
Load balancer -- A distributor of traffic across servers.
Idempotency key -- A key that makes retries safe by deduplicating.
Sharding -- Splitting one dataset across many stores.
Replication -- Keeping copies of data across nodes.
Consistency model -- The guarantees about how replicas converge.
Eventual consistency -- Replicas converge after writes, not immediately.
Queue -- A buffer decoupling producers from consumers.
Pub/sub -- A messaging pattern with publishers and subscribers.
Webhook -- An HTTP callback triggered by an event.
Health check -- An endpoint reporting service liveness.
Graceful degradation -- Features fail to reduced versions, never to nothing.
Failover -- Switching to a backup on failure.
Observability -- The practice of measuring internal state from outputs.
Graceful shutdown -- Draining connections before process exit.
Horizontal scaling -- Adding machines. Vertical scaling -- Adding power to one machine.
