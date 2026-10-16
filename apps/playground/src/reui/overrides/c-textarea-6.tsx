// Owned correction for the adapted REUI recipe; vendor source stays intact.
"use client";

import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";
import { Field, FieldLabel } from "../adapters/layout";
import { Textarea } from "../adapters/controls";

const MAX_CHARS = 280;
const textareaStyle: CSSProperties & { fieldSizing: "content" } = {
  resize: "none",
  overflow: "hidden",
  fieldSizing: "content",
  height: "auto",
  minBlockSize:
    "calc(2lh + 2 * var(--ant-input-padding-block) + 2 * var(--ant-line-width))",
};

export default function Pattern() {
  const instanceId = useId();
  const controlId = `${instanceId}-bio`;
  const countId = `${instanceId}-bio-count`;
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fitAcceptedValue = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    // Native sizing also reacts to user text spacing and fonts loaded later.
    // Keep the measured fallback for engines without field-sizing support.
    if (CSS.supports("field-sizing", "content")) {
      textarea.style.height = "auto";
      return;
    }
    // Measure after React commits the accepted value. Resetting to the native
    // two-row height also permits shrinking after deletion or wider layouts.
    textarea.style.height = "auto";
    const styles = getComputedStyle(textarea);
    const borders =
      parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
    textarea.style.height = `${Math.max(textarea.scrollHeight, textarea.clientHeight) + borders}px`;
  }, []);

  useLayoutEffect(fitAcceptedValue, [value, fitAcceptedValue]);
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const resize = new ResizeObserver(fitAcceptedValue);
    resize.observe(container);
    const appearance = new MutationObserver(fitAcceptedValue);
    appearance.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-density", "data-mode"],
    });
    let disposed = false;
    void document.fonts.ready.then(() => {
      if (!disposed) fitAcceptedValue();
    });
    return () => {
      disposed = true;
      resize.disconnect();
      appearance.disconnect();
    };
  }, [fitAcceptedValue]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const next = event.target.value;
      // Preserve the recipe's UTF-16 accounting and whole-edit rejection policy.
      if (next.length <= MAX_CHARS) setValue(next);
    },
    [],
  );

  const remaining = MAX_CHARS - value.length;
  const atLimit = remaining === 0;
  const nearLimit = remaining <= 20;

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-xs">
      <Field className="w-full">
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor={controlId}>Bio</FieldLabel>
          <span
            id={countId}
            className="text-xs tabular-nums"
            style={{
              color: atLimit
                ? "var(--ku-danger)"
                : nearLimit
                  ? "var(--ku-warning)"
                  : "var(--ku-muted)",
              fontWeight: atLimit ? 600 : undefined,
            }}
          >
            {value.length}/{MAX_CHARS}
          </span>
        </div>
        <Textarea
          ref={textareaRef}
          id={controlId}
          value={value}
          onChange={handleChange}
          aria-describedby={countId}
          placeholder="Tell us about yourself..."
          rows={2}
          style={textareaStyle}
        />
      </Field>
    </div>
  );
}
