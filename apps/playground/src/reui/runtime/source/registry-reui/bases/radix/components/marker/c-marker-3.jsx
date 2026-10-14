import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { Marker, MarkerContent, MarkerIcon, } from "../../../../../registry/bases/radix/ui/marker.jsx";
import { Spinner } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Three states, one column: done, failed, and still running. The failure is
// coloured by a badge and never by a text colour on the row, so it survives
// every style and stays readable to anyone who cannot see the hue.
//
// The five rows are written out rather than mapped. Each state carries
// something different (a badge here, a spinner there), so a data driven version
// needs a switch in the row body and reads worse than the markup it replaces.
//
// The spinner sits inside the icon slot, which the primitive hides from
// assistive tech together with its subtree, so its own status role never
// reaches the accessibility tree. The row states its progress in text instead,
// and keeps role="status" for the app that swaps this line out at runtime.
export default function Pattern() {
    return (_jsxs(Card, { className: "mx-auto w-full max-w-sm", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Agent run" }), _jsx(CardDescription, { children: "fix/rate-limit-window" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs(Marker, { children: [_jsx(MarkerIcon, { children: _jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine" }) }), _jsx(MarkerContent, { children: "Read src/lib/rate-limit.ts" })] }), _jsxs(Marker, { children: [_jsx(MarkerIcon, { children: _jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine" }) }), _jsx(MarkerContent, { children: "Reproduced the 429 on staging" })] }), _jsxs(Marker, { children: [_jsx(MarkerIcon, { children: _jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine" }) }), _jsx(MarkerContent, { children: "Widened the window to 60s" })] }), _jsxs(Marker, { children: [_jsx(MarkerIcon, { children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine" }) }), _jsx(MarkerContent, { children: "Type check failed in src/db/schema.ts" }), _jsx(Badge, { variant: "destructive-light", children: "failed" })] }), _jsxs(Marker, { role: "status", children: [_jsx(MarkerIcon, { children: _jsx(Spinner, { className: "size-full" }) }), _jsxs(MarkerContent, { children: [_jsx("span", { className: "sr-only", children: "In progress: " }), _jsx("span", { className: "animate-pulse", children: "Re-running the test suite" })] })] })] }) })] }));
}
