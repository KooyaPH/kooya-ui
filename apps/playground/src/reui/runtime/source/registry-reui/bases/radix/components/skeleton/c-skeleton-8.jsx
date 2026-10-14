import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardFooter, CardHeader, } from "../../../../../../../adapters/layout.tsx";
import { Skeleton } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsx(CardHeader, { children: _jsx(Skeleton, { className: "aspect-video w-full" }) }), _jsxs(CardContent, { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-3/4" }), _jsx(Skeleton, { className: "h-3 w-full" }), _jsx(Skeleton, { className: "h-3 w-2/3" })] }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Skeleton, { className: "h-8 w-20 rounded-md" }), _jsx(Skeleton, { className: "h-8 w-8 rounded-md" })] })] }));
}
