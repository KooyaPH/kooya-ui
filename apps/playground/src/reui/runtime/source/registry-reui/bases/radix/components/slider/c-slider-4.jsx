import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Slider } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center justify-center gap-12", children: [_jsx(Slider, { defaultValue: [50], max: 100, step: 1, orientation: "vertical", className: "h-40" }), _jsx(Slider, { defaultValue: [25, 75], max: 100, step: 5, orientation: "vertical", className: "h-40" })] }));
}
