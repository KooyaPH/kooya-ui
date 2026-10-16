# Public pages and swimlane boards (1.2)

`EditorialIntro`, `PublicPageFrame` and `AuthPanel` share the Editorial vocabulary on public, login and authentication pages without application session dependencies. Render inside `KooyaProvider` and import the package stylesheet. Route metadata, links, form submissions and account state remain application responsibilities.

`SwimlaneBoard` contains composable `Swimlane`, `SwimlaneRail`, `SwimlaneColumn` and `SwimlaneCard` surfaces. Use controlled `collapsed` / `onToggle` for lane disclosure. The package creates stable disclosure IDs. Every rail should have a meaningful region name and `tabIndex={0}` when it scrolls. `columns` controls rail width; phone layouts preserve usable columns with horizontal scrolling. Keep all status headings visible during loading and replace only unknown values with `DataValue`.

Applications own drag/drop, keyboard move commands, card routing, permissions and persistence. A card can receive actions or ordinary children; the library never silently saves or authorizes anything. Product integration may reuse existing complex card internals and tested pointer behavior while adopting the shared board structure. Use a Select or explicit move action as an alternative to dragging. No interactive card wrapper is imposed around nested controls.

Examples: grouped, read-only, loading, empty and long-text in Storybook and the public catalogue. All surfaces use semantic palette tokens and support compact/light/dark/reduced motion.
