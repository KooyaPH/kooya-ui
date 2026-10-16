import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs(Card, { className: "w-full max-w-xs", children: [_jsxs(CardHeader, { className: "border-b", children: [_jsx(CardTitle, { children: "Header with Border" }), _jsx(CardDescription, { children: "This is a card with a header that has a bottom border." })] }), _jsx(CardContent, { children: _jsx("p", { children: "The header has a border-b class applied, creating a visual separation between the header and content sections." }) })] }));
}
