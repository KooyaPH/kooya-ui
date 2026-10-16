"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { format, formatDistanceToNow } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    // Static reference time for the "last deployed" example
    const referenceTime = new Date(now.getTime() - 1000 * 60 * 120); // 2 hours ago
    return (_jsx("div", { className: "flex min-h-[100px] items-center justify-center", children: _jsxs("p", { className: "text-muted-foreground text-sm", children: ["Last deployed", " ", _jsxs(HoverCard, { openDelay: 100, closeDelay: 100, children: [_jsx(HoverCardTrigger, { className: "text-foreground cursor-default underline decoration-dashed decoration-1 underline-offset-4", children: formatDistanceToNow(referenceTime, { addSuffix: true }) }), _jsxs(HoverCardContent, { className: "w-78 p-0", children: [_jsx("p", { className: "text-foreground px-2 py-1 font-medium", children: formatDistanceToNow(referenceTime, { addSuffix: true }) }), _jsx(Separator, {}), _jsx("div", { className: "px-2 py-1.5", children: _jsx("table", { children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { className: "pr-4 pb-1.5", children: _jsx(Badge, { variant: "outline", children: "UTC" }) }), _jsx("td", { className: "pr-6 pb-1.5", children: format(referenceTime, "MMM d, yyyy") }), _jsx("td", { className: "text-muted-foreground pb-1.5", children: format(referenceTime, "hh:mm:ss a") })] }), _jsxs("tr", { children: [_jsx("td", { className: "pr-4", children: _jsx("span", { className: "bg-muted rounded px-1.5 py-0.5 font-medium", children: Intl.DateTimeFormat()
                                                                    .resolvedOptions()
                                                                    .timeZone.split("/")
                                                                    .pop()
                                                                    ?.replace("_", " ") || "Local" }) }), _jsx("td", { className: "pr-6", children: format(now, "MMM d, yyyy") }), _jsx("td", { className: "text-muted-foreground w-28", children: format(now, "hh:mm:ss a") })] })] }) }) })] })] }), " ", "by CI/CD pipeline."] }) }));
}
