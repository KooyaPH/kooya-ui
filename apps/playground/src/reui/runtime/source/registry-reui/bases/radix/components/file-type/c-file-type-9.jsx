"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { FileType, getFileType, getFileTypeCategory, } from "../../reui/file-type.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardFooter } from "../../../../../../../adapters/layout.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// One sample per kind of input getFileType reads: a file name, a path in
// another case, a MIME type, a folder, a bare name and a URL with a query.
// The long URL goes last, so the wrap never strands a short chip on a row
// of its own.
const SAMPLES = [
    "Q3 report.pdf",
    "photos/IMG_2041.HEIC",
    "video/quicktime",
    "assets/",
    "README",
    "https://example.com/data.csv?v=2",
];
const VARIANTS = [
    { variant: "outline", label: "Outline" },
    { variant: "solid", label: "Solid" },
    { variant: "light", label: "Light" },
    { variant: "mono", label: "Mono" },
];
// Only the two fallbacks need words: a value with nothing to resolve draws a
// blank page, and an unknown extension draws a neutral page with its label.
function describe(value, type) {
    if (!value.trim())
        return "Nothing to resolve yet, so it shows a blank page.";
    if (type === "empty") {
        return "No extension or known MIME type, so it shows a blank page.";
    }
    if (getFileTypeCategory(type) === "file") {
        return "Unknown extension, so it shows a neutral page with its label.";
    }
    return null;
}
export default function Pattern() {
    const id = useId();
    const inputRef = useRef(null);
    // Opens on a sample so the card shows a resolved type; Clear reaches the
    // blank state.
    const [value, setValue] = useState("Q3 report.pdf");
    // getFileType is a pure string parse, so the icons, the readout and the
    // hint all derive from the raw value on each render, with no effect.
    const type = getFileType(value);
    const family = getFileTypeCategory(type);
    const hint = describe(value, type);
    return (_jsxs("div", { className: "flex w-full max-w-md flex-col gap-6", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: `${id}-value`, children: "File name, path, URL or MIME type" }), _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsx(FileType, { type: type, size: "mini", "aria-hidden": "true" }) }), _jsx(InputGroupInput, { ref: inputRef, id: `${id}-value`, value: value, onChange: (event) => setValue(event.target.value), placeholder: "invoice.docx or image/png", autoComplete: "off", spellCheck: false }), value ? (_jsx(InputGroupAddon, { align: "inline-end", children: _jsx(InputGroupButton, { size: "icon-xs", "aria-label": "Clear", onClick: () => {
                                                // The button unmounts once the field is empty, so focus
                                                // goes back to the field instead of falling to the body.
                                                setValue("");
                                                inputRef.current?.focus();
                                            }, children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }) }) })) : null] })] }), _jsxs("div", { role: "group", "aria-labelledby": `${id}-samples`, className: "flex flex-wrap items-center gap-1.5", children: [_jsx("span", { id: `${id}-samples`, className: "text-muted-foreground me-1 text-xs", children: "Try" }), SAMPLES.map((sample) => (_jsx(Button, { variant: "outline", size: "xs", className: "max-w-full", onClick: () => setValue(sample), children: _jsx("span", { className: "truncate", children: sample }) }, sample)))] })] }), _jsxs(Card, { children: [_jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-4 justify-items-center gap-4", children: VARIANTS.map(({ variant, label }) => (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(FileType, { type: type, variant: variant, size: "lg" }), _jsx("span", { className: "text-muted-foreground text-xs", children: label })] }, variant))) }) }), _jsx(CardFooter, { children: _jsxs("div", { role: "status", className: "flex min-w-0 flex-1 flex-col gap-1", children: [_jsxs("dl", { className: "flex min-w-0 flex-wrap gap-x-6 gap-y-1", children: [_jsxs("div", { className: "flex min-w-0 gap-2", children: [_jsx("dt", { className: "text-muted-foreground", children: "Type" }), _jsx("dd", { className: "truncate font-mono", children: type })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("dt", { className: "text-muted-foreground", children: "Family" }), _jsx("dd", { className: "font-mono", children: family })] })] }), hint ? (_jsx("p", { className: "text-muted-foreground text-xs", children: hint })) : null] }) })] })] }));
}
