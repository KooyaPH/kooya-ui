import { DataValue } from "../molecules/experience";
import type { ReactNode } from "react";
import { Card, SelectField, ExpandableText } from "../molecules/index";
import { Button, Chip } from "../atoms/index";
import { TemplateFrame, type TemplateProps } from "./shared";
export interface BoardColumn {
  id: string;
  title: string;
}
export interface BoardItem {
  id: string;
  title: string;
  columnId: string;
  description?: string;
  content?: ReactNode;
}
export interface BoardTemplateProps extends TemplateProps {
  columns: readonly BoardColumn[];
  items: readonly BoardItem[];
  onMove: (itemId: string, columnId: string) => void;
  onOpen?: (itemId: string) => void;
  empty?: string;
}
export function BoardTemplate({
  columns,
  items,
  onMove,
  onOpen,
  empty = "No items in this stage.",
  ...props
}: BoardTemplateProps) {
  return (
    <TemplateFrame {...props}>
      <div className="ku-template-board">
        {columns.map((c) => {
          const members = items.filter((i) => i.columnId === c.id);
          return (
            <section key={c.id} role="region" aria-label={c.title}>
              <Card title={c.title} actions={<Chip>{members.length}</Chip>}>
                <div className="ku-template-stack">
                  {members.map((item) => (
                    <article className="ku-template-board-item" key={item.id}>
                      <h3>
                        <DataValue>{item.title}</DataValue>
                      </h3>
                      {item.description && (
                        <DataValue block>
                          <ExpandableText text={item.description} />
                        </DataValue>
                      )}
                      {item.content}
                      {onOpen && (
                        <Button
                          aria-label={`Open ${item.title}`}
                          disabled={props.state?.status === "loading"}
                          onClick={() => onOpen(item.id)}
                        >
                          Open
                        </Button>
                      )}
                      <SelectField
                        label={"Move " + item.title}
                        value={item.columnId}
                        options={columns.map((c) => ({
                          value: c.id,
                          label: c.title,
                        }))}
                        onValueChange={(next) => onMove(item.id, next)}
                      />
                    </article>
                  ))}
                  {!members.length &&
                    (props.state?.status === "loading" ? (
                      [0, 1, 2].map((index) => (
                        <article className="ku-template-board-item" key={index}>
                          <DataValue loading />
                          <p>
                            <DataValue loading block />
                          </p>
                        </article>
                      ))
                    ) : (
                      <p>{empty}</p>
                    ))}
                </div>
              </Card>
            </section>
          );
        })}
      </div>
      {props.children}
    </TemplateFrame>
  );
}
