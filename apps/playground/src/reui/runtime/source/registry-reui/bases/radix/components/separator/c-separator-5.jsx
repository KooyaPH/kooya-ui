import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-xs flex-col gap-6", children: _jsxs("div", { className: "relative", children: [_jsx(Separator, {}), _jsx("span", { className: "bg-background text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs", children: "or continue with" })] }) }));
}
