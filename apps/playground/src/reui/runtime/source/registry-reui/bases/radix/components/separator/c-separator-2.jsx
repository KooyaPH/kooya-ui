import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs("div", { className: "flex h-5 items-center gap-4 text-sm", children: [_jsx("div", { children: "Blog" }), _jsx(Separator, { orientation: "vertical" }), _jsx("div", { children: "Docs" }), _jsx(Separator, { orientation: "vertical" }), _jsx("div", { children: "Source" })] }) }));
}
