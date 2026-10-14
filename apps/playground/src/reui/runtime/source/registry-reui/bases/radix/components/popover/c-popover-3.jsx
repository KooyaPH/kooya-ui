import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldGroup, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Open Popover" }) }), _jsxs(PopoverContent, { className: "w-64", align: "start", children: [_jsxs(PopoverHeader, { children: [_jsx(PopoverTitle, { children: "Dimensions" }), _jsx(PopoverDescription, { children: "Set the dimensions for the layer." })] }), _jsxs(FieldGroup, { className: "gap-2", children: [_jsxs(Field, { orientation: "horizontal", children: [_jsx(FieldLabel, { htmlFor: "width", className: "w-1/2", children: "Width" }), _jsx(Input, { id: "width", defaultValue: "100%" })] }), _jsxs(Field, { orientation: "horizontal", children: [_jsx(FieldLabel, { htmlFor: "height", className: "w-1/2", children: "Height" }), _jsx(Input, { id: "height", defaultValue: "25px" })] })] })] })] }) }));
}
