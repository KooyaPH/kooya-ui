# Kooya UI 1.2.1: essentials first

Editorial for work, Governance for administration. Olive / Light / Compact remain the defaults; account palettes, custom accents, System/Dark and Comfortable density remain supported.

## Composition rules

- One page heading and one primary action for the current task. Supporting context belongs below the task or behind an explicit disclosure.
- Use `AuthLayout` for sign-in, code entry, recovery and consent. It provides brand, title, optional description, utilities, content and footer slots; it does not own forms, routing, queries or sessions. `wide` enables the 560px consent review; the regular card is 440px and both adapt to their container.
- Use `ApplicationAuthorization presentation="embedded" labelledBy={headingId}` inside that layout. The host owns the single heading. Identity, publisher, account, required permission/access details, resource selection and explicit decisions remain visible. Standalone remains the default for existing consumers.
- `ExpandableText` is available from `@kooyaph/ui/molecules` and `/legacy`. It previews supporting plain text in three lines and exposes a keyboard-operable Show more / Show less control when content overflows. Do not use it for errors, permissions, labels, identity or primary documents. Preserve full reading/editing flows.
- Page/Card descriptions adopt that disclosure automatically. Primary titles and labels wrap; shortened action labels retain full accessible record names.
- Preserve native Ant export identities, compound members, props and refs. Scoped theme rules handle long labels without replacing Ant controls.

## Loading contract

`RecordFields` from `@kooyaph/ui` accepts labelled read-only values (`fields: {id, label, value}[]`, optional `label` and `loading`). It keeps the definition list and labels visible in both initial and ready states; use it for record summaries, not editable forms.

Keep headings, table headers, navigation, labels, containers and known controls mounted. Put `DataValue` around unavailable values and use `BusyBoundary` for announcements and data-loading context. Owned inputs/textarea/select/checkbox controls mask missing values and disable editing while this context is active. Preserve cached values with `keepContent` during refresh. Application-owned slots must explicitly distinguish static structure from fetched data; never skeleton an entire slot to hide that distinction.

Use action progress for saves/connects. Unknown route code and session transitions use a concise status message, because no record data is being displayed. Never invent labels or table columns for an unknown response.

## Containers and overlays

Allow children to shrink with `min-inline-size: 0`. Wrap long and unbroken content. Allow actions to wrap or stack. Keep intentional table/board scrolling within its region. Do not hide page overflow to conceal a defect.

Use the provider overlay host outside clipped/transformed containers; bound panels to the viewport, retain body scrolling in dialogs and drawers, and verify Escape, focus and focus return. Required content must remain available on touch and keyboard, without relying on hover.

## Qualification

Audit all catalogue variants and public exports; record geometry scans separately from interaction, accessibility and visual review. A rendered example or HTTP 200 does not establish product acceptance. Retain original screenshots, source/release identity, and the exact staged journeys exercised. Previous qualification campaign records remain independently owned; this patch does not relabel them as accepted.
