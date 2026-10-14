import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Field, { orientation: "horizontal", className: "relative w-auto", children: [_jsx(Checkbox, { id: "circle", className: "rounded-full", defaultChecked: true }), _jsx(FieldLabel, { htmlFor: "circle", className: "peer-data-checked:text-muted-foreground relative transition-colors after:absolute after:inset-x-0 after:top-1/2 after:h-px after:-translate-y-1/2 after:scale-x-0 after:bg-current after:transition-transform peer-data-checked:after:scale-x-100", children: "Circle checkbox" })] }));
}
