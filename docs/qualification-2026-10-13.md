# Kooya UI qualification — 2026-10-13

The approved Ant-first rebuild is implemented on `feat/ant-reui-20261013` in the isolated `ant-reui-20261013` worktree. The local preview is **http://localhost:5193/#/overview**. Its public `build-provenance.json` identifies the final source revision and served asset hashes. Existing comparison services at5190–5192 were preserved.

## Delivered

Actual Ant Design6.6.5 public controls/props/refs/compound APIs, Kooya corporate branding, local fonts/wordmark/assets, synchronized light/dark/density/reduced-motion behavior, the REUI catalog shell and an improved landing page. The registry contains278entries/1552variants:1241public REUI examples across86categories,73native Ant families,11groups,56blocks,18sections and34templates with238composed variants. The original17template families remain discoverable. All counts are derived from registered entries.

Original REUI source is preserved with exact Git revision `3b67464bcad3c29fbdb12437afb70153384eee19`, file hashes and MIT license. Private bridges use native Ant widget engines. Specialized upstream engines and actual Charts/X/React Flow/Tiptap/Excalidraw integrations are retained where needed. Runtime dependency metadata describes real imports. The source download contains adapted TypeScript supporting imports, the packed public library, dependencies, assets and a runnable Vite viewer.

## Verified evidence

- Package and playground production builds passed. Final playground build43.73s; Storybook build9.67s.
- Workspace package/playground/Storybook TypeScript checks passed; the final code-pane metadata change also passed playground types.
- Full behavior suite:24files/203tests passed. Source intake/import graph:5tests passed. Selected owned-source formatting and Git whitespace checks passed; byte-preserved/generated upstream material is separate.
- Packed React18.3.1 and19.2.0 consumers passed NodeNext TypeScript, native Ant identity and SSR with generic/compound controls.
- Final runnable source download was independently extracted, installed with pinned Corepack pnpm10.18.3 and built successfully (19.63s).
- Browser sweeps rendered1241REUI +73native +238composed variants with zero load failures or uncaught page errors. Native/composed sweeps also observed zero external requests. Changed carousel behavior was subsequently rechecked across all11recipes.
- Independent task reviews approved the source intake, foundation, collection behavior and catalog/native bridge corrections. The34trivial alternate cases were replaced with different usable scenarios. CSV filtering/sorting/grouping and export now use the same displayed record set and ordering.
- Focused browser flows passed for controlled fields, overlay dismissal/focus, search/code actions, async cascader, stepper, table/headerless table, page selection/jump/rows-per-page/summary, splitter percentages, carousel responsive counts and last-slide resize clamping, CSV export, account confirmation, file restoration/search, AI history/send, flow editing and whiteboard drawing. Representative editor/chart/commerce behaviors have focused tests and browser evidence.
  -120normal-layout cases passed across320/375/768/1280/1440CSSpx, landing/catalog/docs, both modes/densities and reduced/normal motion.72simulated200%zoom-reflow cases passed at384/640/720effective CSSpx with DPR2. This checks effective reflow rather than claiming a browser-menu zoom action. The640header breakpoint finding was fixed and its24affected cases rechecked.

## Served artifacts

- Final index SHA-256: `f53d767a6fd437ab1be3f4782832042ebb246848e5e8e497f28b03f2162722cf`.
- Source download SHA-256: `2b378eb1e7e17b48c595094ce3371d30292ebb32c6b6c985b6d864e6746840b4`.
- Final preview serves a fixed copied public directory, not mutable development output. Its process and snapshot location are recorded in the owned local runtime directory.

## Limits

Examples use fictional local state and have no backend, real authentication, persistence, payment or delivery integrations. Mount coverage does not prove every possible interaction in1241upstream recipes. Large advanced/syntax chunks emit Vite size advisories and remain lazy; some inherited demo warnings remain. This is a reviewed local library candidate, not a publication, consuming-app migration, production performance benchmark or exhaustive WCAG certification. Prior wrapper contracts are isolated under `/legacy`; the clean Ant API has a major Changeset pending publication.
