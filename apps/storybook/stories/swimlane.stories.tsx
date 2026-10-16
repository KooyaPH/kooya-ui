import type { Meta, StoryObj } from "@storybook/react-vite";
import SwimlaneDemo from "../../playground/src/site/collections/swimlane";
const meta = {
  title: "Groups/Swimlane board",
  component: SwimlaneDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof SwimlaneDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Grouped: Story = {};
export const Loading: Story = { args: { variant: "loading" } };
export const Empty: Story = { args: { variant: "empty" } };
export const ReadOnly: Story = { args: { variant: "read-only" } };
export const LongText: Story = { args: { variant: "long-text" } };
