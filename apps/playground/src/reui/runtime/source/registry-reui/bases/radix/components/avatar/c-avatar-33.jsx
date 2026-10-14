import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "group/avatar relative flex items-center justify-center", children: [_jsx("div", { className: "absolute -inset-1 animate-[spin_3s_linear_infinite] rounded-full bg-linear-to-tr from-yellow-400 via-fuchsia-500 to-violet-600 opacity-75 blur-xs transition-all duration-500 group-hover/avatar:opacity-100 group-hover/avatar:blur-sm" }), _jsxs(Avatar, { className: "ring-background size-10 ring-2 transition-transform duration-500 group-hover/avatar:scale-95", children: [_jsx(AvatarImage, { src: "/reui-assets/images/0a10b9bc070f3bdf606f.jpg", alt: "User story" }), _jsx(AvatarFallback, { children: "JD" })] })] }));
}
