import { useState } from "react";
import {
  AuthLayout,
  AuthMethodChoice,
  OtpCodeInput,
  AuthWorkspacePreview,
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
  const [code, setCode] = useState("");
  const verification = variant === "code" || variant === "error";
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
        presentation="split"
        introduction={
          <>
            <h2>
              Your team.
              <br />
              One workspace.
            </h2>
            <p>Plan projects, share updates and keep work moving.</p>
          </>
        }
        visual={
          <AuthWorkspacePreview
            columns={[
              {
                title: "Planned",
                cards: ["Define the next milestone", "Bring the team together"],
              },
              { title: "In progress", cards: ["Prepare the project brief"] },
              { title: "Done", cards: ["Agree on the shared plan"] },
            ]}
          />
        }
        brand={brand}
        title={
          variant === "consent"
            ? "Connect Projects"
            : verification
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
        ) : (variant === "sign-in" || stage === "sign-in") &&
          (stage === "review" || stage === "sign-in") ? (
          <AuthMethodChoice
            googleAvailable
            onGoogle={() => setStage("provider")}
            onEmail={() => setStage("email")}
          />
        ) : stage === "provider" ? (
          <>
            <p role="status">
              Provider handoff preview. No real sign-in was started.
            </p>
            <Button onClick={() => setStage("review")}>Back to sign in</Button>
          </>
        ) : variant === "signed-out" &&
          stage !== "sign-in" &&
          stage !== "email" ? (
          <>
            <p>Your session has ended.</p>
            <Button onClick={() => setStage("review")}>
              Return to sign in
            </Button>
          </>
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
              {verification ? "Six-digit code" : "Email address"}
              {verification ? (
                <OtpCodeInput value={code} onChange={setCode} />
              ) : (
                <Input
                  aria-label="Email address"
                  type="email"
                  required
                  autoComplete="email"
                />
              )}
            </label>
            {variant === "error" && (
              <p role="alert">We couldn't verify this code. Try again.</p>
            )}
            <Button
              type="primary"
              htmlType="submit"
              disabled={verification && code.length !== 6}
            >
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
