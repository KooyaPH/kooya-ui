# Phase A harness and ledger review — 2026-10-13

Assignment: infrastructure only. Independent reviewer: `/root/audit_harness_review`. No catalog batch is accepted by this report. OpenClaw was waived by the user for this task. Shared source was inspected read-only; only this report was written in the worktree.

## Verified evidence

- Pinned repository runner `@playwright/test` 1.64.0 launched Chromium. Actual requests to `http://127.0.0.1:5300/audit.html?item=c-textarea-6` and retained `http://127.0.0.1:5193/?mode=light#/preview/c-textarea-6` rendered the real Bio textbox, placeholder and `0/280` counter at 320px, without page errors or document horizontal overflow. Harness imports the same catalog loader, KooyaProvider, feedback bridge, fonts and UI/site styles as the real preview. This establishes real rendering for this one smoke target, not its full acceptance matrix.
- Screenshots captured and visually inspected: `/tmp/harness-review-audit.png`, `/tmp/harness-review-preview.png`, `/tmp/harness-review-unknown.png`. The old retained bundle shows a manual resize grip while current dev harness does not; therefore these two servers cannot be assumed to have the same source fingerprint.
- Unknown item and nonexistent real-prop fixture produce page errors (`Unregistered audit item`, `No real-prop fixture registered`) and an empty root, height zero. Root/body horizontal overflow checks still pass those pages. Negative controls must assert required semantic content and readiness and reject errors, loading and empty rendering.
- Initial ledger: 2,544 items, all unassigned. Surfaces: 1,552 catalog variants, 355 public exports, 474 compound candidates, 93 Storybook named exports, 6 HTML fixtures, 64 retained/public modules. There are 5,292 module classification records. Independently parsed 93 exported variable stories across 25 tracked story files. These are inventory counts, not reviewed coverage.
- All six initial ledger unit tests passed. These do not cover the holes below.

## Acceptance blockers found in initial implementation

1. **Screenshot and review evidence can be invented.** Reproduced `acceptItem` returning `accepted-local` for a `classification-required` public-export item with one invented expected case, nonexistent screenshot `/tmp/definitely-not-present.png`, SHA `not-a-hash`, and worker/reviewer verdicts without review fingerprints. Require readable screenshot bytes and exact SHA-256; bind both attestations to item source/fixture fingerprint, screenshot hash, case and immutable report evidence. A mere pair of different agent strings proves neither independence nor inspection.
2. **Fingerprint misses new source files.** `git ls-files` plus direct contracts excludes untracked active override `apps/playground/src/reui/runtime/overrides/c-textarea-6.jsx`, private harness, harness HTML and audit scripts themselves. Scan owned source trees for tracked and untracked source inputs, including fixtures and harness/gate/config code; exclude generated output. Include runtime/build identity in per-case evidence. A source hash alone cannot identify the stale 5193 bundle.
3. **Coverage denominator is caller supplied.** `acceptItem` checks consistency against arbitrary `expectedCases` instead of deriving those from an approved scenario contract. It can accept unresolved classifications. Require explicit reviewed classification, contract identity and a canonical generated matrix; reject duplicate/invalid states, unsupported engines, omitted fixture/profile/container/zoom axes and unclassified compound/module/HTML exposures. Nonvisual exports need explicit behavioral contracts rather than forced screenshots or exclusion.
4. **Harness has no positive readiness contract.** Blank unknown-ID pages are a demonstrated false-pass risk for geometric tests. Put lookup failures inside a visible error boundary and expose a success marker only after the real lazy module resolves. Tests must reject pageerror/console-error/loading/error/empty rendering and require item-specific controls; an outer main or arbitrary child count is insufficient because the loading fallback is itself content.
5. **Harness omits real-preview behavior.** `PreviewRoute` has `MotionConfig reducedMotion="user"` and validated same-origin `kooya-preview-settings` handling; the initial private harness has neither. Appearance changes by navigation reset dirty state. Share the real preview environment or implement equivalent validated message handling and reduced-motion behavior without remounting the demo. The catalog `profile` parameter is only metadata and does not apply states; real-prop fixture profiles must be validated.
6. **Geometric/matrix infrastructure is incomplete.** `matrixCases` crosses width/mode/density/motion/state/browser, but lacks fixture profile, inner container widths and zoom. The textarea contract lists 180/240/320 containers and 200% zoom; these cannot be silently omitted. Require document and constrained-container overflow, accepted-text fit, clipping and positioned overlay/portal checks where relevant, with meaningful negative controls. Existing textarea specs target `/#/preview`, not `/audit.html`; do not count them as private-harness coverage.

## Inventory and reconciliation cautions

- Keeping removed items blocked and marking changed fingerprints stale while preserving cases are sound defaults. Unchanged-fingerprint reconciliation should still revalidate acceptance schema/evidence; tightening gate code must not retain earlier fraudulent accepted status.
- Compound candidates remain declaration-review-required, which is appropriately conservative. Aliases should retain distinct public exposure records and document shared implementation/contract identities. Runtime enumeration does not establish supported compound API status.
- Story extraction handles current exported variable stories correctly. Future function stories, alias exports, reexports, nested directories and files outside the tracked set need either supported parsing or explicit hard failure and reviewed exclusion. Do not claim exhaustive stories merely from the current 93 count.
- Module records with classification-required must remain part of closure accounting. A global completion gate must reject unresolved module classifications even when they are not separate `items`.

## Required verification before infrastructure closure

Add negative unit controls for missing/tampered screenshot bytes, stale worker/reviewer attestations, unresolved classifications, forged or reduced expected matrices, missing/untracked source changes, duplicate states and invalid engines. Add real-browser unknown-ID, missing-fixture, loading/error and deliberate-overflow controls plus valid rendering. Verify all available engines through actual launch/version checks and record unavailable WebKit/host dependencies as blocked coverage. Never translate a six-test pass or a Chromium smoke screenshot into acceptance of the 1,552 catalog variants.

This review reflects initial shared-file snapshots. Root is addressing findings concurrently; corrected implementation requires a fresh read and negative-control rerun before these findings are treated as resolved.

## Independent re-review after root fixes

This section supersedes the initial findings where explicitly marked addressed. This remains one infrastructure assignment, not a catalog item review.

Verified addressed:

- Independently reran `corepack pnpm exec playwright test --config qa/ui/playwright.config.ts harness.spec.ts --reporter=line --output=/tmp/harness-review-rerun`: **12 passed**, Chromium/Firefox/WebKit, serial execution. Tests cover actual semantic rendering and dirty appearance/motion preservation, visible unknown-ID/missing-fixture failures, and absent readiness while a lazy request is deliberately withheld. Viewed the fresh WebKit unknown-ID screenshot; visible error alert and Reload action replace the old blank page.
- Source now has outer lookup boundary, lazy-commit readiness marker, validated same-origin/source settings receiver, and `MotionConfig reducedMotion="user"`. These specific initial harness findings are addressed.
- Inventory now includes untracked owned inputs, HTML, scripts and harness/config/contracts while excluding the generated ledger. The previous untracked-override omission is addressed.
- Gate now derives expected matrix IDs from a reviewed contract, requires classification/current fingerprint/artifact root, checks screenshot file bytes against hash, and binds both visual observations to source and contract fingerprints. Owned negative probes verify missing worker PNG, tampered screenshot bytes and stale reviewer contract are rejected.
- Existing root ledger tests: **7 passed** on rerun. Browser capability output labels engine builds and unavailable native/older platforms correctly; independent harness rerun establishes all three engine profiles actually launch.

Open, reproducible acceptance holes:

- New owned file `scripts/__tests__/ui-audit-review-probes.test.mjs` contains eight negative probes. **3 passed, 5 failed** on current shared gate. Failures are genuine missing rejection, not browser/test infrastructure failures: an imaginary browser contract is accepted; an eight-byte PNG signature without actual image data is accepted; the same two capture paths replayed across every distinct case are accepted; a screenshot symlink escaping artifact root is accepted; invalid prior `accepted-local` status with zero cases survives unchanged-fingerprint reconciliation. The file deliberately leaves these assertions failing so they remain reviewable regression targets.
- Require exact allowed/runnable engine or supported browser target identities and version/channel evidence. Current `contract.browsers` accepts any nonempty array, including imaginary names and a reduced one-engine denominator. Record blocked supported platforms separately rather than reducing required coverage. Contract reviewer metadata should be immutable and bound to the reviewed contract content, not arbitrary nonempty strings.
- Decode PNG structure/dimensions (including required chunks), not only signature. Require each case's captures to have distinct immutable artifact identities; duplicate bytes may be legitimate across unchanged states, but the exact same file replay cannot prove new rendering. Bind worker/reviewer observations to their actual screenshot hash, case ID, run ID and environment/build/fixture identity. Distinct pathname strings alone do not prove independent capture (aliases or copies can satisfy that check).
- Resolve artifact root and screenshot paths with `realpath`, require regular files, and enforce resolved containment. Current lexical prefix check allows an in-root symlink to point elsewhere.
- Reconcile should mark prior accepted evidence `review-required` or revalidate it against current acceptance schema and immutable evidence. Fingerprint equality alone preserves invalid acceptance; changes to gate implementation now affect source fingerprint, but a handcrafted/imported invalid ledger still bypasses this status check. A final global closure gate must independently validate every accepted item.
- Source fingerprint still omits `patches/*.patch` and `qa/ui/extension/background.js` because its filter only recognizes package/app code, selected root files/scripts and QA TS/TSX/JSON. Hash owned dependency patch bytes and extension JS/assets explicitly; lockfile's saved patch hash is not a guarantee that currently staged patch bytes still match. WebKit capability hash is `pw_run.sh`, not the actual browser engine binary closure.
- Fixture/profile/container/zoom schema remains free-form `contexts` plus `additionalCases`, with no validation tying those identifiers to actual rendered parameters. Current textarea contract has no `browsers`, `contexts`, or independent review record and therefore cannot yet pass this gate; its container/native-zoom obligations need canonical approved additional cases. Existing geometric assertions are item-specific; there is no general clipping/portal/overlap negative-control infrastructure yet.
- Public classification/aliases/nonvisual contracts, module closure, future function/alias story exports, supported released browser versions, public package patch-consumer behavior, and final immutable build/runtime fingerprints remain open. Native zoom test source uses actual extension setZoom/getZoom and CDP screenshots, but its previous result/artifacts were not independently rerun or visually accepted in this assignment. Browser smoke success does not close these requirements.

Conclusion: harness lookup/loading/semantic smoke infrastructure improved and independently verified on three engines. Ledger integrity still has five reproduced failing negative controls and incomplete provenance/schema/global closure rules. Phase A is **not accepted closed** by this report, and no component snapshots are approved.

## Third review: repaired integrity gates and valid acceptance control

The prior five failing negative probes are now **verified addressed**. Probe fixtures were strengthened before rerunning: PNG bytes are generated by `PNG.sync.write` (16×16 valid decoded raster with CRC), every one of 192 matrix cases owns distinct worker/reviewer artifact files, worker metadata binds its case ID and screenshot SHA, reviewer metadata binds its case ID, and negative assertions name the intended rejection reason. The original embedded base64 PNG had invalid CRC; this was corrected so unrelated image failure cannot masquerade as provenance validation. Only the replay probe deliberately reuses a file.

Independent results on updated gate: **10/10 owned integrity probes passed**, including a positive complete 192-case manifest accepted as `accepted-local`, plus **7/7 root ledger tests passed**. These generated test fixtures establish gate behavior only; their plain raster images do not establish real component rendering or visual approval. Earlier independent 12/12 browser harness run remains the browser evidence; only gate/inventory changed during this follow-up.

| Finding | Current disposition | Evidence or remaining requirement |
| --- | --- | --- |
| Real catalog renderer | Verified smoke | Actual Bio textbox/counter; shared catalog loader/provider/styles; no catalog matrix accepted |
| Blank unknown ID/missing fixture | Addressed | Visible outer boundary; independent three-engine unknown/missing tests and viewed WebKit image |
| Premature lazy readiness | Addressed | Deliberately withheld module remains loading and unready in all three engines |
| Dirty appearance/motion parity | Addressed at harness smoke level | Validated settings receiver and MotionConfig; actual preservation tests pass |
| Missing screenshot bytes/arbitrary hash | Addressed | Specific missing-file and tampered-hash rejection probes |
| Stale visual contract fingerprint | Addressed | Specific stale-review provenance rejection using otherwise valid complete fixture |
| Imaginary or reduced default engine list | Addressed for default three profiles | Exact contract-to-required-list validation; imaginary list rejected; exact version/channel runtime manifest remains open |
| Eight-byte-only PNG evidence | Addressed | pngjs strict decoder/CRC; truncated-header rejection probe |
| Same capture replay across cases | Addressed for resolved file paths | Unique real paths required; replay rejection; positive fixture permits identical pixels in distinct artifacts |
| Symlink artifact-root escape | Addressed | realpath containment; specific outside-root symlink rejection |
| Old invalid accepted status preserved on reconcile | Addressed conservatively | Even unchanged prior accepted item becomes stale and needs reacceptance |
| Worker hash/case binding | Addressed | Positive metadata plus wrong-worker-hash rejection; reviewer hash validated from reviewer capture bytes |
| Untracked harness/override omitted from source hash | Addressed in source scan | cached+others inputs included; ledger excluded |
| Dependency patch/extension JS/public assets omitted | Addressed in source filter | Explicit patch, QA JS/HTML, playground public paths now included |
| Container/profile/zoom and scene schema | Open | Free-form contexts/additionalCases need typed, reviewed obligations tied to actual rendered parameters |
| Runtime/build/browser/fixture provenance | Open | Gate does not yet require actual runtime fingerprint, browser manifest identity/version/channel, actions or measured geometry |
| Independent contract review authority | Open | Agent/observation presence alone does not bind an immutable review report to approved contract content |
| Generic clipping/overlap/portal negative controls | Open | Existing browser tests establish readiness; comprehensive geometric infrastructure is not demonstrated |
| Story aliases/function/reexports; module/public classifications | Open | Current 93 variable-story inventory valid; other supported syntaxes and global classification closure need explicit validation |
| Released browser/platform qualification | Open/blocked separately | Engine profiles augment supported current/previous released versions; Linux WebKit is not native Safari/iOS |
| Public package patched dependency consumer | Open | Root package patch policy/consumer qualification remains separate work |
| Global completion/immutable final artifact gate | Open | Must validate every accepted item and unresolved classification, defect, stale and missing platform against exact final runtime |

No previously reproduced integrity hole remains failing in the strengthened owned probe suite. Full Phase A closure still requires the open provenance/schema/capability/global checks above; this report does not approve any component snapshots.
