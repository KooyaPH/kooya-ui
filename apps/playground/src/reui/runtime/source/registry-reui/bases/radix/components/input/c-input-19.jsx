"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(FieldLabel, { htmlFor: "password-link", children: "Password" }), _jsx("a", { href: "#", className: "text-primary text-xs font-medium hover:underline", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "password-link", type: isVisible ? "text" : "password", className: "pe-9" }), _jsx("button", { "aria-label": isVisible ? "Hide password" : "Show password", "aria-pressed": isVisible, className: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", onClick: toggleVisibility, type: "button", children: isVisible ? (_jsx(IconPlaceholder, { lucide: "EyeOffIcon", tabler: "IconEyeOff", hugeicons: "ViewOffSlashIcon", phosphor: "EyeSlashIcon", remixicon: "RiEyeOffLine", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "EyeIcon", tabler: "IconEye", hugeicons: "ViewIcon", phosphor: "EyeIcon", remixicon: "RiEyeLine", "aria-hidden": "true" })) })] })] }));
}
