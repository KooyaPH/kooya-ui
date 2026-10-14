import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { Frame, FramePanel } from "../../code/supporting/registry-reui/bases/radix/reui/frame";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto mb-auto w-full max-w-lg min-w-0", children: _jsx(Frame, { children: _jsx(FramePanel, { className: "overflow-hidden p-0!", children: _jsxs(Alert, { className: "min-w-0 !grid-cols-[16px_minmax(0,1fr)] border-0 shadow-none", style: {
                        backgroundColor: "var(--ku-surface)",
                        color: "var(--ku-ink)",
                        borderColor: "var(--ku-line)",
                    }, children: [_jsx(IconPlaceholder, { lucide: "InfoIcon", tabler: "IconInfoCircle", hugeicons: "InformationCircleIcon", phosphor: "InfoIcon", remixicon: "RiInformationLine", className: "text-destructive", style: { color: "var(--ku-danger)" } }), _jsx(AlertTitle, { className: "!line-clamp-none min-w-0 whitespace-normal [overflow-wrap:anywhere]", children: "System Update" }), _jsx(AlertDescription, { className: "min-w-0 [overflow-wrap:anywhere]", style: { color: "var(--ku-muted)" }, children: "A new system update is available. Please restart your application to apply the changes." })] }) }) }) }));
}
