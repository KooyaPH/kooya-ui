import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Menu,
  Popup,
  ChoiceSelect,
  SelectField,
  Dialog,
  Button,
  TextField,
} from "@kooyaph/ui";
const meta = {
  title: "Molecules/Popup composition",
  component: Menu,
  args: { label: "Actions", trigger: <Button>Actions</Button>, items: [] },
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const ControlledNestedActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false),
      [action, setAction] = useState("None"),
      [editor, setEditor] = useState(false);
    return (
      <>
        <Menu
          label="Conversation actions"
          open={open}
          onOpenChange={setOpen}
          trigger={<Button>Conversation actions</Button>}
          items={[
            { label: "Edit", onSelect: () => setEditor(true) },
            {
              label: "Mute",
              children: [
                { label: "For 8 hours", onSelect: () => setAction("8 hours") },
                { label: "For 1 week", onSelect: () => setAction("1 week") },
                { label: "Always", onSelect: () => setAction("Always") },
              ],
            },
            { type: "divider" },
            {
              label: "Delete",
              disabled: true,
              onSelect: () => setAction("Delete"),
            },
          ]}
        />
        <p role="status">{action}</p>
        <Dialog
          title="Edit conversation"
          open={editor}
          onOpenChange={setEditor}
        >
          <TextField label="Name" />
        </Dialog>
      </>
    );
  },
};
export const CustomSearch: Story = {
  render: () => {
    const [value, setValue] = useState("Asia/Singapore");
    return (
      <SelectField
        label="Timezone"
        value={value}
        onValueChange={setValue}
        options={[
          { value: "Asia/Singapore", label: "Singapore UTC +8" },
          { value: "America/New_York", label: "America/New_York" },
        ]}
        filterOption={(query, option) =>
          option.value
            .toLowerCase()
            .replaceAll("_", " ")
            .includes(query.toLowerCase()) ||
          (option.value === "Asia/Singapore" && query === "+08:00")
        }
      />
    );
  },
};
export const RichMultipleChoices: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]),
      [search, setSearch] = useState("");
    return (
      <ChoiceSelect
        label="Projects"
        multiple
        value={value}
        onValueChange={setValue}
        searchValue={search}
        onSearch={setSearch}
        options={[
          {
            value: "one",
            label: "Website",
            display: (
              <span>
                Website <small>Recent project</small>
              </span>
            ),
          },
          {
            value: "two",
            label: "Operations",
            display: (
              <span>
                Operations <small>Available project</small>
              </span>
            ),
          },
          { value: "disabled", label: "Restricted", disabled: true },
        ]}
      />
    );
  },
};
export const AnchoredEditor: Story = {
  render: () => {
    const [open, setOpen] = useState(false),
      [selected, setSelected] = useState("one");
    return (
      <Dialog
        title="Project editor"
        trigger={<Button>Open project editor</Button>}
      >
        <Popup
          label="Filter editor"
          open={open}
          onOpenChange={setOpen}
          trigger={<Button>Filter editor</Button>}
        >
          <TextField label="Filter name" />
          <ChoiceSelect
            label="Project"
            value={selected}
            onValueChange={setSelected}
            options={[
              { value: "one", label: "Website" },
              { value: "two", label: "Operations" },
            ]}
          />
          <Button onClick={() => setOpen(false)}>Apply filters</Button>
        </Popup>
      </Dialog>
    );
  },
};
export const AsyncChoices: Story = {
  render: () => {
    const [state, setState] = useState("ready"),
      [value, setValue] = useState("");
    const [created, setCreated] = useState(false);
    return (
      <>
        <ChoiceSelect
          label="Related ticket"
          value={value}
          onValueChange={setValue}
          options={
            state === "ready"
              ? [
                  { value: "ticket-one", label: "DEMO-1 Example ticket" },
                  ...(created
                    ? [
                        {
                          value: "ticket-created",
                          label: "DEMO-2 Created ticket",
                        },
                      ]
                    : []),
                ]
              : []
          }
          loading={state === "loading"}
          error={
            state === "error" ? (
              <span>
                Search failed{" "}
                <Button onClick={() => setState("ready")}>Retry</Button>
              </span>
            ) : undefined
          }
          emptyContent="No matching tickets"
          footer={
            <Button
              onClick={() => {
                setCreated(true);
                setState("ready");
                setValue("ticket-created");
              }}
            >
              Create example ticket
            </Button>
          }
        />
        <Button onClick={() => setState("loading")}>Loading state</Button>
        <Button onClick={() => setState("error")}>Error state</Button>
        <Button onClick={() => setState("empty")}>Empty state</Button>
        <Button onClick={() => setState("ready")}>Ready state</Button>
      </>
    );
  },
};
