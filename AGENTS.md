# Contributor agent guidance

- Keep reusable UI code in `packages/ui/src`; keep fictional records and interactive product examples in `apps/playground` or `apps/storybook`.
- Preserve the atomic boundaries: foundations, atoms, molecules, organisms, templates, and concrete example pages.
- Keep application APIs, authentication, authorization, persistence, and real customer data outside this library.
- Use the established semantic tokens and document every new public component, theme, or template.
- Add focused behavior coverage for changes and update the corresponding Storybook example.
- Review real rendering at desktop, tablet, and phone widths. Check spacing, focus, hover, selected, disabled, busy, loading, empty, error, and reduced-motion states.
- Do not commit credentials, customer data, generated `dist` output, local browser profiles, or test artifacts.
- Use Node.js 22 or newer, Corepack, and the pinned pnpm release in `package.json`.
