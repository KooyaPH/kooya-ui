import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const item = {
    label: "Documentation",
    description: "Find guides, API references, and examples to integrate with our platform.",
    link: "View docs",
    icon: (_jsx(IconPlaceholder, { lucide: "BookOpenIcon", tabler: "IconBook", hugeicons: "BookOpen01Icon", phosphor: "BookOpenIcon", remixicon: "RiBookOpenLine", "aria-hidden": "true" })),
};
export default function Pattern() {
    return (_jsx(Card, { className: "w-full max-w-xs p-0", children: _jsxs(CardContent, { className: "p-0", children: [_jsx("div", { className: "border-b px-4 py-3", children: _jsxs("div", { className: "text-muted-foreground flex items-center gap-2 [&_svg]:size-4", children: [item.icon, _jsx("span", { className: "text-foreground text-sm font-medium", children: item.label })] }) }), _jsxs("div", { className: "space-y-3 p-4", children: [_jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: item.description }), _jsxs("a", { href: "#", className: "text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline", children: [_jsx(IconPlaceholder, { lucide: "LinkIcon", tabler: "IconLink", hugeicons: "Link01Icon", phosphor: "LinkIcon", remixicon: "RiLinkM", "aria-hidden": "true", className: "size-2.5 shrink-0" }), item.link] })] })] }) }));
}
