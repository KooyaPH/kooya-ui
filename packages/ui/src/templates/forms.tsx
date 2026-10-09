import { useDeviceMode } from "../foundations/device";
import { useId, useState } from "react";
import { ErrorState, type SafeFailure } from "../molecules/experience";
import type { FormEventHandler, ReactNode } from "react";
import { Button } from "../atoms/index";
import { Card } from "../molecules/index";
import { TemplateFrame, type TemplateProps } from "./shared";
export interface FormTemplateProps extends TemplateProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  submitLabel?: string;
  submitting?: boolean;
  submitDisabled?: boolean;
  /** @deprecated Ignored diagnostic text; supply failure. */
  error?: string;
  failure?: SafeFailure;
  sectionNavigation?: ReactNode;
  preview?: ReactNode;
  footer?: ReactNode;
}
export function FormTemplate({
  onSubmit,
  submitLabel = "Save",
  submitting,
  submitDisabled,
  error,
  failure,
  sectionNavigation,
  preview,
  footer,
  ...props
}: FormTemplateProps) {
  return (
    <TemplateFrame skeleton="form" {...props}>
      <Card>
        <form
          aria-label={props.title}
          onSubmit={onSubmit}
          className="ku-template-form"
        >
          {(failure || error) && <ErrorState failure={failure} />}
          {sectionNavigation && (
            <nav aria-label="Form sections">{sectionNavigation}</nav>
          )}
          {props.children}
          {preview && (
            <details className="ku-form-preview">
              <summary>Preview</summary>
              {preview}
            </details>
          )}
          <div className="ku-template-toolbar ku-task-footer">
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              disabled={submitDisabled}
            >
              {submitLabel}
            </Button>
            {footer}
          </div>
        </form>
      </Card>
    </TemplateFrame>
  );
}
export interface WizardStep {
  id: string;
  title: string;
}
export interface WizardTemplateProps extends TemplateProps {
  steps: readonly WizardStep[];
  step: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  canContinue?: boolean;
  busy?: boolean;
}
export function WizardTemplate({
  steps,
  step,
  onStepChange,
  onComplete,
  canContinue = true,
  busy,
  ...props
}: WizardTemplateProps) {
  const index = Math.max(0, Math.min(step, steps.length - 1));
  return (
    <TemplateFrame {...props}>
      <Card>
        <ol className="ku-template-steps" aria-label="Progress">
          {steps.map((s, i) => (
            <li key={s.id} aria-current={i === index ? "step" : undefined}>
              {i + 1}. {s.title}
            </li>
          ))}
        </ol>
        <div className="ku-template-form">{props.children}</div>
        <div className="ku-template-toolbar">
          <Button
            disabled={index === 0 || busy}
            onClick={() => onStepChange(index - 1)}
          >
            Back
          </Button>
          <Button
            variant="primary"
            disabled={!canContinue || !steps.length}
            loading={busy}
            onClick={() =>
              index === steps.length - 1
                ? onComplete()
                : onStepChange(index + 1)
            }
          >
            {index === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </Card>
    </TemplateFrame>
  );
}
export interface SettingsSection {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
}
export interface SettingsTemplateProps extends TemplateProps {
  sections: readonly SettingsSection[];
  preview?: ReactNode;
  footer?: ReactNode;
}
export function SettingsTemplate({
  sections,
  preview,
  footer,
  ...props
}: SettingsTemplateProps) {
  const sectionId = useId();
  const mode = useDeviceMode();
  const [previewOpen, setPreviewOpen] = useState(mode === "desktop");
  return (
    <TemplateFrame {...props}>
      <details className="ku-section-index" open>
        <summary>Settings sections</summary>
        <nav aria-label="Settings sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${sectionId}-${s.id}`}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(`${sectionId}-${s.id}`)?.focus();
                document
                  .getElementById(`${sectionId}-${s.id}`)
                  ?.scrollIntoView({ block: "start" });
              }}
            >
              {s.title}
            </a>
          ))}
        </nav>
      </details>
      <div className="ku-template-split ku-settings-layout">
        <div className="ku-template-stack">
          {sections.map((s) => (
            <section key={s.id} id={`${sectionId}-${s.id}`} tabIndex={-1}>
              <Card title={s.title} description={s.description}>
                {s.content}
              </Card>
            </section>
          ))}
          <div className="ku-task-footer">{footer}</div>
        </div>
        {preview && (
          <aside>
            <details
              className="ku-settings-preview"
              open={previewOpen}
              onToggle={(event) => setPreviewOpen(event.currentTarget.open)}
            >
              <summary>Preview</summary>
              <Card>{preview}</Card>
            </details>
          </aside>
        )}
      </div>
      {props.children}
    </TemplateFrame>
  );
}
