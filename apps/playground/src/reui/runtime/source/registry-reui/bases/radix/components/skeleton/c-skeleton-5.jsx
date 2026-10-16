import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-lg flex-col gap-4", children: [_jsxs("div", { className: "flex gap-4 border-b pb-2", children: [_jsx(Skeleton, { className: "h-4 flex-1" }), _jsx(Skeleton, { className: "h-4 w-24" }), _jsx(Skeleton, { className: "h-4 w-20" })] }), Array.from({ length: 4 }).map((_, i) => (_jsxs("div", { className: "flex gap-4", children: [_jsx(Skeleton, { className: "h-4 flex-1" }), _jsx(Skeleton, { className: "h-4 w-24" }), _jsx(Skeleton, { className: "h-4 w-20" })] }, i)))] }));
}
