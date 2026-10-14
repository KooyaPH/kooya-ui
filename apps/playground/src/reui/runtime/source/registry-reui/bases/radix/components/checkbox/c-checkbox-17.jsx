"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel, FieldTitle } from "../../../../../../../adapters/layout.tsx";
const MastercardIcon = (props) => (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [_jsx("circle", { cx: "7", cy: "12", r: "7", fill: "#EB001B" }), _jsx("circle", { cx: "17", cy: "12", r: "7", fill: "#F79E1B" }), _jsx("path", { d: "M12 17.5C13.5 16.2 14.5 14.2 14.5 12C14.5 9.8 13.5 7.8 12 6.5C10.5 7.8 9.5 9.8 9.5 12C9.5 14.2 10.5 16.2 12 17.5Z", fill: "#FF5F00" })] }));
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsx(FieldLabel, { htmlFor: "mastercard", className: "relative p-0!", children: _jsxs(Field, { orientation: "horizontal", children: [_jsx(Checkbox, { id: "mastercard", defaultChecked: true, className: "absolute top-3 right-3 size-5 rounded-full" }), _jsxs(FieldTitle, { className: "flex flex-col items-start gap-4!", children: [_jsx("div", { className: "bg-background border-border rounded-lg flex size-10 items-center justify-center border p-1.5 shadow-xs shadow-black/5", children: _jsx(MastercardIcon, { className: "size-full" }) }), _jsxs("div", { className: "flex flex-col items-start gap-0.5", children: [_jsx("span", { className: "text-sm font-medium", children: "Mastercard ending in 8888" }), _jsx("span", { className: "text-muted-foreground text-xs", children: "Expires 09/25" })] })] })] }) }) }));
}
