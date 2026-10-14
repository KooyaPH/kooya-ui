import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconStack } from "../../reui/icon-stack.jsx";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-md items-center justify-center p-4", children: _jsxs(Item, { variant: "outline", className: "max-w-sm", children: [_jsx(ItemMedia, { children: _jsx(IconStack, { "aria-hidden": "true", className: "text-primary h-12 w-11", children: _jsx(IconPlaceholder, { lucide: "PackageIcon", tabler: "IconPackage", hugeicons: "Package01Icon", phosphor: "PackageIcon", remixicon: "RiBox3Line", className: "text-primary size-3" }) }) }), _jsxs(ItemContent, { children: [_jsx(ItemTitle, { children: "Registry package ready" }), _jsx(ItemDescription, { children: "Use IconStack as rich media inside compact shadcn items." })] })] }) }));
}
