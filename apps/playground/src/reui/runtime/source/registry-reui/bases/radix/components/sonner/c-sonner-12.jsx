import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const showToast = () => {
        toast.custom(() => (_jsxs("div", { className: "bg-popover text-popover-foreground border-border rounded-md flex w-[356px] items-start gap-3 border border-l-4 border-l-blue-500 p-4 shadow-lg", children: [_jsx("div", { className: "text-blue-500", children: _jsx(IconPlaceholder, { lucide: "InfoIcon", tabler: "IconInfoCircle", hugeicons: "InformationCircleIcon", phosphor: "InfoIcon", remixicon: "RiInformationLine", className: "size-5 shrink-0", "aria-hidden": "true" }) }), _jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [_jsx("p", { className: "text-sm font-semibold", children: "New Version Available" }), _jsx("p", { className: "text-muted-foreground text-sm", children: "v2.4.0 includes performance improvements and bug fixes." }), _jsxs("div", { className: "mt-2 flex gap-2", children: [_jsx(Button, { size: "xs", variant: "outline", onClick: () => toast.dismiss(), children: "Later" }), _jsx(Button, { size: "xs", onClick: () => toast.dismiss(), children: "Update Now" })] })] })] })));
    };
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(Button, { onClick: showToast, variant: "outline", className: "w-fit", children: "Accent Border Toast" }) }));
}
