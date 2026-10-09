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
