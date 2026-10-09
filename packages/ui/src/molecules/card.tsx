import { Card as AntCard } from "antd";
import type { HTMLAttributes, ReactNode } from "react";
export function Card({
  title,
  description,
  actions,
  children,
  className = "",
  flush = false,
  ...props
}: Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title?: string;
  description?: string;
  actions?: ReactNode;
  flush?: boolean;
}) {
  return (
    <section {...props} className={"ku-card " + className}>
      <AntCard variant="borderless" styles={{ body: { padding: 0 } }}>
        {title && (
          <div className="ku-card-heading">
            <div>
              <h2>{title}</h2>
              {description && <p>{description}</p>}
            </div>
            {actions}
          </div>
        )}
        <div
          className={
            flush ? "ku-card-body ku-card-body--flush" : "ku-card-body"
          }
        >
          {children}
        </div>
      </AntCard>
    </section>
  );
}
