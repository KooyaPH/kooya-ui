import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { IconPlaceholder } from "../../adapters/icons";
const darkInfoIconStyle = `
  [data-mode="dark"] .ku-alert-5 [role="alert"] > svg {
    color: #9fb1ff !important;
  }
`;
export default function Pattern() {
    return (_jsxs("div", { className: "ku-alert-5", children: [_jsx("style", { children: darkInfoIconStyle }), _jsxs(Alert, { variant: "info", children: [_jsx(IconPlaceholder, { lucide: "CircleAlertIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine" }), _jsx(AlertTitle, { className: "line-clamp-none whitespace-normal [overflow-wrap:anywhere]", children: "Info! Something important" }), _jsx(AlertDescription, { style: { color: "var(--ku-muted)", overflowWrap: "anywhere" }, children: "This is an important message. Please read it carefully." })] })] }));
}
