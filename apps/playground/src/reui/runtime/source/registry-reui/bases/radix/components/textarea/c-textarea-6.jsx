"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useRef, useState } from "react";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
const MAX_CHARS = 280;
export default function Pattern() {
    const [value, setValue] = useState("");
    const textareaRef = useRef(null);
    const handleChange = useCallback((e) => {
        const newValue = e.target.value;
        if (newValue.length <= MAX_CHARS) {
            setValue(newValue);
        }
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, []);
    const remaining = MAX_CHARS - value.length;
    const isNearLimit = remaining <= 20;
    const isAtLimit = remaining === 0;
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsxs(Field, { className: "w-full", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(FieldLabel, { htmlFor: "auto-resize-textarea", children: "Bio" }), _jsxs("span", { className: `text-xs tabular-nums ${isAtLimit
                                ? "text-destructive font-semibold"
                                : isNearLimit
                                    ? "text-warning"
                                    : "text-muted-foreground"}`, children: [value.length, "/", MAX_CHARS] })] }), _jsx(Textarea, { ref: textareaRef, id: "auto-resize-textarea", value: value, onChange: handleChange, placeholder: "Tell us about yourself...", rows: 2, className: "resize-none overflow-hidden" })] }) }));
}
