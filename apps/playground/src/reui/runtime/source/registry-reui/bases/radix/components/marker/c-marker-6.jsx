"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Marker, MarkerContent, MarkerIcon, } from "../../../../../registry/bases/radix/ui/marker.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// asChild merges the row onto the anchor rather than wrapping it, so the
// marker's own classes land on the anchor and the primitive's link treatment
// comes for free. A button gets no such treatment, which is why only the
// button carries a hover.
//
// The button toggles real state and the row rewrites itself, because a control
// that only looks clickable is a decorative control. That is the one reason
// this file is a client component.
//
// The icon swap is two complete elements behind a ternary instead of one
// element with a computed name, because every library prop has to stay a
// literal string for the registry installer to rewrite it.
export default function Pattern() {
    const [reverted, setReverted] = useState(false);
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-4", children: [_jsx(Marker, { asChild: true, children: _jsxs("a", { href: "#", children: [_jsx(MarkerIcon, { children: _jsx(IconPlaceholder, { lucide: "GitMergeIcon", tabler: "IconGitMerge", hugeicons: "GitMergeIcon", phosphor: "GitMergeIcon", remixicon: "RiGitMergeLine" }) }), _jsx(MarkerContent, { children: "Review pull request #412" })] }) }), _jsx(Marker, { asChild: true, children: _jsxs("a", { href: "#", children: [_jsx(MarkerIcon, { children: _jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine" }) }), _jsx(MarkerContent, { children: "Open the diff for rate-limit.ts" })] }) }), _jsx(Marker, { asChild: true, children: _jsxs("button", { type: "button", className: "hover:text-foreground transition-colors", onClick: () => setReverted((value) => !value), children: [_jsx(MarkerIcon, { children: reverted ? (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine" })) : (_jsx(IconPlaceholder, { lucide: "RotateCcwIcon", tabler: "IconRefresh", hugeicons: "UndoIcon", phosphor: "ArrowCounterClockwiseIcon", remixicon: "RiRefreshLine" })) }), _jsx(MarkerContent, { children: reverted ? "Undo the revert" : "Revert this change" })] }) }), _jsx("span", { role: "status", "aria-live": "polite", className: "sr-only", children: reverted ? "Change reverted" : "" })] }));
}
