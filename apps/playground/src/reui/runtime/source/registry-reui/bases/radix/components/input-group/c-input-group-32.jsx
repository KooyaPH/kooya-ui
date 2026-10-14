"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const roles = ["Admin", "Member", "Viewer"];
export default function Pattern() {
    const [role, setRole] = useState("Admin");
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { className: "pr-1", children: _jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: "/reui-assets/images/0a10b9bc070f3bdf606f.jpg", alt: "Avatar" }), _jsx(AvatarFallback, { children: "LR" })] }) }), _jsx(InputGroupInput, { defaultValue: "@shadcn", className: "pl-1!" }), _jsx(InputGroupAddon, { align: "inline-end", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(InputGroupButton, { variant: "ghost", className: "h-7 text-xs", children: [role, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "size-3.5 opacity-60" })] }) }), _jsx(DropdownMenuContent, { align: "end", className: "min-w-32", children: roles.map((r) => (_jsx(DropdownMenuItem, { onClick: () => setRole(r), children: r }, r))) })] }) })] }) }));
}
