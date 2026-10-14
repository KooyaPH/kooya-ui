"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ClaudeAiIcon } from "../../../../../components/ui/svgs/claudeAiIcon.jsx";
import { Gemini } from "../../../../../components/ui/svgs/gemini.jsx";
import { Openai } from "../../../../../components/ui/svgs/openai.jsx";
import { OpenaiDark } from "../../../../../components/ui/svgs/openaiDark.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const menuItems = [
    {
        id: "gpt4o",
        label: "GPT-5.4",
        logo: _jsx(Openai, {}),
        logoDark: _jsx(OpenaiDark, {}),
    },
    {
        id: "claude",
        label: "Claude 4.6 Opus",
        logo: _jsx(ClaudeAiIcon, {}),
    },
    { id: "gemini", label: "Gemini 3.1 Pro", logo: _jsx(Gemini, {}) },
];
export default function Pattern() {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", className: "w-36", children: ["Select model", _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "ml-auto", "aria-hidden": "true" })] }) }), _jsx(DropdownMenuContent, { align: "start", className: "w-56", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "Model" }), menuItems.map((item) => (_jsxs(DropdownMenuItem, { children: [item.logoDark ? (_jsxs(_Fragment, { children: [_jsx("span", { "aria-hidden": true, className: "dark:hidden", children: item.logo }), _jsx("span", { "aria-hidden": true, className: "hidden dark:block", children: item.logoDark })] })) : (item.logo), _jsx("span", { children: item.label })] }, item.id)))] }) })] }));
}
