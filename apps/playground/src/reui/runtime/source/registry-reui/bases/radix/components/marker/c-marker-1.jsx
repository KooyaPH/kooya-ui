import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Marker, MarkerContent } from "../../../../../registry/bases/radix/ui/marker.jsx";
// The rows sit on a wide gap because the border variant already draws its own
// pb-2 under itself. On a tight gap the three shapes stop reading as three
// separate variants and read as one block.
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-6", children: [_jsx(Marker, { children: _jsx(MarkerContent, { children: "Read 14 files under src/billing" }) }), _jsx(Marker, { variant: "separator", children: _jsx(MarkerContent, { children: "Planning" }) }), _jsx(Marker, { variant: "border", children: _jsx(MarkerContent, { children: "Wrote 3 files, 128 lines changed" }) })] }));
}
