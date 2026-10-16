"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useMemo, useState } from "react";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const id = useId();
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
    const checkStrength = (pass) => {
        const requirements = [
            { regex: /.{8,}/, text: "At least 8 characters" },
            { regex: /[0-9]/, text: "At least 1 number" },
            { regex: /[a-z]/, text: "At least 1 lowercase letter" },
            { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
            {
                regex: /[!@#$%^&*(),.?":{}|<>]/,
                text: "At least 1 special character",
            },
        ];
        return requirements.map((req) => ({
            met: req.regex.test(pass),
            text: req.text,
        }));
    };
    const strength = checkStrength(password);
    const strengthScore = useMemo(() => {
        return strength.filter((req) => req.met).length;
    }, [strength]);
    const getStrengthColor = (score) => {
        if (score === 0)
            return "bg-border";
        if (score <= 1)
            return "bg-red-500";
        if (score <= 2)
            return "bg-orange-500";
        if (score <= 3)
            return "bg-amber-500";
        if (score <= 4)
            return "bg-green-500";
        return "bg-emerald-500";
    };
    const getStrengthText = (score) => {
        if (score === 0)
            return "Enter a password";
        if (score <= 2)
            return "Weak security";
        if (score <= 4)
            return "Medium security";
        return "Strong security";
    };
    return (_jsxs("div", { className: "w-full max-w-xs", children: [_jsxs(Field, { children: [_jsx(FieldLabel, { htmlFor: id, children: "Secure Password" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { "aria-describedby": `${id}-description`, className: "pe-9", id: id, onChange: (e) => setPassword(e.target.value), placeholder: "Create a strong password", type: isVisible ? "text" : "password", value: password }), _jsx("button", { "aria-controls": "password", "aria-label": isVisible ? "Hide password" : "Show password", "aria-pressed": isVisible, className: "text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", onClick: toggleVisibility, type: "button", children: isVisible ? (_jsx(IconPlaceholder, { lucide: "EyeOffIcon", tabler: "IconEyeOff", hugeicons: "ViewOffSlashIcon", phosphor: "EyeSlashIcon", remixicon: "RiEyeOffLine", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "EyeIcon", tabler: "IconEye", hugeicons: "ViewIcon", phosphor: "EyeIcon", remixicon: "RiEyeLine", "aria-hidden": "true" })) })] })] }), _jsx("div", { "aria-label": "Password strength", "aria-valuemax": 5, "aria-valuemin": 0, "aria-valuenow": strengthScore, className: "mt-3 mb-4 flex gap-1", role: "progressbar", children: [...Array(5)].map((_, i) => (_jsx("div", { className: `h-1 flex-1 rounded-full transition-colors duration-500 ${i < strengthScore ? getStrengthColor(strengthScore) : "bg-border"}` }, i))) }), _jsxs("div", { className: "mb-3 flex items-center justify-between", children: [_jsx("p", { className: "text-foreground text-sm font-medium", id: `${id}-description`, children: getStrengthText(strengthScore) }), _jsxs("span", { className: "text-muted-foreground text-xs", children: [strengthScore, "/5 requirements met"] })] }), _jsx("ul", { "aria-label": "Password requirements", className: "space-y-1.5", children: strength.map((req) => (_jsxs("li", { className: "flex items-center gap-1", children: [req.met ? (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5 text-emerald-500", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "text-muted-foreground/60 size-3.5", "aria-hidden": "true" })), _jsxs("span", { className: `text-xs transition-colors ${req.met ? "text-emerald-600" : "text-muted-foreground"}`, children: [req.text, _jsx("span", { className: "sr-only", children: req.met ? " - Requirement met" : " - Requirement not met" })] })] }, req.text))) })] }));
}
