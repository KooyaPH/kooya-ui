import { DataValue } from "../molecules/experience";
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
                <dd>
                  <DataValue>{f.value}</DataValue>
                </dd>
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
              <strong>
                <DataValue>{e.actor}</DataValue>
              </strong>
              {e.role && (
                <span>
                  <DataValue> · {e.role}</DataValue>
                </span>
              )}
              <p>
                <DataValue block>{e.action}</DataValue>
              </p>
              <time>
                <DataValue>{e.timestamp}</DataValue>
              </time>
              {e.details}
            </li>
          ))}
        </ol>
        {!entries.length &&
          (props.state?.status === "loading" ? (
            <ul aria-label="Loading audit entries">
              {[0, 1, 2].map((index) => (
                <li key={index}>
                  <DataValue loading />
                  <p>
                    <DataValue loading />
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>{empty}</p>
          ))}
      </Card>
      {props.children}
    </TemplateFrame>
  );
}
