import { useState } from "react";
import { RecordFields } from "@kooyaph/ui";
import { DataTable } from "@kooyaph/ui/organisms";
import { BusyBoundary, DataValue, MetricCard } from "@kooyaph/ui/molecules";
import { Button, Card, Input, Segmented, Tag } from "@kooyaph/ui/components";
export default function LoadingPatterns({
  variant = "table",
}: {
  variant?: string;
}) {
  const [state, setState] = useState("Initial load");
  const loading = state === "Initial load";
  const refreshing = state === "Background refresh";
  const rows = [
    {
      id: "1",
      name: "Editorial launch",
      owner: "Jamie Rivera",
      status: "In review",
    },
    { id: "2", name: "Design system", owner: "Alex Chen", status: "Published" },
    { id: "3", name: "Team handbook", owner: "Sam Rivera", status: "Draft" },
  ];
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <h2>Keep the structure. Load the data.</h2>
        <p>
          Navigation, titles, labels, table headers and actions stay visible. A
          background refresh retains the last available data.
        </p>
        <Segmented
          aria-label="Loading phase"
          options={["Initial load", "Ready", "Background refresh"]}
          value={state}
          onChange={setState}
        />
      </div>
      {variant === "metrics" ? (
        <BusyBoundary busy={loading || refreshing} keepContent={refreshing}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 16,
            }}
          >
            <MetricCard
              label="Published pages"
              value="24"
              detail="8 published this week"
            />
            <MetricCard
              label="In review"
              value="6"
              detail="Across three projects"
            />
          </div>
        </BusyBoundary>
      ) : variant === "detail" ? (
        <Card title="Application details">
          <BusyBoundary busy={loading || refreshing} keepContent={refreshing}>
            <RecordFields
              label="Project details"
              fields={[
                { id: "name", label: "Project", value: "Editorial launch" },
                { id: "owner", label: "Owner", value: "Jamie Rivera" },
                { id: "status", label: "Status", value: "In review" },
              ]}
            />
            <Button disabled={loading}>Edit application</Button>
          </BusyBoundary>
        </Card>
      ) : variant === "action" ? (
        <Card title="Saving is an action, not a skeleton">
          <p>
            The action label and button geometry remain visible while saving.
          </p>
          <Button type="primary" loading={loading || refreshing}>
            Save changes
          </Button>
          <p role="status">
            {loading || refreshing ? "Saving your changes…" : "Changes saved."}
          </p>
        </Card>
      ) : (
        <Card
          title="Project directory"
          extra={<Button disabled={loading}>Export</Button>}
        >
          <Input.Search
            aria-label="Search projects"
            placeholder="Search projects"
            disabled={loading}
            style={{ maxWidth: 360, marginBottom: 20 }}
          />
          <DataTable
            label="Project directory"
            loading={loading || refreshing}
            rows={loading ? [] : rows}
            rowKey={(r) => r.id}
            columns={[
              { key: "name", title: "Project", render: (r) => r.name },
              { key: "owner", title: "Owner", render: (r) => r.owner },
              {
                key: "status",
                title: "Status",
                render: (r) => <Tag>{r.status}</Tag>,
              },
            ]}
          />
        </Card>
      )}
    </div>
  );
}
