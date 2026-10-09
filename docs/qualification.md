# Quality and verification

Every public component or template should be checked in its real rendered
context. A successful compiler run does not prove spacing, behavior, or
accessibility.

## Automated checks

Run the repository's complete qualification:

```sh
corepack pnpm validate
```

It builds the package and playground, checks TypeScript, runs behavior tests,
and builds Storybook.

For a focused change, run the relevant package build, typecheck, and test suite
while iterating. Include the exact commands and results in the pull request.

## Manual review

Use [the visual review checklist](visual-review.md). At a minimum, review:

- Desktop, tablet, and phone compositions, including long labels and narrow
  widths.
- Loading skeleton, busy, empty, success, permission, and safe error states.
- Hover, active, selected, disabled, focus, and pointer cursor behavior.
- Keyboard navigation, accessible names, focus return, and reduced motion.
- Spacing between icons, labels, chips, buttons, cards, and table cells.
- Scroll boundaries, responsive table/card transitions, menus, and overlays.
- Contrast for text, controls, selected states, focus indicators, and branding.

When a browser run uses fictional data, state the tested viewport and flow. Do
not infer authenticated application behavior or API isolation from the local
playground.
