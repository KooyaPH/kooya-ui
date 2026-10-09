# Visual review

Review the rendered interface after building the distributable package. Type
checks and screenshots of source code cannot prove the actual appearance or
interaction behavior.

## Prepare the page

1. Run `corepack pnpm dev` to open the playground at
   `http://localhost:5190`. Storybook is available through
   `corepack pnpm storybook`.
2. Confirm the page loads and its examples use fictional local data.
3. Wait for local fonts and entrance motion to settle before measuring.
4. Inspect phone (390px), tablet (768px), and desktop (1440px) layouts. Also
   check a narrow 320px viewport and 200% browser zoom where applicable.

## Controls and spacing

- Hover buttons, icon actions, filters, fields, menu items, and links. Confirm
  that the cursor matches the action and every example responds.
- Check default, hover, active, selected, disabled, busy, and keyboard-focus
  states.
- Measure target size, card/control padding, icon size, icon-to-label gaps,
  chip spacing, and distance between neighboring actions.
- Review long labels, wrapping, truncation, optical alignment, and touch-target
  separation.
- Check read-only chips and cards use a static cursor; disabled actions do not
  act; busy actions prevent duplicate submission.

## Pages, device layouts, and overlays

- Review the distinct phone and tablet compositions. Confirm navigation,
  filters, page actions, and table rows move into the intended mobile positions;
  do not judge mobile quality only by scaling down desktop.
- Open business, Console, and Client samples with every bundled theme and
  composition.
- Check responsive data cards, boards, inbox panes, forms, and gallery layouts.
- Open dialogs, drawers, menus, and popups. Test Tab, Shift+Tab, arrows,
  Home/End, Enter/Space, Escape, close behavior, and focus return.
- Check theme changes while an overlay is open and test reduced motion.
- Confirm skeletons, empty states, safe errors, retry callbacks, and success
  feedback are understandable and do not expose raw errors or real data.

## Network and evidence

Capture requests during a fresh playground load. The local examples should not
call product APIs or external services. Record the browser, tested widths,
theme, composition, states, and any untested area when sharing review evidence.

A local sample review does not prove that a consuming application is authenticated,
connected to its backend, deployed, or fully accessible. State exactly which
application and browser flows were observed.
