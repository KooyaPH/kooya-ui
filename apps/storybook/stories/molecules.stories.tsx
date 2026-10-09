import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  TextField,
  SelectField,
  NumberField,
  DateField,
  Switch,
  PageHeading,
  MetricCard,
  Menu,
  Tabs,
  Pagination,
  Breadcrumb,
  RowActions,
  Button,
} from "@kooyaph/ui";
const meta = {
  title: "Molecules/Fields",
  component: TextField,
  tags: ["autodocs"],
  args: { label: "Workspace name", hint: "Choose a recognizable name." },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Error: Story = { args: { error: "Enter a workspace name." } };
export const Disabled: Story = {
  args: { disabled: true, value: "Managed by your organization" },
};
export const ReadOnly: Story = { args: { readOnly: true, value: "DEMO-001" } };
export const AdditionalFields: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Card title="Settings fields">
        <div className="ku-template-form">
          <SelectField
            label="Country"
            options={[
              { value: "sg", label: "Singapore" },
              { value: "ph", label: "Philippines" },
            ]}
          />
          <NumberField label="Seats" min={1} defaultValue={3} />
          <DateField label="Start date" />
          <Switch
            label="Email summaries"
            checked={checked}
            onCheckedChange={setChecked}
          />
        </div>
      </Card>
    );
  },
};
export const NavigationAndModules: Story = {
  render: () => {
    const [value, setValue] = useState("one");
    const [page, setPage] = useState(1);
    const [action, setAction] = useState("No action selected");
    return (
      <div className="ku-template-stack">
        <PageHeading
          title="Module composition"
          description="Application supplied content."
        />
        <MetricCard label="Requests" value="24" detail="This week" />
        <Card title="Navigation">
          <Breadcrumb items={[{ title: "Library" }, { title: "Modules" }]} />
          <Tabs
            label="Sections"
            value={value}
            onValueChange={setValue}
            options={[
              { value: "one", label: "Overview" },
              { value: "two", label: "Details" },
            ]}
          >
            <p>{value === "one" ? "Overview panel" : "Details panel"}</p>
          </Tabs>
          <div className="ku-template-toolbar">
            <Menu
              label="Sample actions"
              trigger={<Button>Open menu</Button>}
              items={[
                {
                  label: "Edit sample",
                  onSelect: () => setAction("Edit selected"),
                },
                {
                  label: "Disabled action",
                  disabled: true,
                  onSelect: () => {},
                },
              ]}
            />
            <RowActions
              items={[
                {
                  label: "View record",
                  onSelect: () => setAction("View selected"),
                },
              ]}
            />
          </div>
          <Pagination total={30} current={page} onChange={setPage} />
          <p role="status">
            {action} · Page {page}
          </p>
        </Card>
      </div>
    );
  },
};
