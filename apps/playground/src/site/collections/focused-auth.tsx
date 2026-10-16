import { useState } from "react";
import {
  AuthLayout,
  ApplicationAuthorization,
  Button,
  Input,
} from "@kooyaph/ui";
import { ExpandableText, BusyBoundary, DataValue } from "@kooyaph/ui/molecules";
export default function FocusedAuthDemo({
  variant = "sign-in",
}: {
  variant?: string;
}) {
  const [stage, setStage] = useState("review");
  const long = variant === "long-text";
  const brand = (
    <>
      <span className="ku-demo-brand-mark" aria-hidden="true">
        K
      </span>
      <span>KooyaHQ</span>
    </>
  );
  return (
    <div style={{ padding: 16, minWidth: 0 }}>
      <AuthLayout
        brand={brand}
        title={
          variant === "consent"
            ? "Connect Projects"
            : variant === "code"
              ? "Check your email"
              : variant === "loading"
                ? "Opening workspace"
                : "Sign in"
        }
        headingId="demo-auth-title"
        wide={variant === "consent"}
        description={
          long
            ? "Continue to InternationalCorporateOperationsAndGovernanceWorkspaceWithoutSpaces."
            : undefined
        }
      >
        {variant === "consent" ? (
          <ApplicationAuthorization
            presentation="embedded"
            labelledBy="demo-auth-title"
            application={{
              name: "Projects",
              publisher: "Kooya demo",
              description: "Demo access lasts for 30 days.",
            }}
            account="jamie@example.test"
            permissions={[
              {
                id: "read",
                title: "Read projects",
                description: "Only the projects you select.",
                access: "Read only",
                required: true,
              },
            ]}
            state={stage === "review" ? "review" : "approved"}
            onAuthorize={() => setStage("approved")}
            onCancel={() => setStage("review")}
            onDone={() => setStage("review")}
          />
        ) : variant === "loading" ? (
          <BusyBoundary busy>
            <label>Workspace</label>
            <DataValue loading />
            <p role="status">Checking access…</p>
          </BusyBoundary>
        ) : variant === "description" ? (
          <ExpandableText
            text={"Supporting context stays available without crowding the current task. ".repeat(
              24,
            )}
          />
        ) : (
          <form
            style={{ display: "grid", gap: 16 }}
            onSubmit={(event) => {
              event.preventDefault();
              setStage("submitted");
            }}
          >
            <label style={{ display: "grid", gap: 8 }}>
              {variant === "code" ? "Six-digit code" : "Email address"}
              <Input
                aria-label={
                  variant === "code" ? "Six-digit code" : "Email address"
                }
                type={variant === "code" ? "text" : "email"}
                inputMode={variant === "code" ? "numeric" : "email"}
                required
                autoComplete={variant === "code" ? "one-time-code" : "email"}
              />
            </label>
            {variant === "error" && (
              <p role="alert">We couldn't verify this code. Try again.</p>
            )}
            <Button type="primary" htmlType="submit">
              Continue
            </Button>
            {stage === "submitted" && (
              <p role="status">
                Example submitted. No account or email was created.
              </p>
            )}
          </form>
        )}
      </AuthLayout>
    </div>
  );
}
