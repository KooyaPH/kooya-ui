import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const item = {
    title: "Recent Orders Overview",
    description: "Track and review all recent purchases, updates, and status changes in one place.",
    link: "View Orders",
    icon: (_jsx(IconPlaceholder, { lucide: "ShoppingBagIcon", tabler: "IconShoppingBag", hugeicons: "ShoppingBag01Icon", phosphor: "ShoppingBagOpenIcon", remixicon: "RiShoppingBagLine", "aria-hidden": "true" })),
};
export default function Pattern() {
    return (_jsx(Card, { className: "w-full max-w-xs", children: _jsxs(CardContent, { className: "flex flex-col gap-3", children: [_jsx("div", { className: "bg-primary rounded-md [&_svg]:text-primary-foreground flex size-11 items-center justify-center [&_svg]:size-5", children: item.icon }), _jsx("a", { href: "#", className: "text-foreground hover:text-primary block text-sm leading-tight font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-xs leading-relaxed", children: item.description }), _jsxs("a", { href: "#", className: "text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline", children: [item.link, _jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", "aria-hidden": "true", className: "size-2.5 shrink-0" })] })] }) }));
}
