import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from "../../../../../../../adapters/layout.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { Skeleton } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto w-full max-w-xs space-y-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "items-center gap-3", children: [_jsx(Skeleton, { className: "size-20 rounded-full" }), _jsx(Skeleton, { className: "h-5 w-32" }), _jsx(Skeleton, { className: "h-3 w-48" })] }), _jsx(CardContent, { className: "flex justify-center gap-8", children: Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: "flex flex-col items-center gap-1", children: [_jsx(Skeleton, { className: "h-5 w-10" }), _jsx(Skeleton, { className: "h-3 w-14" })] }, i))) })] }), _jsx(Card, { children: _jsxs(CardContent, { className: "space-y-4 pt-4", children: [_jsx(Skeleton, { className: "h-4 w-24" }), _jsx(Separator, {}), Array.from({ length: 4 }).map((_, i) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Skeleton, { className: "h-3 w-20" }), _jsx(Skeleton, { className: "h-3 w-32" })] }, i)))] }) })] }));
}
