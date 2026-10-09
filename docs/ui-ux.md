# UI and UX contract

## Actions and cursor meaning

| Element                                                      | Cursor                              | Behavior                                           |
| ------------------------------------------------------------ | ----------------------------------- | -------------------------------------------------- |
| Enabled button, icon action, link, menu item, select, filter | pointer                             | Performs the labelled action                       |
| Editable or selectable text input                            | text                                | Allows caret placement or text selection           |
| Disabled control                                             | not-allowed                         | Has no action and retains its disabled semantics   |
| Busy button                                                  | progress                            | Prevents repeat submission and exposes `aria-busy` |
| Read-only status chip or static card                         | default                             | Presents information without implying an action    |
| Drag handle                                                  | grab/grabbing only when implemented | Never suggest dragging on an ordinary card         |

Use native buttons for actions and anchors with href for navigation. Give
icon-only actions explicit accessible names. Decorative icons cannot take
pointer events from the action underneath them. Do not add pointer cursors
to an entire card merely because it contains one button.

Every clickable example must actually respond, navigate, toggle, download
dummy content, or clearly open a sample flow. No ornamental controls with
fake selected states. Destructive component samples explicitly describe their
dummy scope. Applications own confirmation requirements for real deletion.

## Spacing and visual hierarchy

Buttons, chips, icon actions, menus, and row actions must be inspected live.
Check both dimensions and appearance: type baselines, icon optical centering,
label-to-icon gaps, neighboring target gaps, truncation, and wrapped text.
Phone/tablet navigation disclosures and drawer close actions have at least a
44px hit height, even when their visual icon or label is smaller. Inspect at
320/375px, tablet, and desktop. Include compact density and long labels. CSS
values alone do not establish that a control looks right.

Use the geometry in [design-system](design-system.md). Keep primary actions
easy to find in the page header; secondary actions belong near their data.
Keep large summary figures separate from page actions and form labels.

## Navigation

Selection must agree across the relevant library navigation or sample workspace sidebar, header context, and visible page. Tab arrow keys move focus; automatic activation also changes selection. Manual activation uses Enter/Space. Keep inactive
panels hidden and link each tab to its panel. A collapsed sidebar keeps names
available to assistive technology and hover titles. Mobile navigation opens
as a labelled dialog and closes after choosing a destination.

Focus mode reduces secondary context. Provide an exit action in the account
menu even when a narrow viewport hides the header's dedicated toggle.

## Forms and feedback

Use visible labels and associated hint/error IDs. Avoid using placeholders as
the only label. Invalid fields expose `aria-invalid`; errors say what to fix.
Native disabled states block the event. Switch labels toggle their control.
Keep user-entered values in the application state for the required workflow.
Show local save feedback without claiming backend persistence.

## Overlays and keyboard

Dialogs have a title, optional linked description, Ant-owned modal focus
behavior, configurable Escape/outside dismissal and a visible close action. Opening and closing keep
focus predictable. Restore the initiating control; if a changed filter removes
it, use the provider fallback. Keep content scrollable within the overlay.
Ant 6.6.5 has a bounded last-action Tab→BODY/browser-chrome observation; a
second Tab returns inside. Do not claim continuous containment. Meaningful
close/Escape opener return and child-dialog operation should be checked using
the [visual review guide](visual-review.md). Popup is nonmodal and introduces no
second trap. Menus support arrows, Home/End, Escape, and disabled items. Check portaled
controls with every theme; a body portal must not lose theme variables.

## Accessibility and product integration

Check readable contrast, focus outlines, keyboard-only operation, and reduced
motion in rendered views. Aim for at least 4.5:1 ordinary text contrast and
clear non-color state cues. The initial review is a bounded live inspection,
not a claim of a complete accessibility certification.

The library does not own permissions, billing, authentication, API contracts,
or databases. Wire those separately when integrating a product. Never place
real customer records in the component playground.

## Composition and content hierarchy

Mosaic uses soft bento sidebar, header and body modules. Orbit emphasizes its
compact dock; Canvas emphasizes an editorial work surface; Flow emphasizes the
board canvas. Theme changes identity, composition changes arrangement; do not
couple either to product records. Keep one clear page heading, nearby primary
actions, then summaries/content. Template primary and aside tracks stack at
1100px. Boards and media grids wrap; adaptive data tables become labelled record cards on mobile; explicit comparison
mode retains labelled internal horizontal scrolling.

## Scroll and overlay surfaces

Let the document own ordinary page scrolling. Navigation pods, table regions,
message history and overlay bodies own only their local overflow. Keep scroll
regions reachable by keyboard and labelled when their content needs independent
navigation. Avoid nested full-height containers that trap mobile scrolling.
Open chat at the intended message position in the app; the library does not
invent a scroll restoration or conversation pagination policy.

Modal means a bounded decision; drawer means adjacent details; menu means short
actions; notification means contextual feedback. Put long forms in scrollable
content, keep closing reachable, and keep the initiating action visible where
possible. Portaled controls inherit provider tokens. Do not add a second
provider just to fix a popup. Async actions show busy while the application
owns retry/error decisions; prevent duplicate submissions.

## Purposeful motion

Use restrained color/opacity transitions for state feedback and existing shell
entry/collapse transitions for orientation. Avoid repeated decorative motion
on static data. Reduced motion removes travel and repetition and uses 0s global
transition duration so Ant popup measurements remain stable. Never blanket
replace it with 0.01ms. Inspect focus after the next animation frame and wait
for locally bundled fonts before judging optical alignment.

## Template interaction guide

Tables/lists expose data controls near their records. Board move controls have
clear labels and searchable destination choices; no card is labelled draggable
without a real drag implementation. Inbox draft state is controlled by the app;
empty messages are blocked and sending exposes busy. Feed reactions expose
pressed state and a count. Content editing separates edit/preview modes, and
preview text never needs unsafe HTML. Media items open actual local details.
Wizards retain draft values in the app, block invalid Next, and provide Back.
Focused-tool stage slots keep controls near the stage without claiming engine
behavior. Public/client action labels reflect the app’s real scope.

## Review scope

Check 320/375px phone, 768px tablet and desktop, both density modes, theme/mode
changes, custom accent, long labels, disabled/busy/read-only states and focus
return. Appearance controls belong in the labelled header dialog on every screen size. Record which
families and states were actually checked. Do not infer complete AA compliance
or target-product proof from the standalone sample.

## Library browsing and shared shell scrolling

The standalone library opens on Overview. Its single 64px opaque header links
Components, Templates and Examples; Appearance contains all provider controls.
Components use grouped atomic browsing and a focused live preview, public import
usage code and prop guidance. The desktop browse rail scrolls locally; below
900px it is a labelled drawer. Templates provide 17 categorized/searchable
families and URL-addressable live examples. Business, Console and Client remain
interactive application samples with shared fictional state across navigation.

Hash routes (`#/components/button`, `#/templates/board`, `#/examples/crm`)
support direct entry and browser back/forward. Route changes deliberately restore
the window to the top and focus the new heading; local section links reveal and
focus their section below the header. The document remains the vertical scroll
owner. Scrolling down past the opening viewport tucks the library navigation
above the page so it cannot cover headings or cards; scrolling up reveals it
again. A focused navigation control keeps the header visible, and a tucked
header is inert until it returns. Reduced-motion users get the same state change
without a slide. Gallery/search filters are transient preview state, not
application data.

BentoShell sticks its header wrapper at `--ku-chrome-height` (default 0px).
The 20/16/12px desktop/tablet/phone top spacing is inside that opaque canvas
wrapper, with 12px below it; the spaces between bento modules therefore cannot
reveal scrolled text. No new scrolling root or public prop is introduced.
Consumers must set their actual external sticky chrome height and account for
the bento header in anchor/focus scroll margins. The playground demonstrates
64px external chrome while its navigation is visible, then moves the sample
header to the viewport top while the library navigation is tucked away.

## Composite focus and action content

Select, SelectField and ChoiceSelect draw the visible keyboard focus cue around
the whole field, including multiple-selection search with a narrow inner input.
Do not add a second inner outline. Standalone Input retains its own cue. A static
Chip remains informational; within a semantic action it inherits that action's
pointer, disabled or busy cursor while the parent owns callback and hit area.

ChoiceSelect's Retry/create/footer controls stay in persistent normal Tab order,
outside the transient options list. Ant may commit an active option on the first
Tab; the next reaches the footer. Escape then Tab reaches it without committing.
For a separate anchored trigger use public Popup and `initialFocusRef` with
`ChoiceSelectRef` or InputRef. Omit premature child autoFocus; post-placement
focus uses preventScroll. Current placement is start/end; centered narrow-anchor
edge placement is proposed and needs separate qualification.

Use the 4px spacing rhythm and 44px primary targets from [geometry](design-system.md#geometry).
Inspect top/middle/end scrolling, opaque canvas across bento chrome gaps, wrapped
labels, neighboring targets and reduced motion. The library's bounded native
zoom check does not replace actual-product state/overlay/keyboard review.

## Experience contract additions

See the [loading, recovery and device experience guide](experience.md) for the
public skeleton/busy/safe failure contracts, shared 640/1100 device seams,
record-card and tablet priority compositions, one-pane inbox, task forms/dialogs,
manual tabs and guarded shortcut disclosure. The discoverable Experience
catalog and Storybook examples demonstrate fictional cold reads, Query v5 memory
cache, delayed pointer/keyboard intent and cancellable local file transfers.
The package exposes reusable skeleton, busy and safe-failure primitives; the
cache, preload and transfer examples are application patterns backed only by
fictional local data. Product integration, persisted-cache review, real server
downloads, transport error mapping and route-specific document-head rendering
remain application-owned work. The guide provides consumer snippets and user
stories for each pattern, with an explicit statement of what the local example
does and does not do.
