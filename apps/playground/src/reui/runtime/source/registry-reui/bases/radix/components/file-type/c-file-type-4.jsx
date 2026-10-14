import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FILE_TYPE_CATEGORIES, FileType, } from "../../reui/file-type.jsx";
// The blank page goes last: it stands for a file with no type, so it closes
// the set instead of sitting between two families.
const families = [
    ...FILE_TYPE_CATEGORIES.filter((family) => family !== "empty"),
    "empty",
];
export default function Pattern() {
    // Cells fit "Presentation" in a monospace font. The width cap holds a row
    // to 5, so with room the 13 families wrap as 5, 5 and a centered 3.
    return (_jsx("ul", { className: "mx-auto flex max-w-lg flex-wrap justify-center gap-x-1 gap-y-5", children: families.map((family) => (_jsxs("li", { className: "flex w-22 flex-col items-center gap-2", children: [_jsx(FileType, { type: family, "aria-hidden": "true" }), _jsx("span", { className: "text-muted-foreground text-xs capitalize", children: family })] }, family))) }));
}
