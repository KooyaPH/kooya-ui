# Component catalog

Public exports live in `packages/ui/src/index.ts`; their generated declarations
ship with the package. Standard native props and refs are available on Button
and IconButton. Components have `ku-` scoped classes.

| Category    | APIs                                                   | Contract                                                                             |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Atoms       | `Button`, `IconButton`, `Chip`, `FilterChip`, `Avatar` | Native actions, explicit disabled/busy states, stable icon alignment                 |
| Layout      | `Card`, `PageHeading`, `MetricCard`, `BentoShell`      | Shared module geometry; cards stay noninteractive unless they contain an action      |
| Navigation  | `WorkspaceSidebar`, `WorkspaceHeader`, `Tabs`, `Menu`  | Controlled selection, semantic navigation, linked tab panels, keyboard menus         |
| Data        | `DataTable<Row>`                                       | Generic columns and row keys, native table semantics, contained scrolling            |
| Forms       | `TextField`, `SelectField`, `Switch`                   | Visible/associated labels, controlled values, hints/errors, native disabled behavior |
| Overlays    | `Dialog`, `Drawer`, `Popup`                            | Ant-owned modal focus behavior; nonmodal Popup; Escape and focus return              |
| Themes      | `KooyaProvider`, `themes`, `themeVariables`            | Scoped semantic variables and independent density                                    |
| Ant adapter | `KooyaAntProvider`, `antTheme`                         | Compatibility alias at `@kooyaph/ui/antd`                                            |

## Common API examples

```tsx
<Button variant="primary" leadingIcon={<Plus />} loading={saving} onClick={save}>
  Add organization
</Button>
<IconButton label="More actions" onClick={openActions}><MoreHorizontal /></IconButton>
<Chip tone="success" icon={<Check />}>Published</Chip>
<FilterChip selected={filter === 'draft'} onClick={() => setFilter('draft')}>
  Drafts
</FilterChip>
<TextField label="Workspace name" value={name} onChange={e => setName(e.target.value)}
  hint="A name your team recognizes." error={error} />
```

Button variants: primary, secondary, ghost, danger. Sizes: sm, md, lg.
Icons are React nodes; applications choose their icon set. IconButton requires
an accessible `label`. Chip tones: neutral, success, warning, danger, accent. A Chip
is a status label; FilterChip is a toggle button with `aria-pressed`.

```tsx
<Dialog
  title="Edit page"
  description="Change the sample content."
  trigger={<Button>Edit page</Button>}
>
  <TextField
    label="Page title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
</Dialog>
```

Dialog accepts `open`, `onOpenChange`, `footer`, and `kind` for controlled
workflows. Prefer its `trigger` when available. A controlled dialog without a
trigger records the initiating focus target; when that target is removed,
focus returns to its provider. Menus accept a trigger and items with label,
onSelect, optional icon, disabled, and danger.

DataTable accepts `label`, `rows`, `rowKey`, `columns`, `minWidth`, and an empty
message. Each column has a stable key, title, and render callback. Sorting is opt-in per column via `sorter`; optional Ant `pagination`,
`rowSelection`, `loading`, and `onChange` contracts are passed through. Server
filtering and persistence remain application responsibilities. Stable row/column
keys retain cell state and focus across parent updates, including label changes.

BentoShell accepts sidebar/header/children, composition, collapsed, focus, and
`mainId`. Its focus mode hides elements explicitly marked
`ku-context-column`; every consuming shell must keep a way to exit focus at
all screen sizes. WorkspaceSidebar accepts generic groups/items and a
controlled selected ID. Captions (`workspaceSubtitle`, `navTitle`,
`profileSubtitle`) and `profileName` come from the application; omitting a
profile hides its pod. An item with `href` renders an anchor. `renderLink(item,
anchorProps)` can adapt that anchor to a product router; preserve its children,
name, current-page state, and native href semantics. Local preview actions
use items without href and the `onSelect` callback. Selection scrolls only
within the navigation pod, keeping the page position stable.

WorkspaceHeader accepts `navigationLabel` for an explicit mobile drawer action
and optional focus/notification/account slots. Its tracks follow the supplied
slots. Keep product records and routing in the application.

KooyaProvider accepts `theme`, `density`, `composition`, `mode`, `branding`,
`reducedMotion`, `fontFamily`, native div props, and inline style overrides. Named theme values, fontFamily, density, and inline
`--ku-*` tokens also reach menus and dialogs. Other inline layout styles do not
propagate to portals.

Typed presentational templates ship from `/templates`; their fictional data and
working state examples remain in the playground. See [template APIs](templates.md).

## Atomic modules and additional controls

- Foundations: provider, theme schemes, branding/contrast helpers and contextual
  feedback. Ant 6.6.5 is required; no optional parallel native/Radix controls.
- Atoms: Button, IconButton, Chip, FilterChip, Avatar, Checkbox, RadioGroup,
  Skeleton, Progress, Tooltip, Input, TextArea, Select.
- Molecules: TextField, SelectField, Switch, NumberField, DateField, Card,
  PageHeading, MetricCard, Menu, Tabs, Pagination, Breadcrumb, RowActions,
  ChoiceSelect, Popup.
- Organisms: DataTable, List, Dialog, Drawer, BentoShell, WorkspaceSidebar,
  WorkspaceHeader.

SelectField uses a searchable Ant combobox. The existing event-based onChange
and native FormData contract use a hidden, noninteractive form bridge; the
visible control is always Ant. New callers can use `onValueChange`. It supports
controlled/default values, disabled options, form reset and required validation.
After an uncanceled native reset, the bridge and visible selection reconcile in
the next task: controlled fields retain `value`; uncontrolled fields return to
`defaultValue` (or the first option). Reset does not emit change callbacks.
NumberField and DateField retain Ant value/onChange types (DateField uses Dayjs).
Checkbox accepts a visible `label`; RadioGroup accepts an accessible `label`
and Ant `options`. The additional presentation controls retain Ant props. List wraps Ant 6.6.5
Listy with `items`, `rowKey`, `itemRender` and an accessible `label`.

Tabs preserve automatic arrow-key selection and linked panels, including nested
area/section tabs. Dialog's description bridge compensates for Ant 6.6.5 not
forwarding `aria-describedby` to the dialog panel. Overlays restore initiating
focus or the provider root when an initiating element was removed.

## Composable form primitives

`Input` and `TextArea` accept Ant props and InputRef/TextAreaRef respectively;
no wrapper label is generated. Associate an external label using `htmlFor/id`,
or pass a meaningful aria-label. `Select<Value>` accepts Ant SelectProps<Value>
with searchable options when showSearch is supplied. It does not create the
native form bridge used by SelectField. Register raw Select with your consuming
form framework or serialize its controlled value explicitly. New forms that
want the labelled, event/FormData-compatible contract should use SelectField.

```tsx
<label htmlFor="summary">Summary</label>
<Input id="summary" value={summary} onChange={e => setSummary(e.target.value)} />
<label htmlFor="body">Body</label>
<TextArea id="body" rows={6} value={body} onChange={e => setBody(e.target.value)} />
<Select aria-label="Delivery" showSearch value={delivery} onChange={setDelivery}
  options={[{value:'daily',label:'Daily'},{value:'weekly',label:'Weekly'}]} />
```

## API and state matrix

| API                             | Application input/callback                                                       | States and accessibility                                                                                                    |
| ------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Button / IconButton             | Native button props/ref; Button variant/size/icons; IconButton label             | disabled, loading (Button), aria-busy, focus; default Button type=button; explicit submit in forms                          |
| Chip / FilterChip               | tone/icon; selected + native action                                              | Chip static; FilterChip aria-pressed; disabled via native props                                                             |
| Avatar                          | name                                                                             | Decorative initials; pair with visible identity                                                                             |
| Input / TextArea / Select       | Ant control props; external labels                                               | controlled/default values, disabled/readOnly where supported; app owns hints/errors/form registration                       |
| TextField                       | native input props + label/hint/error/icon                                       | aria-invalid + associated description; native value/defaultValue/FormData                                                   |
| SelectField                     | options, value/defaultValue, onChange/onValueChange, searchable                  | searchable combobox, disabled options, required validation, hidden native form value/reset                                  |
| Switch / Checkbox / RadioGroup  | checked/value + callback, label                                                  | controlled checked/selection, disabled and keyboard support                                                                 |
| NumberField / DateField         | Ant props + label                                                                | numeric/Dayjs values, disabled, keyboard; Ant callback types                                                                |
| Progress / Skeleton / Tooltip   | Ant props                                                                        | name Progress with aria-label or aria-labelledby; loading placeholder, focus/hover help; keep essential information visible |
| Card / PageHeading / MetricCard | children/actions/title/description; label/value/detail                           | Static semantic modules; action state supplied by child controls                                                            |
| Tabs                            | options, value, onValueChange, children                                          | selected/disabled, linked panel, automatic arrows/Home/End                                                                  |
| Menu / RowActions               | trigger (Menu), labelled items + onSelect                                        | open, disabled/danger items; arrows/Home/End/Escape; labelled trigger                                                       |
| Pagination / Breadcrumb         | Ant props                                                                        | controlled pagination; supplied breadcrumb semantics/links                                                                  |
| DataTable<Row>                  | label/rows/rowKey/columns, optional sorter/pagination/selection/loading/onChange | empty/loading, sorting and selection; labelled table and contained scroll region                                            |
| List<Row>                       | Ant Listy props + label                                                          | labelled region, itemRender and stable rowKey; app empty/error content                                                      |
| Dialog / Drawer                 | title/description/trigger/open/onOpenChange/footer                               | Ant modal focus behavior (bounded Tab advisory below), Escape, close, scroll, focus return                                  |
| BentoShell                      | sidebar/header/children/composition/collapsed/focus/mainId                       | controlled layout; app supplies skip link, mobile drawer and focus exit                                                     |
| WorkspaceSidebar                | brand/name/groups/selected/onSelect/renderLink/profile slots                     | current page, collapsed titles, native href/router semantics, local pod scrolling                                           |
| WorkspaceHeader                 | name/area/title/navigation/search/focus/notifications/account                    | named navigation and icon actions, responsive slots                                                                         |
| KooyaProvider                   | theme/composition/density/mode/fontFamily/branding/reducedMotion/style           | scoped CSS + Ant context and themed overlay container                                                                       |
| useKooyaFeedback                | contextual message/notification/modal APIs                                       | provider-aware feedback, application success/error decisions                                                                |
| Templates                       | typed data/slots/callbacks; TemplateState                                        | ready/loading/error, family-specific empty collections; app persistence/authorization                                       |

`ChoiceSelect` accepts string ID options and single/multiple controlled values,
plain labels and optional rich display. Its loading/error/footer states are
persistent siblings of the combobox; retry/create actions stay keyboard reachable.
`Popup` accepts a real trigger, label, controlled/default open state, start/end
alignment and `initialFocusRef`; it is nonmodal. See the public composition and
working ref example below. Both are supported public APIs.

State stories are examples of these contracts, not an assurance that every
possible permutation is tested. Source declarations remain authoritative for
optional Ant props. Review [UI/UX](ui-ux.md) and [live review](visual-review.md)
for cursor, focus and geometry requirements.

## Data table and overlay options

`Column<Row>.title` accepts a React node, including a stateful header control.
Optional `align` (`left`, `center`, `right`), `className`, `fixed` (`left`, `right`)
and existing `width` use Ant's public column contract. `DataTable.onRow` is typed
as `TableProps<Row>['onRow']`: applications can supply row labels, tabIndex,
pointer and keyboard handlers without replacing the stable table components.
Applications own activation semantics and suppression when an inner control
handles an event; handle Enter/Space explicitly for a keyboard activated row.

`Dialog` and `Drawer` add optional `dismissible` (default true),
`showCloseButton` (default true), `closeLabel` (default "Close"),
`width` (number or CSS string), `labelledBy`, `describedBy`, `className`, and
`bodyClassName`. `title` accepts a React node and can be omitted when a real
external heading supplies `labelledBy`. Modal defaults retain Ant's width;
drawer defaults remain 480px and navigation 344px. Width uses Ant's public
modal width/drawer size API; mobile containment remains active. Caller classes
are added to `ku-modal`/`ku-drawer` and `ku-overlay-body`.

`dismissible={false}` blocks Escape, backdrop and the close icon. Application
controls can still close a controlled dialog through `open`/`onOpenChange`.
`showCloseButton={false}` hides only the close icon: Escape and backdrop remain
available when dismissible. Prefer an explicit completion action for required
workflows. These options preserve the component defaults.

External `labelledBy`/`describedBy` override generated title/description
references. Applications must render real, unique IDs with meaningful heading
and description text while the overlay is open; props alone cannot supply an
accessible name. Updates to IDs or referenced text take effect while open.
Removing external references restores generated references when the title or
description exists. Ant 6.6.5 Modal omits these external ARIA attributes on its
panel, so an owned content ref synchronizes only `aria-labelledby` and
`aria-describedby` on the enclosing native `role="dialog"`; no Ant internals,
focus engine or events are replaced. This bridge also runs on mount/reopen.

```tsx
<Dialog
  labelledBy="record-title"
  describedBy="record-help"
  width={720}
  showCloseButton={false}
  trigger={<Button>Edit record</Button>}
>
  <h2 id="record-title">Edit record</h2>
  <p id="record-help">Review changes before saving.</p>
  <TextField label="Record name" />
</Dialog>
```

See Storybook's Row Activation and External Dialog Heading for interactive
examples. Provider scoping, focus return, reduced-motion 0s and native select
reset reconciliation remain the same contracts.

## Menu and popup composition

`MenuProps` preserves `label`, `trigger`, `items` and `align`. It adds `open`,
`defaultOpen`, `onOpenChange` and `onClose`. `open` is authoritative; callbacks
request changes and run once per interaction. `onClose` reports a close request,
not confirmation that a controlled parent accepted it. Keep the actual trigger
mounted and pass it to Menu; domain state identifies which conversation is open.
An item is a legacy action (`label`, `onSelect`, optional icon/disabled/danger/key),
a submenu (`label`, `children`, optional icon/disabled/key), or `{type:'divider'}`.
Actions can set `checked` to expose `menuitemradio`/`aria-checked`.

Ant owns active-level arrow/Home/End navigation, submenus, placement and outside
handling. The owned keyboard boundary cancels only Enter's browser default,
preserving Ant selection and event propagation. It prevents a newly focused
modal Close button from receiving the same Enter's default click. Space is
unchanged. Closing restores the trigger before action callbacks so a callback
can open an overlay or explicitly focus another destination. ArrowRight/Left
enter/leave the active submenu. Escape closes the whole action menu and returns
to its connected trigger, including when focus is in a portaled submenu.

```tsx
<Menu
  label="Conversation actions"
  open={open}
  onOpenChange={setOpen}
  trigger={<Button>Conversation actions</Button>}
  items={[
    { label: "Archive", onSelect: archive },
    {
      label: "Mute",
      children: [
        { label: "For 8 hours", onSelect: muteEightHours },
        { label: "For 1 week", onSelect: muteOneWeek },
        { label: "Always", onSelect: muteAlways },
      ],
    },
    { type: "divider" },
    { label: "Delete", danger: true, disabled: !canDelete, onSelect: remove },
  ]}
/>
```

`SelectField.filterOption(query, option)` is optional and typed with
`SelectFieldOption` (`value`, plain string `label`, optional `disabled`). It runs
through Ant's public search configuration when `searchable` is true. Omission
keeps default label matching; `searchable={false}` disables search. Value/change,
FormData, reset, required and disabled behavior retain the native form bridge.
Timezone aliases, offset normalization and locale rules belong to the caller.

`ChoiceSelect` is an owned Ant choice control with plain `label`/accessible text
separate from optional rich `display` in each `ChoiceOption`. Values are string
IDs. `multiple` discriminates `string[]` values/callbacks from single strings.
It accepts controlled `open`/`onOpenChange`, `defaultOpen`, `searchValue`/`onSearch`,
`filterOption` (predicate or false for app-filtered results), `loading`,
`loadingContent`, `error`, `emptyContent`, `footer`, `disabled`, `autoFocus`,
`placeholder`, and `className`. A React ref exposes `ChoiceSelectRef.focus(options?: FocusOptions)` and `blur()` through Ant’s public Select methods on both single and multiple variants. Standalone `autoFocus` remains supported. Loading/error status and `footer` render
persistently in normal document order immediately after the combobox, outside
Ant's transient option popup. With no active option, Tab reaches the next
enabled Retry/create/footer control. With active results, Ant may commit the
active option on Tab and retain input focus; the next Tab reaches the stable
action. Use Escape then Tab to reach that action without committing an option.
Shift+Tab returns to the combobox. No
manual focus bridge is required, including inside Popup/Dialog. Arrow keys
continue to navigate options. These actions remain available while the option
list is closed; consumers choose when to supply them. `emptyContent` and rich
option display must be noninteractive messages. Consumers retain fetching, debounce, exclusions, normalization,
permissions, pending IDs and persistence. Mark pending options disabled; a
controlled parent can keep `open` true until asynchronous selection succeeds.
Put Retry in `error` and create/extra actions in `footer`; both are stable
siblings of the control, not listbox descendants. For a separate trigger,
compose ChoiceSelect and these actions inside Popup. Use SelectField when native
FormData semantics are required.

`Popup` is an anchored nonmodal dialog for arbitrary content. Pass a real
ref/event-capable `trigger` element, `label`, `children`, optional controlled
`open`/`onOpenChange`, `defaultOpen`, `onClose`, `align`, `className` and `style`.
Ant Popover owns positioning, portals and outside dismissal. The content is
focused after opening unless a child already owns focus. Set `initialFocusRef` to a `RefObject<{ focus(options?: FocusOptions): void } | null>` to choose a destination after Ant’s `afterOpenChange(true)` placement/motion completion. It calls the target with `{ preventScroll: true }`; a null, disabled or nonfocusable target falls back to the dialog container. Native input refs, exported `InputRef`, and `ChoiceSelectRef` are supported. Omit child `autoFocus` in this anchored composition: native autofocus before placement can scroll a long page. Escape closes the
innermost popup, and connected initiating focus returns after it settles;
outside actions/newer explicit focus destinations retain focus. There is no
second focus trap. Inside Dialog, the public portal container and pointer
style keep the popup interactive. Use owned fields/Tabs/ChoiceSelect inside it,
not a product-owned option keyboard or positioning engine.

```tsx
<Popup
  label="Board filters"
  open={open}
  onOpenChange={setOpen}
  trigger={<Button>Filters</Button>}
>
  <Tabs
    label="Filter categories"
    value={category}
    onValueChange={setCategory}
    options={categories}
  >
    <ChoiceSelect
      label="Filter choices"
      multiple
      options={options}
      value={selectedIds}
      onValueChange={setSelectedIds}
    />
  </Tabs>
  <Button onClick={clearFilters}>Clear filters</Button>
</Popup>
```

### Headquarters caller mapping

| Named caller                                                                                                           | Owned composition                                                                                       | Application responsibility                                                 |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ConversationActionMenu / ChatConversationRail / ChatMessagePane                                                        | controlled nested Menu with the real row/header trigger                                                 | conversation ID, mute durations, permissions and callbacks                 |
| DocumentationCard, ChatMessagePane message/attachment menus, FeedPostCard, CostAnalyticsPage export, TicketCardActions | Menu                                                                                                    | edit/delete/export/file-input callbacks and availability                   |
| TicketTypeMenu, StatusMenu, TicketDocumentTypeMenu, ticket priority                                                    | Menu with checked action items                                                                          | current domain value and mutation                                          |
| TicketRelationPicker and ticket search, AssigneePicker, ParentPicker                                                   | ChoiceSelect with stable error/Retry and footer actions, optionally within Popup for a separate trigger | remote query, exclusions, pending/error/retry, rich labels and ID payloads |
| TagPicker                                                                                                              | Popup with ChoiceSelect suggestions and stable footer Add action, owned Input/remove Buttons            | canonical tag normalization, duplicate prevention and persistence          |
| DatePopover                                                                                                            | Popup with owned calendar controls or DateField                                                         | account timezone/date conversion and calendar model                        |
| BoardFilterMenu                                                                                                        | Popup with owned Tabs and multiple ChoiceSelect                                                         | filter categories, selected predicates/counts and clear actions            |
| TimeViews ProjectPicker / ticket card assignee                                                                         | multiple/single ChoiceSelect, optionally Popup                                                          | recent ordering, selected project/member IDs                               |

### Conformance behavior and names

Status Chip owns 4px gap and 4px/8px padding through semantic space tokens;
long labels wrap and static cursor remains default. `className` and provider
CSS variable overrides remain available; intentionally more specific consumer
CSS can override geometry. FilterChip retains its independent action contract.

When a static Chip is content inside a semantic action (button, link, action
role, or focusable table row), it inherits the containing cursor, including
disabled and busy states. The parent owns the hit area and callback; the Chip
does not become an independent action. A focusable row supplies its action
cursor through `DataTable.onRow`.

Owned Select, SelectField and ChoiceSelect use the semantic focus outline around
the complete field when their combobox input has visible keyboard focus. The
inner search input shares this cue, including when multiple selection reduces
its empty width to 4px. Standalone inputs retain their own focus outlines.

Tabs uses public Ant `renderTabBar` with a horizontally scrolling semantic
button tablist; Ant still owns panels. Arrow/Home/End select and reveal every
enabled tab, including narrow widths, with linked IDs and one tab stop.
The required `children` render as the selected tab's actual panel content.
Ant retains its lazy panel mounting: inactive/disabled tab IDs may refer to a
panel that has not been mounted yet; an enabled selected tab resolves to its
panel with the reverse `aria-labelledby` link. No dummy panels are inserted.
There is no overflow action inside `role=tablist`.

Expanded sidebar actions use natural visible names including supporting copy
and counts with real word boundaries. Collapsed actions retain the primary
label. Supporting content is announced once, without duplicate descriptions.
Header names include the visible primary wording and supporting text; compact
search retains its full explicit name when text is visually hidden. Consumers
should query the actual visible action text, not the old "Search workspace" or
"Focus mode" aliases. The sample's avatar action is "Workspace actions for AS"
because AS is visibly printed on it. IconButton still accepts the caller's
explicit action name and treats its graphic child as decorative; standalone
Avatar semantics are unchanged.

Dialog captures an externally controlled opener before Ant's focus effect;
conditional unmount restores a connected opener only if focus has fallen to the
body. It does not replace Ant's open-overlay focus behavior or override a newer
explicit focus destination after closing. Set a different external destination
after the close commit (for example, in the next animation frame): synchronous
outside focus while a modal is still open remains subject to Ant's active trap.
Keep product fallback focus handling only where the
initiator is actually removed or a separately verified flow requires it.

### Anchored search with deliberate initial focus

```tsx
import { useRef, useState } from "react";
import { Button, ChoiceSelect, Popup, type ChoiceSelectRef } from "@kooyaph/ui";

export function PeoplePicker() {
  const search = useRef<ChoiceSelectRef>(null);
  const [value, setValue] = useState<string>();
  return (
    <Popup
      label="Choose a person"
      initialFocusRef={search}
      trigger={<Button>Choose person</Button>}
    >
      <ChoiceSelect
        ref={search}
        label="Search people"
        value={value}
        options={[
          { value: "alex", label: "Alex" },
          { value: "sam", label: "Sam" },
        ]}
        onValueChange={setValue}
      />
    </Popup>
  );
}
```

For an ordinary search field, use `useRef<InputRef>(null)` with public `Input`,
or `useRef<HTMLInputElement>(null)` with a native input and pass the same ref
as `initialFocusRef`. Arrow/Enter option selection and the first Escape remain
Ant-owned; Escape after the choice list closes dismisses Popup. Retry and footer
actions remain in normal Tab order. The ref contract does not introduce a trap.

Name every Progress, including Storybook examples: `<Progress aria-label="Local task progress" percent={40} />`.
Its values, completion status and application-controlled Advance/Reset behavior
remain unchanged; use `aria-labelledby` when visible text supplies the name.

## Bounded overlay keyboard limitation

Ant 6.6.5 owns modal focus navigation. The recorded last-action Tab can move
focus to BODY/browser chrome; a second Tab returns inside. This does not prove
continuous containment. Meaningful close/Escape opener return, conditional
unmount and natural Menu→child-Dialog operation should be checked using
[the visual review guide](visual-review.md). Keep the opener connected where possible;
the provider fallback applies when it was removed. Popup has no extra trap.
`Popup.align` supports only `start`/`end`; centered placement for a synthetic
narrow anchor near viewport edges is not part of the current API. Do not rely on
undocumented Ant implementation details to simulate a centered placement.

## Experience contract additions

See the [loading, recovery and device experience guide](experience.md) for the
public skeleton/busy/safe failure contracts, shared 640/1100 device seams,
record-card and tablet priority compositions, one-pane inbox, task forms/dialogs,
manual tabs and guarded shortcut disclosure. The discoverable Experience
catalog and Storybook examples demonstrate fictional cold reads, Query v5 memory
cache, delayed intent and cancellable local transfers. The package exports the
loading, error and presentation components; the client cache, preload and
transfer examples show consuming-app wiring with local fixtures. The guide also
covers image alternatives, public Open Graph metadata, tab placement and
keyboard shortcuts. Product-specific persistence, network downloads and
document-head rendering remain app-owned and need their own qualification.
