"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Cascader, CascaderEmpty, CascaderList, CascaderPanel, CascaderStatus, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderFooter } from "../../../../../../../adapters/cascader.tsx";
import { CascaderBreadcrumb, CascaderInput, CascaderNav, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderVirtualItems } from "../../../../../../../adapters/cascader.tsx";
import { filterControlSizes, filterReadOnlyProps, useFilterActions, useFilterFocusStore, useFilterState, } from "./filters-context.jsx";
import { FILTER_FIELD_PICKER_CLASS, getFilterField, getFilterFieldCount, joinFilterPath, splitFilterPath, } from "./filters-lib.jsx";
import { getDefaultFilterOperator } from "./filters-operators.jsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/**
 * Projects ONLY the field tree: operators or values as nodes would force the
 * wizard through a combobox that owns the arrows and `aria-activedescendant`.
 */
function toCascaderNodes(fields, parentPath = []) {
    return fields.map((field) => {
        const path = [...parentPath, field.id];
        const node = {
            value: joinFilterPath(path),
            label: field.label,
            icon: field.icon,
            description: field.description,
            keywords: field.keywords,
            disabled: field.disabled,
            data: field,
        };
        if (field.fields?.length) {
            node.children = toCascaderNodes(field.fields, path);
            node.count = getFilterFieldCount(field);
        }
        return node;
    });
}
/**
 * Fully controlled, not draft-driven, so ONE picker serves both the create
 * popover (driven by the draft reducer) and an advanced row (its own state).
 */
export function FilterFieldPicker({ path, onPathChange, query, onQueryChange, onSelect, maxHeight = 260, labels: labelsProp, actions: actionItems, }) {
    const actions = useFilterActions();
    const items = React.useMemo(() => toCascaderNodes(actions.index.roots), [actions.index]);
    // Bridges `FilterLabels` onto the cascader's own key names. `labelsProp` is
    // spread LAST, so a consumer override always wins.
    const cascaderLabels = React.useMemo(() => ({
        search: actions.labels.searchFields,
        back: actions.labels.back,
        empty: actions.labels.empty,
        pathSeparator: actions.labels.pathSeparator.trim() || "/",
        itemCount: actions.labels.itemCount,
        branchAffordance: actions.labels.branchAffordance,
        rootLevel: actions.labels.fieldsLabel,
        panelLabel: actions.labels.fieldsLabel,
        resultsAnnouncement: actions.labels.resultsAnnouncement,
        actionsLabel: actions.labels.actionsLabel,
        ...labelsProp,
    }), [actions.labels, labelsProp]);
    return (_jsx(Cascader, { inline: true, 
        /* Pinned open: inline renders no popup and forces `open`, so the
           single-select commit's `setOpen(false)` dismisses nothing. That avoids
           the `multiple` plus `max` workaround and its `aria-multiselectable`. */
        open: true, onOpenChange: () => { }, items: items, 
        /* No `selectable` predicate: LEAVES commit, branches navigate. Honouring
           a branch's opt-in made one click mean both drill and commit. */
        searchScope: "deep", 
        /* Nothing is ever selected, so the ~24px check gutter is dead space. */
        indicator: false, path: path, onPathChange: onPathChange, 
        /* Controlled: the single-select arm of `commit()` never clears the query,
           so an uncontrolled one would bleed into the next step. */
        inputValue: query, onInputValueChange: onQueryChange, value: "", onValueChange: (value) => {
            const nextPath = splitFilterPath(value);
            const field = getFilterField(actions.index, nextPath);
            if (!field)
                return;
            onSelect(nextPath, getDefaultFilterOperator(field, actions.resolveOperators(field)));
        }, labels: cascaderLabels, actions: actionItems, 
        /* Set here only: `CascaderList` takes its own `maxHeight` and that WINS,
           so a second copy on the list is a divergence waiting to happen. */
        maxHeight: maxHeight, children: _jsxs(CascaderPanel, { children: [_jsx(CascaderNav, { children: _jsx(CascaderInput, { placeholder: actions.labels.searchFields }) }), _jsx(CascaderBreadcrumb, {}), _jsx(CascaderEmpty, {}), _jsx(CascaderList, { children: _jsx(CascaderVirtualItems, {}) }), _jsx(CascaderFooter, {}), _jsx(CascaderStatus, {})] }) }));
}
function FieldStep() {
    const actions = useFilterActions();
    const { draft } = useFilterState();
    return (_jsx(FilterFieldPicker, { path: draft?.cascaderPath ?? [], onPathChange: (next) => actions.dispatchDraft({ type: "setCascaderPath", path: next }), query: draft?.query ?? "", onQueryChange: (query) => actions.dispatchDraft({ type: "setQuery", query }), onSelect: (path, defaultOperator) => actions.dispatchDraft({ type: "selectField", path, defaultOperator }) }));
}
/**
 * The Add filter popover. ONE panel, the field step: picking a field commits
 * the rule and opens the operator menu on the new chip. `open` derives from the
 * draft and `openCreate` is gated, so read-only and disabled shut every route.
 */
export function FiltersBuilder({ trigger, className, }) {
    const actions = useFilterActions();
    const sizes = filterControlSizes(actions);
    const { draft, ruleCount } = useFilterState();
    const focusStore = useFilterFocusStore();
    const open = draft !== null && draft.ruleId === null;
    // The HANDOFF close, the one that must not FADE: the panel is a 224px card
    // dissolving over the very menu the user is now meant to read.
    const committing = draft !== null && draft.ruleId === null && draft.status === "ready";
    // LATCHED, because `committing` is true for one render only, before the exit
    // it suppresses begins. Adjusted during render; an effect is one frame late.
    const [instantExit, setInstantExit] = React.useState(false);
    if (committing && !instantExit)
        setInstantExit(true);
    else if (open && !committing && instantExit)
        setInstantExit(false);
    // Icon-only once chips sit beside it. Both states come off ONE size ladder,
    // so they share height and radius in every style at every bar size. The
    // hardcoded `icon`/`default` pair this replaced IS the `default` rung, so it
    // drifted the moment the bar was `sm`.
    const compact = ruleCount > 0;
    // The focus handoff to the new chip, and THE ONE PLACE the twins cannot share
    // an implementation. Radix opens the chip's popover FIRST, so this one's
    // `FocusScope` restore lands as a `focusin` outside the chip's
    // `DismissableLayer` and the operator menu dismissed itself in the same
    // frame. Suppressed ONLY on the handoff close, so every other close keeps its
    // restore; LATCHED because the chip consumes `autoOpen` before this popover
    // unmounts.
    const handoffRef = React.useRef(false);
    React.useEffect(() => {
        if (!open)
            return;
        handoffRef.current = false;
        return focusStore.subscribe(() => {
            if (focusStore.getSnapshot().autoOpen)
                handoffRef.current = true;
        });
    }, [focusStore, open]);
    const onCloseAutoFocus = (event) => {
        if (!handoffRef.current)
            return;
        handoffRef.current = false;
        event.preventDefault();
    };
    return (_jsxs(Popover, { open: open, onOpenChange: (next) => {
            if (!next)
                actions.closeDraft();
            else
                actions.openCreate();
        }, children: [_jsx(PopoverTrigger
            /* On the TRIGGER so a consumer's own `trigger` wears the state too. */
            , { 
                /* On the TRIGGER so a consumer's own `trigger` wears the state too. */
                asChild: true, disabled: actions.disabled, ...filterReadOnlyProps(actions), children: trigger ? trigger : (_jsxs(Button, { variant: "outline", size: compact ? sizes.icon : sizes.button, "aria-label": compact ? actions.labels.addFilter : undefined, 
                    /* THE RESET BOUNCE: the button's base class carries
                       `transition-all`, so flipping the size class eased padding 0 to
                       `px-6` in sera over 150ms. Naming a transition REPLACES it. */
                    className: "transition-[color,background-color,border-color,box-shadow]", children: [_jsx(IconPlaceholder, { lucide: "ListFilterPlusIcon", tabler: "IconFilterPlus", hugeicons: "FilterAddIcon", phosphor: "FunnelSimpleIcon", remixicon: "RiFilter3Line" }), compact ? null : actions.labels.addFilter] })) }), _jsx(PopoverContent, { align: "start", onCloseAutoFocus: onCloseAutoFocus, className: cn(FILTER_FIELD_PICKER_CLASS, 
                /* See `instantExit`. Both PROPERTIES (an `exit` animation AND a
                   transition each paint over the successor) and both twins (Base UI
                   `data-ending-style`, Radix `data-[state=closed]`); only one can
                   match in a given build. The string stays identical on both sides
                   because listing only the Base UI half left the radix twin fading
                   a 224px card over its successor. */
                instantExit &&
                    cn("data-ending-style:animate-none data-ending-style:transition-none", "data-[state=closed]:animate-none data-[state=closed]:transition-none"), actions.fieldPickerClassName, className), children: _jsx(FieldStep, {}) })] }));
}
/** Exported for custom field pickers. */
export { toCascaderNodes };
