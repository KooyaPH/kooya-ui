import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileType, } from "../../reui/file-type.jsx";
const BADGES = [
    { type: "pdf", name: "Pill", className: "rounded-full" },
    {
        type: "docx",
        name: "Outline",
        className: "bg-background ring-1 ring-current ring-inset *:text-current",
    },
    {
        type: "xlsx",
        name: "Inverted",
        className: "bg-foreground *:text-background",
    },
    { type: "json", name: "Monospace", className: "font-mono font-semibold" },
    {
        type: "docx",
        name: "Custom text",
        label: "DRAFT",
        className: "bg-amber-400 *:text-amber-950",
    },
    {
        type: "pdf",
        name: "Larger",
        label: "NEW",
        className: "text-[length:30cqw] font-bold tracking-wide",
    },
];
export default function Pattern() {
    return (_jsx("ul", { className: "mx-auto grid w-full max-w-md gap-4", children: BADGES.map((badge) => (_jsxs("li", { className: "flex min-w-0 items-center gap-3", children: [_jsx(FileType, { type: badge.type, label: badge.label, labelClassName: badge.className }), _jsxs("div", { className: "flex min-w-0 flex-col", children: [_jsx("span", { className: "truncate text-sm font-medium", children: badge.name }), _jsx("code", { className: "text-muted-foreground truncate font-mono text-xs", children: badge.className })] })] }, badge.name))) }));
}
