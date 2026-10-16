import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconStack } from "../../reui/icon-stack.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const stacks = [
    {
        label: "Neutral",
        className: "text-foreground",
        iconClassName: "text-muted-foreground",
    },
    {
        label: "Primary",
        className: "text-primary",
        iconClassName: "text-primary",
    },
    {
        label: "Success",
        className: "text-success",
        iconClassName: "text-success",
    },
    {
        label: "Warning",
        className: "text-warning",
        iconClassName: "text-warning",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "flex flex-wrap items-end justify-center gap-7", children: stacks.map((item) => (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(IconStack, { "aria-hidden": "true", className: item.className, children: _jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine", className: `size-4 ${item.iconClassName}` }) }), _jsx("span", { className: "text-muted-foreground text-sm", children: item.label })] }, item.label))) }));
}
