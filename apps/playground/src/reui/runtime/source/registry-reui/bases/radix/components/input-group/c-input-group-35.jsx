"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [showPassword, setShowPassword] = useState(false);
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "LockIcon", tabler: "IconLock", hugeicons: "SquareLock01Icon", phosphor: "LockSimpleIcon", remixicon: "RiLockLine", className: "text-muted-foreground size-4" }) }), _jsx(InputGroupInput, { type: showPassword ? "text" : "password", placeholder: "Enter password" }), _jsx(InputGroupButton, { variant: "ghost", onClick: () => setShowPassword(!showPassword), children: showPassword ? (_jsx(IconPlaceholder, { lucide: "EyeOffIcon", tabler: "IconEyeOff", hugeicons: "ViewOffSlashIcon", phosphor: "EyeSlashIcon", remixicon: "RiEyeOffLine", className: "text-muted-foreground size-4" })) : (_jsx(IconPlaceholder, { lucide: "EyeIcon", tabler: "IconEye", hugeicons: "ViewIcon", phosphor: "EyeIcon", remixicon: "RiEyeLine", className: "text-muted-foreground size-4" })) })] }) }));
}
