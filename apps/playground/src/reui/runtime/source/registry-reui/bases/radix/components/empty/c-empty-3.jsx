import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Kbd } from "../../../../../registry/bases/radix/ui/kbd.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsxs(Empty, { className: "border", children: [_jsxs(EmptyHeader, { children: [_jsx(EmptyTitle, { children: "404 \u2014 Not Found" }), _jsx(EmptyDescription, { children: "The page you're looking for doesn't exist. Try searching for what you need below." })] }), _jsxs(EmptyContent, { children: [_jsxs(InputGroup, { className: "w-3/4", children: [_jsx(InputGroupInput, { placeholder: "Try searching for pages\u2026" }), _jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "DashedLineCircleIcon", phosphor: "CircleDashedIcon", remixicon: "RiLoaderLine" }) }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(Kbd, { children: "/" }) })] }), _jsxs(EmptyDescription, { children: ["Need help? ", _jsx("a", { href: "#", children: "Contact support" })] })] })] }) }));
}
