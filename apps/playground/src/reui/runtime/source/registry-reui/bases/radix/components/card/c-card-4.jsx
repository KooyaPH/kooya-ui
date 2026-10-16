import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsx(CardHeader, { className: "border-b", children: _jsx(CardTitle, { children: "Header with Border" }) }), _jsx(CardContent, { children: _jsx("p", { children: "The footer has a border-t class applied, creating a visual separation between the content and footer sections." }) }), _jsx(CardFooter, { className: "border-t", children: _jsx(Button, { variant: "outline", className: "w-full", children: "Action" }) })] }));
}
