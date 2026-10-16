# Approved Kooya UI audit execution contract

Approved in conversation on 2026-10-13. Baseline c1283ad3ed7cd4716890131b2ce9e3cab30de7c6, integration branch feat/ant-reui-20261013. No OpenClaw access or writeback for this UI goal. This document preserves the approved campaign and its acceptance requirements across sessions; it is not a completion report.

## Boundary and coverage

Preserve immutable vendor REUI revision 3b67464bcad3c29fbdb12437afb70153384eee19, existing public exports, native Ant identity and peer React18.3/19 compatibility. Evidence-justified changes only. Preserve existing frozen previews5190–5193. No package publication, external backend, paid browser grid or deployment.

Inventory is the union of all1552 catalog variants (1241 REUI,73native,238compositions), every public export exposure across16entrypoints, supported compound API,39legacy controls,17originaltemplates plusTemplateFrame,5publiccompositions, foundations/hooks/themes,25story files/93stories,6HTMLfixtures and all retained app UI. Matching names, shared implementations and historical tests never imply acceptance. Enumerate HTML query/config scenarios, story args, declared component props, real transitions, engines, adapters, media and copied code dependencies. Classify all source modules, every public compound candidate and nonvisual helpers. No disappeared item silently leaves the denominator.

Source and generated source differ: corrections belong in owned overrides/transforms; never edit byte-preserved vendor. Generate runtime and copied TS from identical corrections. Copied usage currently excludes TS checks and standalone bundle viewer originally exercises only REUI; source graph existence is not compile/runtime proof. Validate copied native/compositions/templates independently in their actual standalone consumer.

## Phases and dependencies

A. Freeze source/artifact provenance; persist ledger; build private real-prop harness; capability-check exact browser binaries; prove unknown/blank/loading/error and stale/absent-evidence negative controls fail. Establish owned native browser zoom fixture and browser target manifest. Install only local development tooling.

B. One-item pilots: c-textarea-6; ant-drawer-native; kooya-blocks-data-workbench-standard. Establish timings, storage, failure artifacts and independent review loop; do not reduce inspection because throughput is low. Baseline textarea reproductions include rejected paste growth, resize clipping, dark-counter contrast, manual resize and dirty value loss on OS motion transition.

C. Repair shared foundations individually using concrete leaf evidence. Native provider/theme/CSS/fonts/adapter feedback changes invalidate every affected dependency closure; no leaf inherits a shared foundation pass.

D. Queue every inventory item individually, including noncatalog fixtures and states. Execute contracts, screenshot inspection and independent re-rendered reviews. Classify nonvisual entries and verify appropriate API/SSR/type contracts. A missing fixture or browser is an explicit blocker rather than a skip/pass.

E. Public package contracts: exact identities, props, refs, generics, supported compounds, React18/19, SSR/StrictMode, four theme presets/branding, pack consumers, all standalone copied modules. Preserve source licenses/assets, typecheck consumer and meaningful library behavior. Original17templates and new34catalogtemplate families are different surfaces.

F. Reconcile exact current source/dependency/build/browser/fixture fingerprints. Run all required checks and produce final immutable localhost preview with revision and index/recipe/package hashes. Report verified-local separately from unavailable-platform coverage. Do not call the library fully production-qualified while unresolved items, missing browser versions or platforms remain.

## Browser and environment matrix

Only this machine is authorized. Record Chrome/Edge/Firefox/Safari current and previous2released majors frozen at campaign start. Playwright browser builds may be prerelease; label them exactly, never substitute them silently for released supported versions. WebKit is engine coverage, not Safari/iOS proof. Missing physical touch, Safari/iOS, screenreader and unavailable older binaries remain blocked. Locally available Chromium/Firefox/WebKit engine profiles augment but do not replace the extended supported-browser requirement.

For EACH reachable declared state, render eight CSS widths320,360,390,768,1024,1280,1440,1920 ×light/dark ×comfortable/compact ×normal/reduced motion ×each runnable browser.64cases perstate perbrowser;192withthreeengines.297984defaultcatalogrender cases is a lower bound, not a completion target: all states, content boundaries, containers, presets and nested compositions add cases.

Native Chromium200% and400% browser zoom must use persistent bundledChromium with owned localMV3extension, chrome.tabs.setZoom/getZoom proof and actual captured rendering. Half viewport, DPR2 or CSSzoom are simulations only. Native1280at400%=320CSSpx reflow; separate200%textresize. For other engines if native zoom unavailable, report blocked. Do not globally disable animations/caret, suppress errors, hide invalid content or patch live DOM text to manufacture test states.

## Single-item protocol

1. Investigate source, public contract, story/examples, dependency closure and all reachable states before writing the fixture.
2. Render actual catalog and real prop/state fixture; log events and measure visible content and geometry. Capture screenshots of every applicable case, including full content, overlays, focus, scrolling/virtualized items and catalog iframe embedding.
3. Worker actually opens every screenshot at useful full resolution, records concrete observations. Automated assertions do not replace inspection.
4. Add meaningful failing regression, reproduce before evidence, classify issue and trace root cause.
5. Implement minimum justified fix without contract drift; regenerate owned outputs, rerun regression and dependent behavior checks.
6. Repeat render-inspect-fix-verify until no defect. Test transitions while dirty/focused/open, not only separate screenshots.
7. Fresh independent reviewer runs own browser captures and stresses unprompted cases; reviews every case image against objective contract, not just worker claims. Reviewer and worker must differ.
8. Integrate sequentially, fingerprint dependencies and rerender/reinspect affected cases after changes. Stale evidence cannot be accepted.

Visual rules: token-based typography/spacing; expected geometry within1CSSpx; no overlapping controls/lost text; document horizontal overflow≤1px except justified contained two-dimensional content; no clipped popups/unreachable actions; text wraps or truncates intentionally with accessible full content. Long labels80/200characters,512unbrokenstrings, empty/null/0/negative/extremenumbers, Unicode/RTL/emoji/combiningcharacters, huge paste, invalid media, delayed/failed fonts and unpredictable records all require meaningful fixtures. Preserve c-textarea-6 UTF16value.length280 and whole proposed-edit rejection unless separately approved.

Test dirty input→appearance/motion/resize; popup→scroll/resize/Escape; table sort/filter/page/select/edit/delete/CSV consistency; file type/size/progress/error/cancel/retry; virtualized traversal; overlay focus trap/return/nestedports; charts equivalent accessible data; drag keyboard alternative; destructive confirm/cancel; real async loading/error/empty/recovery distinct from DemoFrame placeholders.

Accessibility: WCAG2.2AA text4.5:1, large3:1; nontext/focus3:1; primarytouch44px, othercontrols24px or documented compliant spacingexception. Real labels/descriptions/errors/status announcements, keyboard navigation/focus/order/return, alt content, accessible data, no color-only meaning. Textspacing line1.5,paragraph2em,letter.12em,word.16em must not lose content. Automated axe plus manual interactions; native screenreader claims require actual screenreader testing.

Stability/performance: initial+5s idle CLS≤0.1; settled drift≤1px; zero unexplained JS/React warnings/resource failures;30open/close/mount cycles clean listeners/timers/portals/scrolllocks; isolated input-to-next-paint<200ms; no unexplained>10%regression. Record hardware/cache/variance; noisy measurements are inconclusive. Temporal animation frames and reduced-motion functional checks are separate from settled comparisons.

## Agent orchestration

Four maximum activeagents: rootintegrationcontroller +two single-itemworkers +freshreviewer. Worker owns exactlyONE item until requirements and independent verification satisfied; blocked coverage can be reported and assignment retired explicitly, never passed. No family/category batches. Separateworktrees, properownworkspacepackages/dist, browserprofiles, reports and evidence paths; ports5300integration,5301/5302workers,5303reviewer after live recheck. Preserve5190–5193.

Root is sole writer shared providers/CSS/adapters/generator/lock/harness/groupedcollectionfiles. Itemworker owns unique fixture/contract/regression/override and submits shared-repair request with repro/rootcause/dependency closure. Integration/cherry-picks/builds are sequential. At mostoneproductionbuild andonebrowser peractiveworker/reviewer; engineprofilesserial. Pause heavy newwork iffreeRAM<4GB orfreeDisk<30GB. Do not reuse otherworktree node_modules links to wrong @kooyaph/ui dist.

## Evidence and acceptance

Case record: uniqueID, item/state/viewport/mode/density/motion/browser/channel/version, props/records, exact source and dependency fingerprint, actual callbacks/actions, geometry, screenshot path+SHA, worker visual observation, independent reviewer fresh-capture path+SHA/observation, traces/error data and defect references. Record nativezoom proof where relevant. Screenshot baselines are pinned to environment; do not treat cross-platform rasterdifferences as identical goldens. Never approve snapshots automatically.

Defect record: uniqueID, severity, deterministicrepro, before image/hash, userimpact, rootcause, changedfiles, dependentitems, failingtestcommand/results, fix/afterevidence, verifier and unresolvedlimitations. Evenminor unresolved visual defects prevent itempass.

Statuses: unassigned→investigating→fixing/shared-repair→self-verified→review→integration→accepted-local. Dependencychanges makeaccepteditemsstale. blocked and failed cases remaindenominator entries. Public/browser-version/platformqualification is separate. Completion requires allitemsclassified, exactcasecoverage, actualworker+freshreviewerevidence foreveryimage, zerodefects/stales/flakiness, APIcompatibility and exactfinalartifacts. A claims-only report/testpass cannot accept an item.
