# Moving to Kooya UI v1

Install the pinned public release archive and `antd@6.6.5`. Import `@kooyaph/ui/styles.css` once. Wrap the app in `KooyaProvider`; it defaults to Olive, Light and Compact.

Use canonical Ant components from `@kooyaph/ui/components`. Existing Kooya wrapper contracts must explicitly use `@kooyaph/ui/legacy` until the consumer adapts their props. No automatic rename of application data contracts is implied.

Choose Editorial for work and content, Governance for administration. `WorkspaceShell` accepts navigation, section navigation, content and inspector slots. Appearance and composition are independent.

`AppearancePicker` is controlled. Products own authenticated storage, version conflicts, draft preview, save, cancel and cross-device reload. Resolve System into Light/Dark before passing the provider mode. Never couple an account palette to organization branding.

Historical theme imports remain compatibility metadata. The active review starts at v1 with the two selected compositions; old layout experiments and release history remain recoverable in Git.

Each provider creates a document-level overlay host. Add consumer popup scope through `overlayClassName`; do not put fixed containers or full-screen pointer targets on the host.

## Qualified Ant dependency patches

The library qualification uses the exact Ant/rc-component patches in the repository's `patches/` directory and root `pnpm.patchedDependencies`. Consumers must carry these patches and matching versions to claim the same focus, nested Escape, input selection and popup alignment behavior. The v1 release includes `kooya-ui-v1-patches.tgz` for this purpose; KooyaHQ pins the same patch bytes in its workspace. Installing only the component tarball does not automatically alter a consumer's dependency graph.
