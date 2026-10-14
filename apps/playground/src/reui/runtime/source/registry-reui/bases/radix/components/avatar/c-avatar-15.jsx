import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Avatar, { className: "after:border-primary", children: _jsx(AvatarFallback, { className: "bg-primary text-primary-foreground", children: "AB" }) }), _jsx(Avatar, { className: "after:border-destructive", children: _jsx(AvatarFallback, { className: "bg-destructive text-white", children: "AB" }) }), _jsx(Avatar, { className: "after:border-green-500", children: _jsx(AvatarFallback, { className: "bg-green-500 text-white", children: "AB" }) }), _jsx(Avatar, { className: "after:border-blue-500", children: _jsx(AvatarFallback, { className: "bg-blue-500 text-white", children: "CB" }) })] }));
}
