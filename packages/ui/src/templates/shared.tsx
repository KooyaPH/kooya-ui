import type { ReactNode } from "react";
import {
  BusyBoundary,
  ErrorState,
  FeedbackState,
  type SafeFailure,
  type SkeletonLayout,
} from "../molecules/experience";
import { PageHeading } from "../molecules/index";
export type TemplateState =
  | {
      status: "ready";
      refreshing?: boolean;
      failure?: SafeFailure;
      onRetry?: () => void;
    }
  | { status: "loading"; message?: string; skeleton?: SkeletonLayout }
  | {
      status: "error";
      failure?: SafeFailure;
      /** @deprecated Ignored: diagnostics must not be shown. Supply failure. */ message?: string;
      onRetry?: () => void;
    }
  | {
      status: "empty" | "offline" | "permission-denied" | "success";
      action?: ReactNode;
    };
export interface TemplateProps {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  children?: ReactNode;
  state?: TemplateState;
  skeleton?: SkeletonLayout;
}
/** Presentational state boundary. Applications decide fetching and retry policies. */
export function TemplateFrame({
  title,
  description,
  eyebrow,
  actions,
  children,
  state,
  skeleton = "page",
}: TemplateProps) {
  return (
    <section className="ku-template">
      <PageHeading
        title={title}
        description={description}
        eyebrow={eyebrow}
        actions={actions}
      />
      {state?.status === "error" ? (
        <ErrorState failure={state.failure} onRetry={state.onRetry} />
      ) : state &&
        ["empty", "offline", "permission-denied", "success"].includes(
          state.status,
        ) ? (
        <FeedbackState
          kind={
            state.status as
              | "empty"
              | "offline"
              | "permission-denied"
              | "success"
          }
          action={"action" in state ? state.action : undefined}
        />
      ) : (
        <>
          {state?.status === "ready" && state.failure && (
            <ErrorState failure={state.failure} onRetry={state.onRetry} />
          )}
          <BusyBoundary
            busy={
              state?.status === "loading" ||
              (state?.status === "ready" && !!state.refreshing)
            }
            keepContent={state?.status === "ready"}
            label={
              state?.status === "ready" ? "Updating content" : "Loading content"
            }
            skeleton={
              state?.status === "loading"
                ? (state.skeleton ?? skeleton)
                : skeleton
            }
          >
            {children}
          </BusyBoundary>
        </>
      )}
    </section>
  );
}
export interface SummaryMetric {
  id: string;
  label: string;
  value: string;
  detail?: string;
}
