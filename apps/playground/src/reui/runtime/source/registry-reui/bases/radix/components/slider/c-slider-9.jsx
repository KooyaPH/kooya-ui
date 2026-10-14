import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto grid w-full max-w-sm gap-4", children: [_jsx(Label, { className: "text-sm font-medium", children: "Storage" }), _jsx(Slider, { defaultValue: [15], max: 35, min: 5 }), _jsxs("span", { "aria-hidden": "true", className: "text-muted-foreground flex w-full items-center justify-between text-xs font-medium", children: [_jsx("span", { children: "5 GB" }), _jsx("span", { children: "20 GB" }), _jsx("span", { children: "35 GB" })] })] }));
}
