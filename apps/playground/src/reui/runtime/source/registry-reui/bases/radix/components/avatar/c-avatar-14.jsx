import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Avatar, { className: "after:border-primary/10", children: _jsx(AvatarFallback, { className: "bg-primary/10 text-primary", children: "AB" }) }), _jsx(Avatar, { className: "after:border-destructive/10", children: _jsx(AvatarFallback, { className: "bg-destructive/10 text-destructive", children: "DV" }) }), _jsx(Avatar, { className: "after:border-green-200 dark:after:border-green-600", children: _jsx(AvatarFallback, { className: "bg-green-50 text-green-600 dark:bg-green-900", children: "SB" }) }), _jsx(Avatar, { className: "after:border-fuchsia-200 dark:after:border-fuchsia-600", children: _jsx(AvatarFallback, { className: "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900", children: "DB" }) })] }));
}
