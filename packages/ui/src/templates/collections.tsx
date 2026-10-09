import type { ReactNode } from "react";
import { DataTable, type DataTableProps } from "../organisms/index";
import { Card } from "../molecules/index";
import { TemplateFrame, type TemplateProps } from "./shared";
export interface CollectionTemplateProps<Row extends object>
  extends TemplateProps {
  table: DataTableProps<Row>;
  toolbar?: ReactNode;
  selectionActions?: ReactNode;
  list?: ReactNode;
  view?: "table" | "list";
}
export function CollectionTemplate<Row extends object>({
  table,
  toolbar,
  selectionActions,
  list,
  view = "table",
  ...props
}: CollectionTemplateProps<Row>) {
  return (
    <TemplateFrame skeleton="table" {...props}>
      {toolbar && <div className="ku-template-toolbar">{toolbar}</div>}
      {selectionActions}
      <Card flush>
        {view === "list" && list ? list : <DataTable {...table} />}
      </Card>
      {props.children}
    </TemplateFrame>
  );
}
export interface DetailField {
  id: string;
  label: string;
  value: ReactNode;
}
export interface RecordDetailTemplateProps extends TemplateProps {
  summary?: ReactNode;
  fields: readonly DetailField[];
  activity?: ReactNode;
  related?: ReactNode;
}
export function RecordDetailTemplate({
  summary,
  fields,
  activity,
  related,
  ...props
}: RecordDetailTemplateProps) {
  return (
    <TemplateFrame {...props}>
      <div className="ku-template-split">
        <Card>
          {summary}
          <dl className="ku-template-details">
            {fields.map((f) => (
              <div key={f.id}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          {related}
        </Card>
        {activity && (
          <aside>
            <Card title="Activity">{activity}</Card>
          </aside>
        )}
      </div>
      {props.children}
    </TemplateFrame>
  );
}
export interface AuditEntry {
  id: string;
  actor: string;
  role?: string;
  action: string;
  timestamp: string;
  details?: ReactNode;
}
export interface AuditTemplateProps extends TemplateProps {
  entries: readonly AuditEntry[];
  toolbar?: ReactNode;
  empty?: string;
}
export function AuditTemplate({
  entries,
  toolbar,
  empty = "No audit events.",
  ...props
}: AuditTemplateProps) {
  return (
    <TemplateFrame {...props}>
      {toolbar}
      <Card>
        <ol className="ku-template-timeline" aria-label="Audit history">
          {entries.map((e) => (
            <li key={e.id}>
              <strong>{e.actor}</strong>
              {e.role && <span> · {e.role}</span>}
              <p>{e.action}</p>
              <time>{e.timestamp}</time>
              {e.details}
            </li>
          ))}
        </ol>
        {!entries.length && <p>{empty}</p>}
      </Card>
      {props.children}
    </TemplateFrame>
  );
}
