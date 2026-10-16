import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { IconPlaceholder } from "../../adapters/icons";
export default function Pattern() {
    return (_jsxs(Alert, { className: "min-w-0", style: {
            gridTemplateColumns: "16px minmax(0, 1fr)",
            backgroundColor: "var(--ku-surface)",
            color: "var(--ku-ink)",
            borderColor: "var(--ku-line)",
        }, children: [_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine" }), _jsx(AlertTitle, { style: {
                    minWidth: 0,
                    display: "block",
                    overflow: "visible",
                    overflowWrap: "anywhere",
                    WebkitLineClamp: "unset",
                }, children: "Alert!" }), _jsx(AlertDescription, { style: {
                    minWidth: 0,
                    color: "var(--ku-muted)",
                    overflowWrap: "anywhere",
                }, children: "This is an alert with icon, title and description." })] }));
}
