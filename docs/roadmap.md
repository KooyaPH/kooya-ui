# Roadmap

This roadmap describes directions for the library. Only APIs present in
`packages/ui/src` and documented in the component guides are currently
implemented.

## Current foundation

- One Ant Design provider with semantic tokens, light/dark mode, density,
  branding overrides, reduced motion, and provider-scoped overlays.
- Mosaic, Kooya Signature, Canvas, and Client palettes; Mosaic, Orbit, Canvas,
  and Flow compositions.
- Atomic component families and typed templates for common business, Console,
  CMS, analytics, inbox, and client-portal workflows.
- Fictional interactive examples, Storybook documentation, and named theme
  subpaths.
- Safe skeleton and failure patterns, keyboard examples, responsive compositions,
  local cache/preload examples, and user-focused accessibility guidance.

## Proposed improvements

- Additional palettes and composition presets maintained as optional subpaths.
- More industry-oriented template families with user stories and realistic
  fictional data.
- Optional adapters for charts, rich text, drag-and-drop, and media selection,
  while leaving those engines and their data flows owned by consumers.
- Automated visual regression and expanded assistive-technology review.
- Package-size reports for each atomic family and theme entry point.
- A public documentation site once its hosting and maintenance are chosen.

New themes must preserve semantic meanings and work with existing components.
New templates must remain presentational and expose typed data, slots, and
callbacks rather than embedding application APIs or permissions.
