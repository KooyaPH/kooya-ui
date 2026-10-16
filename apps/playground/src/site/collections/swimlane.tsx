import { useState } from "react";
import {
  SwimlaneBoard,
  Swimlane,
  SwimlaneRail,
  SwimlaneColumn,
  SwimlaneCard,
  Button,
  Select,
} from "@kooyaph/ui";
import { DataValue } from "@kooyaph/ui/molecules";
export default function SwimlaneDemo({
  variant = "grouped",
}: {
  variant?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [stage, setStage] = useState("Review");
  const columns = ["Planned", "Review", "Approved"];
  const loading = variant === "loading";
  const empty = variant === "empty";
  const readonly = variant === "read-only";
  const title =
    variant === "long-text"
      ? "Review the quarterly governance and organization access policy with all regional stakeholders ".repeat(
          5,
        )
      : "Review access policy";
  return (
    <SwimlaneBoard label="Quarterly governance board" busy={loading}>
      {["Governance", ...(variant === "grouped" ? ["Editorial"] : [])].map(
        (lane) => (
          <Swimlane
            key={lane}
            label={lane}
            count={loading ? undefined : empty ? 0 : 1}
            collapsed={lane === "Governance" && collapsed}
            onToggle={
              lane === "Governance" ? () => setCollapsed(!collapsed) : undefined
            }
          >
            <SwimlaneRail
              columns={3}
              role="region"
              aria-label={`${lane} status columns`}
              tabIndex={0}
            >
              {columns.map((column) => (
                <SwimlaneColumn
                  key={column}
                  title={column}
                  count={
                    loading ? undefined : !empty && stage === column ? 1 : 0
                  }
                >
                  {loading ? (
                    <SwimlaneCard
                      title={<DataValue loading />}
                    >
                      <DataValue loading />
                    </SwimlaneCard>
                  ) : !empty && stage === column ? (
                    <SwimlaneCard
                      title={title}
                      actions={
                        !readonly && (
                          <Select
                            aria-label={`Move ${lane} issue`}
                            value={stage}
                            options={columns.map((value) => ({
                              value,
                              label: value,
                            }))}
                            onChange={setStage}
                          />
                        )
                      }
                    >
                      <p>Policy review · KOOYA-124</p>
                      {!readonly && (
                        <Button onClick={() => setStage("Approved")}>
                          Approve review
                        </Button>
                      )}
                    </SwimlaneCard>
                  ) : (
                    <p>{empty ? "No issues yet" : "No issues in this stage"}</p>
                  )}
                </SwimlaneColumn>
              ))}
            </SwimlaneRail>
          </Swimlane>
        ),
      )}
    </SwimlaneBoard>
  );
}
