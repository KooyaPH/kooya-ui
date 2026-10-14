import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FILE_TYPE_EXTENSION_NAMES, FileType, getFileTypeCategory, } from "../../reui/file-type.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../../../../../../adapters/selection.tsx";
const VARIANTS = [
    { value: "outline", label: "Outline" },
    { value: "solid", label: "Solid" },
    { value: "light", label: "Light" },
    { value: "mono", label: "Mono" },
];
/* Partial: folder and empty are families without an extension, so they
   never form a group here. */
const FAMILY_NAMES = {
    document: "Documents",
    spreadsheet: "Spreadsheets",
    presentation: "Presentations",
    image: "Images",
    video: "Video",
    audio: "Audio",
    code: "Code and data",
    archive: "Archives",
    design: "Design",
    executable: "Applications",
    font: "Fonts",
};
/* Grouped through the primitive's own lookup, so a format added to its
   table lands in the right family with no change here. A Map keeps the
   table's order: documents first, fonts last. */
const GROUPS = Array.from(FILE_TYPE_EXTENSION_NAMES.reduce((groups, type) => {
    const category = getFileTypeCategory(type);
    groups.set(category, [...(groups.get(category) ?? []), type]);
    return groups;
}, new Map()));
export default function Pattern() {
    return (_jsxs(Tabs, { defaultValue: "outline", className: "w-full", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [_jsx(TabsList, { "aria-label": "Variant", children: VARIANTS.map(({ value, label }) => (_jsx(TabsTrigger, { value: value, children: label }, value))) }), _jsxs("p", { className: "text-muted-foreground text-sm", children: [FILE_TYPE_EXTENSION_NAMES.length, " extensions in ", GROUPS.length, " ", "families"] })] }), VARIANTS.map(({ value }) => (_jsx(TabsContent, { value: value, children: _jsx("div", { className: "@container", children: _jsx("div", { className: "divide-y", children: GROUPS.map(([category, types]) => (_jsxs("div", { className: "flex flex-col gap-3 py-4 last:pb-0 @2xl:flex-row @2xl:gap-6", children: [_jsxs("p", { className: "flex items-baseline gap-2 text-sm font-medium @2xl:w-36 @2xl:shrink-0 @2xl:pt-2.5", children: [FAMILY_NAMES[category] ?? category, _jsx("span", { className: "text-muted-foreground text-xs font-normal tabular-nums", children: types.length })] }), _jsx("ul", { className: "flex flex-wrap gap-2", children: types.map((type) => (_jsx("li", { children: _jsx(FileType, { type: type, variant: value }) }, type))) })] }, category))) }) }) }, value)))] }));
}
