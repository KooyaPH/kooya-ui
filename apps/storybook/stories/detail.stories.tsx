import type { Meta, StoryObj } from "@storybook/react-vite";
import { DetailExample } from "../../playground/src/examples/collections";
const meta = {
  title: "Templates/Detail",
  component: DetailExample,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Runnable controlled example importing public @kooyaph/ui exports. Data and state remain in the playground. See docs/templates.md for the typed production template and callbacks.",
      },
    },
  },
} satisfies Meta<typeof DetailExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Ready: Story = {};
export const Loading: Story = { args: { state: { status: "loading" } } };
export const Error: Story = {
  args: {
    state: { status: "error", message: "This local sample could not load." },
  },
};
