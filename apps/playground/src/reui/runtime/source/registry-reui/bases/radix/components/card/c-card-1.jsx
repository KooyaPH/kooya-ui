import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Default Card" }), _jsx(CardDescription, { children: "This card uses the default size variant." })] }), _jsx(CardContent, { children: _jsx("p", { children: "The card component supports a size prop that defaults to \"default\" for standard spacing and sizing." }) }), _jsx(CardFooter, { children: _jsx(Button, { variant: "outline", className: "w-full", children: "Action" }) })] }));
}
