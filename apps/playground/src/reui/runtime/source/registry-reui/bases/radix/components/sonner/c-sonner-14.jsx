import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const showToast = () => {
        toast.custom(() => (_jsxs("div", { className: "bg-invert text-invert-foreground rounded-md flex w-[356px] flex-col gap-3 border border-transparent p-4 shadow-lg", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex size-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-white", children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "MultiplicationSignIcon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-3.5" }) }), _jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [_jsx("p", { className: "text-sm font-semibold", children: "Build Failed" }), _jsx("p", { className: "text-invert-foreground/70 text-sm", children: "Compilation error in 2 files. Fix errors before deploying." })] })] }), _jsx(Separator, { className: "bg-border/10" }), _jsxs("div", { className: "text-invert-foreground/60 space-y-1 font-mono text-xs", children: [_jsx("p", { children: "src/api/auth.ts:42 \u2014 TypeError: undefined is not a function" }), _jsx("p", { children: "src/utils/parse.ts:18 \u2014 SyntaxError: Unexpected token" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "xs", variant: "outline", className: "bg-background/10 border-border/10 text-invert-foreground flex-1", onClick: () => toast.dismiss(), children: "View Logs" }), _jsx(Button, { size: "xs", className: "flex-1 border-red-800 bg-red-500 text-white hover:border-red-900 hover:bg-red-600", onClick: () => toast.dismiss(), children: "Retry Build" })] })] })));
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: showToast, variant: "outline", className: "w-fit", children: "Invert Error Toast" }) }));
}
