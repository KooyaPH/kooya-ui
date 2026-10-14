import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs gap-0 p-0", children: [_jsxs(CardHeader, { className: "flex items-center justify-between px-4 py-2", children: [_jsx(CardTitle, { children: "Header" }), _jsx(CardAction, { children: _jsx(Button, { variant: "outline", className: "w-full", children: "Action" }) })] }), _jsx(CardContent, { className: "border-y px-4 py-3", children: _jsx("p", { children: "The footer has a border-t class applied, creating a visual separation between the content and footer sections." }) }), _jsx(CardFooter, { className: "border-none px-4 py-3", children: _jsx(Button, { variant: "outline", className: "w-full", children: "Action" }) })] }));
}
