# Contributing

Thanks for helping improve Kooya UI. Contributions should be reusable across
applications, accessible, and consistent with the documented design system.

## Development setup

Use Node.js 22 or newer and Corepack:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

The playground contains fictional data only. To see the component catalog, run
`corepack pnpm storybook`.

## Before opening a pull request

- Keep changes inside the smallest appropriate atomic layer.
- Add or update behavior tests for new or changed interactions.
- Document new public props, states, themes, and template callbacks.
- Add a Storybook example for public components and important states.
- Inspect the rendered result at desktop, tablet, and phone sizes.
- Check keyboard use, visible focus, accessible names, reduced motion, contrast,
  spacing, cursor behavior, and error/loading/empty states.
- Run `corepack pnpm validate` and describe the checks in the pull request.
- Keep examples fictional and omit secrets, credentials, and customer data.

## Design conventions

Use the semantic tokens from `docs/design-system.md`. Import named components
from their atomic family and keep themes separate from compositions. Components
must not fetch data, decide permissions, or persist application records.

## Changesets

Add a Changeset for changes to the distributable package:

```sh
corepack pnpm changeset
```

Choose the smallest correct semver increment. Documentation-only changes and
playground-only changes do not need a package version bump.

## Pull requests

Use the provided issue and pull request templates. Include a concise summary,
screenshots for visual changes, affected component or template names, and
verification results. Keep pull requests focused so reviewers can assess the
change and its behavior.
