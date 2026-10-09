# Typed templates

The library includes **17** presentational template families. Import from
`@kooyaph/ui` or `@kooyaph/ui/templates`, under one application-entry
KooyaProvider and one `@kooyaph/ui/styles.css` import. All templates share title,
description, eyebrow, actions, children and optional TemplateState. State is
`{status:'ready', refreshing?, failure?, onRetry?}`,
`{status:'loading', skeleton?}` or
`{status:'error', failure?, onRetry?}`. Retry only appears with a callback.
Legacy loading `message`, error `message`, and form error strings are not
displayed; loading uses structural skeletons and failures use reviewed public
codes plus a validated HTTP status or an explicit unavailable status.

| Template                | Data and slots                                                    | Controlled interactions                                                           |
| ----------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| DashboardTemplate       | metrics: SummaryMetric[], primary, aside                          | Application actions and checklist slots                                           |
| CollectionTemplate<Row> | table: DataTableProps<Row>, toolbar, list, selectionActions, view | Table sort/pagination/selection via table props; list/table view is controlled    |
| RecordDetailTemplate    | fields: DetailField[], summary, activity, related                 | Actions supplied by application                                                   |
| FormTemplate            | children fields, footer, error, submitLabel                       | onSubmit form event, submitting, submitDisabled; validation stays in app          |
| WizardTemplate          | steps: WizardStep[], children                                     | step, onStepChange, onComplete, canContinue, busy                                 |
| SettingsTemplate        | sections: SettingsSection[], preview, footer                      | Fields and save callbacks in supplied sections                                    |
| BoardTemplate           | columns: BoardColumn[], items: BoardItem[], empty                 | onMove(id,columnId), optional onOpen(id); searchable move control, no drag engine |
| InboxTemplate           | threads: InboxThread[], messages: ChatMessage[], threadActions    | selectedThreadId, onSelectThread, draft, onDraftChange, onSend, sending           |
| FeedTemplate            | posts: FeedPost[], composer, empty                                | onReact(id); reacted and counts supplied by app                                   |
| ContentEditorTemplate   | editor, preview, metadata, saveAction                             | mode edit/preview, onModeChange                                                   |
| MediaGalleryTemplate    | items: MediaItem[], toolbar, empty                                | onSelect(id); caller supplies local src/thumbnail and view dialog                 |
| AnalyticsTemplate       | metrics, points: AnalyticsPoint[], periods, optional chart        | period, onPeriodChange; native meter fallback includes numeric values             |
| AuditTemplate           | entries: AuditEntry[], toolbar, empty                             | Application filtering; actor name and role remain visible                         |
| ProfileTemplate         | name, subtitle, avatar, fields, activity                          | Application edit action and field slots                                           |
| BusinessPageTemplate    | brand, navigation, hero, sections: BusinessSection[], footer      | Application contact/navigation callbacks                                          |
| ClientPortalTemplate    | metrics, welcome, requests, resources                             | Application request/approval controls                                             |
| FocusedToolTemplate     | toolLabel, toolbar, stage, inspector, footer                      | Application meeting/game/map engine in stage slot                                 |

Collections show explicit empty messages for no rows/items/messages/posts/media/
audit events. Header actions remain available while a state boundary hides the
main content. Disable or remove inappropriate header actions in the consumer.
Templates that are not collections do not synthesize an empty business state.

```tsx
import { useState } from "react";
import { BoardTemplate, type BoardItem } from "@kooyaph/ui";

export function ProjectBoard() {
  const [items, setItems] = useState<BoardItem[]>([
    { id: "brief", title: "Launch brief", columnId: "todo" },
  ]);
  return (
    <BoardTemplate
      title="Project board"
      columns={[
        { id: "todo", title: "To do" },
        { id: "done", title: "Done" },
      ]}
      items={items}
      onMove={(id, columnId) =>
        setItems((current) =>
          current.map((item) =>
            item.id === id ? { ...item, columnId } : item,
          ),
        )
      }
    />
  );
}
```

```tsx
import { CollectionTemplate, type Column } from "@kooyaph/ui";
type Account = { id: string; name: string };
const columns: Column<Account>[] = [
  { key: "name", title: "Name", render: (row) => row.name },
];
export function Accounts({ rows }: { rows: Account[] }) {
  return (
    <CollectionTemplate<Account>
      title="Accounts"
      table={{ label: "Accounts", rows, columns, rowKey: (row) => row.id }}
    />
  );
}
```

See `apps/playground/src/examples/` for runnable state and callback wiring for
every family. Inbox examples isolate threads and clear sent drafts. Form and
wizard examples block missing names. Board examples preserve stable IDs during
moves. Public business pages and client portals use local contact/approval
state. Content previews render text without unsafe HTML. Tool examples announce
local start/pause only and do not imply a working conferencing/game/map engine.

## Browse the examples

Run `corepack pnpm dev` from the repository root to open the local playground.
Its Templates catalog groups all 17 Business, Console, and Client families. Each
family has a hash route for direct linking: dashboard, collection, detail, form,
wizard, settings, board, inbox, feed, content, media, analytics, audit, profile,
business, portal, and tool. The CRM, CMS, settings, and usage samples update
fictional in-memory state.

Source callbacks are in `apps/playground/src/examples/{dashboard,collections,forms,
collaboration,content,identity,focused-tool}.tsx`; catalog state controls show
ready/loading/error and explicit retry. Storybook imports public exports;
example records do not ship in the package. Local sample checks do not prove
every consumer application state or engine.

## Loading, errors, and adaptive layouts

See the [loading, recovery and device experience guide](experience.md) for the
public skeleton/busy/safe failure contracts, shared 640/1100 device seams,
record-card and tablet priority compositions, one-pane inbox, task forms/dialogs,
manual tabs and guarded shortcut disclosure. The discoverable Experience catalog and Storybook examples
demonstrate fictional cold reads, Query v5 memory cache, delayed intent and
cancellable local transfers. The guide includes usage code and user stories for
these patterns, plus image alternative, Open Graph, tab order and shortcut
guidance. Applications map transport errors to safe public codes, set
protected-data cache policy, manage real download tasks and render public page
metadata in their document head; each product needs route-level qualification.
