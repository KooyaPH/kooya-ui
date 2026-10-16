# Independent review: ant-drawer-native

2026-10-13. Reviewer: drawer_independent_review. **All four reported defects are independently verified repaired in the tested scope on immutable artifact5306. Full item acceptance remains blocked by incomplete matrix/platform coverage and unproved portable consumer delivery of the dependency repair.** This is one drawer item, including its nested native overlay states; it does not accept DatePicker or Spin as separate catalog items.

## Final scoped repair verification: immutable5306

Runtime `http://127.0.0.1:5306`; artifact `773e2fa789081bff8de3511ec7c658dd681f370ade85f4d2fad3ed4a847ffbe3`; builder-declared source fingerprint `8cf186cce5138de8dd4f894fbfe2bcb4ed6c8b7d6fefb19b6049d38302cbda0f`; revision `afbe9c89f6fae496df28493b71bc2ac9a27d0add`; built `2026-10-13T05:13:46.269Z`. Provenance SHA256 `387bfb735e8e3bb239495b312b6d92ac01cb05423124e41631a73ce527febbc0` is byte-identical before, after and final. **All3632 actual built files independently rehashed at each check: zero mismatches.** Exact executed review specs and their hashes are saved beside each run report. No rendering files, dependencies or servers were changed by this reviewer.

| Requested proof | Result across Chromium, Firefox, WebKit |
| --- | --- |
| Core drawer/three original repairs, dirty state, native nested lock,90 cycles |24/24 pass |
| Real wheel reveals Today at320×600, click commits actual current date and closes popup |3/3 pass |
| Short heights300/400/600: bounds, header accessible name/Enter action, seven weekday labels, actual wheel/footer, current-date click and entered date+Enter commit |Corrected3/3 tests pass, covering all9 height cases |
| WebKit settled footer photo after viewport check, then actual date commits |Additional1/1 pass, covering all3 heights |
| Full item/browser/platform/public consumer qualification |Blocked/incomplete; no acceptance issued |

The first full30-test run recorded29 passes and one **review-test error**: a single400px wheel gesture was incorrectly expected to reveal the entire footer in Firefox's102px scroll region. Firefox advanced92px, with intact popup/document bounds. The correction uses at most six real wheel gestures directed inside the actual popup until the footer enters its clipped viewport; no script sets scroll position and no forced click is used. Firefox needs four gestures at300px and two at400px; the corrected three-engine run passes. Raw failure trace/report remains preserved rather than being erased or called product flakiness. The original24 core tests and three600px Today tests were already green.

The responsive popup repair keeps width288px/cell36px and bounds height to102/152/252px for viewport heights300/400/600. Chromium/WebKit popup bounds are y100→202, y53→205, and y257→509 respectively. Firefox's300px native drawer-body scrolling places the popup at194→296, still within the viewport. All corrected cases keep document height equal to viewport and scrollY0. Real wheel scrolling reveals the footer; actual click commits the current date, closes the popup, and keeps the drawer open. Input entry `2026-02-03` followed by Enter commits that exact date and closes the popup. A further real drawer-body wheel exposes the entire44px DatePicker wrapper at300px rather than accepting a partly scrolled border as full-control proof. Header button focus+Enter is operability evidence; it is not a claim of keyboard Tab entry to every native header control or screen-reader qualification.

**All135 fresh PNGs were opened at original resolution:**96 from the initial run (including the retained review-error frame),27 from corrected short-height cases and12 from the dedicated WebKit footer rerender. Complete image paths/SHA256/observations and zero uninspected fresh images are in `output/playwright/drawer-independent/immutable-5306/inspection-manifest.json`. WebKit's early after-wheel frames preceded its completed scroll paint and are rejected as settled footer proof. Dedicated `immutable-5306-webkit-footer/webkit/vertical-{300,400,600}-footer-reached.png` frames visibly show Today inside the bounded popup after the existing viewport assertion; Playwright's installed assertion code only observes intersection and schedules a frame, without scrolling the element. Actual clicks and committed dates follow those captures. Hover-preview field text is never used alone as success proof.

All four defects below are closed **for these scoped scenarios on this immutable artifact**. Earlier manifests and snapshots remain dated before evidence. Full state×width×mode×density×motion coverage, worker200 uninspected/stale frames, actual supported released-browser matrix, Safari/iOS, screen-reader/physical-touch proof, performance/full temporal budgets and packed consumer patch delivery remain outstanding as described below. This handoff verifies repairs; it does not mark the item accepted-local or production-qualified.

## Immutable5305 verification (historical)

Immutable runtime `http://127.0.0.1:5305`, artifact `ef7c61e62cc2892589ec6500a36bda8f84734ac613fb59849db9bbeaef248ad9`, advertised source fingerprint `3c5e9fd8e6c2c08a8e03f75a743d1525ac0e55ca1812ed3c2f259b7f739cb490`, revision `afbe9c89f6fae496df28493b71bc2ac9a27d0add`, built `2026-10-13T04:59:20.951Z`. The fetched `/audit-provenance.json` is byte-identical before/after, SHA256 `a714ec588b9df002505aea002cd7ab191261b2516bd1707775e4e45458d945ab`. This reviewer independently rehashed **all3632 actual artifact files before and after, zero mismatches**. Source fingerprint is the immutable builder's declared aggregate; actual built-file integrity was independently verified. Evidence: `output/playwright/drawer-independent/immutable-5305/provenance-{before,after}.json` and `artifact-hash-check-{before,after}.json`.

| Finding / regression | Immutable5305 result across Chromium, Firefox, WebKit |
| --- | --- |
| DRAWER-REVIEW-001 no enabled controls | Repaired: forward/reverse each start from freshly opened modal; focus remains inside; Escape closes and restores trigger |
| DRAWER-REVIEW-002 phone horizontal calendar overflow | Repaired: actual cell variable36px, panel/popup288px, x24/right312, document320px; now actual WebKit panel capture settled |
| DRAWER-REVIEW-003 active loading contrast | Repaired: RGB(49,67,0) on RGB(255,253,247), measured10.677872916028905:1 |
| Normal boundaries, nested drawers/ignored popup, dirty OS/appearance,90 cycles and resize | Requested24/24 tests pass in224.6s; no skipped/flaky cases |
| DRAWER-REVIEW-004 short-height calendar actions | **Open:** extra actual-wheel regression fails3/3; viewport ratio0 for Today at600px height |
| Height300/400/600 detailed geometry collection | Three probes collect all9 cases successfully; data collection success is not UI acceptance |

All96 PNGs from the immutable main69, bottom-action9 and height-probe18 captures were opened at original resolution. Per-image hashes/observations: `output/playwright/drawer-independent/immutable-5305/inspection-manifest.json`. These are fresh scoped repair proofs, not the full state×width×appearance×engine matrix. Earlier source-runtime runs below are retained as dated baseline/inconclusive evidence.

### DRAWER-REVIEW-004 baseline: nested calendar cannot fit short viewport height (high, repaired on5306)

At320×600 the popup is x24/y257/width288/height441/bottom698; the date panel is height387/bottom644 and Today is y662/height18. Computed dropdown position is absolute, transform none, max-height none, overflow visible. A real pointer wheel400 at x180/y440 scrolls the document from0 to98, but native alignment reanchors the popup: computed top257→355px, viewport popup y stays257 and Today stays662. Document scroll height grows698→796. The action remains entirely outside the viewport after waiting10s. Reproduced in all three local engines, with retained failure traces and viewport screenshots. No forced click or DOM adjustment was used.

At height300/400 native flip instead places the popup above the viewport: Chromium/WebKit y=-239/-236, Firefox300 y=-299 after native drawer-body scrolling changes the trigger position. Calendar heading, previous/next month controls, and leading dates are clipped above the window; normal wheel cannot expose negative document space. All engines use height441 with no bounded internal scroll region. Thus a width-only repair is insufficient for this nested state. Source/runtime inference: the native popup's flip/reposition behavior needs viewport-aware placement or a bounded contained region; root owns the production repair and dependency closure.

Exact per-engine before/after data for every requested height lives at `output/playwright/drawer-independent/immutable-5305-vertical/<engine>/vertical-{300,400,600}.json`: popup/trigger/panel/container/Today/drawer DOMRects, computed position/top/left/transform/height/maxHeight/overflow, scrollX/Y and body/html/root overflow. Main24 tests are green, but this subsequent independently discovered failure prevents item acceptance.

## Fresh runtime evidence

Root runtime `http://127.0.0.1:5300`, owning worktree `.worktrees/ant-reui-20261013`, HEAD at review start `60e924dc176ec93ffdd4a1352344489ff212839a` plus dirty audit changes. Source and built dependency hashes are in `output/playwright/drawer-independent/frozen-corrected/start-fingerprints.json`. Rendering hashes were unchanged through the final measurement run; the reviewer test file was subsequently expanded to add measured regressions. Shared root owns all repairs.

Playwright 1.64.0 local Chromium 156.0.8078.4, Firefox 157.0, WebKit 27.2. These are local engine results, not released Chrome/Edge history, actual Safari, iOS, screen reader, or physical touch proof.

Fresh independent spec: `qa/ui/tests/ant-drawer-native-review.spec.ts`. Reviewer fixture `apps/playground/src/qa/fixtures/ant-drawer-native-review.tsx` was explicitly approved by the root for native parent/child drawers and disabled-only content. It uses actual public exports and props. No production/shared files were edited by the reviewer.

| Run | Result | Meaning |
| --- | --- | --- |
| frozen-corrected | 12 passed / 3 failed, 203.3s | Four core interaction tests pass in each engine; disabled-only modal Tab fails in each engine |
| focused-measurements | 3 real popup failures / 3 invalid measurement tests | Popup document overflow reproduced; Spin probe used removed `.ant-spin-text` class and timed out, so those three failures are reviewer errors |
| focused-corrected | 3 passed / 3 failed, 20.1s | Dirty open resize settles within viewport in each engine; correct `.ant-spin-description` contrast fails in each engine |

Raw JSON reports use unique paths under `qa/ui/output/playwright/drawer-independent/<run>/results.json`; screenshots/traces use `output/playwright/drawer-independent/<run>/`. No worker/root reports were overwritten. Earlier aborted runs are preserved separately: an intervening shared package rebuild invalidated the first run, and an exact required-label selector was corrected before the final run. Neither establishes a browser freeze.

## Defects

### DRAWER-REVIEW-001: modal with no enabled controls lets Tab escape (high)

Open `audit.html?item=ant-drawer-native-review&fixture=stress&profile=no-focusable`, then press Tab. Native `Drawer` has `closable={false}` and only a disabled Input. Focus visibly lands on the outside Open drawer trigger while the modal remains open. Reproduced in all three engines, with assertion failure and retained traces. Before/after images: `frozen-corrected/<engine>/no-focusable-initial.png` and `no-focusable-forward.png`.

Source cause: `@rc-component/util` focus lock obtains an empty `getFocusNodeList(lastElement)`. The current patch handles first/last enabled-control boundaries only; it neither consumes Tab nor focuses the lock wrapper for an empty list. The private fixture includes an outside input to expose escape rather than relying only on document body. Reverse Tab in this no-control state is still unproven because the first forward assertion aborts the test. Root must repair and then test both directions from fresh initial focus, Escape/focus return, nested restoration, and normal boundaries.

### DRAWER-REVIEW-002: nested calendar exceeds 320px viewport (high)

Open the real stress `nested` profile at 320×600 and click Review date. Measured `document.documentElement.scrollWidth=407` in all three engines. Chromium/Firefox popup x=24, width=382.5, right=406.5, while the drawer itself remains x=0, width=320. Viewport failure screenshots show the calendar's right controls/dates cut off. Full-page captures expose the expanded 407px canvas. Geometry JSON: `focused-measurements/<engine>/popup-geometry.json`.

Source cause: Kooya comfortable `controlHeight=44` maps to Ant `controlHeightSM=33`; Ant DatePicker `cellWidth=controlHeightSM*1.5=49.5`, and its panel formula yields `7*49.5+36=382.5`. No responsive panel constraint reduces this at a 320px viewport. Fix must preserve useful date targets and actual native DatePicker interaction, without hiding the overflow or clipping the popup. Root owns the token/CSS repair and its dependency closure.

WebKit's popup wrapper measured zero width although the document already overflowed; its captured popup was blank. Those WebKit frames are rejected as settled visual proof. The document overflow failure remains real, but a repaired WebKit capture must explicitly settle/render the panel and prove its child geometry before claiming calendar acceptance.

### DRAWER-REVIEW-003: active loading status text is 1.24:1 (medium)

Open real stress `loading` profile in light comfortable mode at 320×600. `.ant-spin-description` renders “Loading project settings” at RGB(215,242,15) on RGB(255,253,247): **1.2438987155489483:1**, below the required 4.5:1. Identical measured failure in all three engines. `focused-corrected/<engine>/loading-contrast.json` and `measured-loading-320.png` contain the evidence.

Disabled input/save controls are not the finding; the active loading message is. Source cause: Spin inherits the lime global primary accent without a contrast-safe semantic override. Existing axe tests cover the default profile and therefore miss loading. A component-scoped semantic color repair can preserve native component identity; root owns it.

## Positive evidence and practical limits

All engines pass normal forward/reverse traversal, Close/mask/Escape dismissal and trigger focus return, 30 open/close cycles each (90 total), no open residual drawer after each close, body scroll unlock, and normal Tab after closing. The cycle tests report no page errors. They do not instrument all listeners/timers or prove absence of memory leaks, and other tests do not establish universal warning/resource-error absence.

All engines preserve dirty Unicode input, connected input node identity and focused state across live OS reduced-motion and light comfortable→dark compact changes. A separate resize probe waits for layout settling and measures document/body/main width320 after resizing an open dirty drawer. The earlier WebKit full-page resize image retained old1240px dimensions and is rejected as settled evidence; no persistent resize overflow is claimed.

All engines pass native parent→child Drawer focus lock and restoration, then return focus to the original trigger. Real DatePicker header action and popup-first Escape behavior pass, although the phone calendar geometry above fails. Form labels resolve via actual Form.Item names, errors stay open, and the dedicated settled error captures show the required-field message. Some early/error-failure frames omit the animated message; they are not stable visual acceptance frames.

Normal screenshots show intact labels, fields, right-aligned desktop panels, visible focus outlines, phone panels within their viewport, long title wrapping, scrolled sections28–30, and reachable Cancel/Save footers. Empty-state illustration/message and disabled Save render distinctly. Native close target24px is a secondary action meeting the stated24px minimum; physical-touch usability remains untested.

## Actual visual inspection and outstanding denominator

**All78 PNGs in the three final review-run directories were opened at original resolution**, including66 intentional case captures and12 failure screenshots. Per-image paths, SHA-256 and concrete observations are in `output/playwright/drawer-independent/inspection-manifest.json`; it checks that the manifest equals the actual final-run PNG set. Viewing a transitional/broken image is recorded as inspection, never acceptance.

Of the worker's207 screenshot manifest entries, this reviewer independently opened the same7 previously worker-inspected images; **200 remain uninspected by this reviewer**, and the worker reports only7 inspected. All207 worker frames are stale to the current root rendering closure after the shared CSS/harness changes. Tests234/234 alone cannot accept those images.

The reviewer captures cover catalog widths320/768/1920 in light comfortable/dark compact, six stress profiles at320, nested lock and focus edges, plus live dirty transitions. They are not the required64 combinations per state per engine. Widths360/390/1024/1280/1440, cross mode/density combinations, normal/reduced-motion captures for every reachable state/profile, all four theme presets/branding, text spacing,512-unbroken/200-character boundaries, RTL/font failures, catalog iframe embedding, native browser zoom/text resize, temporal/CLS/latency budgets and complete public props/refs/React18/19 consumers remain unproved by this review. Actual Safari/iOS, screen reader and physical touch remain unavailable-platform blockers.

`packages/ui/src/components/index.ts` and built `dist/components.js` directly re-export peer Ant Drawer; native identity is preserved by source structure. The workspace pnpm patch changes a dependency used by that peer, but **packed consumers do not automatically inherit the root's patchedDependencies**. Standalone consumer/runtime proof and an explicit portable repair delivery mechanism remain required. No package compatibility or package qualification pass is issued here.

After shared fixes, rerun the meaningful failures and dependent focus/portal/dirty checks, regenerate source fingerprints, recapture and inspect affected cases on the exact final immutable rendering target. This review is a repair request and coverage account, not item acceptance.

## Earlier repair verification attempt (historical, inconclusive)

The first post-repair runtime run under `output/playwright/drawer-independent/post-repair/` was interrupted on root instruction because patch metadata and the root lock were inconsistent; the required frozen install/build was not yet established. Its `invalidated.json` records the environment condition. Do not use its partial tests as product acceptance or a final regression verdict.

That attempt produced normal and nested focus failures worth preserving. Read-only source tracing found DrawerPopup's `onFocus` calls `ignoreElement(e.target)` for internal controls, so an unconditional `isIgnoredElement(activeElement)` Tab early return can bypass the very boundary wrapping being repaired. The root received this explanation and corrected the guard to distinguish internal controls from genuinely outside popup portals. Subsequent immutable5305 verification closed the original three findings in the tested scope and discovered defect004. Final immutable5306 verification at the top of this report closes all four reported defects in the tested scope, while full item acceptance remains blocked.
