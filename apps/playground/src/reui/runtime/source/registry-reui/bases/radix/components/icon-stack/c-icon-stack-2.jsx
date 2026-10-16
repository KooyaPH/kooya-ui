import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconStack } from "../../reui/icon-stack.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const sizes = [
    {
        label: "Small",
        className: "h-16 w-14",
        icon: (_jsx(IconPlaceholder, { lucide: "ArchiveIcon", tabler: "IconArchive", hugeicons: "Archive01Icon", phosphor: "ArchiveIcon", remixicon: "RiArchiveLine", className: "size-3.5" })),
    },
    {
        label: "Default",
        className: "h-20 w-18",
        icon: (_jsx(IconPlaceholder, { lucide: "PackageIcon", tabler: "IconPackage", hugeicons: "Package01Icon", phosphor: "PackageIcon", remixicon: "RiBox3Line", className: "size-4" })),
    },
    {
        label: "Large",
        className: "h-28 w-24",
        icon: (_jsx(IconPlaceholder, { lucide: "LayersIcon", tabler: "IconStack2", hugeicons: "Layers01Icon", phosphor: "StackIcon", remixicon: "RiStackLine", className: "size-6" })),
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "flex flex-wrap items-end justify-center gap-8", children: sizes.map((item) => (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(IconStack, { "aria-hidden": "true", className: item.className, children: item.icon }), _jsx("span", { className: "text-muted-foreground text-sm", children: item.label })] }, item.label))) }));
}
