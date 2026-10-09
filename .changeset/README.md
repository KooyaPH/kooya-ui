# Versioning

The current library package version is `0.3.0`. For every consumer-visible
change, run `corepack pnpm changeset`, choose `@kooyaph/ui`, select the
appropriate semver bump, and commit the generated note with the implementation.
Run `corepack pnpm version-packages` in the reviewed release branch, then review
the package manifest and changelog before publishing. Releases are manual; they
do not deploy applications.
