# Corporate POC verification — 2026-10-15

Live review: https://ui.test.kooyaai.com/#/overview
Local origin: http://localhost:5825

## Source and runtime

- Isolated branch `feat/corporate-poc-20261015`, based on clean release
  `de528f2` (v1.0.0). POC changes remain uncommitted; no package publication
  or product migration occurred.
- Served fingerprint: `44ffa864eab87deaa3b3dd3ff3656171fc4323b3fa6b5649d69d17539246bc16`.
- Frozen snapshot: `/home/stephen-kooya/kooya/projects/kooyahq/kooya-ui/.worktrees/corporate-poc-20261015/output/previews/corporate-poc-20261015T121110-44ffa864eab8`.
- Active/enabled user unit: `kooya-ui-corporate-poc.service`; durable Linux
  Node 22.23.3; loopback 5825. Existing WireGuard/Nginx/socat route retained.
- Public TLS verification succeeds. Public and local entry HTML bytes match.
  `build-provenance.json` records 3,615 emitted files and the source inventory.

## Executed acceptance

- `pnpm validate`: package/playground builds, workspace types, 323 tests across
  51 files, and Storybook build passed. After the final selection-persistence
  correction, all 31 affected design/catalog tests passed and the playground
  was rebuilt before freezing the final candidate.
- Final frozen candidate: all 576 layout/palette/mode/density CMS combinations
  rendered; all 216 layout/page/viewport cases passed at 320, 768 and 1440px.
  No observed page errors, browser warnings, or document overflow.
- Public candidate: 10 workflow groups passed, covering CMS validation/create/
  search/edit/publish, task creation/status/board, invitation validation,
  settings, overlays/Escape, exact favorites, comparisons, and phone navigation.
- Eight additional public review groups passed: real thumbnails, clipboard
  sharing, downloaded fictional JSON, loading/empty/error recovery, actual
  1440px comparison frames, dark/compact reload, catalog theme inheritance,
  and fullscreen example palette selection. No observed page errors, failed
  requests, or external requests in this bounded review.
- Fresh HTTPS reads verified 35 browser-observed assets against the manifest;
  a separate 36-file public/local/manifest comparison also passed. HTTP 304
  cache responses and navigation-discarded browser bodies were handled as
  acquisition limits; fresh GETs supplied the byte verification.
- Original desktop and 390px phone captures cover all twelve directions.
  Contact sheets and individual originals were visually reviewed; public
  gallery, comparison, catalogue, and dark-dialog captures are retained.

## Evidence and limits

Reports and original screenshots: `output/playwright/poc/` (ignored).
Full command logs: `/tmp/kooya-poc-*.log`.

Existing vendor sourcemap/ignored-directive, bundle-size and test deprecation/
act warnings remain disclosed in the logs. This is Linux Chromium POC evidence,
not physical Windows, exhaustive assistive-technology, authenticated product,
or individual requalification of every retained third-party catalogue example.
All records and state changes are fictional and session-local; only appearance
and favorites persist in browser storage. Post-build documentation and helper
updates do not alter the immutable served runtime.

## Operation and rollback

`systemctl --user status kooya-ui-corporate-poc.service` checks the service.
The frozen snapshot contains `previous-service.unit`: restore that unit,
reload user systemd, and restart the same service to return to the previous
snapshot. Older comparison servers were preserved. The temporary 5830 development
server is stopped after acceptance.
