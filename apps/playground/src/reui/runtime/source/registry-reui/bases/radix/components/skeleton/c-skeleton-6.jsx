import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from "../../../../../../../adapters/layout.tsx";
import { Skeleton } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto grid w-full max-w-lg grid-cols-3 gap-4", children: Array.from({ length: 3 }).map((_, i) => (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(Skeleton, { className: "h-3 w-16" }) }), _jsxs(CardContent, { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-7 w-24" }), _jsx(Skeleton, { className: "h-3 w-20" })] })] }, i))) }));
}
