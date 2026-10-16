import type { Preview } from "@storybook/react-vite";
import {
  KooyaProvider,
  type ColorMode,
  type Density,
} from "@kooyaph/ui";
import "@kooyaph/ui/styles.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/dm-sans";
import "@fontsource/syncopate/700.css";
const preview: Preview = {
  initialGlobals: { mode: "light", density: "comfortable" },
  globalTypes: {
    mode: { toolbar: { title: "Mode", items: ["light", "dark"] } },
    density: { toolbar: { title: "Density", items: ["comfortable", "compact"] } },
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
        mode={context.globals.mode as ColorMode}
        density={context.globals.density as Density}
        style={{ padding: 24, minHeight: 240 }}
      >
        <Story />
      </KooyaProvider>
    ),
  ],
};
export default preview;
