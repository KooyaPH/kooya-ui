import { jsx as _jsx } from "react/jsx-runtime";
import { Slider } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex w-full max-w-xs items-center justify-center", children: _jsx(Slider, { defaultValue: [25, 75], max: 100, step: 5 }) }));
}
