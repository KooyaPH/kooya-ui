# Private UI qualification campaign

See [execution contract](../../docs/audit/execution-plan.md). Nothing in this directory implies all library components passed. `coverage-ledger.json` starts with every item unassigned; candidates and fixtures require explicit classification.

Commands from the integration worktree:

- `pnpm audit:inventory` builds the inventory from live catalog modules and packed exports; build library first. It preserves evidence and marks changed fingerprints stale.
- `pnpm audit:unit` exercises negative acceptance controls and generated/source checks.
- `pnpm audit:dev` serves localhost5300, including private `/audit.html?item=c-textarea-6&fixture=catalog&mode=dark&density=compact&container=180`. Fixtures use real props, not edited live DOM.
- `pnpm audit:browser -- c-textarea-6 --project=chromium` runs one assignment; retries are zero. Override `AUDIT_BASE_URL` for isolated workers. `AUDIT_CHROMIUM_PATH` chooses an explicit binary and must be included in evidence.
- `pnpm audit:capabilities` records actual launch/version support and missing platform coverage under ignored `output/playwright/`.

Browser/trace/screenshots are ignored under `output/playwright/`; do not commit customer data, profiles or huge artifact trees. Contracts and concise evidence reports are tracked. Old `.browser.js` scripts are historical function bodies and need deliberate fixture/route migration; they are not automatically passing coverage.
