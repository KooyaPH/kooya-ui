import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
export default function Pattern() {
    return (_jsxs(Alert, { style: {
            backgroundColor: "var(--ku-surface)",
            color: "var(--ku-ink)",
            borderColor: "var(--ku-line)",
        }, children: [_jsx(AlertTitle, { className: "!line-clamp-none min-w-0 [overflow-wrap:anywhere]", children: "Alert!" }), _jsx(AlertDescription, { className: "min-w-0 [overflow-wrap:anywhere]", style: { color: "var(--ku-muted)" }, children: "This is an alert with a title and description." })] }));
}
