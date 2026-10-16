import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Card, { className: "w-full max-w-xs p-0", children: _jsxs(CardContent, { className: "flex flex-col gap-5 p-0", children: [_jsx("div", { className: "relative h-48 w-full overflow-hidden", children: _jsx("img", { src: "/reui-assets/images/e18fa64c931e89f48032.jpg2", alt: "16:9", width: 1000, height: 800, className: "h-full w-full object-cover" }) }), _jsxs("div", { className: "flex flex-col items-center gap-4 p-6 pt-0", children: [_jsxs(Badge, { variant: "outline", children: [_jsx(IconPlaceholder, { lucide: "BellIcon", tabler: "IconBell", hugeicons: "NotificationIcon", phosphor: "BellIcon", remixicon: "RiNotificationLine", "aria-hidden": "true" }), "Trending"] }), _jsx("p", { className: "text-foreground text-center text-sm", children: "Making your design process faster and easier. Design tools for your team." }), _jsxs(Button, { className: "w-fit", children: ["Get Started", _jsx(IconPlaceholder, { lucide: "ArrowRightIcon", tabler: "IconArrowRight", hugeicons: "ArrowRight02Icon", phosphor: "ArrowRightIcon", remixicon: "RiArrowRightLine", "aria-hidden": "true" })] })] })] }) }));
}
