# Release process

Kooya UI uses Changesets and semantic versioning for its distributable package.
The repository and public release archive use the MIT License. Public consumer
installs use a tarball attached to the matching GitHub Release; the separate
GitHub Packages registry stays restricted for internal use.

## Prepare a change

1. Add a Changeset for a public package API or runtime change.
2. Run `corepack pnpm validate`.
3. Inspect the generated package archive and confirm it contains only built
   files, its license, and third-party notices.
4. Review public documentation, exports, peer dependencies, and the changelog.
5. Confirm the proposed version and `v<version>` tag are unused.

Use a patch release for compatible fixes and documentation/API clarifications,
a minor release for backward-compatible exports or features, and a major release
for breaking changes.

## Publish

After review, a maintainer validates the exact commit, builds the library, and
packs the published files from `packages/ui`:

```sh
corepack pnpm validate
(cd packages/ui && npm pack --pack-destination /tmp)
```

Create the public GitHub Release for the matching version and attach that
tarball. The asset includes the package license and third-party notices and can
be installed directly by npm or pnpm without registry credentials. Update the
version and filename in the release notes for later releases:

```sh
gh release create v0.3.0 /tmp/kooyaph-ui-0.3.0.tgz \
  --repo KooyaPH/kooya-ui --title "Kooya UI 0.3.0" \
  --notes "Public MIT release of Kooya UI 0.3.0."
```

The repository's manual package release workflow publishes to restricted
GitHub Packages for internal consumers only. It validates the source before
publishing and uses its scoped GitHub Actions token. Keep publish permissions
limited to the publishing job.

GitHub Packages access remains configured separately from the public source
license. Never place personal access tokens in the repository, workflow files,
or command history.

## After release

- Add the release notes, `v<version>` tag, and public tarball asset.
- Confirm the installed archive exposes the documented entry points.
- Update the consumer examples and migration guidance when needed.
- Keep earlier immutable releases and their original license metadata intact.
