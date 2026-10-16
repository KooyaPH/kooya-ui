# DataWorkbench standard shared repair request

Date: 2026-10-13. Worker baseline `45a4123bf667fade8e43c96397d16187ca3eda1c`. No shared source edits made. Acceptance: **failed baseline; awaiting shared repair, full matrix, image inspection and independent reviewer**.

Source hashes:

- `data.tsx`: `e47b02d85cf97cf73fd5a605120ec10f7685c4f4ee0f986897b853aa4f4bbbee`
- `collections.css`: `4c8ca3fd9dfe28b49a82f15c5f57d71b02ddfc1ae527e1255b6e2f96f1540c27`
- `state.ts`: `ba9c3c3fa224f6df1f4f5eb4f47ff3b9fa5b06c4491d238d21066047586d84c7`

## WB-001: phone document overflows 596 CSS px

Severity: major. Real catalog URL `/audit.html?item=kooya-blocks-data-workbench-standard`, Chromium, 320x900, light/comfortable/normal motion. Document scroll width916, viewport320; `.composition-stack`, `.ant-table-wrapper` and `.ant-table-content` all900px. Screenshot `output/playwright/workbench/before-320.png`, SHA `3112312ef7075d3a6aacff9ce33c2c01b43e02dc05b89fb6b21264053fa3e4c7`, visually inspected full resolution. Search toolbar and table extend horizontally with the whole document. Grid implicit track uses auto min-content from Table scroll.x900, preventing contained horizontal scrolling.

Red: `regression: narrow document contains table overflow`, expected <=1, received596.

Proposed minimum source change for root review: add a unique `composition-data-workbench` class to DataWorkbench body; define its grid track `grid-template-columns: minmax(0, 1fr)` and ensure direct descendants `min-width:0`. Keep table's x900 contained scrolling. Do not hide document overflow to mask inaccessible content. Check grouped nested grid/table and embedded narrow containers independently.

Dependency closure: all DataWorkbench domain/alternate/embedded uses, including collection templates/applications; scoped class minimizes unrelated effects.

## WB-002: Reset view preserves page3

Severity: moderate. At1280px Ready, click page3 (two records), click Reset view. Active page remains3. Before screenshot/trace pinned under `output/playwright/workbench/baseline`.

Root cause: native Table pagination is uncontrolled (`defaultPageSize:5`) and reset handler has no pagination reset. Red `regression: reset returns pagination to first page`, expected1, actual3.

Proposed root review: local reset generation key on Table(s), increment only Reset view, preserves saved rows while returning native per-table pagination/page size/expansion to defaults; alternatively explicit keyed per-table local pagination state. Avoid sharing one current page across different grouped tables. Reset must retain saved records and restore5-per-page/first page.

## WB-003: hidden table measurement clone is focusable

Severity: serious accessibility. Both modes. `tr.ant-table-measure-row[aria-hidden=true]` contains a live `input[type=checkbox][aria-label="Select all"]`. Actual native measurement implementation clones raw column title (including the selection control) in `@rc-component/table/es/Body/MeasureRow.js`; MeasureCell wraps title in height0/overflow:hidden but leaves it focusable. Axe `aria-hidden-focus`; dedicated red verifies focus cannot enter measurement clones. Header category popup button is also cloned.

Requires root owned adapter/dependency repair. Prefer inert measurement row at rendering origin with React18/19 type compatibility verified; never blanket hide real header/selection controls. External packed consumers must receive the same fix, unlike a workspace-only patch silently omitted from package installation.

Dependency closure: native Tables with measurement columns and interactive title/selection/filter content; no full closure acceptance inferred.

## WB-004: light Active tag contrast2.75

Severity: serious accessibility. Actual Table Active Tag text `#38652a` against derived background `#a0a69c`; 12px text requires4.5. Axe actual-workbench light fails `color-contrast`; dark has no reported contrast violation in this baseline check. Root provider semantic success foreground changed while derived background still comes from Ant's algorithm, producing this pair.

Proposed root review: map paired semantic Tag success text/background/border roles coherently; browser measure actual rendered pair. Do not remove color semantics or claim all components fixed from one tag.

Dependency closure: provider semantic Tag success styles plus affected status displays across collection demos.

## WB-005: expand-column header has no accessible name

Severity: minor accessibility, still prevents acceptance. Native expandable column produces empty `thead th.ant-table-row-expand-icon-cell`. Axe `empty-table-header` both modes; dedicated red requires Expand/Details accessible name.

Proposed minimum root change: supported `expandable.columnTitle` with accessible text, visually hidden only if appropriate to existing header geometry. Preserve expand icon button semantics and table width.

## Current verification limits

Only initial 320px baseline screenshot has been manually inspected so far. Corrected role/label selectors allow two meaningful Chromium behavior tests to pass: filtered/sorted/page/selected CSV contents and archive; actual Add validation/edit cancel/save/dirty appearance/motion/resize preservation. These are not acceptance.47 declared states x192 local matrix cases =9024 minimum, plus embedded/container/zoom/textspacing/performance/keyboard/animation/etc. The extended supported browser versions, actual Safari/iOS, physical touch and native screenreader remain explicit platform limits. All repaired images require exact current source fingerprints and fresh independent captures.

## WB-006: real unbroken record content loses contained geometry

Severity: major. Through actual Add form enter512 `L` characters and8192 `N` note characters. At1280px, long name row document4172px; expand that actual record, document81980px. Long status notice/name link uses unbroken text; row note is plain paragraph with no break handling. Drawer uses the same unbroken name/note, requiring title and body containment checks. Pinned before images and hashes are in `output/playwright/workbench/state-smoke-v3/.../cases.json` for `long-name-row`, `long-note-expanded`, `long-details`, `long-edit`. This is distinct from default phone grid intrinsic sizing: a grid fix alone does not intentionally wrap long content.

Red `regression: real long records preserve contained table, notes and details` enters content through supported UI then checks doc/Drawer geometry and retained full accessible name. Proposed root review: scoped workbench grid containment plus wrapping or intentional truncation of record-name link preserving full accessible name; `overflow-wrap:anywhere` on actual record notes and saved status text; appropriate supported Drawer class/style for title/body. Do not change domain data API or suppress overflow globally.

Current capture coverage:44 of47declared states captured at1280/light/comfortable/normal Chromium in initial state traversal; shell controls being captured separately after correcting real radio interaction. Remaining191configurations per state and all independent review are pending. Automated geometric errors are intentionally retained as failures. No acceptance or matrix completion claim.

## WB-007: active Table sort/filter cues fail nontext contrast

Severity: serious accessibility. After current shared repair and Round3 focus patch, actual light1280/comfortable/default-motion browser, click Hours ascending; active caret computed `rgb(215,242,15)` on `rgb(236,230,216)` after400mssettled, contrast1.09055. Apply Design category filter; active filter cue contrast1.00625 after400mssettled. Required3:1. Dedicated independent rendered-color test calculates WCAG luminance/compositing from actual browser values; both light assertions fail, dark cue test passes. Root provider source SHA `7c0a651a30765dd60bc7dc5db4351f4996cd91f3e94515f848ac0e395e8c1caa`; current lock SHA `4483d7a9ce9a1ad1664746bf5812f9daf356883a96deac290da61840cb821c9c`.

Before screenshot/SHA: `output/playwright/workbench/after-state-pilot/...-chromium/cases.json` states category-filtered and sort-value-descending. Dedicated reds, computed values, images and traces: `output/playwright/workbench/additional-contrast-red`. Repro/regression `regression: active table sort and filter cues contrast light`.

Root cause: provider maps brand accent as global colorPrimary, with scoped selected cues for Checkbox/Radio/etc but no Table override. Native Table uses colorPrimary for active sorter/filter icons. Proposed root review: scoped Table colorPrimary=focus preserves accent-filled primary actions and existing Table selected-row backgrounds. Verify actual sorted/filter/hover backgrounds, both modes, all engines. All Table uses depend on this provider role; no closure pass inferred.

## WB-008: actual empty result description fails text contrast both modes

Severity: serious accessibility. Actual search `no-matching-audit-record` returns0records and native Table Empty NoData description. Axe on actual workbench reports light3.34 (`#8c8b88` on `#fffdf7`) and dark4.4 (`#848381` on `#1f1e19`),14px text requires4.5. Dedicated red tests `regression: real empty search text contrast light/dark` both fail after selecting actual `.ant-empty-description` (avoids duplicate SVG title). Pinned images/traces/results under `output/playwright/workbench/empty-contrast-red`; initial raw actual values and axe node data in `additional-contrast-before.json`.

Root cause: native Empty style uses token.colorTextDescription; provider only maps colorTextSecondary/placeholder/quaternary. Proposed root review: Empty component colorTextDescription=semantic muted role, verify required contrast against actual inherited surfaces both modes. Check DemoFrame shell empty separately; do not conflate with actual filtered results. Empty/provider dependency closure remains unaudited.

## Intermediate repaired verification (not acceptance)

WB001..006 nine focused checks across3local engines passed27/27. New real modal/Drawer/nestedSelect keyboard test initially failed Chromium/WebKit, Firefox passed; root Round3 focus helper corrected ignored internal boundaries. Round3 run29/30passed with only first cold Chromium ready-marker failure caused by traced `net::ERR_NETWORK_CHANGED` on local UI modules; unchanged same-hash follow-up narrow test passed. All30invariants individually verified, but cold-resource failure remains recorded, not hidden.

Round3 fresh state pilot47x3=141cases captured at1280/light/comfortable/normal motion; all3test cases report passed3.4m, all cases JSON have no doc overflow/console/resource events. Tool session returned143after finished log; abnormal runner exit retained, no clean exit claim.12current Chromium images have actual worker observations;129images still uninspected; all independent fresh reviewer observations are absent.189other configurations per state remain (192minimum configurations minus3pilot engine configurations). New WB007/008 prevent acceptance and will invalidate shared-provider-dependent images after repair.

## WB-009: cross-group selection loses earlier selected record

Severity: major data consistency. Ready -> Group by category -> select first Design row (Brand refresh), then first Product row (Launch website). Selected count remains1 and Design checkbox becomes unchecked. Red `regression: grouping preserves selected record ownership across tables` fails expected2selected. Before screenshot SHA `c661d4fa5c7135292068fb097dd8ea8cdcf46923cfcf3cdf7f19e1554baf067d`, `output/playwright/workbench/group-selection-before/.../cross-group-selection.png`, with trace/snapshot.

Root cause: each grouped Table receives only its own category rows; native Ant useSelection defaults preserveSelectedRowKeys=false and filters returned keys through the current table's getRecordByKey. DataWorkbench owns one shared selected-ID set. Proposed supported native flag preserveSelectedRowKeys=true; verify cross-group/cross-page selection, filters, selected CSV and archive record attribution. Keep source data/local ownership unchanged.

## WB-010: column-width slider lacks accessible name

Severity: serious accessibility. Open Table controls. Real a11y snapshot contains unnamed slider. Visual label wraps a nonlabelable div-role slider and cannot associate it. Red `regression: table column-width slider has real accessible name` fails. Per-state axe independently confirms aria-input-field-name on actual .ant-slider-handle (min140/max420/current230). Before screenshot `output/playwright/workbench/slider-label-before/.../controls-slider.png`; per-state actual evidence under state-axe-investigation.

Proposed supported native Slider prop ariaLabelForHandle="Name column width" (Ant Slider type index.d.ts73). Verify actual accessible name and keyboard Home/End; do not merely associate label with a nonlabelable wrapper.

## WB-011: actual category popup checkbox fields lack labels

Severity: serious accessibility. Open category filter. Per-state axe reports label rule on three native Checkbox inputs Design/Product/Operations. Actual native FilterDropdown render uses Component checked with no children/ARIA label and a sibling span filter.text, leaving each wrapped checkbox label empty. The menuitem's name does not label its child input. Before screenshot SHA `1b598f39136a8f3cf7400a9e1e6236dd266aec05a991a8766c9ef50d6b30f59c`, state-axe-investigation category-popup; trace/case actual node data included.

Root review needed: either supported own accessible column.filterDropdown controls preserving filter state/keyboard/confirm/cancel, or owned native dependency patch with robust checkbox/radio label association for arbitrary ReactNode filter text. A patch must preserve toggling exactly once and external-consumer delivery. Never rename only the menuitem while leaving its exposed checkbox unlabeled.

## WB-012: open SingleSelect dims real selected text below AA

Severity: serious accessibility. Actual Add Category/Status popups: visible selected field text Design/Pending becomes pale. Per-state axe reports1.74contrast `#c4c2bd` on `#fffdf7` at14px on actual field; worker visually inspected Add Category screenshot. Before SHA `27759b302de93d80ace734fc9f84372698f1006ad036eb8dd01858396e81e7f8`, state-axe-investigation add-category-popup; matching add-status-popup also red.

Root cause: native Ant select-input style hardcodes open singleSelect content-has-value opacity0.25 at line265, including read-only nonsearch selects. A foreground token cannot overcome25%opacity on a light background. Proposed minimum owned CSS scoped to open single select content-has-value, opacity1, explicitly excluding content-has-search-value so typed search still hides the old value. Verify status toolbar, Add/Edit Category/Status, Select/Cascader/TreeSelect dependency exposure, both modes, real searchable selectors and reduced motion.

## Revised denominator and blocked qualification

Actual flow enumeration adds grouped-selected and four real Add/Edit Category/Status popup states:52declared states,9984minimum cases for the three bundled local engines. Root released Chrome manifest also lists runnable155.0.8059.39,154.0.8037.92,153.0.8010.52. These are additional targets rather than substitutions; including them raises52-state minimum to19968cases, plus embedded/container/zoom/textspacing/font/performance/animation and content boundaries. No released Chrome item captures yet. Native Safari/iOS, physical touch, native screenreader and unavailable exact Firefox/Edge/Safari previous versions remain explicit limits. Historical47-state pilot evidence stays dated, with all incomplete inspections and new defects retained.

## Frozen artifact 5305 verification and two new open defects

Target artifact `ef7c61e62cc2892589ec6500a36bda8f84734ac613fb59849db9bbeaef248ad9`, source fingerprint `3c5e9fd8e6c2c08a8e03f75a743d1525ac0e55ca1812ed3c2f259b7f739cb490`, full source hashes in `/audit-provenance.json` and worker `output/playwright/workbench/immutable-provenance.json`. Focused sixteen checks per engine passed48/48 with exit0. The52-state one-configuration pilot captured156 originals across Chromium/Firefox/WebKit with state axe enabled; all three configuration tests failed the same two states below. No full matrix, visual acceptance or item pass is implied. The156 originals remain pending individual worker inspection and independent review.

## WB-013: long Drawer content cannot be reached or scrolled by keyboard

Severity: serious accessibility. Actual Add record -> name Keyboard scrolling details ->8192-character note -> Save -> open detail Drawer -> focus Close -> real Tab -> PageDown -> End. On frozen Chromium, focus remains outside the body, PageDown leaves scrollTop0, End leaves top0 plus viewport843 versus scrollHeight5319; final Hours:0 remains outside viewport. Dedicated regression checks actual focus containment and native scroll movement, final content visibility and a named focusable Record details region. Native scroll settling is allowed before recording values. Existing52-state pilot axe reports scrollable-region-focusable on long-details in all three engines.

Before Chromium keyboard screenshot SHA `813ac61853e7ff151bb3a5a11dea4b47fba55e677bba0deb02deb31adb97a728`, `output/playwright/workbench/wb013014-before/.../keyboard-details-end.png`, actually inspected full resolution: Close remains outlined; note still starts at the top and final Hours is absent. Exact failures/trace in wb013014-before.log and that directory. State-pilot long-details SHA `d3c6cec268db6621cc3272c4c78c4bd5d08f4635cde7160a1804f0b9bb74e926`.

Source cause: native Drawer body contains paragraphs and strong text with no tab stop. Root proposed minimal item-local supported markup: wrap existing details in a named `role="region" aria-label="Record details" tabIndex={0}`. Preserve record contents, note wrapping, focus trap and return. Actual Tab/PageDown/End plus per-state axe must pass after repair; adding tabindex alone is not proof that scroll works.

## WB-014: simulated loading shell exposes an empty heading and no status

Severity: accessibility. Actual DemoFrame Loading selection exposes Skeleton's empty h3 as a heading and no role=status. Dedicated regression asserts no accessible h3, real status text Loading Project workspace, and zero axe violations on the item. Frozen Chromium fails all three;52-state pilot independently reports empty-heading in all three engines. This is a simulated shell, not evidence of an async record workflow.

Before state-pilot shell-loading SHA `40ec977d6ad66088642a0246f428df889023b148e874663a653d86040760d8a6`; targeted screenshots/traces in `output/playwright/workbench/wb013014-before`. Source `shared.tsx` renders native Skeleton directly; Skeleton generates an empty decorative h3. Root proposed an aria-hidden wrapper around the existing Skeleton plus separate sr-only role=status Loading {title}. Verify native decorative semantics and actual accessible status, preserve visual shell and animation.

The settled targeted before regressions failed6/6 across all three local engines on5305 (exit1, `wb013014-before-engines.log`). Root selected the existing view title for the loading announcement; regression now expects Loading Project workspace, preserving meaningful state semantics without imposing generic copy.

## Individual original inspection of frozen5305 pilot

All156 originals were opened individually using original image detail, then each PNG SHA256 was compared with its captured case hash before recording workerVisualObservation. Three per-engine cases.json manifests preserve exact IDs, source/artifact provenance, screenshot hashes and individual observations. Compact indexed observations: `output/playwright/workbench/frozen-5305-visual-observations.json`. Independent observations remain0/156. This is one configuration per engine, not the required matrix.

New visual findings require investigation: WebKit search field renders native and Ant clear glyphs together. All engines show inner/outer search focus outlines. More materially, WebKit Add Category/Status popup is displaced above/right and Edit popups render outside Modal to its right; edit-category actual rectangle x1006/right1376.97 versus Modal x380/right900, while document.scrollWidth still1280 because overflow locking hides the overflow metric. Chromium edit-category popup shrinks to about94px and truncates Operations. The pilot geometry records these popup rectangles but only asserted document width, which is insufficient. Screenshot occurs after geometry and before axe; therefore axe cannot cause the captured displacement. Native appear-active class remains in the stored geometry. Current target5306 has a newer shared popup repair: its effect on these exact states is not yet verified, and no additional production repair is requested until native settling/viewport screenshot investigation completes.

## WB-015: rapid nested Select opening caches transformed Modal width

Severity: major visual interaction quality. On immutable5306, open Edit then immediately open real Category Select. After1200ms native Modal and popup transforms are none, but Chromium popup remains94.39px versus logical trigger472px, truncating Operations. Probe samples300/1300/2800ms confirm persistent cached width on5305 and5306; Firefox popup274/281px and WebKit371/472px depending animation timing. Ordinary viewport captures establish this is not fullPage screenshot distortion. Parent's proposed supported native getPopupContainer for only the two record-form Selects puts popup under nearest .ant-modal, so trigger/popup share transform and rc-trigger scale normalization can preserve logical width. Preserve callbacks/data ownership and validate real rapid Add/Edit opening, full text visibility, popup bounds and anchoring after settling in all engines.

Dedicated meaningful red opens Add/Edit selector immediately, then waits for native animation settling and asserts popup logical-width equality within2px, complete Operations text, horizontal anchor and viewport bounds. No pre-wait is allowed in this regression. Stable-state matrix captures can separately wait for completed Modal entrance before later actions without erasing this fast-interaction requirement.

## WB-016: native mobile pagination hides a reachable action

Severity: responsive workflow loss. Actual320px Ready on5306 in Chromium/Firefox/WebKit: Page Size combobox remains in DOM but its native .ant-pagination-options ancestor has display:none; screenshots show only previous/pages/next, no size chooser. All three original `mobile-pagination-{engine}.png` images individually inspected; actual visibility/DOM/computed style in `mobile-pagination.json`. The declared size-dropdown/size-ten states cannot be reached at this width. This is distinct from contained horizontal table scrolling, which is expected.

Native owning source antd6.6.5 es/pagination/style/index.js528-530 unconditionally hides options below token.screenSM. DataWorkbench explicitly sets showSizeChanger true, but that cannot overcome the media style. Proposed minimal root-owned item-scoped CSS restores display:flex on .composition-data-workbench .ant-pagination-options and preserves native pagination flex wrapping/contained geometry; do not change all library pagination or invent another action. Regression requires visible Page Size, real10/page selection and10rendered records plus contained document at320. Verify320/360/390, both densities and grouped tables before closing.

WB015/016 targeted before run on5306 failed6/6 across all three engines (exit1, `output/playwright/workbench/wb015016-before.log`). WB015 after native transforms none: Chromium Edit width deficit377.609px and Operations72px text versus62px available; Firefox Edit deficit190.733px; WebKit Add deficit86.969px. All three WB016 checks fail visible Page Size before any simulated state mutation. Reported target artifact773e2fa789081bff8de3511ec7c658dd681f370ade85f4d2fad3ed4a847ffbe3, source8cf186cce5138de8dd4f894fbfe2bcb4ed6c8b7d6fefb19b6049d38302cbda0f. Ordinary Chromium viewport evidence SHA783385a80bdc36283bbdc46f054db9732e050cea1d1fe87e109f47a1e862a8f6. Revised mobile regression covers both densities, physical44px chooser/page/option targets, popup bounds, real5→10/ten rows/12-record count/page1 and byte-identical all-record CSV.

## WB-017: clearing numeric Hours saves null and exports inconsistent data

Severity: data consistency. Native Add form -> name Cleared hours audit -> clear Hours spinbutton -> Save closes successfully, count13. Actual displayed Hours cell is empty but its CSV field is literal null. Public WorkRecord.value is number and InputNumber min0; Form.Item value has no validation and onFinish spreads native null into local record. Actual JSON/CSV and individually inspected original screenshot in `output/playwright/workbench/null-hours-before.*`; three-engine meaningful CSV-versus-displayed-value regressions all fail on5306 (exit1, wb017-before.log).

Root decision: preserve declared nonnegative numeric domain, reject missing/nonfinite input through supported Form.Item validation; zero remains valid and no new upper limit or silent normalization. Revised regression requires named invalid Hours with preserved Project draft/count12; typed0 saves and both table/CSV show0. Root owns shared implementation.

WB013 final-focus assertion now permits Firefox focusing the native scrollcontainer itself: named Record details region must exist and final activeElement remain inside actual Drawer body; real Tab/PageDown/End/final Hours visibility remain required. Private wrapper identity is not a user-facing requirement. Root dev feedback reports functional scrolling assertions already pass Firefox while exact wrapper focus differed; this is scoped test correction, not immutable artifact acceptance.

## Final declared-state correction before full matrix

Actual native20/page is a distinct reachable twelve-row rendering; missing Hours validation adds a distinct labeled invalid draft. Contract now54states,10368minimum local engine cases,20736including three runnable released Chrome targets, plus required supplementary profiles. Historical47/52-state runs retain their original denominators and source hashes. Matrix captures now explicitly wait for finite native overlay motion and check visible overlay horizontal/popup vertical bounds. Dedicated WB015 still opens nested selectors immediately and catches persistent rapid-interaction width faults after settling; waiting stable captures does not waive the fast path.


## Immutable5307 candidate checkpoint (2026-10-13)

Artifact `d301063c260f91798a48e78bfb63c98dabe7b5189ed351e5354d08d9978affaa`, source fingerprint `62680013c30aad6d6d02b804b1b5c969f4252ed9ae9e3c49308bee636324730d`; immutable endpoint5307. Exact root raw dependency sources copied into this isolated worktree before capture; no shared source was edited by worker. Pinned provenance JSON SHA256 `5321cb220fd59f4ffe430f118cdd130c145e636a4a9acdd68d1e286048efb096`.

Focused66/66 regressions passed with exit0 (22 per engine,2.5m), including WB013 real Tab/PageDown/End and final Hours visibility, WB014 meaningful loading status, WB015 immediate Add/Edit opening followed by full logical-width/anchor/text assertions, WB016 native5→10 chooser/44px targets/CSV preservation at320 both densities, and WB017 retained invalid missing-Hours draft then valid0 table/CSV. Root item-local supported Modal transitionName ant-fade preserves native opacity motion and avoids transformed nested popup caching; experimental popup-container callbacks were reverted. No global Trigger repair acceptance follows from this item repair.

Pilot54states x3engines completed with3/3 configuration tests passed, exit0 (6.4m). All162 originals individually opened at original detail and SHA verified; observations merged into each cases.json and indexed at `output/playwright/workbench/frozen-5307-visual-observations.json`, SHA256 `ef11fe8df386b428b2d453227695c7152566acf95b5883dd7b23b3b20e88d4c7`. Actual state axe violations0, captured browser console/resource events0; visible popup/document bound assertions passed. Separate failed no-tests launch log preserves an overly anchored grep selection mistake; corrected matcher ran the complete pilot without changing source.

Worker inspected all columns/rows, actual popup options, forms/validation/drafts/notices, grouping and native virtual viewport, long512name/8192note wrapping and three simulated shells. Full logical-width form popups now show Operations in all engines. Inner/outer input focus rings and WebKit native+Ant adjacent clear glyphs remain recorded visual observations for reviewer assessment. Long Drawer initial captures intentionally show only its viewport body segment; focused real End scrolling reaches Hours0. The full-page image extends underlying document below fixed900px overlay, which is capture behavior rather than visible viewport content.

This checkpoint covers only1280/light/comfortable/default-motion pilot images, plus targeted focused configurations. Independent fresh review0/162; required full10368 local matrix,20736 including released Chrome targets, supplementary native zoom/textresize/textspacing/embedding/font/performance/motion qualifications remain pending or explicitly blocked where platforms are unavailable. All historical failing evidence preserved. Acceptance stays shared-repair; no item or library pass is claimed.


## 320px expansion and open qualification limits (2026-10-13)

Same immutable5307 renderer; no source changes or rebuild. Current54states at320/light/comfortable/default-motion x3engines captured162 originals. Original test session completed exit1 with Chromium/WebKit configurations passing and Firefox failing final zero-events assertion (5.9m). Per-state geometry/popup-bound/axe-violation assertions did not fail. Firefox emitted two native browser scroll-linked positioning warnings; first cumulative event appears at status-filtered, retained through last state. Full warning text, actual URL, failing assertion, trace and screenshot preserved in `output/playwright/workbench/frozen-5307-320-state.log` and Firefox output directory. This run stays red; no warnings were suppressed or classified benign without investigation. Native browser performance warning does not yet establish an application repair, and root/fresh reviewer must resolve its implication.

Worker individually inspected original33/162 narrow PNGs with SHA verification: Chromium17 (ready through both name sort states plus page-size popup, missing Hours, long details, extreme value and four form popups); Firefox8 and WebKit8 (the latter eight critical states). All four Add/Edit Category/Status popups show full labels within320px; missing-Hours error preserves draft and readable actions. Native contained horizontal table scroll exposes Category when clicked. Extreme Hours is offscreen in the inspected name viewport; its numerical cell is not visually inspected by those images. Long Drawer title wraps with close visible; initial body segment captured, narrow End/final Hours behavior not established by these pictures. Full-page fixed-overlay positions reflect current document scroll offset, so use actual viewport geometry/fresh viewport captures for interaction assessment. Remaining129 narrow images uninspected and independent review0. Indexed observations `output/playwright/workbench/frozen-5307-320-visual-observations.json` SHA256 `3c9815657080c1257857f6882e60b32fd8fdc1bacbac8c09dc663fe9b67f6a00`; corresponding cases.json entries populated only for actually inspected originals.

Axe incomplete/manual flags must not inherit a pass from zero violations. 1280pilot162 cases contain rule-entry counts: color-contrast150, aria-valid-attr-value18, aria-input-field-name30, aria-prohibited-attr9, th-has-data-cells3. 320expansion162 cases: color-contrast153, aria-valid-attr-value18, aria-input-field-name30, aria-prohibited-attr9, th-has-data-cells3. These are rule-entry counts, not unique node counts. Focused targeted contrast/name behavior covers particular defects but does not resolve every incomplete node. Preserve original nodes/results for fresh manual assessment.

Cumulative current immutable capture scope324/10368 local minimum cases, worker visual inspection195/324 (162pilot+33narrow), fresh independent review0. Neither run covers dark/compact/reduced-motion across every state or remaining six widths; released browser versions/supplementary requirements also remain pending. Item remains OPEN/shared-repair. Per root coordination, no additional matrix configuration is launched before a fresh independent Workbench reviewer is assigned; worker hands back this scoped checkpoint with no active browser/build process.
