import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  KooyaProvider,
  WorkspaceShell,
  AppearancePicker,
  defaultAppearance,
} from "@kooyaph/ui";
import { WorkspaceHeader } from "@kooyaph/ui/legacy";
import { Button, Card, Input, Select, Table, Tag } from "antd";
const meta: Meta = { title: "V1/Editorial and Governance" };
export default meta;
export const Workspace: StoryObj = {
  render: () => {
    const [appearance, setAppearance] = useState(defaultAppearance);
    const rows = Array.from({ length: 16 }, (_, i) => ({
      key: i,
      name:
        i === 2
          ? "A very long record name that stays readable when the workspace is compact ".repeat(
              3,
            )
          : `Editorial record ${i + 1}`,
      status: i % 2 ? "Draft" : "Published",
    }));
    return (
      <KooyaProvider
        palette={appearance.palette}
        customAccent={appearance.customAccent}
        mode={appearance.mode === "dark" ? "dark" : "light"}
        density={appearance.density}
      >
        <WorkspaceShell
          header={
            <WorkspaceHeader
              presentation="utility"
              name="Kooya"
              area="Editorial"
              title="Content library"
              collapsed={false}
              onNavigation={() => {}}
              onSearch={() => {}}
            />
          }
          navigation={
            <nav>
              <a href="#records">Records</a>
            </nav>
          }
          inspector={
            <AppearancePicker value={appearance} onChange={setAppearance} />
          }
        >
          <h1>Content library</h1>
          <p>Long records, quiet hierarchy and clear actions.</p>
          <Card>
            <Input.Search
              aria-label="Search records"
              placeholder="Search records"
            />
            <Table
              pagination={{ pageSize: 8 }}
              scroll={{ x: 520 }}
              dataSource={rows}
              columns={[
                { title: "Title", dataIndex: "name" },
                {
                  title: "Status",
                  dataIndex: "status",
                  render: (value) => <Tag>{value}</Tag>,
                },
                {
                  title: "Actions",
                  render: () => <Button>Edit record</Button>,
                },
              ]}
            />
          </Card>
        </WorkspaceShell>
      </KooyaProvider>
    );
  },
};
export const Governance: StoryObj = {
  render: () => (
    <KooyaProvider>
      <WorkspaceShell
        variant="governance"
        header="Kooya · Governance"
        navigation="Administration"
        context="People and permissions"
      >
        <h1>Organization preferences</h1>
        <Card>
          <label htmlFor="org-name">Organization name</label>
          <Input
            id="org-name"
            defaultValue={"An organization with a long name ".repeat(5)}
          />
          <label htmlFor="role-selector">Default role</label>
          <Select
            id="role-selector"
            style={{ width: "100%" }}
            options={[
              {
                value: "member",
                label: "Member with a detailed permission description ".repeat(
                  12,
                ),
              },
            ]}
          />
          <Button type="primary">Save preferences</Button>
        </Card>
      </WorkspaceShell>
    </KooyaProvider>
  ),
};
