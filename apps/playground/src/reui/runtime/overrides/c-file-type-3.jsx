import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Owned responsive correction to the actual attributed REUI recipe.
// @ts-expect-error attributed generated REUI renderer has no declaration file
import { FileType } from "../source/registry-reui/bases/radix/reui/file-type.jsx";
const sizes = [
    { size: "mini", px: 18 },
    { size: "xs", px: 24 },
    { size: "sm", px: 32 },
    { size: "default", px: 40 },
    { size: "lg", px: 48 },
    { size: "xl", px: 56 },
];
export default function Pattern() {
    // Every caption is 2 lines, so `items-end` lines up the icons' bottoms.
    return (_jsx("div", { className: "mx-auto flex w-fit max-w-full flex-wrap items-end justify-center gap-6", children: sizes.map(({ size, px }) => (_jsxs("div", { className: "flex flex-col items-center gap-3", children: [_jsx(FileType, { type: "pdf", size: size }), _jsxs("span", { className: "flex w-0 flex-col items-center text-xs whitespace-nowrap", children: [_jsx("span", { className: "font-medium", children: size }), _jsxs("span", { className: "tabular-nums", style: { color: "var(--ku-muted)" }, children: [px, "px"] })] })] }, size))) }));
}
