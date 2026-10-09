# Loading, recovery and device experience

This documents the reusable package contracts and application-owned patterns.
Consumers must install a version containing the required exports and verify
their own runtime. The examples do not establish product adoption,
authenticated behavior or production cache correctness.

## Public composition

`ContentSkeleton` is a molecule built from the existing Ant Skeleton atom.
Choose `page`, `metric`, `card`, `table`, `list`, `form` or `inbox`; shapes are
decorative. `BusyBoundary` owns one status region and `aria-busy`. Cold reads
replace unavailable content with approximate geometry. `keepContent` keeps
cached controls and their focus mounted during refresh, with a small update
indicator. Supply skeletons only for unavailable slots. Do not reset a form
or replace authorized cached content because a background request started.
Buttons keep their measured geometry and accessible label while busy; their
progress overlay and disabled semantics prevent duplicate submissions.

`TemplateFrame` selects these states. Form, collection and inbox templates
choose a family skeleton. `DataTable` uses a table skeleton on a cold empty
read and keeps populated rows during background refresh. An empty result is
not loading. `FeedbackState` distinguishes empty, offline, permission denied
and success. Cancellation is a neutral application-owned transition.

```tsx
import { TemplateFrame, type SafeFailure } from "@kooyaph/ui";
const failure: SafeFailure = {
  publicCode: "RESOURCE_UNAVAILABLE",
  codeSource: "server",
  httpStatus: 503,
  recovery: "retry",
  supportReference: "PUBLIC-123",
};
<TemplateFrame title="Records" state={{ status: "error", failure, onRetry }} />;
// Background failure retains content:
<TemplateFrame title="Records" state={{ status: "ready", failure, onRetry }}>
  <Records />
</TemplateFrame>;
```

The application maps unknown errors through its own allowlisted public codes.
The library never accepts an unknown Error as public prose. `ErrorState`
validates code/reference shape, HTTP integer range 100–599, and recovery enum;
its friendly copy is library-owned. Do not pass internal codes or identifiers
merely because their format validates. `recovery` is `retry`, `sign-in`,
`request-access`, or `check-state`; only retry displays the retry callback.
Sign-in/access navigation belongs to the application. Ambiguous writes require
checking current state before replay. No automatic mutation replay is added.

Missing/unrecognized code falls back to the explicitly client-assigned
`UI_REQUEST_FAILED`. Missing/invalid HTTP status says **HTTP status unavailable**;
missing metadata does not establish whether a response occurred. Never invent 0 or 500. An absent support reference is omitted. Error instances,
message/detail/stack/body/cause/URLs are not rendered. Legacy
`TemplateState.message` on errors and `FormTemplate.error` remain accepted for
source compatibility but their text is deliberately ignored and deprecated.
Migrate to `failure`; arbitrary legacy prose is not trusted public copy.
Local field validation still belongs to the application and must use reviewed
friendly text. This is a visible behavior change, not a raw-message fallback.

Map errors at the application transport boundary. Only a reviewed code mapper
may choose `publicCode`; only a real response may provide an HTTP status. A
rejected fetch has a safe client code and no HTTP status:

```ts
import type { SafeFailure } from "@kooyaph/ui";

function toSafeFailure(response?: Response): SafeFailure {
  const status = response?.status;
  const hasHttpStatus =
    Number.isInteger(status) && status! >= 100 && status! <= 599;
  return {
    publicCode: mapReviewedPublicCode(status),
    codeSource: response ? "server" : "client",
    ...(hasHttpStatus ? { httpStatus: status } : {}),
    recovery: recoveryForReviewedStatus(status),
  };
}
```

`mapReviewedPublicCode` and `recoveryForReviewedStatus` are application-owned
allowlists. Never pass `response.statusText`, response bodies, exception
messages or arbitrary server codes into UI copy. If status is missing or
invalid, the component says it is unavailable; do not substitute 500.

## Devices and state ownership

`deviceBreakpoints` and `useDeviceMode` declare mobile <=640px, tablet
641–1100px, desktop >1100px. A single shared media subscription supplies the
mode, without user-agent device detection. SSR begins desktop and hydrates to
the viewport. Matching library CSS uses the same seams. Custom consumer
breakpoints must be reconciled by that app; no product stylesheet was edited.

| Family        | Desktop                                 | Tablet                                                                   | Mobile                                                                                   |
| ------------- | --------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Shell         | Full bento sidebar/header/body          | Compact labelled-icon rail; drawer shows full labels                     | Compact route module and labelled navigation drawer                                      |
| Table         | Semantic comparison columns             | `priority: 'secondary'` fields move below priority fields in each record | Labelled record cards; original detail/action controls visible at card end; filter panel |
| Dashboard     | Metrics, primary work and context aside | Two metric columns; context below primary                                | Urgent `priority` slot before metrics; context disclosure                                |
| Form/settings | Form and preview/context                | Section navigation above one main column; explicit preview               | One field column, section disclosure, preview and reserved task actions                  |
| Inbox         | Conversation list and thread            | Narrow list plus thread                                                  | One active pane with Back to conversations                                               |
| Task dialog   | Centred bounded surface                 | Bounded surface                                                          | `mobilePresentation='task'` fills viewport with contained body and reachable footer      |

`DataTable` retains one Ant engine and one set of mounted row controls. It
preserves controlled/uncontrolled sort, filter, selection/getCheckboxProps,
pagination, disabled controls, onRow and onChange. Mobile is a labelled card
presentation of those semantic records, not a horizontally scrolled desktop
table. Tablet priority fields must be declared by the consuming app; unknown
column importance is not guessed. `mobileLabel` provides plain field names
for decorative titles. No interactive title is duplicated inside record cells.
Use `filters` for a labelled filter disclosure. `presentation='comparison'`
explicitly retains labelled contained horizontal scrolling where comparison
requires it. Row action visibility and meaningful permissions remain app-owned.

`WorkspaceSidebar.presentation='expanded'` supplies full navigation in a
drawer; auto mode uses the tablet rail. `BentoShell` accepts controlled
`navigationOpen`, `onNavigationOpenChange` and `navigationTitle`, or the app
may keep its existing drawer owner. Mount one active navigation surface.
`WorkspaceHeader.searchShortcut` is disclosure only and `onShortcutHelp`
provides a labelled keyboard help action. Apps bind keys and use
`isEditableTarget(event.target)` to avoid stealing input/textarea/select,
contenteditable or combobox typing. Platform copy should show Command on macOS
and Ctrl on other platforms only when those handlers really exist.

Inbox uses one controlled draft, selection and message owner. Its two stable
pane containers use `hidden` so only one participates in mobile accessibility;
there is never a second composer or live log. `mobilePane` and
`onMobilePaneChange` can control navigation. Form fields and modal content are
not replaced just because viewport mode changes. Task dialogs retain the
existing Ant focus owner and conditional teardown guards. Ant's documented
bounded Tab containment limitation remains; do not add a second focus trap.

## Keyboard, appearance and content

Tabs immediately precede their panel. `orientation` chooses horizontal
Left/Right or vertical Up/Down arrows; Home/End jump to enabled endpoints.
`activation='manual'` moves focus without loading a panel until Enter/Space.
Automatic activation is for immediately available content only. The Experience
catalog uses manual activation. Menus/overlays retain Escape and focus return.

Use semantic 4px rhythm, 8/12/16px control/module gaps, 16px small-screen card
padding and 44px primary targets. Phone/tablet navigation disclosures and
drawer close actions retain a 44px hit height. Enabled actions use pointer,
disabled actions not-allowed, busy actions progress, inputs text, informational
chips default.
Focus/selected/pressed must be distinguishable; hover conveys no exclusive
meaning. Theme, provider branding, font and light/dark options remain available.
Consumers own a system color preference adapter. Reduced motion uses zero
transition duration (including popup measurement nodes), disables repeating
skeleton travel, and preserves state feedback. Forced-colors adds structural
cues; consumers must qualify custom palettes and actual OS high contrast.

Meaningful images get contextual alternatives; decorative images use `alt=""`.
Functional images describe the action. Avoid repeating adjacent visible text.
Charts need a text/table alternative. Never use a filename as the only image
alternative. Metadata is public page identity, never private account/record
information. Consumer HTML can include this public-only example:

```html
<title>Kooya workspace</title>
<meta name="description" content="A workspace for your team's everyday work." />
<meta property="og:type" content="website" />
<meta property="og:title" content="Kooya workspace" />
<meta property="og:description" content="A workspace for everyday work." />
<meta property="og:url" content="https://example.com/" />
<meta property="og:image" content="https://example.com/public-share.png" />
<meta property="og:image:alt" content="Kooya workspace product overview" />
```

## User stories and implementation snippets

| User story                                                                         | Experience the interface should provide                                                                                               |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| While a page is opening, I want to recognize its structure and know it is loading. | Show a page-shaped skeleton once; retain already-authorized content during refresh.                                                   |
| When a request fails, I need a safe reason and a way forward.                      | Show a reviewed public/UI code and a valid HTTP status when one exists. Never print exception, response body, stack or internal code. |
| When I return to a record, I want current work to remain visible.                  | Reuse the app query cache, show a quiet refresh state, and clear protected queries before changing identity or organization.          |
| If I point to or focus a likely destination, I want it to open promptly.           | Delay speculative reads, cancel pending intent on leave/blur, and skip offline or data-saving connections.                            |
| While a file prepares, I want to keep working and still be able to cancel it.      | Keep the task in a persistent app owner, report honest progress, and keep Cancel reachable while the task runs.                       |
| I need to understand controls and images without guessing.                         | Keep labels, tab order, keyboard behavior, focus, and image alternatives explicit.                                                    |

The Experience screen in the playground and its Storybook story show each story
with an expected behavior, working controls, a code fragment and a clear limit.
The fragments use consumer-owned names such as `queryClient`, `readBrief` and
`readStream`; they demonstrate the wiring and are not standalone exports from
the UI package.

### Cache and delayed intent

Reuse the consuming app's Query v5 client and include the effective identity and
organization in protected-data keys. Do not add a second cache inside the UI
package.

```tsx
const key = ["brief", organizationId, effectiveAccountId] as const;
const brief = useQuery({
  queryKey: key,
  queryFn: ({ signal }) => readBrief(signal),
  staleTime: 30_000,
});

const intent = useRef<number | undefined>(undefined);
const warmOnIntent = () => {
  window.clearTimeout(intent.current);
  if (!navigator.onLine || connection?.saveData || isSlowConnection(connection))
    return;
  intent.current = window.setTimeout(() => {
    void queryClient.prefetchQuery({
      queryKey: key,
      queryFn: ({ signal }) => readBrief(signal),
    });
  }, 150);
};
const cancelIntent = () => window.clearTimeout(intent.current);
```

Attach `warmOnIntent` to `onPointerEnter` and `onFocus`, and `cancelIntent` to
`onPointerLeave` and `onBlur`. The query cache deduplicates a later read; leave
only cancels the timer and does not claim an already-started request was stopped.

### Background transfer task

Keep task state and its `AbortController` above routed page content. The UI
package supplies progress and safe failure presentation; the app owns the real
response stream, progress units, permissions, cancellation and download handoff.

```tsx
const controller = new AbortController();
const blob = await readStream(controller.signal, (loaded, total) => {
  setProgress(total ? loaded / total : undefined);
});
if (!controller.signal.aborted) setReadyFile(blob);
// Cancel when the user cancels or its identity/organization scope is lost.
controller.abort();
```

Use an indeterminate progress state when the response length is unknown. Revoke
created object URLs on replacement and teardown. Keep the same task action
mounted when it changes from Cancel to Dismiss so keyboard focus is stable. Say
“Sent to browser” after handing off a file; browsers do not report whether it
finished saving to disk.

### Tabs, shortcuts and image alternatives

Place `Tabs` directly before its selected panel. Horizontal tabs use Left/Right;
vertical tabs use Up/Down; Home/End reach enabled endpoints. Manual activation
waits for Enter/Space before changing the panel.

```tsx
<Tabs
  label="Record sections"
  value={activeTab}
  options={[
    { value: "overview", label: "Overview" },
    { value: "activity", label: "Activity" },
  ]}
  onValueChange={setActiveTab}
>
  {activeTab === "overview" ? <Overview /> : <Activity />}
</Tabs>
```

Global key handlers belong to the app. Guard editable and combobox targets so
typing never triggers navigation or search:

```tsx
useEffect(() => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "k")
      return;
    if (isEditableTarget(event.target)) return;
    event.preventDefault();
    openSearch();
  };
  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
}, [openSearch]);
```

Use a contextual alternative for meaningful images and an empty alternative
for decoration. Do not repeat adjacent visible copy:

```tsx
<img src={teamPhoto} alt="Maya and Alex reviewing the launch plan" />
<img src={dividerTexture} alt="" aria-hidden="true" />
```

## Working examples and integration limits

Open **Experience** in the catalog or **Experience / Working examples** in
Storybook. Every example includes controls, a user story, usage snippet,
expected behavior and limits. Business/Console/Client and 17 template families
remain available. All example records are fictional; examples perform no
external API or realtime requests.

- **Cold loading:** a 650ms local read shows a structural skeleton, controlled
  failure, safe code and working retry. The current local demo shows
  `UI_DEMO_FAILED` and an illustrative **HTTP 503**; no network status is
  fabricated or returned by a server. Failures without valid response metadata
  explicitly say **HTTP status unavailable**.
- **Warm cache:** playground-only TanStack Query **5.101.4** memory uses a
  30-second stale time, warm revisit and explicit invalidation. Refresh retains
  cached content and a live note field. Fictional identity replacement clears
  queries and cancels scoped transfers. Closing that record intentionally
  discards its unsaved local note. No query persistence is added.
- **Intent preload:** a 150ms hover/focus delay warms one deduplicated local
  query. Leave/blur cancels pending intent; offline, data saver and known slow
  connections suppress speculation. Feature detection keeps navigation usable.
  Reset is explicit. Started imports cannot be aborted; cleared intent is not
  a claim that already-started network/module work stopped.
- **Background transfer:** explicit local timed chunks produce a fictional
  Blob, with progress, failure/retry and real cancellation before final commit.
  Its owner sits above route content, so navigation within this open demo keeps
  the task and Cancel reachable in a normal-flow status row below the library
  navigation and above route content. The row scrolls with the document and
  never covers page copy. The same task action stays mounted as it changes from
  **Cancel transfer** to **Dismiss status**, so it does not drop keyboard focus
  when the task reaches a terminal state. Cancelling does not force focus back
  after a user tabs elsewhere. Dismissing a completed or failed task returns
  focus to the route heading.
  Progress units are illustrative, not network bytes. The failure uses a safe
  public code and a clearly labelled example HTTP 503; it is not a response
  from a server. Scope change cancels/discards. URLs are revoked on replacement
  and owner teardown. Ready and Sent to browser do not claim disk-save
  completion.

For product integration reuse the existing Query v5 client/key factories,
transport AbortSignal, permissions and error mapper. Map failures to an
allowlisted user-safe code and preserve only a validated HTTP status; never
render server detail or invented status values. Use structural skeletons for
cold reads and keep authorized cached content during ordinary refreshes.
Partition by organization and effective identity/session generation;
cancel/remove protected queries before replacement and prevent stale
completion from reappearing. Apply a freshness/invalidation policy to each
query. Existing product persistence must be audited separately; these demos
neither remove nor qualify it. Do not persist credentials, protected bodies or
export blobs in browser storage.

Real downloads need application-owned task scope, actual response lengths or
honest indeterminate bytes, stream cancellation, bounded size and URL cleanup.
Browser save completion, tab-close survival and server export cancellation are
not promised. No required Background Fetch infrastructure or new endpoint is
introduced. Selected Console platform account/organization and Headquarters
people/database/settings slices now use safe error, cache and skeleton patterns
in the isolated adoption branch. The remaining product route families,
downloads and route-specific metadata still require migration and qualification;
the playground does not establish product-wide coverage.

### Focus during device transitions

An engaged table filter stays expanded when resizing into tablet/mobile. Table
cards retain the same Ant scroll engine, original cell nodes, drafts and actions.
Inbox transitions move focus from a newly hidden pane to the visible pane; leaving
mobile while Back is focused prioritizes the existing enabled composer before thread
actions; if no composer is enabled, it focuses the named Conversation thread region. External dialog
focus is left alone. A sidebar link hidden on mobile transfers focus to the header
navigation trigger (or the shell main region when a custom header has no trigger).
