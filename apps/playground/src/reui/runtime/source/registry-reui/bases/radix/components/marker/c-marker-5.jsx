import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Marker, MarkerContent, MarkerIcon, } from "../../../../../registry/bases/radix/ui/marker.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const CHANGES = [
    { path: "src/lib/rate-limit.ts", kind: "added", delta: "+64" },
    { path: "src/app/api/send/route.ts", kind: "modified", delta: "+18 -4" },
    { path: "src/db/schema.ts", kind: "modified", delta: "+6 -1" },
    { path: "src/lib/legacy-throttle.ts", kind: "removed", delta: "-91" },
    { path: "README.md", kind: "modified", delta: "+3" },
];
// Both maps are written out per kind rather than assembled from the kind
// string, so every icon library prop stays a literal the registry installer
// can rewrite and every badge variant stays one the design system declares.
const ICONS = {
    added: (_jsx(IconPlaceholder, { lucide: "PlusIcon", tabler: "IconPlus", hugeicons: "PlusSignIcon", phosphor: "PlusIcon", remixicon: "RiAddLine" })),
    modified: (_jsx(IconPlaceholder, { lucide: "PencilIcon", tabler: "IconPencil", hugeicons: "PenIcon", phosphor: "PencilIcon", remixicon: "RiPencilLine" })),
    removed: (_jsx(IconPlaceholder, { lucide: "Trash2Icon", tabler: "IconTrash", hugeicons: "Delete02Icon", phosphor: "TrashIcon", remixicon: "RiDeleteBinLine" })),
};
const BADGES = {
    added: "success-light",
    modified: "info-light",
    removed: "destructive-light",
};
// The border variant rules off a row from the one BELOW it, so the last row
// drops back to the default: leaving it on ends the list on a line with
// nothing under it, which reads as a missing sixth file.
//
// The path is its own block level span because truncation needs a block box to
// apply to, and it carries a title so the tail a narrow card clips is still
// recoverable.
//
// The auto margin belongs on the badge, not on the delta: on the delta alone
// each badge trails its own path, and five paths of five lengths read ragged.
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-2", children: CHANGES.map((change, index) => (_jsxs(Marker, { variant: index < CHANGES.length - 1 ? "border" : "default", children: [_jsx(MarkerIcon, { children: ICONS[change.kind] }), _jsx(MarkerContent, { children: _jsx("span", { className: "block truncate font-mono text-xs", title: change.path, children: change.path }) }), _jsx(Badge, { className: "ms-auto", variant: BADGES[change.kind], children: change.kind }), _jsx("span", { className: "shrink-0 text-xs tabular-nums", children: change.delta })] }, change.path))) }));
}
