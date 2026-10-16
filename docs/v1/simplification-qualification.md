# 1.2.1 patch qualification

The selected composition remains Editorial/Governance, Olive, Light, Compact. No catalogue entry or previous immutable release was removed.

## Library

- `pnpm validate`: package and playground build, workspace type checking, 374 tests across 58 files, and Storybook build passed.
- All 282 catalogue entries / 1,575 variants rendered in Chromium at 360, 768 and 1440 CSS pixels in Light and Dark: 9,450 geometry cases, no page overflow or runtime exceptions. This is rendering/geometry evidence; it does not claim every interaction in every third-party example was exercised.
- 30 focused auth cases exercised disclosures, headings and container bounds. 36 clipping/nested overlay cases exercised selectors, popovers, modal/drawer geometry and modal focus return.
- 192 appearance cases covered Olive, Graphite and a custom accent, both modes/densities, reduced/normal motion, at 320 and 1440 pixels.
- Native Chromium browser zoom was set and read back through an owned local extension: 100%, 200%, 400% across focused sign-in, consent, supporting prose and long swimlanes (12 cases).
- Inspected actual auth and consent screenshots at phone and desktop sizes. Fixed permission/scope separation and shortened the visible authorization action while preserving its full accessible name.
- Final package packing verified all 33 declared runtime/type/stylesheet export paths. The eight consumer Ant/rc-component patches match the existing immutable peer archive byte-for-byte.

## Product

The staging release record is maintained by the owning KooyaHQ repository and deployment workflows. Product tests cover shared adapter contracts, Console, organization Headquarters, hosted Auth and Business; protocol/issuer checks use an isolated Redis fixture. Synthetic consent checks intercept submissions and create no real grants. Real staging sign-in, audited organization entry, boards, pending data and release identity must be verified after rollout.

Original screenshots, browser reports, source fingerprints and large scan results remain in ignored `output/qualification-121`; they are not copied into the public repository. Browser evidence is Chromium on Linux, including responsive viewports and native zoom. Previous independent qualification campaign records are not relabelled as accepted by this patch.
