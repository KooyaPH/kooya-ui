import { useState } from "react";
import {
  FormTemplate,
  WizardTemplate,
  SettingsTemplate,
  TextField,
  SelectField,
  Switch,
  Button,
  Chip,
  type TemplateState,
} from "@kooyaph/ui";
export function FormExample({ state }: { state?: TemplateState }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("sg");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  return (
    <FormTemplate
      title="Create a workspace"
      state={state}
      submitLabel="Create locally"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim()) {
          setError("Enter a workspace name.");
          return;
        }
        setError("");
        setSaved(name.trim());
      }}
    >
      <TextField
        label="Workspace name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error || undefined}
      />
      <SelectField
        label="Country"
        value={country}
        onValueChange={setCountry}
        options={[
          { value: "sg", label: "Singapore" },
          { value: "ph", label: "Philippines" },
          { value: "au", label: "Australia" },
        ]}
      />
      {saved && <p role="status">Created {saved} locally.</p>}
    </FormTemplate>
  );
}
export function WizardExample({ state }: { state?: TemplateState }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [complete, setComplete] = useState(false);
  return (
    <WizardTemplate
      title="Workspace setup"
      state={state}
      steps={[
        { id: "name", title: "Name your workspace" },
        { id: "review", title: "Review" },
      ]}
      step={step}
      onStepChange={setStep}
      canContinue={!!name.trim()}
      onComplete={() => setComplete(true)}
    >
      {step === 0 ? (
        <TextField
          label="Workspace name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <p>
          You are creating <strong>{name}</strong>. Back returns to your draft.
        </p>
      )}
      {complete && <p role="status">Setup complete locally for {name}.</p>}
    </WizardTemplate>
  );
}
export function SettingsExample({ state }: { state?: TemplateState }) {
  const [brand, setBrand] = useState("Northstar Studio");
  const [color, setColor] = useState("#527b53");
  const [updates, setUpdates] = useState(true);
  const [saved, setSaved] = useState(false);
  return (
    <SettingsTemplate
      title="Settings & branding"
      state={state}
      sections={[
        {
          id: "brand",
          title: "Workspace identity",
          description: "Preview changes before saving.",
          content: (
            <div className="ku-template-form">
              <TextField
                label="Brand name"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setSaved(false);
                }}
              />
              <TextField
                label="Brand color"
                type="color"
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                  setSaved(false);
                }}
              />
            </div>
          ),
        },
        {
          id: "prefs",
          title: "Notifications",
          content: (
            <Switch
              label="Email summaries"
              description="A local preference example."
              checked={updates}
              onCheckedChange={setUpdates}
            />
          ),
        },
      ]}
      preview={
        <>
          <div
            style={{ height: 80, background: color, borderRadius: 12 }}
            role="img"
            aria-label="Brand color preview"
          />
          <h2>{brand || "Your workspace"}</h2>
          <Chip>{updates ? "Summaries on" : "Summaries off"}</Chip>
        </>
      }
      footer={
        <>
          <Button variant="primary" onClick={() => setSaved(true)}>
            Save settings locally
          </Button>
          {saved && <p role="status">Saved {brand} in this session.</p>}
        </>
      }
    />
  );
}
