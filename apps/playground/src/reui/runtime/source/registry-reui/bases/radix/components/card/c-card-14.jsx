import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "cn";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const stats = [
    { label: "Environment", value: "Production" },
    { label: "Region", value: "us-east-1" },
    { label: "Version", value: "v2.4.0" },
    { label: "Status", value: "Healthy" },
];
export default function Pattern() {
    return (_jsx(Card, { className: "mx-auto w-full max-w-xs overflow-hidden p-0", children: _jsxs(CardContent, { className: "flex flex-col items-center p-0", children: [_jsxs("div", { className: "flex w-full flex-col items-center justify-center bg-linear-to-b from-fuchsia-50/80 to-transparent py-12", children: [_jsxs("div", { className: "relative mb-6", children: [_jsx("div", { className: "absolute inset-0 scale-150 rounded-full bg-fuchsia-400/10 blur-2xl" }), _jsx(IconPlaceholder, { lucide: "SquareTerminalIcon", tabler: "IconTerminal2", hugeicons: "ComputerTerminal01Icon", phosphor: "TerminalWindowIcon", remixicon: "RiTerminalBoxLine", "aria-hidden": "true", className: "relative size-16 text-fuchsia-600", strokeWidth: 1.5 })] }), _jsx("h3", { className: "text-foreground text-lg font-semibold", children: "Deployment Successful" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "Your app is now live" })] }), _jsx("div", { className: "w-full space-y-1 px-4 pb-6", children: stats.map((item, index) => (_jsxs("div", { className: cn("rounded-lg flex items-center justify-between px-3 py-2.5", index % 2 === 0 && "bg-muted/40"), children: [_jsx("span", { className: "text-foreground text-sm font-medium", children: item.label }), _jsx("span", { className: "text-muted-foreground text-sm", children: item.value })] }, item.label))) })] }) }));
}
