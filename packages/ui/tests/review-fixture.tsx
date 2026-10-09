// Browser regressions consume the built public package, just like the playground.
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import * as UI from "@kooyaph/ui";
import "@kooyaph/ui/styles.css";

function Cell() {
  const [count, setCount] = useState(0);
  return (
    <UI.Button onClick={() => setCount(count + 1)}>Edit row {count}</UI.Button>
  );
}
const rows = [{ id: "a" }];
const columns = [{ key: "edit", title: "Actions", render: () => <Cell /> }];
const options = [
  { value: "a", label: "Alpine" },
  { value: "b", label: "Brook" },
];
function Fixture() {
  const [revision, setRevision] = useState(0);
  const [mode, setMode] = useState<UI.ColorMode>("light");
  const [surface, setSurface] = useState("#25382a");
  const scheme = UI.resolveThemeScheme("mosaic", mode, {
    scheme: {
      surface,
      focus: surface,
      success: surface,
      warning: surface,
      danger: surface,
    },
  });
  return (
    <UI.KooyaProvider mode={mode} branding={{ scheme }} reducedMotion>
      <UI.Button
        onClick={() => setTimeout(() => setRevision((value) => value + 1), 200)}
      >
        Rerender parent
      </UI.Button>
      <output aria-label="Revision">{revision}</output>
      <UI.DataTable
        label="Accounts"
        rows={rows}
        columns={columns}
        rowKey={(row) => row.id}
      />
      {[true, false].flatMap((controlled) =>
        [true, false].map((canceled) => {
          const label = `${controlled ? "Controlled" : "Uncontrolled"} ${canceled ? "canceled" : "normal"}`;
          return (
            <div
              key={label}
              onReset={(event) => {
                if (canceled) event.preventDefault();
              }}
            >
              <form aria-label={label}>
                <UI.SelectField
                  label={label}
                  name="region"
                  options={options}
                  {...(controlled ? { value: "b" } : { defaultValue: "b" })}
                />
                <UI.Button type="reset">Reset {label}</UI.Button>
              </form>
            </div>
          );
        }),
      )}
      <label>
        Fixture mode
        <select
          aria-label="Fixture mode"
          value={mode}
          onChange={(event) => setMode(event.target.value as UI.ColorMode)}
        >
          <option>light</option>
          <option>dark</option>
        </select>
      </label>
      <label>
        Fixture surface
        <select
          aria-label="Fixture surface"
          value={surface}
          onChange={(event) => setSurface(event.target.value)}
        >
          {["#25382a", "#f1f5ef", "#777777"].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <UI.Button>Contrast focus</UI.Button>
      <output aria-label="Contrast ratios">
        {JSON.stringify(
          Object.fromEntries(
            (["focus", "success", "warning", "danger"] as const).map((role) => [
              role,
              UI.contrastRatio(scheme[role], surface),
            ]),
          ),
        )}
      </output>
    </UI.KooyaProvider>
  );
}
createRoot(document.getElementById("root")!).render(<Fixture />);
