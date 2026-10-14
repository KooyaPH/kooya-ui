import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertAction, AlertDescription, AlertTitle, } from "../../code/supporting/registry-reui/bases/radix/reui/alert";
import { Frame, FramePanel } from "../../code/supporting/registry-reui/bases/radix/reui/frame";
import { Button } from "../../adapters/controls";
import { IconPlaceholder } from "../../adapters/icons";
const styles = `
  .ku-alert-13 { width: 100%; min-width: 0; }
  .ku-alert-13 [data-slot="alert"] {
    min-width: 0;
    grid-template-columns: 16px minmax(0, 1fr);
  }
  .ku-alert-13 [data-slot="alert-title"] {
    display: block;
    min-width: 0;
    overflow: visible;
    overflow-wrap: anywhere;
    white-space: normal;
    -webkit-line-clamp: unset;
  }
  .ku-alert-13 [data-slot="alert-description"] {
    min-width: 0;
    overflow-wrap: anywhere;
    color: var(--ku-muted);
  }
  [data-mode="dark"] .ku-alert-13 [data-slot="alert"] > svg:not(.text-yellow-500) {
    color: #d7f20f;
  }
  [data-mode="dark"] .ku-alert-13 [data-slot="alert"] > svg.text-yellow-500 {
    color: #f4b701;
  }
`;
export default function Pattern() {
    return (_jsxs("div", { className: "ku-alert-13 mx-auto mb-auto w-full max-w-lg min-w-0", children: [_jsx("style", { children: styles }), _jsxs(Frame, { stacked: true, children: [_jsx(FramePanel, { className: "p-0!", children: _jsxs(Alert, { variant: "success", className: "rounded-none border-0 shadow-none", children: [_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine" }), _jsx(AlertTitle, { children: "Deployment Successful" }), _jsx(AlertDescription, { children: "Your application has been successfully deployed to the production environment." })] }) }), _jsx(FramePanel, { className: "p-0!", children: _jsxs(Alert, { variant: "warning", className: "rounded-none border-0 shadow-none", children: [_jsx(IconPlaceholder, { lucide: "AlertTriangleIcon", tabler: "IconAlertTriangle", hugeicons: "Alert02Icon", phosphor: "WarningIcon", remixicon: "RiAlertLine", className: "text-yellow-500" }), _jsx(AlertTitle, { children: "Resource Limit Reached" }), _jsx(AlertAction, { children: _jsx(Button, { size: "xs", children: "Verify" }) }), _jsx(AlertDescription, { children: "Your current plan has reached its resource limits. Consider upgrading to a higher tier." })] }) })] })] }));
}
