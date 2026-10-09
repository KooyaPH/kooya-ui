# Development setup

## Requirements

- Node.js 22 or newer
- Corepack
- pnpm 10.18.3, selected by the repository's `packageManager` field

## Install and run

```sh
corepack enable
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

The playground uses fictional records and local state. It makes no application
API calls.

Run the component catalog in Storybook:

```sh
corepack pnpm storybook
```

## Build and validate

```sh
corepack pnpm --filter @kooyaph/ui build
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm build:storybook
```

The aggregate command runs the package, playground, test, and Storybook build
checks:

```sh
corepack pnpm validate
```

## Use the package from this checkout

The package requires React 18.3 or 19, React DOM, and Ant Design 6.6.5 as peer
dependencies. Build and pack a tarball for a local consumer:

```sh
corepack pnpm --filter @kooyaph/ui build
corepack pnpm --filter @kooyaph/ui pack --out /tmp/kooyaph-ui.tgz
```

Install the tarball in the consuming application alongside the peer
dependencies. Import CSS once from the application entry point. The repository
README and release notes describe registry availability separately from the
open-source source code and license.
