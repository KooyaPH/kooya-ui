import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, } from "../../../../../../../adapters/layout.tsx";
function StackedCardsIllustration() {
    return (_jsxs("div", { className: "relative h-24 w-52", "aria-hidden": "true", children: [_jsx("div", { className: "bg-muted/60 dark:bg-muted/30 border-border/50 absolute inset-x-6 top-0 h-6 rounded-t-lg border" }), _jsx("div", { className: "bg-muted/80 dark:bg-muted/50 border-border/60 absolute inset-x-3 top-3 h-6 rounded-t-lg border" }), _jsxs("div", { className: "bg-background border-border absolute inset-x-0 top-6 flex h-16 items-center gap-3 rounded-lg border px-4 shadow-sm", children: [_jsx("div", { className: "bg-muted size-8 shrink-0 rounded" }), _jsxs("div", { className: "flex flex-1 flex-col gap-1.5", children: [_jsx("div", { className: "bg-muted h-2.5 w-3/4 rounded" }), _jsx("div", { className: "bg-muted/60 h-2 w-1/2 rounded" })] })] }), _jsx("div", { className: "from-background/0 via-background/60 to-background pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-b" })] }));
}
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center p-4", children: _jsx(Empty, { className: "py-12", children: _jsxs(EmptyHeader, { children: [_jsx(EmptyMedia, { children: _jsx(StackedCardsIllustration, {}) }), _jsx(EmptyTitle, { children: "No products" }), _jsx(EmptyDescription, { children: "No data here yet. We will notify you when there's an update." })] }) }) }));
}
