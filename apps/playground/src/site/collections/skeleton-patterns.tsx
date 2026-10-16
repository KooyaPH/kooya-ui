import { useState } from "react";
import { BusyBoundary, DataValue } from "@kooyaph/ui/molecules";
import { Button, Card, Input, Segmented } from "@kooyaph/ui/components";
import LoadingPatterns from "./loading";
/** Corrected adaptations: stable structure with placeholders only where fetched values belong. */
export default function SkeletonPatterns({
  pattern = 1,
}: {
  pattern?: number;
}) {
  const [loading, setLoading] = useState(true);
  if (pattern === 5) return <LoadingPatterns variant="table" />;
  if (pattern === 6) return <LoadingPatterns variant="metrics" />;
  const person = (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <div
        style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          background: "var(--ku-subtle)",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <DataValue width={28}>JR</DataValue>
      </div>
      <div style={{ flex: 1 }}>
        <strong>
          <DataValue>Jamie Rivera</DataValue>
        </strong>
        <p style={{ margin: "8px 0 0" }}>
          <DataValue>Product designer · Acme Studio</DataValue>
        </p>
      </div>
    </div>
  );
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <h2>
          {
            (
              {
                1: "Team member",
                2: "Project summary",
                3: "Project brief",
                4: "Application settings",
                7: "Recent activity",
                8: "Projects",
                9: "Member profile",
                10: "Project conversation",
              } as Record<number, string>
            )[pattern]
          }
        </h2>
        <p>
          Static titles, labels and actions stay visible. Only unavailable data
          becomes a skeleton.
        </p>
        <Segmented
          aria-label="Data availability"
          options={["Loading", "Ready"]}
          value={loading ? "Loading" : "Ready"}
          onChange={(v) => setLoading(v === "Loading")}
        />
      </div>
      <BusyBoundary busy={loading}>
        {pattern === 1 ? (
          person
        ) : pattern === 4 ? (
          <Card title="Connection settings">
            <div style={{ display: "grid", gap: 16 }}>
              <label htmlFor="skeleton-app-name">Application name</label>
              <Input
                id="skeleton-app-name"
                disabled={loading}
                value={loading ? "" : "Kooya Projects"}
                readOnly
                placeholder="Loading application name…"
              />
              <label htmlFor="skeleton-app-description">Description</label>
              <Input.TextArea
                id="skeleton-app-description"
                disabled={loading}
                value={loading ? "" : "Keep project activity in sync."}
                readOnly
                placeholder="Loading description…"
              />
              <Button type="primary" disabled={loading}>
                Save changes
              </Button>
            </div>
          </Card>
        ) : pattern === 9 ? (
          <Card title="Profile">
            {person}
            <h3 style={{ marginTop: 24 }}>About</h3>
            <p>
              <DataValue block>
                Designing clear, thoughtful workspaces for the whole team.
              </DataValue>
            </p>
            <h3>Contact</h3>
            <p>
              <DataValue>jamie@acme.example</DataValue>
            </p>
            <Button disabled={loading}>Edit profile</Button>
          </Card>
        ) : pattern === 7 ? (
          <Card title="Recent changes">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 0",
                  borderBottom: "1px solid var(--ku-line)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <DataValue>Updated project {i}</DataValue>
                </div>
                <Button disabled={loading}>View</Button>
              </div>
            ))}
          </Card>
        ) : pattern === 8 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
              gap: 16,
            }}
          >
            {[1, 2, 3].map((i) => (
              <Card key={i} title={`Project ${i}`}>
                <h3>
                  <DataValue>Editorial launch</DataValue>
                </h3>
                <p>
                  <DataValue block>
                    A clear plan for the next chapter.
                  </DataValue>
                </p>
                <Button disabled={loading}>Open project</Button>
              </Card>
            ))}
          </div>
        ) : pattern === 10 ? (
          <Card title="Messages">
            <h3>Today</h3>
            {[1, 2].map((i) => (
              <div key={i} style={{ padding: "16px 0" }}>
                <strong>
                  <DataValue width="40%">Jamie Rivera</DataValue>
                </strong>
                <p>
                  <DataValue block>
                    Everything is ready for your review.
                  </DataValue>
                </p>
              </div>
            ))}
            <Input.TextArea
              aria-label="Message"
              placeholder="Write a message…"
              disabled={loading}
            />
            <Button style={{ marginTop: 12 }} disabled={loading}>
              Send message
            </Button>
          </Card>
        ) : (
          <Card title={pattern === 3 ? "Project brief" : "Project summary"}>
            <h3>
              <DataValue>A good place to begin</DataValue>
            </h3>
            <p>
              <DataValue block>
                A thoughtful foundation for the next chapter of our workspace.
              </DataValue>
            </p>
            {pattern !== 3 && <Button disabled={loading}>View project</Button>}
          </Card>
        )}
      </BusyBoundary>
    </div>
  );
}
