"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import { FileType } from "../../reui/file-type.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldLegend, FieldSet, FieldTitle, } from "../../../../../../../adapters/layout.tsx";
import { RadioGroup, RadioGroupItem, } from "../../../../../../../adapters/controls.tsx";
const FORMATS = [
    {
        value: "pdf",
        title: "PDF document",
        description: "Fixed layout, ready to share or print",
    },
    {
        value: "docx",
        title: "Word document",
        description: "Editable in Word or Google Docs",
    },
    {
        value: "xlsx",
        title: "Excel workbook",
        description: "Every table on its own sheet",
    },
    {
        value: "csv",
        title: "CSV table",
        description: "Plain rows for any data tool",
    },
    {
        value: "png",
        title: "PNG images",
        description: "One image per page, for slides",
    },
];
export default function Pattern() {
    // A prefix from useId keeps every label paired with its own radio when the
    // picker renders more than once on a page.
    const id = useId();
    // Preselected on purpose: an export always needs a format, so there is no
    // empty state worth showing.
    const [format, setFormat] = useState("pdf");
    const [exported, setExported] = useState(null);
    return (_jsxs(FieldSet, { className: "mx-auto w-full max-w-sm", children: [_jsx(FieldLegend, { children: "Export format" }), _jsx(FieldDescription, { children: "Q3 revenue report, 24 pages." }), _jsx(RadioGroup, { value: format, onValueChange: (value) => setFormat(value), children: FORMATS.map((option) => (_jsx(FieldLabel, { htmlFor: `${id}-${option.value}`, children: _jsxs(Field, { orientation: "horizontal", children: [_jsx(FileType, { type: option.value }), _jsxs(FieldContent, { children: [_jsx(FieldTitle, { children: option.title }), _jsx(FieldDescription, { children: option.description })] }), _jsx(RadioGroupItem, { value: option.value, id: `${id}-${option.value}` })] }) }, option.value))) }), _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("p", { role: "status", className: "text-muted-foreground min-w-0 text-xs", children: exported ? `Exported q3-revenue-report.${exported}` : null }), _jsxs(Button, { type: "button", onClick: () => setExported(format), children: ["Export ", format.toUpperCase()] })] })] }));
}
