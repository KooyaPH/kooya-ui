import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from "../../../../../../../adapters/layout.tsx";
import { Skeleton } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { className: "gap-2", children: [_jsx(Skeleton, { className: "h-4 w-2/3" }), _jsx(Skeleton, { className: "h-4 w-1/2" })] }), _jsx(CardContent, { children: _jsx(Skeleton, { className: "aspect-video w-full rounded-md" }) })] }));
}
