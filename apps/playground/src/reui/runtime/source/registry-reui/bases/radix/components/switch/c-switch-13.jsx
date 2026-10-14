import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { Switch } from "../../../../../../../adapters/controls.tsx";
const settings = [
    {
        id: "auto-save",
        label: "Auto-save",
        description: "Save changes automatically",
        checked: true,
    },
    {
        id: "spell-check",
        label: "Spell check",
        description: "Highlight spelling errors",
        checked: true,
    },
    {
        id: "line-numbers",
        label: "Line numbers",
        description: "Show line numbers in editor",
        checked: false,
    },
];
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto w-full max-w-xs", children: [_jsx("p", { className: "mb-3 text-sm font-medium", children: "Editor Preferences" }), _jsx(Separator, {}), _jsx("div", { className: "flex flex-col", children: settings.map((setting) => (_jsxs("label", { htmlFor: setting.id, className: "flex cursor-pointer items-center justify-between border-b py-3 last:border-b-0", children: [_jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-sm font-medium", children: setting.label }), _jsx("span", { className: "text-muted-foreground text-xs", children: setting.description })] }), _jsx(Switch, { id: setting.id, defaultChecked: setting.checked, size: "sm" })] }, setting.id))) })] }));
}
