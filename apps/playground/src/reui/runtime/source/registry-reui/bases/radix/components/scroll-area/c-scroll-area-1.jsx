import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ScrollArea } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
const tags = Array.from({ length: 30 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
export default function Pattern() {
    return (_jsx(ScrollArea, { className: "rounded-2xl h-72 w-48 border", children: _jsxs("div", { className: "p-4", children: [_jsx("h4", { className: "mb-4 text-sm leading-none font-medium", children: "Releases" }), _jsx("div", { className: "flex flex-col divide-y", children: tags.map((tag, i) => (_jsx("div", { className: "py-2 text-sm", children: tag }, tag))) })] }) }));
}
