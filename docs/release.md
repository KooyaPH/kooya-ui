# Release process

Kooya UI uses Changesets and semantic versioning for its distributable package.
The source repository is licensed under MIT. Package registry access is
configured separately and can have different visibility from the source.

## Prepare a change

1. Add a Changeset for a public package API or runtime change.
2. Run `corepack pnpm validate`.
3. Inspect the generated package archive and confirm it contains only built
   files, its license, and third-party notices.
4. Review public documentation, exports, peer dependencies, and the changelog.
5. Confirm the proposed version is unused in the configured registry.

Use a patch release for compatible fixes and documentation/API clarifications,
a minor release for backward-compatible exports or features, and a major release
for breaking changes.

## Publish

A maintainer runs the repository's manual package release workflow after
reviewing the exact commit and expected version. The workflow validates the
source before publishing and uses its scoped GitHub Actions token. Keep publish
permissions limited to the publishing job.

Package access is configured in GitHub Packages independently from the
repository's MIT source license. Confirm the package's intended access setting
before each public release. Never place personal access tokens in the
repository, workflow files, or command history.

## After release

- Add the release notes and tag for the published version.
- Confirm the installed archive exposes the documented entry points.
- Update the consumer examples and migration guidance when needed.
- Keep earlier immutable releases and their original license metadata intact.

## Public v1 archive

KooyaHQ consumes the immutable public GitHub Release asset `kooyaph-ui-1.2.2.tgz`, with its SHA-256 checksum and pnpm SHA-512 lock integrity. Qualify the exact source commit, pack `packages/ui`, inspect its file list, then create tag/release v1.2.2 on that commit and upload the archive and checksum. Existing tags and assets are never overwritten. GitHub Packages access is independent and is not required for this installation path.

## 1.2 public surfaces and swimlanes

Version 1.2.0 adds reusable public Editorial and authentication surfaces, navigation actions, editorial cards, server-rendered protocol-page styles and composable swimlane boards. The public catalogue includes five board states. Keep 1.1.0 and 1.0.0 assets immutable for rollback.

## 1.2.1 simplification patch

Single-card authentication, embedded authorization, expandable supporting prose, resilient long labels and stable data-only loading. All existing components, groups, blocks, sections, templates and immutable prior releases remain available. See [composition and loading rules](v1/simplification.md).

## 1.2.2 workspace correction

`WorkspaceHeader` accepts optional `presentation="utility"` to render a toolbar without repeated page identity or nested header landmarks. The default presentation remains compatible. Navigation geometry remains owned by `WorkspaceShell`; applications supply one sidebar, route headings and permission-filtered links. Long heading actions wrap within their container.
