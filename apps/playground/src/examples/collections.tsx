import { useState } from "react";
import {
  AuditTemplate,
  CollectionTemplate,
  RecordDetailTemplate,
  Button,
  Card,
  Chip,
  TextField,
  FilterChip,
  type TemplateState,
} from "@kooyaph/ui";
import { initialAccounts, type Account } from "../data";
export function CollectionExample({
  state,
  empty,
}: {
  state?: TemplateState;
  empty?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [view, setView] = useState<"table" | "list">("table");
  const rows = (empty ? [] : initialAccounts).filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <CollectionTemplate<Account>
      title="Relationship collection"
      state={state}
      toolbar={
        <>
          <TextField
            label="Search accounts"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FilterChip
            selected={view === "table"}
            onClick={() => setView("table")}
          >
            Table
          </FilterChip>
          <FilterChip
            selected={view === "list"}
            onClick={() => setView("list")}
          >
            List
          </FilterChip>
        </>
      }
      view={view}
      list={
        <div className="ku-template-stack">
          {rows.map((r) => (
            <Card
              key={r.id}
              title={r.name}
              actions={
                <Button onClick={() => setSelected(r.name)}>
                  Open {r.name}
                </Button>
              }
            >
              <Chip>{r.status}</Chip>
            </Card>
          ))}
          {!rows.length && <p>No matching accounts.</p>}
        </div>
      }
      table={{
        label: "Relationships",
        rows,
        rowKey: (r) => r.id,
        columns: [
          {
            key: "name",
            title: "Account",
            render: (r) => r.name,
            sorter: (a, b) => a.name.localeCompare(b.name),
          },
          {
            key: "owner",
            title: "Owner",
            priority: "secondary",
            render: (r) => r.owner,
          },
          {
            key: "status",
            title: "Status",
            render: (r) => <Chip>{r.status}</Chip>,
          },
          {
            key: "action",
            title: "Action",
            render: (r) => (
              <Button onClick={() => setSelected(r.name)}>Open {r.name}</Button>
            ),
          },
        ],
      }}
    >
      {selected && (
        <p role="status">Selected {selected} for this local session.</p>
      )}
    </CollectionTemplate>
  );
}
export function DetailExample({ state }: { state?: TemplateState }) {
  const [archived, setArchived] = useState(false);
  return (
    <RecordDetailTemplate
      title="Northstar Health"
      description="A fictional relationship record."
      state={state}
      actions={
        <Button onClick={() => setArchived(!archived)}>
          {archived ? "Restore account" : "Archive account"}
        </Button>
      }
      summary={
        <Chip tone={archived ? "warning" : "success"}>
          {archived ? "Archived locally" : "Active"}
        </Chip>
      }
      fields={[
        { id: "owner", label: "Owner", value: "Maya Chen" },
        { id: "value", label: "Annual value", value: "$48,200" },
        { id: "region", label: "Region", value: "Singapore" },
      ]}
      activity={
        <>
          <p>Brief approved · Oct 8</p>
          <p>Meeting scheduled · Oct 7</p>
        </>
      }
    />
  );
}
export function AuditExample({
  state,
  empty,
}: {
  state?: TemplateState;
  empty?: boolean;
}) {
  const [scope, setScope] = useState("all");
  const entries = [
    {
      id: "a",
      actor: "Maya Chen",
      role: "Workspace owner",
      action: "Updated brand colors",
      timestamp: "Oct 8, 2026 · 10:42",
      scope: "branding",
    },
    {
      id: "b",
      actor: "Jordan Lee",
      role: "Content editor",
      action: "Published the launch brief",
      timestamp: "Oct 8, 2026 · 09:20",
      scope: "content",
    },
  ];
  return (
    <AuditTemplate
      title="Audit history"
      state={state}
      toolbar={
        <div className="ku-template-toolbar">
          {["all", "branding", "content"].map((s) => (
            <FilterChip
              key={s}
              selected={scope === s}
              onClick={() => setScope(s)}
            >
              {s === "all"
                ? "All activity"
                : s === "branding"
                  ? "Branding"
                  : "Content"}
            </FilterChip>
          ))}
        </div>
      }
      entries={
        empty ? [] : entries.filter((e) => scope === "all" || e.scope === scope)
      }
    />
  );
}
