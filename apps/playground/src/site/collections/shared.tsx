import { BusyBoundary, ExpandableText } from "@kooyaph/ui/molecules";
import { useState, type ReactNode } from "react";
import { Alert, Button, Empty, Segmented } from "@kooyaph/ui/components";
import "./collections.css";
export function DemoFrame({
  title,
  description,
  children,
  alternate = false,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  alternate?: boolean;
}) {
  const [state, setState] = useState("Ready");
  return (
    <section
      className={`composition-demo ${alternate ? "composition-alternate" : ""}`}
    >
      <header className="composition-heading">
        <div>
          <h2>{title}</h2>
          {description && <ExpandableText text={description} />}
        </div>
        <Segmented
          aria-label="Example state"
          value={state}
          onChange={(value) => setState(String(value))}
          options={["Ready", "Loading", "Empty", "Error"]}
        />
      </header>
      {state === "Empty" ? (
        <Empty description="No items yet">
          <Button onClick={() => setState("Ready")}>Load example</Button>
        </Empty>
      ) : state === "Error" ? (
        <Alert
          type="error"
          title="The local example could not load"
          description="This is a simulated error state."
          action={<Button onClick={() => setState("Ready")}>Retry</Button>}
        />
      ) : (
        <BusyBoundary busy={state === "Loading"} label={`Loading ${title}`}>
          {children}
        </BusyBoundary>
      )}
    </section>
  );
}
export const optionList = (values: string[]) =>
  values.map((value) => ({ value, label: value }));
