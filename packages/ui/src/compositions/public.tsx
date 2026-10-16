import { useId, type HTMLAttributes, type ReactNode } from "react";
import { DataValue, useDataLoading } from "../molecules/experience";
import { ExpandableText } from "../molecules/text";

/** Public editorial page header. Copy and routing stay in the application. */
export function EditorialIntro({
  eyebrow,
  title,
  description,
  children,
  className = "",
  ...props
}: Omit<HTMLAttributes<HTMLElement>, "title"> & {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <header {...props} className={`ku-editorial-intro ${className}`}>
      <div className="ku-editorial-intro__inner">
        {eyebrow && <p className="ku-editorial-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description &&
          (typeof description === "string" ? (
            <ExpandableText
              text={description}
              className="ku-editorial-intro__description"
            />
          ) : (
            <div className="ku-editorial-intro__description">{description}</div>
          ))}
        {children}
      </div>
    </header>
  );
}
/** Shared public/auth shell without account queries, routing or session state. */
export function PublicPageFrame({
  header,
  footer,
  children,
  className = "",
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  header?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div {...props} className={`ku-public-frame ${className}`}>
      {header}
      {children}
      {footer}
    </div>
  );
}
export function AuthPanel({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <section {...props} className={`ku-auth-panel ${className}`}>
      {children}
    </section>
  );
}

/** Server-renderable navigation action; applications own destinations. */
export function LinkButton({
  children,
  className = "",
  ...props
}: import("react").AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} className={`ku-link-button ${className}`}>
      {children}
    </a>
  );
}
export function EditorialCard({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <article {...props} className={`ku-editorial-card ${className}`}>
      {children}
    </article>
  );
}

/** Minimal server-rendered protocol pages can share the public visual foundation without hydration. */
export const publicDocumentStyles = `:root{color-scheme:light dark;font-family:"Source Sans 3",system-ui,sans-serif;color:#20271f;background:#f5f5f1}body{margin:0;min-height:100dvh;display:grid;place-items:center;padding:24px;box-sizing:border-box}.ku-auth-panel{box-sizing:border-box;width:min(100%,440px);padding:32px;border:1px solid #d9ddd4;border-radius:12px;background:#fff;overflow-wrap:anywhere}.ku-auth-panel h1{font-size:24px;line-height:1.2}.ku-auth-panel p{color:#5c6657;line-height:1.6}.ku-auth-panel :is(button,a){max-width:100%;min-height:44px;box-sizing:border-box;overflow-wrap:anywhere}.ku-auth-panel a{display:inline-flex;align-items:center;color:inherit}.ku-auth-panel button{font:inherit;background:#45583d;color:#fff;border:0;border-radius:6px;padding:10px 16px;cursor:pointer}.ku-auth-panel button:focus-visible{outline:2px solid #45583d;outline-offset:3px}@media(prefers-color-scheme:dark){:root{color:#e9ece5;background:#171b16}.ku-auth-panel{background:#21271e;border-color:#485140}.ku-auth-panel p{color:#b7c0ae}.ku-auth-panel button{background:#bdcfa9;color:#1d2816}}`;

export interface AuthLayoutProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  brand: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  utilities?: ReactNode;
  footer?: ReactNode;
  headingId?: string;
  wide?: boolean;
}
/** One task, one heading. Forms and authentication state remain application-owned. */
export function AuthLayout({
  brand,
  title,
  description,
  utilities,
  footer,
  headingId,
  wide = false,
  children,
  className = "",
  ...props
}: AuthLayoutProps) {
  const generatedId = useId();
  const titleId = headingId ?? generatedId;
  return (
    <section
      {...props}
      className={`ku-auth-layout ${wide ? "ku-auth-layout--wide" : ""} ${className}`}
      aria-labelledby={titleId}
    >
      {utilities && (
        <div className="ku-auth-layout__utilities">{utilities}</div>
      )}
      <div className="ku-auth-layout__brand">{brand}</div>
      <header className="ku-auth-layout__heading">
        <h1 id={titleId}>{title}</h1>
        {description && (
          <div className="ku-auth-layout__description">{description}</div>
        )}
      </header>
      <div className="ku-auth-layout__content">{children}</div>
      {footer && <footer className="ku-auth-layout__footer">{footer}</footer>}
    </section>
  );
}

export interface RecordFieldsProps {
  fields: readonly { id: string; label: ReactNode; value?: ReactNode }[];
  label?: string;
  loading?: boolean;
}
/** Stable read-only field labels; unavailable values alone become placeholders. */
export function RecordFields({
  fields,
  label = "Details",
  loading,
}: RecordFieldsProps) {
  const inherited = useDataLoading();
  const busy = loading ?? inherited;
  return (
    <div
      className="ku-record-fields"
      role="group"
      aria-label={label}
      aria-busy={busy || undefined}
    >
      {busy && (
        <span role="status" className="ku-visually-hidden">
          {label}
        </span>
      )}
      <dl>
        {fields.map((field) => (
          <div key={field.id}>
            <dt>{field.label}</dt>
            <dd>
              <DataValue loading={busy}>{field.value}</DataValue>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
