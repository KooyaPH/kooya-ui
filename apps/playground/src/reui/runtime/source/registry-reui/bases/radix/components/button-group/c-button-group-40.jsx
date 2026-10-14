import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { orientation: "vertical", children: [_jsx(Button, { variant: "outline", className: cn("bg-muted justify-start"), children: "Dashboard" }), _jsx(Button, { variant: "outline", className: "justify-start", children: "Analytics" }), _jsx(Button, { variant: "outline", className: "justify-start", children: "Settings" }), _jsx(Button, { variant: "outline", className: "justify-start", children: "Help" })] }));
}
