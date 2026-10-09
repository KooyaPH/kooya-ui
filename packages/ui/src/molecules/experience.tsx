import type { ReactNode } from "react";
import { Button, Skeleton } from "../atoms/index";

export type SkeletonLayout =
  | "page"
  | "metric"
  | "card"
  | "table"
  | "list"
  | "form"
  | "inbox";
/** Decorative structure only. Put inside BusyBoundary for one announcement. */
export function ContentSkeleton({
  layout = "page",
  rows = 4,
}: {
  layout?: SkeletonLayout;
  rows?: number;
}) {
  const count = Math.max(1, Math.min(12, Math.floor(rows) || 4));
  return (
    <div
      aria-hidden="true"
      data-skeleton={layout}
      className={`ku-skeleton ku-skeleton--${layout}`}
    >
      {Array.from(
        { length: layout === "metric" || layout === "card" ? 1 : count },
        (_, i) => (
          <div key={i} className="ku-skeleton-item">
            <Skeleton
              active
              title
              paragraph={{
                rows: layout === "metric" ? 1 : layout === "form" ? 1 : 2,
              }}
            />
          </div>
        ),
      )}
    </div>
  );
}
export function BusyBoundary({
  busy,
  label = "Loading content",
  children,
  skeleton = "page",
  keepContent = false,
}: {
  busy: boolean;
  label?: string;
  children?: ReactNode;
  skeleton?: SkeletonLayout;
  keepContent?: boolean;
}) {
  return (
    <>
      <span role="status" className="ku-visually-hidden">
        {busy ? label : ""}
      </span>
      <div className="ku-busy-boundary" aria-busy={busy || undefined}>
        {busy && !keepContent ? (
          <ContentSkeleton layout={skeleton} />
        ) : (
          children
        )}
        {busy && keepContent && (
          <div className="ku-refresh-indicator">
            <span>{label}</span>
            <ContentSkeleton layout="metric" />
          </div>
        )}
      </div>
    </>
  );
}
/** Only public codes/references enter this model. Recovery text is library-owned. */
export interface SafeFailure {
  publicCode: string;
  codeSource?: "server" | "client";
  httpStatus?: number;
  supportReference?: string;
  recovery: "retry" | "sign-in" | "request-access" | "check-state";
}
const fallback: SafeFailure = {
  publicCode: "UI_REQUEST_FAILED",
  codeSource: "client",
  recovery: "retry",
};
const recoveryCopy = {
  retry: "Please try again. If this continues, contact support.",
  "sign-in": "Sign in again to continue.",
  "request-access": "Ask your workspace administrator for access.",
  "check-state":
    "Check the current record or activity history before repeating this action.",
};
/** Reject Error instances and arbitrary payload fields; never render diagnostic prose. */
export function ErrorState({
  failure,
  onRetry,
}: {
  failure?: SafeFailure;
  onRetry?: () => void;
}) {
  const value =
    failure && Object.getPrototypeOf(failure) === Object.prototype
      ? failure
      : fallback;
  const code =
    typeof value.publicCode === "string" &&
    /^[A-Z][A-Z0-9_]{2,63}$/.test(value.publicCode)
      ? value.publicCode
      : fallback.publicCode;
  const status =
    Number.isInteger(value.httpStatus) &&
    value.httpStatus! >= 100 &&
    value.httpStatus! <= 599
      ? value.httpStatus
      : undefined;
  const reference =
    typeof value.supportReference === "string" &&
    /^[A-Za-z0-9_-]{3,64}$/.test(value.supportReference)
      ? value.supportReference
      : undefined;
  const recovery = Object.hasOwn(recoveryCopy, value.recovery)
    ? value.recovery
    : "retry";
  return (
    <div role="alert" className="ku-template-state ku-feedback">
      <strong>Unable to complete this request</strong>
      <p>{recoveryCopy[recovery]}</p>
      <p>
        <span>
          {code === "UI_REQUEST_FAILED" || value.codeSource !== "server"
            ? "UI code"
            : "Public code"}
          : {code}
        </span>
        <span>{status ? `HTTP ${status}` : "HTTP status unavailable"}</span>
      </p>
      {reference && <p>Support reference: {reference}</p>}
      {onRetry && recovery === "retry" && (
        <Button onClick={onRetry}>Try again</Button>
      )}
    </div>
  );
}
export function FeedbackState({
  kind,
  children,
  action,
}: {
  kind: "empty" | "offline" | "permission-denied" | "success";
  children?: ReactNode;
  action?: ReactNode;
}) {
  const title = {
    empty: "Nothing here yet",
    offline: "You are offline",
    "permission-denied": "Access required",
    success: "Action completed",
  }[kind];
  return (
    <div
      role="status"
      className="ku-template-state ku-feedback"
      data-feedback={kind}
    >
      <strong>{title}</strong>
      {children && <div>{children}</div>}
      {action}
    </div>
  );
}
