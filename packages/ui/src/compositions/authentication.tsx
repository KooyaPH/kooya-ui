import { Button } from "../atoms/controls";
import { useId, useRef, type ReactNode } from "react";

export type AuthMethodChoiceProps = {
  googleAvailable: boolean;
  onGoogle: () => void;
  onEmail: () => void;
  disabled?: boolean;
  bootstrapLink?: ReactNode;
};

export function AuthMethodChoice({
  googleAvailable,
  onGoogle,
  onEmail,
  disabled = false,
  bootstrapLink,
}: AuthMethodChoiceProps) {
  return (
    <div className="ku-auth-method-choice kooya-auth-method-choice">
      {googleAvailable ? (
        <Button
          className="ku-auth-method ku-auth-method--google"
          type="button"
          aria-label="Continue with Google"
          disabled={disabled}
          onClick={onGoogle}
        >
          Continue with Google
        </Button>
      ) : null}
      <Button
        className="ku-auth-method ku-auth-method--email"
        type="button"
        aria-label="Continue with email"
        disabled={disabled}
        onClick={onEmail}
      >
        Continue with email
      </Button>
      {bootstrapLink}
    </div>
  );
}

export type OtpCodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  describedBy?: string;
};

const OTP_LENGTH = 6;

export function OtpCodeInput({
  value,
  onChange,
  disabled = false,
  autoFocus = false,
  describedBy,
}: OtpCodeInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const groupId = useId();
  const digits = Array.from(
    { length: OTP_LENGTH },
    (_, index) => value[index] ?? "",
  );

  const focus = (index: number) => {
    inputRefs.current[Math.max(0, Math.min(index, OTP_LENGTH - 1))]?.focus();
  };

  const updateFrom = (index: number, raw: string) => {
    const nextDigits = [...digits];
    const clean = raw.replace(/\D/g, "");
    if (!clean) {
      nextDigits[index] = "";
      onChange(nextDigits.join(""));
      return;
    }
    if (clean.length > 1) {
      for (const [offset, digit] of [...clean].entries()) {
        if (index + offset >= OTP_LENGTH) break;
        nextDigits[index + offset] = digit;
      }
      onChange(nextDigits.join(""));
      focus(Math.min(index + clean.length, OTP_LENGTH - 1));
      return;
    }
    nextDigits[index] = clean;
    onChange(nextDigits.join(""));
    if (index < OTP_LENGTH - 1) focus(index + 1);
  };

  return (
    <div
      className="ku-otp-inputs kooya-otp-inputs"
      role="group"
      aria-label="Six-digit code"
      aria-labelledby={groupId}
    >
      <span id={groupId} className="ku-visually-hidden">
        Six-digit code
      </span>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          className="ku-otp-input kooya-otp-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          name={`otp-digit-${index + 1}`}
          aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
          aria-describedby={describedBy}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          onChange={(event) => updateFrom(index, event.currentTarget.value)}
          onPaste={(event) => {
            event.preventDefault();
            updateFrom(index, event.clipboardData.getData("text"));
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              focus(index - 1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              focus(index + 1);
            } else if (
              event.key === "Backspace" &&
              !digits[index] &&
              index > 0
            ) {
              event.preventDefault();
              updateFrom(index - 1, "");
              focus(index - 1);
            }
          }}
        />
      ))}
    </div>
  );
}

export interface AuthWorkspacePreviewProps {
  columns: readonly { title: string; cards: readonly string[] }[];
  label?: string;
}
/** Read-only illustration. Consumers supply synthetic examples, never live records. */
export function AuthWorkspacePreview({
  columns,
  label = "Workspace preview",
}: AuthWorkspacePreviewProps) {
  return (
    <figure className="ku-auth-preview" aria-hidden="true">
      <div className="ku-auth-preview__toolbar">
        <span className="ku-auth-preview__mark">K</span>
        <span>{label}</span>
        <span className="ku-auth-preview__presence">● ● ●</span>
      </div>
      <div className="ku-auth-preview__columns">
        {columns.map((column, index) => (
          <div className="ku-auth-preview__column" key={column.title}>
            <div className="ku-auth-preview__column-title">
              <i data-tone={index} />
              {column.title}
              <span>{column.cards.length}</span>
            </div>
            {column.cards.map((card) => (
              <div className="ku-auth-preview__card" key={card}>
                <p>{card}</p>
                <span className="ku-auth-preview__card-footer">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <figcaption>Illustrative workspace · Sample content</figcaption>
    </figure>
  );
}
