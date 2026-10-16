# 1.2.2 workspace correction

Use one primary sidebar. Keep the route title and actions in one page heading; the utility bar supplies navigation/search without repeating the title. Do not repeat sidebar links through the optional context slot. That slot remains available for compatibility and distinct contextual tools.

`WorkspaceHeader` from `@kooyaph/ui/legacy` accepts `presentation="utility"`. This renders a `div[role=toolbar]` inside the shell banner, without nested header landmarks. Existing default presentation and props are unchanged. The application still owns links, permissions, search and collapse state.

`WorkspaceShell` from the package root accepts the same slots and props. The navigation wrapper is a geometry container; the supplied sidebar owns its navigation landmark. The default review workspace now demonstrates one sidebar and no extra navigation or always-open record inspector.

Compact owned secondary actions and fields use a 36px rhythm; primary actions and phone/coarse-pointer controls retain at least 44px targets. Page actions wrap within their container. Input boundaries use a semantic neutral blend, with distinct focus, invalid, disabled and busy states. Canonical Ant exports, native forms and component refs are unchanged.

Qualification: package/playground/Storybook builds, workspace type checking and 375 tests passed. Application route screenshots, interactions and staging deployment evidence are maintained in the owning KooyaHQ release record; package publication alone does not establish live product acceptance.
