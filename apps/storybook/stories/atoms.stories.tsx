import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  IconButton,
  Chip,
  FilterChip,
  Avatar,
  Checkbox,
  RadioGroup,
  Progress,
  Skeleton,
  Tooltip,
  Input,
  TextArea,
  Select,
} from "@kooyaph/ui";
const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Save sample", variant: "primary", size: "md" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Native button props/ref. 44px default target. Busy and disabled block activation. Supply leadingIcon/trailingIcon as React nodes. Cursor: pointer / not-allowed / progress.",
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Busy: Story = { args: { loading: true } };
export const LongLabel: Story = {
  args: {
    children:
      "Review workspace publishing permissions for the entire design team",
  },
};
export const AtomsAndSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);
    return (
      <div className="ku-template-stack">
        <div className="ku-template-toolbar">
          <IconButton
            label="Toggle favorite"
            aria-pressed={selected}
            onClick={() => setSelected(!selected)}
          >
            ☆
          </IconButton>
          <FilterChip
            selected={selected}
            onClick={() => setSelected(!selected)}
          >
            Favorite
          </FilterChip>
          <Chip tone="success">Published</Chip>
          <Avatar name="Alex Stone" />
          <Tooltip title="Useful help">
            <Button>Help</Button>
          </Tooltip>
        </div>
        <Checkbox
          label="Updates"
          checked={selected}
          onChange={(e) => setSelected(e.target.checked)}
        />
        <RadioGroup
          label="Schedule"
          defaultValue="day"
          options={[
            { value: "day", label: "Daily" },
            { value: "week", label: "Weekly" },
          ]}
        />
        <Progress
          aria-label="Selection task progress"
          percent={selected ? 80 : 40}
        />
        <Skeleton active />
      </div>
    );
  },
};
export const ComposableInputs: Story = {
  render: () => (
    <div className="ku-template-form">
      <label htmlFor="story-input">Input owned by a form item</label>
      <Input id="story-input" />
      <label htmlFor="story-textarea">Content</label>
      <TextArea id="story-textarea" rows={4} />
      <Select
        aria-label="Delivery"
        showSearch
        options={[
          { value: "day", label: "Daily" },
          { value: "week", label: "Weekly" },
        ]}
        defaultValue="day"
      />
    </div>
  ),
};
