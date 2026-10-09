import type { Meta, StoryObj } from "@storybook/react-vite";
import { BusinessExample } from "../../playground/src/examples/identity";
const meta = {
  title: "Templates/Business",
  component: BusinessExample,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Runnable controlled example importing public @kooyaph/ui exports. Data and state remain in the playground. See docs/templates.md for the typed production template and callbacks.",
      },
    },
  },
} satisfies Meta<typeof BusinessExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Ready: Story = {};
export const Loading: Story = { args: { state: { status: "loading" } } };
export const Error: Story = {
  args: {
    state: { status: "error", message: "This local sample could not load." },
  },
};
