"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { SignaturePad, SignaturePadArea, SignaturePadClear, SignaturePadControls, SignaturePadPlaceholder, } from "../../reui/signature-pad.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const CLAUSES = [
    {
        id: "scope",
        number: 2,
        title: "Scope of work",
        description: "Design and build of the marketing site, 6 templates.",
    },
    {
        id: "payment",
        number: 3,
        title: "Payment terms",
        description: "Invoiced monthly in arrears, due within 30 days.",
    },
    {
        id: "ownership",
        number: 4,
        title: "Ownership",
        description: "Source files transfer to the client on final payment.",
    },
    {
        id: "termination",
        number: 5,
        title: "Termination",
        description: "Either party, with 30 days written notice.",
    },
];
export default function Pattern() {
    const [initialed, setInitialed] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const count = CLAUSES.filter((clause) => initialed[clause.id]).length;
    const complete = count === CLAUSES.length;
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-lg flex-col gap-3", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("p", { className: "text-sm font-medium", children: "Initial each clause" }), _jsx("p", { className: "text-muted-foreground text-xs", children: "Your initials confirm you have read the section." })] }), _jsxs(Badge, { variant: complete ? "success-light" : "secondary", children: [count, " of ", CLAUSES.length, " initialed"] })] }), _jsx(ItemGroup, { children: CLAUSES.map((clause) => {
                    const done = initialed[clause.id] === true;
                    return (_jsxs(Item, { variant: "outline", size: "sm", children: [_jsx(ItemMedia, { variant: "icon", "aria-hidden": "true", children: done ? (_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", className: "text-success" })) : (_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiProgress1Line", className: "text-muted-foreground" })) }), _jsxs(ItemContent, { children: [_jsxs(ItemTitle, { children: [clause.number, ". ", clause.title, done && _jsx("span", { className: "sr-only", children: ", initialed" })] }), _jsx(ItemDescription, { children: clause.description })] }), _jsx(ItemActions, { children: _jsx(SignaturePad, { minWidth: 0.6, maxWidth: 2.4, readOnly: submitted, className: "w-28", onValueChange: (strokes) => setInitialed((current) => ({
                                        ...current,
                                        [clause.id]: strokes.length > 0,
                                    })), children: _jsxs(SignaturePadArea, { variant: "muted", "aria-label": `Initials for ${clause.title}`, className: "h-14", children: [_jsx(SignaturePadPlaceholder, { children: "Initials" }), done && !submitted && (_jsx(SignaturePadControls, { className: "end-1 top-1", children: _jsx(SignaturePadClear, { variant: "ghost", size: "icon-xs" }) }))] }) }) })] }, clause.id));
                }) }), submitted ? (_jsx("p", { ref: (node) => node?.focus(), tabIndex: -1, role: "status", className: "self-end text-sm font-medium outline-none", children: "Initials submitted" })) : (_jsx(Button, { disabled: !complete, onClick: () => setSubmitted(true), className: "self-end", children: "Submit initials" }))] }));
}
