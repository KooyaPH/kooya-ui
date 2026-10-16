# Connections and data loading

The new APIs are available in this review branch; the immutable v1.0.0 release remains the installed baseline until the queued minor changeset is released.

## Application authorization

`ApplicationAuthorization` is a controlled, presentational composition exported from `@kooyaph/ui` and `@kooyaph/ui/compositions`. Supply the application name, publisher, signed-in account, required and optional permissions, repository options and explicit decision callbacks. States: `review`, `authorizing`, `approved`, `denied`, `error`.

The owning product validates OAuth state, redirect URI, publisher identity, account, requested scopes, selected repositories and grants server-side. `verified` may only be set when the owning product has established publisher verification. The UI never grants access. Optional permission selections and repository changes are controlled. Approval is blocked while repository options load or an explicitly scoped repository list has no selection. Failed connections retain review information and offer recovery. Place the same component inside a dialog or standalone page as appropriate.

Working catalogue: `#/groups/application-authorization` (seven examples). Storybook: V1 / Connections and loading.

## Loading contract

Static navigation, headings, labels, containers, table columns, tabs and known controls stay mounted. A skeleton belongs only in the region occupied by unavailable data. Do not skeleton an entire page, card, table or form just because its request is pending.

- `DataTable loading rows={[]}` preserves its table and headers and renders five placeholder rows, with no fake row interactions or loading sorter/filter callbacks.
- When rows already exist, `DataTable loading` retains them and announces a background update.
- `BusyBoundary busy` preserves its children and supplies loading context. Wrap dynamic fields in `DataValue`; `MetricCard` and `DataTable` consume the same context.
- `BusyBoundary busy keepContent` preserves cached values while showing a concise update indicator.
- `DataValue` is decorative. One boundary announces the pending state. `block` reserves a larger text region; `width` matches the expected value. Respect reduced motion.
- Saving/uploading/connecting uses action progress (button spinner or measured progress), not skeletons. Keep action labels and geometry stable and prevent duplicate submission.
- Code-split modules use a concise loading status; page structure that is already known remains visible.

`BusyBoundary` no longer replaces children with a generic structural skeleton. Its old `skeleton` argument remains accepted for source compatibility but is deprecated. Migrate custom dynamic content to `DataValue`; otherwise that caller's children remain visible. `ContentSkeleton` remains a low-level data-line primitive, not a page-shell substitute.

Working catalogue: `#/groups/data-loading` (table, metrics, details, action). Select initial load, ready or background refresh to compare.
