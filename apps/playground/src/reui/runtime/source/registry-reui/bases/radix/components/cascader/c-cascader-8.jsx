"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Cascader, CascaderContent, CascaderEmpty, CascaderList, CascaderPanel, CascaderStatus, CascaderTrigger, useCascaderSelection, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderAction, CascaderFooter, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderItems } from "../../../../../../../adapters/cascader.tsx";
import { CascaderBreadcrumb, CascaderInput, CascaderNav, CascaderValue, } from "../../../../../../../adapters/cascader.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const resetIcon = (_jsx(IconPlaceholder, { lucide: "RotateCcwIcon", tabler: "IconRotate2", hugeicons: "ArrowTurnBackwardIcon", phosphor: "ArrowCounterClockwiseIcon", remixicon: "RiArrowGoBackLine", className: "size-4" }));
const rows = [
    { value: "3", label: "Marketing", parentId: "1" },
    { value: "1", label: "North America", parentId: null },
    { value: "5", label: "Sales", parentId: "2" },
    { value: "2", label: "Europe", parentId: null },
    { value: "4", label: "Engineering", parentId: "1" },
    { value: "7", label: "Platform", parentId: "4" },
    { value: "6", label: "Support", parentId: "2" },
    { value: "8", label: "Product", parentId: "4" },
    { value: "9", label: "Design", parentId: "2" },
    { value: "11", label: "Field Sales", parentId: "10" },
    { value: "10", label: "Latin America", parentId: null },
    { value: "13", label: "Partnerships", parentId: "12" },
    { value: "12", label: "Asia Pacific", parentId: null },
    { value: "15", label: "Operations", parentId: "14" },
    { value: "14", label: "Middle East", parentId: null },
    { value: "16", label: "Africa", parentId: null },
    { value: "17", label: "Distribution", parentId: "16" },
    { value: "18", label: "Oceania", parentId: null },
    { value: "19", label: "Retail", parentId: "18" },
    { value: "20", label: "Infrastructure", parentId: "7" },
    { value: "21", label: "Developer Tools", parentId: "7" },
    { value: "22", label: "Customer Success", parentId: "12" },
];
/**
 * The reset as a footer COMMAND, reading the selection out of context instead of
 * being handed it. Nothing in here is specific to this example - composed into
 * any panel it clears that cascader - and `isEmpty` is what stops it offering to
 * undo nothing.
 */
function ResetAction() {
    const { clear, isEmpty } = useCascaderSelection();
    return (_jsx(CascaderAction, { icon: resetIcon, disabled: isEmpty, onSelect: clear, children: "Reset selection" }));
}
/**
 * Flat adjacency input. Pass the rows as-is plus `getParent`, and the tree is
 * indexed in one linear pass - no client-side re-nesting step, which is what
 * keeps a large normalized dataset cheap to render and cheap to update.
 *
 * The footer carries the same reset command this family uses everywhere else.
 * A drill-down picker has no other way back to "nothing selected" once a
 * department is committed: the trigger shows a value, and re-picking it in a
 * single-select list only reselects it. `CascaderFooter` draws the rule
 * itself, with a `border-t` that sits exactly on the boundary between the list
 * and the footer. An explicit `CascaderSeparator` in here looked equivalent and
 * was not: it stacks its own block margin on top of BOTH containers' padding,
 * which measured 12px above the rule against 6px below, where the panel's own
 * rhythm is 4px after the search field and 0 between rows. The border needs no
 * arithmetic to be symmetric, because it is the boundary rather than a child of
 * one side of it.
 */
export default function Pattern() {
    const [value, setValue] = useState("");
    return (_jsx("div", { className: "flex w-full flex-col items-center gap-3 p-4", children: _jsxs(Cascader, { items: rows, getParent: (node) => node.parentId, value: value, onValueChange: setValue, children: [_jsx(CascaderTrigger, { "aria-label": "Department", render: _jsx(Button, { variant: "outline", className: "w-72 justify-between gap-2 font-normal" }), children: _jsx(CascaderValue, { placeholder: "Select a department" }) }), _jsx(CascaderContent, { className: "w-72", children: _jsxs(CascaderPanel, { children: [_jsx(CascaderNav, { children: _jsx(CascaderInput, {}) }), _jsx(CascaderBreadcrumb, {}), _jsx(CascaderEmpty, {}), _jsx(CascaderList, { children: _jsx(CascaderItems, {}) }), _jsx(CascaderFooter, { children: _jsx(ResetAction, {}) }), _jsx(CascaderStatus, {})] }) })] }) }));
}
