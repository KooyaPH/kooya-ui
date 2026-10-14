import { useState, type ReactNode } from "react";
import {
  Alert,
  Button,
  Empty,
  Segmented,
  Skeleton,
} from "@kooyaph/ui/components";
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
          <p className="composition-eyebrow">KOOYA · LOCAL EXAMPLE</p>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <Segmented
          aria-label="Example state"
          value={state}
          onChange={(value) => setState(String(value))}
          options={["Ready", "Loading", "Empty", "Error"]}
        />
      </header>
      {state === "Loading" ? (
        <>
          <div aria-hidden="true"><Skeleton active paragraph={{ rows: 5 }} /></div>
          <span className="sr-only" role="status">Loading {title}</span>
        </>
      ) : state === "Empty" ? (
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
        children
      )}
    </section>
  );
}
export const optionList = (values: string[]) =>
  values.map((value) => ({ value, label: value }));
