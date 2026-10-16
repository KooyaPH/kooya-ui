// Adapted from the REUI Stepper44 recipe. Preserve its original state and handlers.
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
// @ts-expect-error Generated upstream recipe has no declaration file.
import OriginalPattern from "../source/registry-reui/bases/radix/components/stepper/c-stepper-44.jsx";
export default function Pattern() {
    return (_jsx("div", { style: { width: "100%", minWidth: 0 }, className: "ku-stepper-44 [&>[data-slot=stepper]]:w-full [&_[data-slot=stepper-trigger]]:max-w-full [&_[data-slot=stepper-trigger]]:whitespace-normal [&_[data-slot=stepper-title]]:whitespace-normal [&_[data-slot=stepper-trigger]>span:first-child]:min-w-0", children: _jsx(OriginalPattern, {}) }));
}
