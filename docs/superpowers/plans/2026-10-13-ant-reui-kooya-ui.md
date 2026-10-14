# Kooya Ant Design and REUI collection implementation plan

**Goal:** Implement the user-approved Ant-first Kooya library, comprehensive collections, REUI layout, improved landing page, reviewed localhost preview.

**Architecture:** Modify actual Ant Design components through shared tokens and public component configuration. Adapt actual REUI catalog and example source. Keep reusable atomic layers inside the library; expose developer-facing components, groups, blocks, sections and templates. Build or improve compositions only where necessary.

## Global Constraints

- Owning repository: `/home/stephen-kooya/kooya/projects/kooyahq/kooya-ui`; implementation workspace: `.worktrees/ant-reui-20261013`, branch `feat/ant-reui-20261013`, base `08813e7c9c055083e541cc9c6b0a74dca0e4918b`.
- Node 22+, Corepack pnpm 10.18.3, React 18.3/19 public support, actual `antd@6.6.5` external peer. Preserve package name `@kooyaph/ui`.
- User explicitly waived knowledge-system references and synchronization for this goal. Do not consult or write them during this work.
- Actual Ant components, props, refs, compound APIs and engines, not reimplemented primitives. Adapt REUI controls to actual Ant. New compositions/improvements are authorized when needed. Clean public API replacement authorized.
- Use real REUI source at `3b67464bcad3c29fbdb12437afb70153384eee19`; preserve source provenance and MIT notice. Public manifest: 1241 examples / 86 categories. Base/Radix duplicates represent one example.
- Brand paper `#f2eee3`, ink `#13120f`, lime `#d7f20f`, deep green `#314300`, yellow `#f4b701`, blue `#1d46d9`, red `#ef3e2f`. Official local wordmark, local DM Sans interface font, local Syncopate display font. Default Kooya light, charcoal dark mode, comfortable/compact density, reduced motion.
- One provider synchronizes surfaces, controls, menus, popups, modals, notifications and previews. Ordinary text contrast 4.5:1, meaningful indicators 3:1; 44px primary touch targets.
- REUI catalog geometry: 56px header, 256px desktop sidebar, approximately 52px toolbar, 24px desktop gutters, responsive cards, category counts and filters, code/preview/fullscreen details. Phone drawers and one-column previews.
- No product repository changes, real records, API clients, authentication, authorization or persistence. Examples use fictional local state; functional interactions reflect that scope.
- Leave existing root-owned 5190/5191/5192 units and source worktrees alone. New owned preview at `127.0.0.1:5193`, strict port. No publishing, push, tag or deployment.
- Do not commit generated dist, browser profiles, screenshots/test artifacts, credentials or upstream analytics. Serve fonts, branding and necessary engine assets locally.

## Required coverage

Foundations: colors, typography, spacing, borders, radii, elevation, icons, focus, motion, density, responsiveness, provider and feedback.

Components: all stable actual Ant component families and compound controls; all 86 REUI categories, tracking every public example adaptation. Count only working registered entries.

Groups: action/button, input, labelled field, checkbox/radio, avatar, filter/search toolbar, row actions, navigation, metric, status and card groups.

Application blocks: app shell, header, sidebar, authentication, onboarding, dashboard, card, dialog, drawer, empty state, form, list, profile, settings, timeline, statistics and wizard.

Advanced blocks: event calendar, schedule, Kanban, Gantt, flow editor, rich text editor, whiteboard, upload, file management and notifications.

Data blocks: sort, filter, paginate, select, hide/fix columns, expand, edit, group, resize/reorder, virtualize and export. Charts: area, bar, line, pie/donut, combined, radial/gauge, sparkline and status tracker with readable numeric alternatives.

AI/operations: chat, prompt input, history, attachments, agent activity and execution steps, CRM, users, inventory, billing, bookings, DevOps and AI operations.

Commerce: product/category card and grid, filters, product details, comparison, wishlist, cart, checkout, coupon, receipt and reviews.

Sections: navigation, hero, features, benefits, logos, testimonials, team, statistics, process, integrations, pricing, comparison, FAQ, blog, contact, newsletter, CTA and footer.

Templates: improve all 17 existing families (dashboard, collection, detail, form, wizard, settings, board, inbox, feed, content, media, analytics, audit, profile, business, portal, tool), and add complete landing/SaaS, auth/onboarding, storefront/product/cart/checkout, billing, scheduling, file manager, inventory, users, AI assistant, operations and docs/catalog pages.

Original group/block/section families each need standard and alternate compositions. Public REUI variants are adapted in category batches. Gated Pro source is incorporated only when actually available; equivalent Kooya compositions use actual Ant/supporting libraries.

Every entry needs live preview, accurate public usage code, dependency/prop/accessibility guidance, applicable interaction/loading/empty/error/success states, and meaningful local actions. Track unavailable sources explicitly, never present placeholders or inflated counts as complete.

### Task 1: Source intake and inventory

- Obtain exact upstream source into owned temporary intake; record revision and license.
- Import the complete public example manifest and source, cross-check 1241 unique entries / 86 categories, classify dependency families and source adaptations.
- Save the typed registry/inventory contract and provenance. Preserve base/source history and unrelated checkouts.
- Verify manifest coverage and source availability with focused checks before generating adapters.

### Task 2: Shared Ant-first package and theme

- Implement brand-default shared provider/tokens and light/dark/density/reduced-motion support, including portaled Ant controls and contextual feedback.
- Export actual Ant components/types through `/components`; preserve canonical compound controls and refs. Add new collection entry build/export maps; root exposes the new clean public contracts. Retain necessary internal composition code without exposing legacy wrapper contracts as new primitives.
- Keep React/Ant peers external; heavy advanced engines use separate entries. Internal atomic files remain focused.
- Add behavioral theme tests, actual Ant control/ref tests, and public consumer type fixtures. Run focused tests and package build; update design/API docs.
- This task owns `packages/ui/src/foundations`, `packages/ui/src/components`, package entry/export configuration and theme CSS; coordinate any root changes through a handoff.

### Task 3: REUI example adaptation and native component catalog

- Adapt actual public REUI examples in logical category batches through actual Ant component adapters, preserving their compositions and meaningful behavior.
- Resolve Next-specific links/router requirements to local hash routes, map icons and all assets locally, remove upstream analytics/network integrations.
- Preserve upstream non-primitive engines where needed; use real supporting libraries for missing capability.
- Generate exact provenance and compiled usage-code records from the real adapted files. Verify all registered source imports and all 1241 unique examples; do not count an unrenderable variant.
- Implement all stable native Ant family demonstrations, compound controls and applicable states.
- This task owns upstream intake/adaptation scripts, private adapters, adapted example files and component/demo registry entries.

### Task 4: Catalog shell, docs and landing

- Adapt actual REUI catalog layout into the Vite showcase with header/rail/toolbar geometry above.
- One typed registry drives counts, all five collection indexes, category filters, search, deep links, selected state and detail pages.
- Implement preview/code/fullscreen and actual phone/tablet widths, light/dark/density controls, unknown-route recovery, back/forward and reset behavior.
- Landing: official branding, clear hero and two browse actions, real control showcase, all collection entrances, featured blocks/templates, public installation snippet, theme demonstration, docs and footer.
- Keep active previews isolated and lazy; ordinary page scrolling belongs to document. Mobile drawers close after navigation and return focus predictably.
- This task owns `apps/playground/src` shell/catalog UI and app styling, consuming the finalized provider and registry contracts.

### Task 5: Groups, blocks, sections, advanced features and templates

- Implement every required coverage family above using actual Ant and source/library-backed behavior. Reuse actual existing Kooya compositions where appropriate and improve them to new branding/geometry.
- Support charts via Ant Design Charts, AI via Ant Design X, flows via React Flow, rich text via Tiptap, whiteboard via Excalidraw; lazy separate advanced entries and local assets.
- Supply standard/alternate variants and genuine controlled local examples: filtering/selection/editing/export, files, dates/events, board moves, editor changes, chart period, cart/checkout, prompt/chat updates, form validation and feedback.
- All 17 existing template families and additional named full pages must remain discoverable and usable. Remove fake advertised actions.
- Storybook and showcase import built public package exports. Add focused meaningful tests for real behavior and documented states.

### Task 6: Review, complete coverage and localhost qualification

- Review task diffs for spec compliance and code quality, resolve findings, and review the whole branch against coverage and frontend rules.
- Run package/playground/Storybook builds, workspace typechecks, behavior tests, formatting checks and public React 18/19 consumer compilation.
- Check registry missing/duplicate IDs, broken imports, counts, docs and all public REUI source mappings.
- Browser-render every registered example/template, check layout at 320/375/768/1280/1440, light/dark and both densities, reduced motion and 200% zoom.
- Exercise keyboard, labels, contrast, overlay close/Escape/focus return, long content, mobile scroll, forms/grids/uploads/calendar/board/editor/chart/commerce/AI actions. Preserve actual evidence and disclose upstream limitations.
- Generate adapted-preview thumbnails, document clean API migration, source attribution, coverage, dependencies and verification.
- Build and launch owned background static preview at localhost:5193, record served revision/assets, verify actual rendering and leave it running. Keep old 5190 available for comparison.
- Completion requires reconciled full collection coverage, functioning actual-source examples, final review and local preview. No product migration/publication implied.
