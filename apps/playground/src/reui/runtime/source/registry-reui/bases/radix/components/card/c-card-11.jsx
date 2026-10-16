import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "relative size-fit", children: [_jsxs(Card, { className: "relative z-1 w-full max-w-xs", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Default Card" }), _jsx(CardDescription, { children: "This card uses the default size variant." })] }), _jsx(CardContent, { children: _jsx("p", { children: "The card component supports a size prop that defaults to \"default\" for standard spacing and sizing." }) }), _jsx(CardFooter, { children: _jsx(Button, { variant: "outline", className: "w-full", children: "Action" }) })] }), _jsx("div", { className: "bg-card rounded-lg absolute inset-4 -bottom-3 z-0 border shadow-md shadow-black/1" }), _jsx("div", { className: "bg-card rounded-lg absolute inset-2 -bottom-1.5 z-0 border shadow-md shadow-black/1" })] }));
}
