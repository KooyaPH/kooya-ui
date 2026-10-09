import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ExperiencePage,
  ExperienceProvider,
} from "../../playground/src/examples/experience";
const meta = {
  title: "Experience/Working examples",
  component: ExperiencePage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ExperienceProvider>
        <Story />
      </ExperienceProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Fictional local reads, Query v5 memory caching, delayed intent and cancellable timed transfers. No external APIs. See docs/experience.md for consuming-app boundaries.",
      },
    },
  },
} satisfies Meta<typeof ExperiencePage>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ColdLoad: Story = { args: { selected: "loading" } };
export const WarmCache: Story = { args: { selected: "cache" } };
export const IntentPreload: Story = { args: { selected: "preload" } };
export const BackgroundTransfer: Story = { args: { selected: "transfer" } };
export const SkeletonAndFeedback: Story = { args: { selected: "states" } };

export const DeviceCompositions: Story = { args: { selected: "devices" } };
