import type { ReactNode } from "react";
import { Avatar } from "../atoms/index";
import { Card } from "../molecules/index";
import {
  TemplateFrame,
  type TemplateProps,
  type SummaryMetric,
} from "./shared";
import { DashboardTemplate } from "./dashboard";
import type { DetailField } from "./collections";
export interface ProfileTemplateProps extends TemplateProps {
  name: string;
  subtitle?: string;
  avatar?: ReactNode;
  fields: readonly DetailField[];
  activity?: ReactNode;
}
export function ProfileTemplate({
  name,
  subtitle,
  avatar,
  fields,
  activity,
  ...props
}: ProfileTemplateProps) {
  return (
    <TemplateFrame {...props}>
      <div className="ku-template-split">
        <Card>
          <div className="ku-template-profile">
            {avatar ?? <Avatar name={name} />}
            <h2>{name}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <dl className="ku-template-details">
            {fields.map((f) => (
              <div key={f.id}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
        {activity && <Card title="Recent activity">{activity}</Card>}
      </div>
      {props.children}
    </TemplateFrame>
  );
}
export interface BusinessSection {
  id: string;
  title: string;
  content: ReactNode;
}
export interface BusinessPageTemplateProps extends TemplateProps {
  brand: ReactNode;
  navigation?: ReactNode;
  hero: ReactNode;
  sections: readonly BusinessSection[];
  footer?: ReactNode;
}
export function BusinessPageTemplate({
  brand,
  navigation,
  hero,
  sections,
  footer,
  ...props
}: BusinessPageTemplateProps) {
  return (
    <TemplateFrame {...props}>
      <div className="ku-template-business">
        <header className="ku-template-toolbar">
          {brand}
          {navigation}
        </header>
        <Card className="ku-template-hero">{hero}</Card>
        {sections.map((s) => (
          <Card key={s.id} title={s.title}>
            {s.content}
          </Card>
        ))}
        {props.children}
        {footer && <footer>{footer}</footer>}
      </div>
    </TemplateFrame>
  );
}
export interface ClientPortalTemplateProps extends TemplateProps {
  metrics: readonly SummaryMetric[];
  welcome: ReactNode;
  requests: ReactNode;
  resources?: ReactNode;
}
export function ClientPortalTemplate({
  metrics,
  welcome,
  requests,
  resources,
  ...props
}: ClientPortalTemplateProps) {
  return (
    <DashboardTemplate
      {...props}
      metrics={metrics}
      primary={
        <div className="ku-template-stack">
          <Card>{welcome}</Card>
          <Card title="Your requests">{requests}</Card>
        </div>
      }
      aside={resources && <Card title="Resources">{resources}</Card>}
    />
  );
}
