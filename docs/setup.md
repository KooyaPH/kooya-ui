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

## Native peer repairs

The current candidate includes reviewed, version-bound Ant/rc repairs for focus locking, table measurement/filter labels and React18/19 declarations. Package-manager patch configuration in a dependency is not inherited by an application. The complete standalone download already contains its configuration and patch files. For a packed native-library consumer, the library ships those same files and hashes under `dist/patches/manifest.json`. First install the tarball and peers so those files exist. Then merge the following entries into your application package.json (preserving existing entries), and run `corepack pnpm install` again. This two-stage setup was verified in fresh React18 and React19 consumers using only the shipped files, with strict NodeNext TypeScript5.6.3 checking (`skipLibCheck: false`), server rendering, and 76 native component identities. Unconfigured native peer behavior and the entire recipe collection are not covered by those checks.

```json
{
  "pnpm": {
    "overrides": {
      "@rc-component/util": "1.13.0",
      "@rc-component/table": "1.11.1",
      "antd": "6.6.5",
      "@rc-component/image": "1.10.0",
      "@rc-component/picker": "1.12.2",
      "@rc-component/dropdown": "1.0.3",
      "@rc-component/menu": "1.5.0",
      "@rc-component/trigger": "3.10.1"
    },
    "patchedDependencies": {
      "@rc-component/util@1.13.0": "node_modules/@kooyaph/ui/dist/patches/@rc-component__util@1.13.0.patch",
      "@rc-component/table@1.11.1": "node_modules/@kooyaph/ui/dist/patches/@rc-component__table@1.11.1.patch",
      "antd@6.6.5": "node_modules/@kooyaph/ui/dist/patches/antd@6.6.5.patch",
      "@rc-component/image@1.10.0": "node_modules/@kooyaph/ui/dist/patches/@rc-component__image@1.10.0.patch",
      "@rc-component/picker@1.12.2": "node_modules/@kooyaph/ui/dist/patches/@rc-component__picker@1.12.2.patch",
      "@rc-component/dropdown@1.0.3": "node_modules/@kooyaph/ui/dist/patches/@rc-component__dropdown@1.0.3.patch",
      "@rc-component/menu@1.5.0": "node_modules/@kooyaph/ui/dist/patches/@rc-component__menu@1.5.0.patch",
      "@rc-component/trigger@3.10.1": "node_modules/@kooyaph/ui/dist/patches/@rc-component__trigger@3.10.1.patch"
    }
  }
}
```
