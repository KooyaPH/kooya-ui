import type { ReactNode } from "react";
export function PageHeading({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="ku-page-heading">
      <div>
        {eyebrow && <p className="ku-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="ku-page-actions">{actions}</div>}
    </div>
  );
}
export function MetricCard({
  label,
  value,
  detail,
  icon,
  className = "",
}: {
  label: string;
  value: string;
  detail: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <article className={"ku-metric " + className}>
      <div>
        <span>{label}</span>
        {icon && <span aria-hidden="true">{icon}</span>}
      </div>
      <strong>{value}</strong>
      <p>{detail}</p>
      <svg aria-hidden="true" viewBox="0 0 90 25">
        <polyline points="0,20 15,18 27,21 40,13 52,16 65,7 78,10 90,3" />
      </svg>
    </article>
  );
}
