import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileType } from "../../reui/file-type.jsx";
/* None of these is in the built-in table. Each color keeps the white label
   text at 4.5:1 or better: 700 for teal and orange, 600 for indigo and rose. */
const FORMATS = [
    { type: "dwg", name: "AutoCAD drawing", className: "text-teal-700" },
    { type: "stl", name: "3D print mesh", className: "text-indigo-600" },
    { type: "blend", name: "Blender scene", className: "text-orange-700" },
    { type: "step", name: "CAD exchange", className: "text-rose-600" },
];
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-md flex-col gap-6", children: [_jsxs("figure", { className: "flex flex-col gap-3", children: [_jsx("ul", { className: "flex flex-wrap gap-3", children: FORMATS.map((format) => (_jsx("li", { children: _jsx(FileType, { type: format.type }) }, format.type))) }), _jsx("figcaption", { className: "text-muted-foreground text-sm text-pretty", children: "An extension outside the built-in table renders on a neutral page, labeled with the extension itself." })] }), _jsxs("figure", { className: "@container flex flex-col gap-3", children: [_jsx("ul", { className: "grid gap-3 @[22rem]:grid-cols-2", children: FORMATS.map((format) => (_jsxs("li", { className: "flex min-w-0 items-center gap-3", children: [_jsx(FileType, { type: format.type, className: format.className }), _jsxs("div", { className: "flex min-w-0 flex-col", children: [_jsx("span", { className: "truncate text-sm font-medium", children: format.name }), _jsx("code", { className: "text-muted-foreground truncate font-mono text-xs", children: format.className })] })] }, format.type))) }), _jsxs("figcaption", { className: "text-muted-foreground text-sm text-pretty", children: ["One ", _jsx("code", { className: "font-mono", children: "text-*" }), " class recolors any type, and the label stays white."] })] })] }));
}
