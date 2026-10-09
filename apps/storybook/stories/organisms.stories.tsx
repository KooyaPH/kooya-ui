import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  BentoShell,
  WorkspaceSidebar,
  WorkspaceHeader,
  DataTable,
  List,
  Dialog,
  Drawer,
  TextField,
  Button,
} from "@kooyaph/ui";
const meta = {
  title: "Organisms/Data and overlays",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "DataTable uses typed rows and columns; opt into sorting, pagination and selection. Dialog/Drawer trap focus and restore it on Escape. Sidebar/header are bento modules; router and authorization remain application responsibilities.",
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Data: Story = {
  render: () => (
    <DataTable<{ id: string; name: string }>
      label="Example records"
      rows={[
        { id: "a", name: "Alpine" },
        { id: "b", name: "Brook" },
      ]}
      rowKey={(r) => r.id}
      columns={[
        {
          key: "name",
          title: "Name",
          render: (r) => r.name,
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
      ]}
    />
  ),
};
export const Empty: Story = {
  render: () => (
    <DataTable label="Empty records" rows={[]} rowKey={() => ""} columns={[]} />
  ),
};
export const Loading: Story = {
  render: () => (
    <DataTable
      label="Loading records"
      rows={[]}
      rowKey={() => ""}
      columns={[]}
      loading
    />
  ),
};
export const ListItems: Story = {
  render: () => (
    <List
      label="Team roles"
      items={["Designer", "Editor"]}
      rowKey={(item) => item}
      itemRender={(item) => <span>{item}</span>}
    />
  ),
};
export const Overlays: Story = {
  render: () => (
    <div className="ku-template-toolbar">
      <Dialog
        title="Edit sample"
        description="Local sample form"
        trigger={<Button>Open modal</Button>}
      >
        <TextField label="Name" />
      </Dialog>
      <Drawer title="Record details" trigger={<Button>Open drawer</Button>}>
        <TextField label="Note" />
      </Drawer>
    </div>
  ),
};
export const Workspace: Story = {
  render: () => {
    const [selected, setSelected] = useState("overview");
    const [collapsed, setCollapsed] = useState(false);
    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState(false);
    return (
      <>
        <BentoShell
          collapsed={collapsed}
          focus={focus}
          sidebar={
            <WorkspaceSidebar
              name="Northstar Studio"
              brand={<strong>Kooya Workspace</strong>}
              profileName="Alex Stone"
              groups={[
                {
                  label: "Workspace",
                  items: [
                    { id: "overview", label: "Overview", icon: <span>◇</span> },
                    {
                      id: "settings",
                      label: "Settings",
                      icon: <span>⚙</span>,
                    },
                  ],
                },
              ]}
              selected={selected}
              onSelect={setSelected}
              collapsed={collapsed}
            />
          }
          header={
            <WorkspaceHeader
              name="Northstar Studio"
              area="Console"
              title={selected}
              collapsed={collapsed}
              onNavigation={() => setCollapsed(!collapsed)}
              onSearch={() => setSearch(true)}
              focus={focus}
              onFocus={() => setFocus(!focus)}
            />
          }
        >
          <p>
            {selected === "overview"
              ? "Workspace overview"
              : "Workspace settings"}
          </p>
          <Button onClick={() => setFocus(!focus)}>
            {focus ? "Exit focus mode" : "Enter focus mode"}
          </Button>
        </BentoShell>
        <Dialog title="Find a record" open={search} onOpenChange={setSearch}>
          <TextField label="Search records" />
        </Dialog>
      </>
    );
  },
};

export const RowActivation: Story = {
  render: () => {
    const [selected, setSelected] = useState("");
    return (
      <>
        <output aria-label="Activated record">
          {selected || "Choose a record"}
        </output>
        <DataTable
          label="Keyboard accessible records"
          rows={[
            { id: "a", name: "Alpine" },
            { id: "b", name: "Brook" },
          ]}
          rowKey={(row) => row.id}
          columns={[
            {
              key: "name",
              title: (
                <span>
                  Record <small>(sample)</small>
                </span>
              ),
              render: (row) => row.name,
              align: "left",
              className: "sample-record-column",
              fixed: "left",
              width: 240,
            },
          ]}
          onRow={(row) => ({
            "aria-label": `Open ${row.name}`,
            tabIndex: 0,
            onClick: () => setSelected(row.name),
            onKeyDown: (event) => {
              if (
                event.target === event.currentTarget &&
                (event.key === "Enter" || event.key === " ")
              ) {
                event.preventDefault();
                setSelected(row.name);
              }
            },
          })}
        />
      </>
    );
  },
};
export const ExternalDialogHeading: Story = {
  render: () => {
    const [heading, setHeading] = useState("Edit sample record");
    const [dismissible, setDismissible] = useState(true);
    const [showCloseButton, setShowCloseButton] = useState(true);
    return (
      <Dialog
        labelledBy="sample-editor-heading"
        describedBy="sample-editor-help"
        width={720}
        dismissible={dismissible}
        showCloseButton={showCloseButton}
        closeLabel="Close sample editor"
        className="sample-editor"
        bodyClassName="sample-editor-body"
        trigger={<Button>Open external heading</Button>}
      >
        <h2 id="sample-editor-heading">{heading}</h2>
        <p id="sample-editor-help">
          Fictional data only. Escape and backdrop follow the dismissal option.
        </p>
        <TextField
          label="Heading"
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
        />
        <Button onClick={() => setDismissible(!dismissible)}>
          Toggle dismissal
        </Button>
        <Button onClick={() => setShowCloseButton(!showCloseButton)}>
          Toggle close icon
        </Button>
      </Dialog>
    );
  },
};
