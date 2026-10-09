import type { Preview } from "@storybook/react-vite";
import {
  KooyaProvider,
  type ThemeName,
  type ColorMode,
  type Density,
  type Composition,
} from "@kooyaph/ui";
import "@kooyaph/ui/styles.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/dm-sans";
const preview: Preview = {
  initialGlobals: {
    theme: "mosaic",
    mode: "light",
    density: "comfortable",
    composition: "mosaic",
    font: "inter",
  },
  globalTypes: {
    theme: {
      toolbar: {
        title: "Theme",
        items: ["mosaic", "signature", "canvas", "client"],
      },
    },
    mode: { toolbar: { title: "Mode", items: ["light", "dark"] } },
    density: {
      toolbar: { title: "Density", items: ["comfortable", "compact"] },
    },
    composition: {
      toolbar: {
        title: "Composition",
        items: ["mosaic", "orbit", "canvas", "flow"],
      },
    },
    font: { toolbar: { title: "Font", items: ["inter", "dm", "system"] } },
  },
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    a11y: { test: "todo" },
    docs: {
      description: {
        component:
          "Use one KooyaProvider and the package CSS. Keyboard: Tab follows DOM order; tabs use arrows; menus use arrows/Home/End; Escape closes overlays and restores focus. Applications own data, permissions and persistence. See repository docs for full typed APIs and state contracts.",
      },
    },
  },
  decorators: [
    (Story, context) => (
      <KooyaProvider
        theme={context.globals.theme as ThemeName}
        mode={context.globals.mode as ColorMode}
        density={context.globals.density as Density}
        composition={context.globals.composition as Composition}
        fontFamily={
          context.globals.font === "system"
            ? "system-ui, sans-serif"
            : context.globals.font === "dm"
              ? '"DM Sans Variable", sans-serif'
              : '"Inter Variable", sans-serif'
        }
        style={{ padding: 24, minHeight: 240 }}
      >
        <Story />
      </KooyaProvider>
    ),
  ],
};
export default preview;
