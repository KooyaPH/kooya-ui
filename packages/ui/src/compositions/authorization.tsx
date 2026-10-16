import { useId, type ReactNode } from "react";
import { Alert, Button, Checkbox, Select, Tag } from "antd";
export type AuthorizationState =
  | "review"
  | "authorizing"
  | "approved"
  | "denied"
  | "error";
export interface ApplicationPermission {
  id: string;
  title: string;
  description: string;
  access: string;
  required?: boolean;
}
export interface ApplicationAuthorizationProps {
  application: {
    name: string;
    publisher: string;
    description?: string;
    icon?: ReactNode;
    verified?: boolean;
  };
  account: string;
  permissions: readonly ApplicationPermission[];
  state?: AuthorizationState;
  selectedPermissions?: readonly string[];
  onPermissionsChange?: (ids: string[]) => void;
  repositories?: readonly { value: string; label: string }[];
  selectedRepositories?: readonly string[];
  onRepositoriesChange?: (ids: string[]) => void;
  repositoryLoading?: boolean;
  onAuthorize: () => void;
  onCancel: () => void;
  onDone?: () => void;
  onRetry?: () => void;
  /** True when publisher verification was established by the owning application. */
  authorizationDisabled?: boolean;
}
/** Presentational consent review. The owning application validates identity, scopes and OAuth state. */
export function ApplicationAuthorization({
  application,
  account,
  permissions,
  state = "review",
  selectedPermissions = [],
  onPermissionsChange,
  repositories,
  selectedRepositories = [],
  onRepositoriesChange,
  repositoryLoading,
  onAuthorize,
  onCancel,
  onDone,
  onRetry,
  authorizationDisabled,
}: ApplicationAuthorizationProps) {
  const titleId = useId();
  const busy = state === "authorizing";
  const done = state === "approved" || state === "denied";
  return (
    <section
      className="ku-authorization"
      aria-labelledby={titleId}
      aria-busy={busy || undefined}
    >
      <div className="ku-authorization-identity">
        <span className="ku-authorization-icon" aria-hidden="true">
          {application.icon ?? application.name.slice(0, 1)}
        </span>
        <span aria-hidden="true">↔</span>
        <span className="ku-authorization-account">{account.slice(0, 1)}</span>
      </div>
      <p className="ku-authorization-eyebrow">APPLICATION CONNECTION</p>
      <h2 id={titleId}>
        {state === "approved"
          ? `${application.name} is connected`
          : state === "denied"
            ? "Connection cancelled"
            : `Authorize ${application.name}`}
      </h2>
      <p className="ku-authorization-publisher">
        By {application.publisher}{" "}
        {application.verified && <Tag>Verified publisher</Tag>}
      </p>
      {application.description && <p>{application.description}</p>}
      <div className="ku-authorization-account-line">
        <span>Connecting as</span>
        <strong>{account}</strong>
      </div>
      {!done && (
        <>
          <h3>Review access</h3>
          <ul className="ku-authorization-permissions">
            {permissions.map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.description}</p>
                  <small>
                    {p.access}
                    {p.required ? " · Required" : " · Optional"}
                  </small>
                </div>
                {!p.required && (
                  <Checkbox
                    aria-label={p.title}
                    checked={selectedPermissions.includes(p.id)}
                    disabled={busy || !onPermissionsChange}
                    onChange={(e) =>
                      onPermissionsChange?.(
                        e.target.checked
                          ? [...selectedPermissions, p.id]
                          : selectedPermissions.filter((id) => id !== p.id),
                      )
                    }
                  />
                )}
              </li>
            ))}
          </ul>
          {repositories !== undefined && (
            <div className="ku-authorization-repositories">
              <label htmlFor={titleId + "-repositories"}>
                Repository access
              </label>
              <Select
                id={titleId + "-repositories"}
                mode="multiple"
                placeholder={
                  repositoryLoading
                    ? "Loading repositories…"
                    : "Select repositories"
                }
                loading={repositoryLoading}
                disabled={busy || repositoryLoading}
                options={[...repositories]}
                value={[...selectedRepositories]}
                onChange={onRepositoriesChange}
                style={{ width: "100%" }}
              />
              <small>Access is limited to the repositories you select.</small>
            </div>
          )}
          <p className="ku-authorization-notice">
            Continue only if you trust this application. You can revoke access
            in your connected application settings.
          </p>
        </>
      )}
      {state === "error" && (
        <Alert
          type="error"
          showIcon
          title="Connection could not be completed"
          description="Try again. If this continues, contact your workspace administrator."
        />
      )}
      {state === "approved" && (
        <Alert
          type="success"
          showIcon
          title="Access approved"
          description="Manage or revoke this connection from your application settings."
        />
      )}
      {state === "denied" && (
        <Alert
          type="info"
          showIcon
          title="No new access was granted"
          description="You can review the request again when you are ready."
        />
      )}
      <div className="ku-authorization-actions">
        {done ? (
          <Button type="primary" onClick={onDone ?? onCancel}>
            Done
          </Button>
        ) : (
          <>
            <Button onClick={onCancel} disabled={busy}>
              Cancel
            </Button>
            <Button
              type="primary"
              loading={busy}
              disabled={
                authorizationDisabled ||
                repositoryLoading ||
                (repositories !== undefined &&
                  selectedRepositories.length === 0)
              }
              onClick={
                state === "error" ? (onRetry ?? onAuthorize) : onAuthorize
              }
            >
              {busy
                ? "Connecting…"
                : state === "error"
                  ? "Try again"
                  : `Authorize ${application.name}`}
            </Button>
          </>
        )}
      </div>
      <span role="status" className="ku-visually-hidden">
        {busy
          ? "Connecting application. Please wait."
          : state === "approved"
            ? "Application connected."
            : ""}
      </span>
    </section>
  );
}
