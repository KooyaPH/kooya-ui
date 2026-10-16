import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toggle } from "../../../../../../../adapters/selection.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [_jsx(Toggle, { "aria-label": "Disabled toggle", disabled: true, children: "Disabled" }), _jsx(Toggle, { variant: "outline", "aria-label": "Disabled outline toggle", disabled: true, children: "Disabled" })] }));
}
