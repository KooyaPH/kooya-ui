import { jsx as _jsx } from "react/jsx-runtime";
import { IconTile } from "../../reui/icon-tile.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// The `solid` variant is a filled tone with a contrasting glyph. Override the
// fill with a `bg-*` class plus a readable text color. An empty class keeps the
// primary default.
const tones = [
    "",
    "bg-info text-white",
    "bg-success text-white",
    "bg-warning text-white",
    "bg-destructive text-white",
];
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center gap-4", children: tones.map((tone) => (_jsx(IconTile, { variant: "solid", className: tone, "aria-hidden": "true", children: _jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine" }) }, tone || "primary"))) }));
}
