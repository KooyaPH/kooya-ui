import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { className: "gap-0", children: [_jsx(InputGroupAddon, { children: _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(InputGroupButton, { variant: "ghost", size: "icon-xs", className: "cursor-help", children: _jsx(IconPlaceholder, { lucide: "ShieldCheckIcon", tabler: "IconShieldCheck", hugeicons: "ShieldEnergyIcon", phosphor: "ShieldCheckIcon", remixicon: "RiShieldCheckLine", className: "text-emerald-500" }) }) }), _jsx(PopoverContent, { align: "start", className: "w-72", children: _jsxs(PopoverHeader, { children: [_jsx(PopoverTitle, { children: "Secure Connection" }), _jsx(PopoverDescription, { children: "Your data is encrypted end-to-end using industry-standard protocols." })] }) })] }) }), _jsx(InputGroupInput, { defaultValue: "https://reui.com", className: "pl-0.5!", readOnly: true })] }) }));
}
