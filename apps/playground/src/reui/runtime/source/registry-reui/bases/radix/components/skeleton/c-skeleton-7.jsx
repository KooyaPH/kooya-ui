import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { Skeleton } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto w-full max-w-xs", children: _jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between pb-4", children: [_jsx(Skeleton, { className: "h-5 w-28" }), _jsx(Skeleton, { className: "h-8 w-20 rounded-md" })] }), _jsx(Separator, { className: "opacity-60" }), Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: "border-border/60 flex items-center gap-3 border-b py-3 last:border-b-0", children: [_jsx(Skeleton, { className: "size-9 shrink-0 rounded-full" }), _jsxs("div", { className: "flex flex-1 flex-col gap-1.5", children: [_jsx(Skeleton, { className: "h-3.5 w-32" }), _jsx(Skeleton, { className: "h-3 w-48" })] }), _jsx(Skeleton, { className: "h-7 w-16 rounded-md" })] }, i)))] }) }));
}
