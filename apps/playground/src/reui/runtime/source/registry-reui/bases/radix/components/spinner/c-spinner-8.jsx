import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, } from "../../../../../../../adapters/layout.tsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    return (_jsx(Card, { className: "min-h-[200px] w-full max-w-xs", children: _jsxs(CardContent, { className: "flex grow flex-col items-center justify-center gap-4", children: [_jsx(Spinner, { className: "size-4 opacity-50" }), _jsxs("div", { className: "flex flex-col items-center gap-1", children: [_jsx("p", { className: "text-sm font-medium", children: "Setting up your workspace" }), _jsx("p", { className: "text-muted-foreground text-xs", children: "This may take a few seconds..." })] })] }) }));
}
