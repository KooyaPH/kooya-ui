import type { ReactNode } from "react";
import { Card } from "../molecules/index";
import { TemplateFrame, type TemplateProps } from "./shared";
export interface FocusedToolTemplateProps extends TemplateProps {
  toolLabel: string;
  toolbar?: ReactNode;
  stage: ReactNode;
  inspector?: ReactNode;
  footer?: ReactNode;
}
/** Slots frame a meeting, game or map; the application owns the engine. */
export function FocusedToolTemplate({
  toolLabel,
  toolbar,
  stage,
  inspector,
  footer,
  ...props
}: FocusedToolTemplateProps) {
  return (
    <TemplateFrame {...props}>
      {toolbar && <div className="ku-template-toolbar">{toolbar}</div>}
      <div className="ku-template-split">
        <section
          role="region"
          aria-label={toolLabel}
          className="ku-template-stage"
        >
          {stage}
        </section>
        {inspector && (
          <aside>
            <Card>{inspector}</Card>
          </aside>
        )}
      </div>
      {footer}
      {props.children}
    </TemplateFrame>
  );
}
