import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeedExample } from "../../playground/src/examples/collaboration";
const meta = {
  title: "Templates/Feed",
  component: FeedExample,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Runnable controlled example importing public @kooyaph/ui exports. Data and state remain in the playground. See docs/templates.md for the typed production template and callbacks.",
      },
    },
  },
} satisfies Meta<typeof FeedExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Ready: Story = {};
export const Loading: Story = { args: { state: { status: "loading" } } };
export const Error: Story = {
  args: {
    state: { status: "error", message: "This local sample could not load." },
  },
};
export const Empty: Story = { args: { empty: true } };
