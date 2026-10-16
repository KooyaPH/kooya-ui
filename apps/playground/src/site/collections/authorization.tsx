import { useEffect, useRef, useState } from "react";
import { ApplicationAuthorization, type AuthorizationState } from "@kooyaph/ui";
import { Button, Segmented } from "@kooyaph/ui/components";
const application = {
  name: "Kooya Projects",
  publisher: "Kooya",
  description: "Connect project activity with your GitHub repositories.",
  verified: true,
};
const permissions = [
  {
    id: "read",
    title: "Read repository information",
    description:
      "View names, branches and pull request activity for the repositories you select.",
    access: "Read only",
    required: true,
  },
  {
    id: "issues",
    title: "Create and update issues",
    description:
      "Link Kooya tasks to issues. Your repository code is not modified.",
    access: "Read and write",
    required: true,
  },
  {
    id: "notifications",
    title: "Send activity notifications",
    description: "Receive updates when linked work changes.",
    access: "Notifications",
    required: false,
  },
];
export default function AuthorizationDemo({
  variant = "review",
}: {
  variant?: AuthorizationState | "repositories" | "long-text";
}) {
  const initial: AuthorizationState =
    variant === "repositories" || variant === "long-text" ? "review" : variant;
  const [state, setState] = useState<AuthorizationState>(initial);
  const [selected, setSelected] = useState<string[]>([]);
  const [repos, setRepos] = useState<string[]>(["design-system"]);
  const [simulateError, setSimulateError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const authorize = () => {
    setState("authorizing");
    timer.current = setTimeout(
      () => setState(simulateError ? "error" : "approved"),
      1100,
    );
  };
  const long = variant === "long-text";
  return (
    <div
      style={{
        maxWidth: 560,
        width: "100%",
        minWidth: 0,
        margin: "0 auto",
        display: "grid",
        gap: 20,
      }}
    >
      <p style={{ fontSize: 12, color: "var(--ku-muted)" }}>
        Fictional consent preview. No GitHub connection or access grant is made.
      </p>
      <ApplicationAuthorization
        application={
          long
            ? {
                ...application,
                name: "Kooya Organization Repository Synchronization and Project Governance",
                description:
                  "A detailed integration description for organizations with extensive review requirements and long application names.",
              }
            : application
        }
        account={
          long
            ? "jamie.long-account-name@fictional-organization.example"
            : "Jamie Rivera · Acme Studio"
        }
        permissions={permissions}
        state={state}
        selectedPermissions={selected}
        onPermissionsChange={setSelected}
        {...(variant === "repositories" || long
          ? {
              repositories: [
                {
                  value: "design-system",
                  label: long
                    ? "acme-studio / organization-wide-design-system-and-governance-components"
                    : "acme-studio / design-system",
                },
                { value: "website", label: "acme-studio / website" },
                { value: "console", label: "acme-studio / console" },
              ],
              selectedRepositories: repos,
              onRepositoriesChange: setRepos,
            }
          : {})}
        onAuthorize={authorize}
        onRetry={authorize}
        onCancel={() => setState("denied")}
        onDone={() => setState("review")}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            if (timer.current) clearTimeout(timer.current);
            setState("review");
          }}
        >
          Reset preview
        </Button>
        <Segmented
          aria-label="Simulated connection result"
          value={simulateError ? "Error" : "Success"}
          options={["Success", "Error"]}
          onChange={(v) => setSimulateError(v === "Error")}
        />
      </div>
    </div>
  );
}
