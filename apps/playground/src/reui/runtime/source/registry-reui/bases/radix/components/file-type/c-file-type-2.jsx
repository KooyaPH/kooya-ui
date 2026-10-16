import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileType, } from "../../reui/file-type.jsx";
const variants = ["outline", "solid", "light", "mono"];
// The same types in every row, so the variant is the only thing that changes.
const types = [
    "pdf",
    "docx",
    "xlsx",
    "jpg",
    "zip",
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-fit flex-col gap-5", children: variants.map((variant) => (_jsxs("div", { className: "flex flex-col gap-2.5", children: [_jsx("span", { className: "text-muted-foreground text-xs capitalize", children: variant }), _jsx("div", { className: "flex gap-4", children: types.map((type) => (_jsx(FileType, { type: type, variant: variant }, type))) })] }, variant))) }));
}
