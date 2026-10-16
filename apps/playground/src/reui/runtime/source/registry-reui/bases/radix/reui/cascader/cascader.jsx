"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useCascaderLoader, useCascaderLoadState, } from "./cascader-async.jsx";
import { CascaderActionsContext, CascaderHighlightContext, CascaderRenderContext, CascaderStateContext, createCascaderHighlightStore, useCascaderActions, useCascaderHighlight, useCascaderRender, useCascaderState, } from "./cascader-context.jsx";
import { resolveCascaderLabels } from "./cascader-i18n.jsx";
import { applyCascadeSelection, buildCascaderIndex, CASCADER_LIST_HEIGHT_CLASS, CASCADER_LIST_PAD_CLASS, CASCADER_ROOT_KEY, CASCADER_ROWS_CLASS, CASCADER_SCROLL_CLASS, collapseCascaderPath, createCascaderMoreNode, filterCascaderLevel, findAmbiguousCascaderLabels, findCascaderDataIssues, flattenCascaderTree, getCascaderCheckedValues, getCascaderChildren, getCascaderCount, getCascaderIndeterminateFrom, getCascaderPath, getCascaderSelectedDescendants, getCascaderTabTarget, isCascaderBranch, isCascaderDisabled, isCascaderMoreNode, isCascaderSelectable, matchesCascaderQuery, mergeCascaderIndex, normalizeCascaderQuery, searchCascaderDeep, warnCascaderOnce, } from "./cascader-lib.jsx";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Slot } from "radix-ui";
import { cn } from "cn";
import { ScrollArea } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/** Stable `filteredItems` for a level swap; a fixed identity cannot loop. */
const EMPTY = [];
/** Stable empty array for the `actions` prop, so a cascader with no footer
 * does not republish the actions context on every render. */
const EMPTY_ACTIONS = [];
/** The `onSearch` scope of a global search: no path, so the whole tree. */
const GLOBAL_SEARCH_PATH = [];
// Word joiner. A polite region reads only MUTATIONS, so alternate it.
const ANNOUNCE_MARKER = "\u2060";
// Delay before a query result-count reaches the live region: polite
// announcements queue, and re-announcing per keystroke plays back stale
// counts. Only the count defers; every event-shaped one stays immediate.
const ANNOUNCE_DEBOUNCE = 150;
/* -------------------------------------------------------------------------- */
/*                                   State                                    */
/* -------------------------------------------------------------------------- */
// Minimal controlled/uncontrolled resolver, hand-rolled because the repo has
// no shared `useControllableState`; the root needs it five times.
function useControllable(controlled, defaultValue, onChange, 
/** Prop name, used only by the development-time switching warning. */
devName) {
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const isControlled = controlled !== undefined;
    const value = isControlled ? controlled : uncontrolled;
    // Switching controlled/uncontrolled mid-life strands half the state.
    const wasControlled = React.useRef(isControlled);
    React.useEffect(() => {
        if (process.env.NODE_ENV === "production")
            return;
        if (wasControlled.current === isControlled || !devName)
            return;
        const from = wasControlled.current ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        wasControlled.current = isControlled;
        warnCascaderOnce(`controlled-switch:${devName}`, `\`${devName}\` switched from ${from} to ${to}. Decide once: pass \`${devName}\` for the whole life of the component, or pass only the default and let the cascader own it.`);
    }, [isControlled, devName]);
    // Written in an EFFECT: a discarded render would still have mutated a ref.
    const latest = React.useRef({ value, isControlled, onChange });
    React.useEffect(() => {
        latest.current = { value, isControlled, onChange };
    });
    // The last PROP seen: it differs from the optimistic advance exactly when a
    // controlled parent declines a change and re-renders nothing.
    const lastProp = React.useRef(controlled);
    React.useEffect(() => {
        lastProp.current = controlled;
    });
    const set = React.useCallback((next) => {
        const current = latest.current.value;
        const resolved = typeof next === "function" ? next(current) : next;
        if (Object.is(resolved, current)) {
            // Dedup against the last PROP, not the optimistic advance: a parent that
            // declines re-renders nothing, so deduping on the advance left the popup
            // un-dismissable from the second Escape on.
            if (!latest.current.isControlled ||
                Object.is(resolved, lastProp.current)) {
                return;
            }
        }
        // Advance now so two updates in ONE batch compose, rather than the second
        // reading a stale value and its `Object.is` dedup dropping it.
        latest.current = { ...latest.current, value: resolved };
        if (!latest.current.isControlled)
            setUncontrolled(resolved);
        latest.current.onChange?.(resolved);
    }, []);
    return [value, set];
}
/* -------------------------------------------------------------------------- */
/*                              Shallow stability                             */
/* -------------------------------------------------------------------------- */
function shallowEqualRecords(a, b) {
    const left = a;
    const right = b;
    const keys = Object.keys(left);
    if (keys.length !== Object.keys(right).length)
        return false;
    for (const key of keys) {
        if (!Object.is(left[key], right[key]))
            return false;
    }
    return true;
}
function shallowEqualItemLists(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i] && !shallowEqualRecords(a[i], b[i]))
            return false;
    }
    return true;
}
// Reuses the previous value while the next merely says the same thing: an
// inline `labels`/`actions` otherwise republishes the actions context, and
// with it every row. Adjust-state-during-render, not a ref.
function useShallowStable(value, equal) {
    const [stable, setStable] = React.useState(value);
    if (Object.is(value, stable))
        return stable;
    const comparable = typeof value === "object" &&
        value !== null &&
        typeof stable === "object" &&
        stable !== null;
    if (comparable && equal(value, stable)) {
        return stable;
    }
    setStable(value);
    return value;
}
/**
 * The cascader's internals, typed for the caller's own item payload.
 * @deprecated Reads BOTH halves, so a caller re-renders on every keystroke.
 * Prefer `useCascaderActions()` or `useCascaderState()`. Kept for compat.
 */
export function useCascader() {
    const actions = useCascaderActions();
    const state = useCascaderState();
    return React.useMemo(() => ({ ...actions, ...state }), [actions, state]);
}
/** Headless access to the selection, for a trigger that is not
 * `CascaderValue`. Pass the payload explicitly to get `node.data` typed. */
export function useCascaderSelection() {
    const { multiple, setSelection } = useCascaderActions();
    const { index, selectedValues } = useCascaderState();
    return React.useMemo(() => {
        const selected = selectedValues
            .map((value) => index.byValue.get(value))
            .filter(Boolean);
        const paths = selectedValues.map((value) => getCascaderPath(index, value));
        return {
            selected,
            paths,
            first: selected[0] ?? null,
            firstPath: paths[0] ?? [],
            count: selectedValues.length,
            isEmpty: selectedValues.length === 0,
            multiple,
            remove: (value) => setSelection(selectedValues.filter((entry) => entry !== value)),
            // Explicit reason: emptying on purpose is not "deselect the last node".
            clear: () => setSelection([], "clear"),
        };
    }, [index, selectedValues, multiple, setSelection]);
}
/** Normalizes to an array. `""` is "no selection", not a node: it is the
 * uncontrolled default, and resolving it would render a blank chip. */
function toArray(value) {
    if (value == null)
        return [];
    if (Array.isArray(value))
        return value.filter((entry) => entry !== "");
    return value === "" ? [] : [value];
}
/** Misconfigurations that are SILENT by design. Once each, never in prod. */
function useCascaderDevWarnings(options) {
    const { items, getParent, mode, multiple, cascade, indicator, selectable, searchScope, max, value, defaultValue, hasExpanded, hasPath, hasOnSearch, } = options;
    // O(n) over the raw input, so the memo is skipped outright in production.
    const issues = React.useMemo(() => process.env.NODE_ENV === "production"
        ? null
        : findCascaderDataIssues(items, getParent), [items, getParent]);
    React.useEffect(() => {
        if (process.env.NODE_ENV === "production")
            return;
        for (const duplicate of issues?.duplicates ?? []) {
            warnCascaderOnce(`duplicate-value:${duplicate}`, `Duplicate node value ${JSON.stringify(duplicate)}. \`value\` is the selection key, so only the first occurrence is indexed and the rest never render.`);
        }
        for (const cycle of issues?.cycles ?? []) {
            warnCascaderOnce(`cycle:${cycle}`, `\`getParent\` puts ${JSON.stringify(cycle)} on a cycle. The depth walk is cycle-guarded so nothing hangs, but every depth on that chain is clamped rather than derived.`);
        }
    }, [issues]);
    React.useEffect(() => {
        if (process.env.NODE_ENV === "production")
            return;
        for (const [prop, current] of [
            ["value", value],
            ["defaultValue", defaultValue],
        ]) {
            if (current == null)
                continue;
            if (multiple && !Array.isArray(current)) {
                warnCascaderOnce(`value-shape:multiple:${prop}`, `\`multiple\` is set but \`${prop}\` is a string. Multi-select reads and writes a \`string[]\`; a string is treated as no selection at all.`);
            }
            else if (!multiple && Array.isArray(current)) {
                warnCascaderOnce(`value-shape:single:${prop}`, `\`${prop}\` is an array but \`multiple\` is not set. Single-select reads and writes a \`string\`; only the first entry would survive a commit.`);
            }
        }
        if (cascade && !multiple) {
            warnCascaderOnce("cascade-without-multiple", "`cascade` does nothing without `multiple`: a single selection has no subtree to propagate over.");
        }
        if (cascade && selectable === "leaf") {
            warnCascaderOnce("cascade-with-leaf-selectable", '`cascade` does nothing while `selectable="leaf"`: no branch can be committed, so no commit ever has a subtree under it. Pass `selectable="any"` or a predicate that accepts branches.');
        }
        if (!indicator && multiple) {
            warnCascaderOnce("indicator-false-with-multiple", "`indicator={false}` does nothing with `multiple`: the checkbox is the selection control rather than a decoration, so it and its gutter stay. Mark selection your own way from `data-selected` on the row, and drop the prop.");
        }
        if (max != null && !multiple) {
            warnCascaderOnce("max-without-multiple", "`max` does nothing without `multiple`: there is only ever one selection to cap.");
        }
        if (hasExpanded && mode !== "tree") {
            warnCascaderOnce(`expanded-outside-tree:${mode}`, `\`expanded\` only does something in \`mode="tree"\`, and this cascader is in \`mode="${mode}"\`. Drill and columns navigate with \`path\`.`);
        }
        if (hasPath && mode === "tree") {
            warnCascaderOnce("path-in-tree", '`path` does nothing in `mode="tree"`: branches expand in place rather than replacing the level. Use `expanded`.');
        }
        if (searchScope === "deep" && mode === "tree") {
            warnCascaderOnce("deep-search-in-tree", '`searchScope="deep"` does nothing in `mode="tree"`: a tree query already matches at any depth and auto-expands the ancestors of every hit.');
        }
        if (searchScope === "global" && mode === "tree") {
            warnCascaderOnce("global-search-in-tree", '`searchScope="global"` does nothing in `mode="tree"`: a tree query already searches the whole tree and auto-expands the ancestors of every hit.');
        }
        if (hasOnSearch && mode === "tree") {
            warnCascaderOnce("onsearch-in-tree", '`onSearch` does nothing in `mode="tree"`: a tree query filters the loaded tree in place, and a server hit belongs to no visible branch, so its results would never render. The request is not fired. Filter the tree locally, or use drill or columns for server search.');
        }
    }, [
        mode,
        multiple,
        cascade,
        indicator,
        selectable,
        searchScope,
        max,
        value,
        defaultValue,
        hasExpanded,
        hasPath,
        hasOnSearch,
    ]);
}
/** No default on `T`: inferred from `items`, so `node.data` arrives typed. */
function Cascader({ items, getParent, getChildren, onSearch, searchDebounce, resolveValue, loadKey, prefetch, onLoadError, value: valueProp, defaultValue, onValueChange: onValueChangeProp, multiple = false, selectable = "leaf", indicator = true, actions, cascade = false, max, mode = "drill", expandTrigger, path: pathProp, defaultPath, onPathChange, expanded: expandedProp, defaultExpanded, onExpandedChange, open: openProp, defaultOpen = false, onOpenChange, closeOnSelect = true, inputValue: inputValueProp, defaultInputValue = "", onInputValueChange, searchScope = "level", filter, revealSelected = true, maxHeight, virtualize, virtualizeThreshold = 100, estimateRowSize = 32, overscan = 8, labels: labelsProp, renderItem, renderLabel, disabled, name, form, id, required, readOnly, invalid, inputRef, inline, children, }) {
    const baseIndex = React.useMemo(() => buildCascaderIndex(items, getParent), 
    // `getParent` is stable by design: an inline accessor must not rebuild a
    // 50k-node index.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]);
    const baseId = React.useId();
    // Shallow-stabilized first: an inline `labels` would republish the context.
    const stableLabelsProp = useShallowStable(labelsProp, shallowEqualRecords);
    const labels = React.useMemo(() => resolveCascaderLabels(stableLabelsProp), [stableLabelsProp]);
    useCascaderDevWarnings({
        items,
        getParent,
        mode,
        multiple,
        cascade,
        indicator,
        selectable,
        searchScope,
        max,
        value: valueProp,
        defaultValue,
        hasExpanded: expandedProp !== undefined ||
            defaultExpanded !== undefined ||
            onExpandedChange !== undefined,
        hasPath: pathProp !== undefined ||
            defaultPath !== undefined ||
            onPathChange !== undefined,
        hasOnSearch: onSearch !== undefined,
    });
    // Public props are discriminated, internals are not: one assertion.
    const onValueChange = onValueChangeProp;
    // No `onChange`: `onValueChange` takes a second argument, so `emitSelection`
    // invokes it rather than the state hook, which only knows the value.
    const [value, setValue] = useControllable(valueProp, defaultValue ?? (multiple ? [] : ""), undefined, "value");
    // Why the current path (or open) change is happening. Refs, not arguments:
    // `useControllable` only passes a value, and its onChange runs synchronously
    // inside the setter, so a ref written just before is exact. The path ref
    // resets to `"external"`, which is what the consumer's `setPath` reports.
    const pathReasonRef = React.useRef("external");
    const openReasonRef = React.useRef("none");
    const [path, setPath] = useControllable(pathProp, defaultPath ?? [], (next) => onPathChange?.(next, { reason: pathReasonRef.current }), "path");
    const [expandedList, setExpandedList] = useControllable(expandedProp, defaultExpanded ?? [], onExpandedChange, "expanded");
    const [open, setOpen] = useControllable(openProp, defaultOpen, (next) => onOpenChange?.(next, { reason: openReasonRef.current }), "open");
    /** The internal `setPath`: names its reason, then hands back to "external". */
    const setPathWithReason = React.useCallback((next, reason) => {
        pathReasonRef.current = reason;
        try {
            setPath(next);
        }
        finally {
            pathReasonRef.current = "external";
        }
    }, [setPath]);
    const [query, setQuery] = useControllable(inputValueProp, defaultInputValue, onInputValueChange, "inputValue");
    const expanded = React.useMemo(() => new Set(expandedList), [expandedList]);
    const selectedValues = React.useMemo(() => toArray(value), [value]);
    /* --------------------------------- async -------------------------------- */
    // On-screen levels, so the ones worth fetching. Columns shows the whole
    // trail at once, which is why the loader is per-level, not one flag.
    const levels = React.useMemo(() => {
        if (mode === "tree")
            return [CASCADER_ROOT_KEY, ...expandedList];
        if (mode === "columns")
            return [CASCADER_ROOT_KEY, ...path];
        return [path.length ? path[path.length - 1] : CASCADER_ROOT_KEY];
    }, [mode, path, expandedList]);
    // A SIBLING of the index build, never a step inside it: the build stays pure
    // in `items`, the loader owns the pages, the merge is pure in both, and that
    // is what makes loaded data survive an `items` change.
    const loader = useCascaderLoader({
        base: baseIndex,
        getChildren,
        // Gated, not merely unrendered: a tree hit belongs to no visible branch.
        onSearch: mode === "tree" ? undefined : onSearch,
        resolveValue,
        searchDebounce,
        loadKey,
        prefetch,
        onLoadError,
        // An inline cascader is never "open", but its panel is live.
        enabled: open || !!inline,
        query,
        levels,
        path: searchScope === "global" ? GLOBAL_SEARCH_PATH : path,
        values: selectedValues,
    });
    const loadStates = loader.states;
    // Destructured here, not at the actions memo, because `navigate` sits above
    // it. All three are `[]`-dep inside the loader, so identity is stable.
    const { ensureLevel, retryLevel: retryLoaderLevel, invalidateLevel } = loader;
    /**
     * Whether pressing this branch has to FETCH first: in flight, failed, or
     * never asked. `baseIndex`, NOT the merged `index`: `resolveValue` writes an
     * ancestor chain into `pages` without touching `states`, so the merged index
     * shows children for levels never requested. Must agree with `ensureLevel`'s
     * own guards or a press parks a navigation nothing will ever settle.
     */
    const needsChildren = React.useCallback((node) => {
        if (!loader.active)
            return false;
        const state = loadStates.get(node.value);
        if (state)
            return state.loading || state.error;
        return !baseIndex.childrenOf.has(node.value);
    }, [loader.active, loadStates, baseIndex]);
    // Keyed on the two maps the merge reads, NOT the store: `withLoadState`
    // returns a fresh store over the SAME maps, so keying on it rebuilt the
    // whole index on every loading flip that changed no data.
    const index = React.useMemo(() => mergeCascaderIndex(baseIndex, loader.store.pages, loader.store.detached), [baseIndex, loader.store.pages, loader.store.detached]);
    /** Whether a level needs the paging pseudo-row. A never-fetched level gets
     * nothing; that is the empty state's job. Tree has no per-level empty state,
     * so there the row is also the branch's loading and error surface. */
    const needsMoreRow = React.useCallback((key, childCount) => {
        const state = loadStates.get(key);
        if (!state)
            return false;
        if (childCount > 0)
            return state.hasMore || state.loading || state.error;
        return mode === "tree" && (state.loading || state.error);
    }, [loadStates, mode]);
    // Remembers every selected node, so the trigger keeps a label after it
    // leaves the loaded set (or was never in it).
    const labelCacheRef = React.useRef(new Map());
    // Populated during render, since the trigger reads it while rendering.
    // Idempotent and prop-derived, so a discarded render is harmless.
    for (const selected of selectedValues) {
        const node = index.byValue.get(selected);
        if (node)
            labelCacheRef.current.set(selected, node);
    }
    const resolveNode = React.useCallback((nodeValue) => index.byValue.get(nodeValue) ??
        labelCacheRef.current.get(nodeValue) ?? {
        value: nodeValue,
        label: nodeValue,
    }, [index]);
    /* ------------------------------ derived view ----------------------------- */
    const currentParentValue = path.length ? path[path.length - 1] : null;
    const currentParent = currentParentValue
        ? (index.byValue.get(currentParentValue) ?? null)
        : null;
    const currentLevelKey = currentParentValue ?? CASCADER_ROOT_KEY;
    const isDeepSearching = (searchScope === "deep" || searchScope === "global") &&
        query.trim().length > 0 &&
        mode !== "tree";
    // Global is the same scan from the root, whatever level is on screen.
    const deepSearchWithin = searchScope === "global" ? null : currentParentValue;
    const localDeepResults = React.useMemo(() => {
        if (!isDeepSearching)
            return null;
        return searchCascaderDeep(index, query, {
            within: deepSearchWithin,
            matches: filter,
        });
    }, [isDeepSearching, index, query, deepSearchWithin, filter]);
    // Server search wins over the local scan, or each hit shows up twice.
    const deepResults = loader.searchResults ?? localDeepResults;
    const levelItems = React.useMemo(() => {
        const level = getCascaderChildren(index, currentParentValue);
        return filterCascaderLevel(level, query, filter);
    }, [index, currentParentValue, query, filter]);
    /** The active level's rows plus the paging pseudo-row, appended HERE because
     * every index Base UI hands out indexes this array: a DOM row missing from
     * it shifts the highlight and every windowed row by one. */
    const levelRendered = React.useMemo(() => {
        if (deepResults)
            return deepResults;
        if (!needsMoreRow(currentLevelKey, levelItems.length))
            return levelItems;
        return [
            ...levelItems,
            createCascaderMoreNode(currentLevelKey, levelItems.length),
        ];
    }, [deepResults, levelItems, currentLevelKey, needsMoreRow]);
    // Columns renders the whole trail, but only the deepest column is
    // interactive through Base UI, so `renderedItems` stays what drill uses.
    const columns = React.useMemo(() => {
        if (mode !== "columns")
            return [];
        const trail = [];
        for (let depth = 0; depth <= path.length; depth += 1) {
            const parentValue = depth === 0 ? null : path[depth - 1];
            const parent = parentValue
                ? (index.byValue.get(parentValue) ?? null)
                : null;
            const isActive = depth === path.length;
            let columnItems;
            if (isActive) {
                columnItems = levelRendered;
            }
            else {
                // A trail column pages on its own, without losing the columns right of it.
                const key = parentValue ?? CASCADER_ROOT_KEY;
                const children = getCascaderChildren(index, parentValue);
                columnItems = needsMoreRow(key, children.length)
                    ? [...children, createCascaderMoreNode(key, children.length)]
                    : children;
            }
            trail.push({
                parent,
                depth,
                activeValue: path[depth] ?? null,
                active: isActive,
                // Only the active column is filtered: a query narrows what you type
                // into, never the trail behind it.
                items: columnItems,
            });
        }
        return trail;
    }, [mode, path, index, levelRendered, needsMoreRow]);
    // Tree level keys needing a paging pseudo-row. With no per-level empty
    // state, this is also where a still-loading branch says so.
    const treeSentinels = React.useMemo(() => {
        if (mode !== "tree")
            return undefined;
        const keys = new Set();
        const consider = (key) => {
            if (needsMoreRow(key, index.childrenOf.get(key)?.length ?? 0)) {
                keys.add(key);
            }
        };
        consider(CASCADER_ROOT_KEY);
        for (const value of expanded)
            consider(value);
        return keys.size ? keys : undefined;
    }, [mode, index, expanded, needsMoreRow]);
    const treeRows = React.useMemo(() => {
        if (mode !== "tree")
            return [];
        const rows = flattenCascaderTree(index, expanded, treeSentinels);
        // Same normalizer as the level filter, so the two cannot disagree.
        const normalized = normalizeCascaderQuery(query);
        if (!normalized)
            return rows;
        // Matches every node, not just visible rows, and keeps the ancestors, or a
        // hit inside a collapsed branch disappears. Same matcher as every other
        // path, so keyword-only hits do not vanish in tree mode alone.
        const keep = new Set();
        for (const node of index.all) {
            if (!(filter
                ? filter(node, normalized)
                : matchesCascaderQuery(node, normalized))) {
                continue;
            }
            for (const ancestor of getCascaderPath(index, node.value)) {
                keep.add(ancestor.value);
            }
        }
        // No sentinels while filtering: that page would not have the query applied.
        return flattenCascaderTree(index, new Set([...expanded, ...keep])).filter((row) => keep.has(row.node.value));
    }, [mode, index, expanded, treeSentinels, query, filter]);
    // What `Combobox.Root` receives. Tree flattens to the same linear list, so
    // selection and highlighting need no per-mode case.
    const renderedItems = React.useMemo(() => (mode === "tree" ? treeRows.map((row) => row.node) : levelRendered), [mode, treeRows, levelRendered]);
    /* ---------------------------- level swap reset --------------------------- */
    /** Base UI never resets the highlighted index on an `items` change and has
     * no imperative setter; its one automatic reset is an out-of-range clamp, so
     * a single empty frame trips it. The frame rides `filteredItems`, so the
     * `items` identity stays put. */
    const levelKey = currentParentValue ?? "";
    // STATE, not a ref: a replayed render would see a ref advanced and skip it.
    const [swap, setSwap] = React.useState({ key: levelKey, active: false });
    if (swap.key !== levelKey) {
        setSwap({ key: levelKey, active: true });
    }
    const swapping = swap.active && swap.key === levelKey;
    React.useLayoutEffect(() => {
        if (swap.active)
            setSwap((prev) => ({ ...prev, active: false }));
    }, [swap.active]);
    // The same frame on demand, for a navigation that lands on the level already
    // on screen: the key never moves, so the check above never fires.
    const resetHighlight = React.useCallback(() => {
        setSwap((prev) => (prev.active ? prev : { ...prev, active: true }));
    }, []);
    /* ----------------------------- virtualization ---------------------------- */
    // A COUNT: columns mounts one per column, and StrictMode remounts effects.
    const [virtualRenderers, setVirtualRenderers] = React.useState(0);
    const registerVirtualRenderer = React.useCallback(() => {
        setVirtualRenderers((count) => count + 1);
        return () => setVirtualRenderers((count) => Math.max(0, count - 1));
    }, []);
    const hasVirtualRenderer = virtualRenderers > 0;
    const wantsVirtual = virtualize ?? renderedItems.length >= virtualizeThreshold;
    // LATCHED per level: otherwise a query narrowing a 5,000 row level past the
    // threshold tears the virtualizer down and rebuilds it on backspace, losing
    // every measurement. State, not a ref, like `swap`.
    const [virtualLatch, setVirtualLatch] = React.useState({
        key: levelKey,
        on: false,
    });
    const virtualized = hasVirtualRenderer &&
        (virtualLatch.key === levelKey
            ? virtualLatch.on || wantsVirtual
            : wantsVirtual);
    if (!hasVirtualRenderer) {
        // Nothing is windowing, so nothing may stay latched.
        if (virtualLatch.on || virtualLatch.key !== levelKey) {
            setVirtualLatch({ key: levelKey, on: false });
        }
    }
    else if (virtualLatch.key !== levelKey) {
        setVirtualLatch({ key: levelKey, on: virtualized });
    }
    else if (virtualized && !virtualLatch.on) {
        setVirtualLatch({ key: levelKey, on: true });
    }
    /**
     * One forced re-render, one commit AFTER windowing turns on. Base UI sizes
     * `listRef` from `filteredItems` in a layout effect keyed on that array's
     * identity, but `virtualized` reaches the list a commit later and the
     * `CompositeList` teardown REPLACES `listRef` with an empty array nothing
     * re-sizes, so ArrowDown stops at the last WINDOWED row. A passive effect is
     * late enough: the teardown is scheduled from a layout effect.
     */
    const [virtualSyncs, setVirtualSyncs] = React.useState(0);
    React.useEffect(() => {
        if (!virtualized)
            return;
        setVirtualSyncs((count) => count + 1);
    }, [virtualized]);
    React.useEffect(() => {
        if (process.env.NODE_ENV === "production")
            return undefined;
        if (virtualize !== true || hasVirtualRenderer)
            return undefined;
        // Deferred a tick: the renderer registers from a layout effect, so a
        // synchronous check would report every correctly wired cascader.
        const timeout = setTimeout(() => {
            console.error("[Cascader] `virtualize` is true but no windowing renderer is mounted. " +
                "Render <CascaderVirtualItems /> inside <CascaderList>, or " +
                "<CascaderVirtualColumn /> through the <CascaderColumns> slot.");
        }, 0);
        return () => clearTimeout(timeout);
    }, [virtualize, hasVirtualRenderer]);
    /* ------------------------------ navigation ------------------------------ */
    /** One signal per navigation, feeding the live region, bumped EXACTLY once
     * per action. `seq` alternates the invisible marker so two identical
     * announcements are still two mutations; `toggled` names the tree branch. */
    const [announceSignal, setAnnounceSignal] = React.useState({ seq: 0, toggled: null, notice: null });
    const bumpAnnouncement = React.useCallback((toggled) => {
        setAnnounceSignal((prev) => ({ seq: prev.seq + 1, toggled, notice: null }));
    }, []);
    /** Speaks for interactions that change nothing on screen: a refusal returns
     * before any state moves, a cascade sweep is invisible from the row pressed.
     * The seq bump keeps two identical refusals two mutations. */
    const announceNotice = React.useCallback((notice) => {
        setAnnounceSignal((prev) => ({ seq: prev.seq + 1, toggled: null, notice }));
    }, []);
    /**
     * The navigation a press asked for and a fetch has not answered yet. Load
     * BEFORE you move: drilling in first threw away the list the user was
     * reading and, on failure, stranded them on an error screen for a level they
     * had never seen. Holding here keeps the old rows and puts the progress on
     * the pressed row, whose chevron `CascaderItem` swaps for a spinner.
     */
    const [pendingNavigation, setPendingNavigation] = React.useState(null);
    /** Asks for a branch's children and parks the navigation until they land.
     * BOTH entry points are called unconditionally: `retryLevel` no-ops unless
     * the level errored, `ensureLevel` no-ops if it has state, so a repeat press
     * is free and the readiness decision stays inside the loader. */
    const requestChildren = React.useCallback((node, pending) => {
        setPendingNavigation(pending);
        retryLoaderLevel(node.value);
        ensureLevel(node.value, "level");
        // Otherwise the panel is silent from the press until the level swaps.
        bumpAnnouncement(null);
    }, [retryLoaderLevel, ensureLevel, bumpAnnouncement]);
    const pushLevel = React.useCallback((nodeValue) => {
        setPathWithReason((prev) => [...prev, nodeValue], "drill");
        setQuery("");
        bumpAnnouncement(null);
    }, [setPathWithReason, setQuery, bumpAnnouncement]);
    const popLevel = React.useCallback(() => {
        setPathWithReason((prev) => (prev.length ? prev.slice(0, -1) : prev), "back");
        setQuery("");
        // Going BACK abandons a held navigation, or an in-flight branch drills in
        // the moment it lands, long after the user moved on.
        setPendingNavigation(null);
        bumpAnnouncement(null);
    }, [setPathWithReason, setQuery, bumpAnnouncement]);
    const goToDepth = React.useCallback((depth) => {
        setPathWithReason((prev) => prev.slice(0, Math.max(0, depth)), "breadcrumb");
        setQuery("");
        setPendingNavigation(null);
        bumpAnnouncement(null);
    }, [setPathWithReason, setQuery, bumpAnnouncement]);
    const toggleExpanded = React.useCallback((nodeValue) => {
        setExpandedList((prev) => prev.includes(nodeValue)
            ? prev.filter((v) => v !== nodeValue)
            : [...prev, nodeValue]);
        bumpAnnouncement(nodeValue);
    }, [setExpandedList, bumpAnnouncement]);
    const isBranch = React.useCallback((node) => isCascaderBranch(index, node), [index]);
    const isSelectable = React.useCallback((node) => isCascaderSelectable(index, node, selectable), [index, selectable]);
    const isDisabled = React.useCallback((node) => isCascaderDisabled(index, node), [index]);
    // Whether a branch can be committed AT ALL here. `"leaf"` is the only
    // setting that answers no in advance; a predicate is opaque, so the check
    // gutter is reserved uniformly rather than per row.
    const branchesSelectable = selectable !== "leaf";
    // Open flyouts, by key. A ref, not state: `handleOpenChange` needs the
    // answer as of the Escape being handled, and opening a footer menu must not
    // re-render the root.
    const openFlyoutsRef = React.useRef(new Set());
    const setFlyoutOpen = React.useCallback((key, open) => {
        if (open)
            openFlyoutsRef.current.add(key);
        else
            openFlyoutsRef.current.delete(key);
    }, []);
    const hasOpenFlyout = React.useCallback(() => openFlyoutsRef.current.size > 0, []);
    // Shallow-stabilized like `labels`: an inline array republished the context.
    const stableActions = useShallowStable(actions, shallowEqualItemLists);
    const resolvedActions = React.useMemo(() => stableActions ?? EMPTY_ACTIONS, [stableActions]);
    // A Set, not an `includes` scan: `isSelected` runs once per rendered row.
    const selectedSet = React.useMemo(() => new Set(selectedValues), [selectedValues]);
    const isSelected = React.useCallback((node) => selectedSet.has(node.value), [selectedSet]);
    /** Selected-descendant counts, walked ONCE per selection change and never
     * stored, so the flat value array stays the only source of truth. The walk
     * is `selections x depth`, up from each selection rather than down from each
     * row, which keeps the count and `isIndeterminate` O(1). */
    const selectedDescendants = React.useMemo(() => getCascaderSelectedDescendants(index, selectedValues), [index, selectedValues]);
    const selectedDescendantCount = React.useCallback((node) => selectedDescendants.get(node.value) ?? 0, [selectedDescendants]);
    // Partial selections read off the SAME map, so the dash and the number are
    // two readings of one traversal and cannot drift apart.
    const indeterminateSet = React.useMemo(() => {
        if (!cascade || !multiple)
            return null;
        return getCascaderIndeterminateFrom(selectedDescendants, selectedValues);
    }, [cascade, multiple, selectedDescendants, selectedValues]);
    const isIndeterminate = React.useCallback((node) => indeterminateSet?.has(node.value) ?? false, [indeterminateSet]);
    // Base UI owns the highlight; mirrored so handlers can read it unsubscribed.
    const highlightedRef = React.useRef(null);
    const getHighlighted = React.useCallback(() => highlightedRef.current, []);
    // The same highlight as an external store, for the consumer that must
    // RE-RENDER on it. `useState`, not `useMemo`: React may drop a memo, and a
    // second store would silently orphan every subscriber.
    const [highlightStore] = React.useState(createCascaderHighlightStore);
    /* ------------------------------ announcement ---------------------------- */
    const currentLoadState = React.useMemo(() => loadStates.get(currentLevelKey) ?? null, [loadStates, currentLevelKey]);
    const searchLoadState = loader.searchState;
    /** What the query announcement COUNTS: matches, not rows, since the list
     * also carries a tree query's ancestor context and the Load-more row. Server
     * hits count as-is; re-judging them locally would drop what it matched on
     * data the client cannot see. */
    const announcedMatches = React.useMemo(() => {
        if (deepResults)
            return deepResults.length;
        const normalized = normalizeCascaderQuery(query);
        if (!normalized)
            return 0;
        const matches = filter ?? matchesCascaderQuery;
        return renderedItems.filter((node) => !isCascaderMoreNode(node) && matches(node, normalized)).length;
    }, [deepResults, renderedItems, query, filter]);
    // The live-region text plus whether it may be DEFERRED; see
    // `ANNOUNCE_DEBOUNCE`. The committed string is state, set below.
    const announcementTarget = React.useMemo(() => {
        // An INLINE cascader is never "open", so `open` alone silenced its tree.
        if (!open && !inline)
            return { text: "", defer: false };
        const total = renderedItems.length;
        const marker = ANNOUNCE_MARKER.repeat(announceSignal.seq % 2);
        // A notice outranks everything below: it exists because nothing else on
        // screen changed. It rides the signal, so the next navigation replaces it.
        if (announceSignal.notice) {
            return { text: `${announceSignal.notice}${marker}`, defer: false };
        }
        // A tree toggle changes neither level nor query, so it rides the signal.
        const toggled = mode === "tree" && announceSignal.toggled
            ? (index.byValue.get(announceSignal.toggled) ?? null)
            : null;
        // Async states outrank everything below, or a fetching level announces "0
        // results" and contradicts itself. A HELD navigation outranks even those:
        // nothing on screen has moved yet, so "loading" is the only truth.
        const pendingState = pendingNavigation
            ? (loadStates.get(pendingNavigation.value) ?? null)
            : null;
        const levelState = query.trim() ? searchLoadState : currentLoadState;
        let text;
        let defer = false;
        if (pendingState?.error) {
            text = labels.error;
        }
        else if (pendingNavigation) {
            // Always the FIRST-page string: the rows on screen belong to the level
            // being left behind, so their count says nothing about this request.
            text = labels.loading;
        }
        else if (levelState?.error) {
            text = labels.error;
        }
        else if (levelState?.loading) {
            // With a query set the in-flight load IS the server search, and calling
            // that "Loading more" misreads what is being waited on.
            text = query.trim()
                ? labels.searchingAnnouncement
                : total > 0
                    ? labels.loadingMore
                    : labels.loading;
        }
        else if (query.trim()) {
            // An empty result set is the more useful thing to say than "0 results".
            text =
                announcedMatches === 0
                    ? labels.empty
                    : labels.resultsAnnouncement(announcedMatches);
            // The ONE deferred branch: only a stream of keystrokes needs coalescing.
            defer = true;
        }
        else if (toggled) {
            text = expanded.has(toggled.value)
                ? labels.expandedAnnouncement(toggled.label, getCascaderCount(index, toggled))
                : labels.collapsedAnnouncement(toggled.label);
        }
        else if (currentParent) {
            // `path.length + 1` matches tree mode's `aria-level`: the rows are
            // `currentParent`'s CHILDREN, one level below it.
            text = labels.levelAnnouncement(currentParent.label, path.length + 1, total);
        }
        else {
            // Returning to the root would otherwise announce nothing at all.
            text = labels.rootAnnouncement(total);
        }
        return { text: `${text}${marker}`, defer };
    }, [
        open,
        inline,
        mode,
        index,
        expanded,
        announceSignal,
        query,
        labels,
        renderedItems.length,
        announcedMatches,
        currentParent,
        path.length,
        currentLoadState,
        searchLoadState,
        pendingNavigation,
        loadStates,
    ]);
    /** The COMMITTED announcement. Immediate texts commit during render (the
     * pattern `swap` uses), so an async settle announces in the very commit that
     * shows the rows. Only the deferred query count uses the timer below. */
    const [announced, setAnnounced] = React.useState(announcementTarget);
    if (!announcementTarget.defer && announced.text !== announcementTarget.text) {
        // Terminates: after the set the condition is false on the re-render.
        setAnnounced(announcementTarget);
    }
    React.useEffect(() => {
        if (!announcementTarget.defer)
            return undefined;
        const timer = setTimeout(() => setAnnounced(announcementTarget), ANNOUNCE_DEBOUNCE);
        return () => clearTimeout(timer);
    }, [announcementTarget]);
    const announcement = announced.text;
    /* --------------------------------- state -------------------------------- */
    // The volatile half: rebuilt by a keystroke, hence split from the actions.
    const stateValue = React.useMemo(() => ({
        index,
        path,
        expanded,
        query,
        currentParent,
        levelItems,
        deepResults,
        renderedItems,
        columns,
        treeRows,
        selectedValues,
        selectedDescendants,
        loadStates,
        searchState: searchLoadState,
        announcement,
    }), [
        index,
        path,
        expanded,
        query,
        currentParent,
        levelItems,
        deepResults,
        renderedItems,
        columns,
        treeRows,
        selectedValues,
        selectedDescendants,
        loadStates,
        searchLoadState,
        announcement,
    ]);
    /* ------------------------------ latest props ---------------------------- */
    /**
     * Latest committed props and derived state, WRITTEN IN AN EFFECT. That is
     * what keeps the callbacks below `[]`-dep and stable for the life of the
     * cascader; writing during render is unsafe under concurrent rendering. The
     * cost: a read sees the PREVIOUS commit until the effect runs, so ONLY event
     * handlers may read it. Anything used during render is memoised instead.
     */
    const latest = React.useRef({
        index,
        state: stateValue,
        mode,
        multiple,
        cascade,
        max,
        labels,
        closeOnSelect,
        selectedValues,
        deepResults,
        onValueChange,
        resolveNode,
        isSelectable,
        needsChildren,
        expanded,
    });
    React.useEffect(() => {
        latest.current = {
            index,
            state: stateValue,
            mode,
            multiple,
            cascade,
            max,
            labels,
            closeOnSelect,
            selectedValues,
            deepResults,
            onValueChange,
            resolveNode,
            isSelectable,
            needsChildren,
            expanded,
        };
    });
    const getIndex = React.useCallback(() => latest.current.index, []);
    const getState = React.useCallback(() => latest.current.state, []);
    const goToLevelAt = React.useCallback((nodeValue, depth) => {
        setPathWithReason((prev) => [...prev.slice(0, Math.max(0, depth)), nodeValue], "drill");
        setQuery("");
        bumpAnnouncement(null);
    }, [setPathWithReason, setQuery, bumpAnnouncement]);
    const goToTrail = React.useCallback((trail) => {
        // A global hit can BE the level on screen. Then nothing moved, so no path
        // change is reported, and no level swap clears the highlight the hit
        // list left at its index, where Enter would commit some other row.
        const { path: current } = latest.current.state;
        const stays = trail.length === current.length &&
            trail.every((entry, i) => entry === current[i]);
        if (stays)
            resetHighlight();
        else
            setPathWithReason(trail, "drill");
        setQuery("");
        bumpAnnouncement(null);
    }, [setPathWithReason, resetHighlight, setQuery, bumpAnnouncement]);
    const navigateAt = React.useCallback((node, depth) => {
        if (isCascaderDisabled(latest.current.index, node))
            return;
        if (latest.current.mode === "tree") {
            toggleExpanded(node.value);
            return;
        }
        if (latest.current.needsChildren(node)) {
            requestChildren(node, { value: node.value, kind: "at", depth });
            return;
        }
        goToLevelAt(node.value, depth);
    }, [toggleExpanded, goToLevelAt, requestChildren]);
    const navigate = React.useCallback((node) => {
        const { mode: currentMode, deepResults: currentDeepResults, index: currentIndex, expanded: currentExpanded, needsChildren: pending, } = latest.current;
        // Every drill and expand passes here, from a search hit, a key or a hover
        // timer alike, so this is where a disabled subtree stays shut.
        if (isCascaderDisabled(currentIndex, node))
            return;
        if (currentMode === "tree") {
            // Collapsing never needs data. Opening waits WITHOUT expanding, so
            // the branch stays shut with a spinner rather than opening onto no rows.
            if (!currentExpanded.has(node.value) && pending(node)) {
                requestChildren(node, {
                    value: node.value,
                    kind: "expand",
                    depth: 0,
                });
                return;
            }
            toggleExpanded(node.value);
            return;
        }
        // A search hit sits at any depth, and under a global search outside the
        // current path, so drilling in swaps in the hit's own trail. A held drill
        // carries it too: splicing the hit into the current path at its depth
        // kept the wrong ancestors for anything below a direct child.
        if (currentDeepResults) {
            const trail = getCascaderPath(currentIndex, node.value).map((entry) => entry.value);
            if (pending(node)) {
                requestChildren(node, { value: node.value, kind: "trail", trail });
                return;
            }
            goToTrail(trail);
            return;
        }
        if (pending(node)) {
            requestChildren(node, { value: node.value, kind: "push", depth: 0 });
            return;
        }
        pushLevel(node.value);
    }, [toggleExpanded, goToTrail, pushLevel, requestChildren]);
    /**
     * The other half of `requestChildren`: the fetch settled, so the held
     * navigation happens or is dropped. Reads the load STATE, not a promise:
     * only the loader knows a request was superseded, aborted or retried, and no
     * entry at all means it has not reached the store yet. On failure nothing
     * moves and the intent is KEPT, which is what makes the row's retry
     * affordance mean something; only `popLevel`, `goToDepth` and a close drop it.
     */
    React.useEffect(() => {
        if (!pendingNavigation)
            return;
        const state = loadStates.get(pendingNavigation.value);
        if (!state || state.loading || state.error)
            return;
        setPendingNavigation(null);
        // Asked again against the index as it is NOW: a new `items` or a landed
        // page can disable the target while its fetch was in flight.
        const target = index.byValue.get(pendingNavigation.value);
        if (target && isDisabled(target))
            return;
        if (pendingNavigation.kind === "expand") {
            toggleExpanded(pendingNavigation.value);
            return;
        }
        if (pendingNavigation.kind === "trail") {
            goToTrail(pendingNavigation.trail);
            return;
        }
        if (pendingNavigation.kind === "at") {
            goToLevelAt(pendingNavigation.value, pendingNavigation.depth);
            return;
        }
        pushLevel(pendingNavigation.value);
    }, [
        pendingNavigation,
        loadStates,
        index,
        isDisabled,
        toggleExpanded,
        goToTrail,
        goToLevelAt,
        pushLevel,
    ]);
    // A popup that closes mid-flight must not drill in when the answer arrives;
    // the loader aborts the request, this drops the intent.
    React.useEffect(() => {
        if (!open && !inline)
            setPendingNavigation(null);
    }, [open, inline]);
    /* ------------------------------- selection ------------------------------ */
    // The one place the selection changes, so `onValueChange` reports the same
    // shape whatever caused it: a row press, drag-select, or the headless hooks.
    const emitSelection = React.useCallback((nextValues, node, reason) => {
        const { selectedValues: current, multiple: currentMultiple, onValueChange: emit, index: currentIndex, resolveNode: resolve, } = latest.current;
        // Nothing changed. The dedup lives here now, not in `useControllable`.
        const unchanged = nextValues.length === current.length &&
            nextValues.every((entry, i) => entry === current[i]);
        if (unchanged)
            return;
        const next = currentMultiple ? nextValues : (nextValues[0] ?? "");
        setValue(next);
        if (!emit)
            return;
        const chain = node ? getCascaderPath(currentIndex, node.value) : [];
        emit(next, {
            node,
            // A node absent from `items` has no chain, so fall back to the node
            // rather than report an empty path for a change that had one.
            path: node ? (chain.length ? chain : [node]) : [],
            // `resolveNode`, not `index.byValue`: a selected value missing from
            // `items` must still come back rather than be dropped.
            nodes: nextValues.map(resolve),
            reason,
        });
    }, [setValue]);
    const setSelection = React.useCallback((values, reason) => {
        const { selectedValues: current, resolveNode: resolve } = latest.current;
        const before = new Set(current);
        const after = new Set(values);
        const added = values.find((entry) => !before.has(entry));
        const removed = current.find((entry) => !after.has(entry));
        if (reason === "clear") {
            emitSelection(values, null, "clear");
            return;
        }
        if (added) {
            emitSelection(values, resolve(added), reason ?? "select");
            return;
        }
        if (removed) {
            emitSelection(values, resolve(removed), reason ?? "deselect");
            return;
        }
        // Same set: a no-op, but routed so an explicit `reason` still applies.
        emitSelection(values, null, reason ?? "select");
    }, [emitSelection]);
    const commit = React.useCallback((node) => {
        const { multiple: currentMultiple, cascade: currentCascade, selectedValues: current, max: currentMax, index: currentIndex, isSelectable: currentIsSelectable, labels: currentLabels, closeOnSelect: currentCloseOnSelect, } = latest.current;
        // Refuses a SELECT, never a removal: a disabled value set from outside
        // must stay removable, and a cascade chip's removal arrives here.
        const selecting = !currentMultiple || !current.includes(node.value);
        if (selecting && isCascaderDisabled(currentIndex, node))
            return;
        if (!currentMultiple) {
            emitSelection([node.value], node, "select");
            if (currentCloseOnSelect) {
                openReasonRef.current = "item-press";
                setOpen(false);
            }
            else {
                // The popup stays up, so clear the query the way a multiple commit
                // does; the next pick then starts from the full level.
                setQuery("");
            }
            return;
        }
        if (currentCascade) {
            const next = applyCascadeSelection(currentIndex, current, node.value, selecting, currentIsSelectable);
            // `max` caps the whole gesture rather than truncating it: an arbitrary
            // prefix of a subtree is a selection nobody asked for. The refusal
            // changes nothing on screen, so the live region is its only witness.
            if (selecting &&
                currentMax != null &&
                next.length > currentMax &&
                next.length > current.length) {
                announceNotice(currentLabels.maxReachedAnnouncement(currentMax));
                return;
            }
            emitSelection(next, node, selecting ? "select" : "deselect");
            // How many values the closure swept along is invisible from the one
            // row pressed, so the sweep says its number out loud, itself excluded.
            const before = new Set(current);
            const after = new Set(next);
            let swept = 0;
            for (const entry of selecting ? next : current) {
                if (entry === node.value)
                    continue;
                if (selecting ? !before.has(entry) : !after.has(entry))
                    swept += 1;
            }
            if (swept > 0) {
                announceNotice(currentLabels.cascadeAnnouncement(node.label ?? node.value, swept, selecting));
            }
            setQuery("");
            return;
        }
        if (current.includes(node.value)) {
            emitSelection(current.filter((v) => v !== node.value), node, "deselect");
        }
        else if (currentMax == null || current.length < currentMax) {
            emitSelection([...current, node.value], node, "select");
        }
        else {
            // The plain-multiple twin of the cascade refusal above: just as silent.
            announceNotice(currentLabels.maxReachedAnnouncement(currentMax));
        }
        setQuery("");
    }, [emitSelection, setOpen, setQuery, announceNotice]);
    /** Safety net for paths that bypass the row-level veto (the drag-select
     * mouseup). `details.cancel()` suppresses the commit and the close together:
     * Base UI shares one event-details object between them. */
    const handleComboboxValueChange = React.useCallback((next, details) => {
        if (!multiple) {
            const node = Array.isArray(next) ? (next[0] ?? null) : next;
            // The paging row is a real option, so Base UI reports it as a
            // selection. Same safety net branches get, for paths a row cannot veto.
            if (node && isCascaderMoreNode(node)) {
                details.cancel();
                return;
            }
            // The row is Base UI `disabled` already, so only a path around it gets
            // here, a custom row re-enabling it for one: refused, never navigated.
            if (node && isDisabled(node)) {
                details.cancel();
                return;
            }
            if (node && !isSelectable(node) && isBranch(node)) {
                details.cancel();
                navigate(node);
                return;
            }
            if (node) {
                // `closeOnSelect={false}` must also stop Base UI's OWN close; one
                // shared details object, so cancelling suppresses both, and our value
                // is controlled, so Base UI's half had nothing to keep.
                if (!closeOnSelect)
                    details.cancel();
                commit(node);
            }
            return;
        }
        // Take Base UI's whole array as the answer and inspect only what was
        // ADDED. Deriving the toggle from the tail works for an add but on a
        // remove drops the wrong node, leaving the last selection unclearable.
        const nextNodes = Array.isArray(next) ? next : [];
        const before = new Set(selectedValues);
        const added = nextNodes.find((node) => !before.has(node.value));
        if (added && (isCascaderMoreNode(added) || isDisabled(added))) {
            details.cancel();
            return;
        }
        if (added && !isSelectable(added) && isBranch(added)) {
            details.cancel();
            navigate(added);
            return;
        }
        // Cascading reads Base UI's array only as the REPORT of which row was
        // pressed: it differs by exactly one value either way, and the real
        // commit covers a whole subtree.
        if (cascade) {
            const nextValues = new Set(nextNodes.map((node) => node.value));
            const removed = selectedValues.find((entry) => !nextValues.has(entry));
            const toggled = added ?? (removed != null ? resolveNode(removed) : null);
            if (toggled)
                commit(toggled);
            return;
        }
        if (max != null &&
            nextNodes.length > selectedValues.length &&
            nextNodes.length > max) {
            details.cancel();
            // The third silent refusal site: cancelling reverts the press with no
            // state change, so the live region is the only witness.
            announceNotice(labels.maxReachedAnnouncement(max));
            return;
        }
        setSelection(nextNodes.map((node) => node.value));
        setQuery("");
    }, [
        multiple,
        selectedValues,
        max,
        cascade,
        closeOnSelect,
        labels,
        announceNotice,
        isSelectable,
        isDisabled,
        isBranch,
        navigate,
        commit,
        resolveNode,
        setSelection,
        setQuery,
    ]);
    const handleOpenChange = React.useCallback((nextOpen, details) => {
        if (details.isCanceled)
            return;
        // Escape closes ONE popup at a time. `Combobox` builds no `FloatingTree`,
        // so one Escape reaches the flyout and the cascader; the flyout clears
        // its registration in an effect, so the set holds for exactly this event.
        if (!nextOpen && details.reason === "escape-key" && hasOpenFlyout()) {
            details.cancel();
            return;
        }
        // Captured for the wrapped `onOpenChange`, which runs synchronously
        // inside `setOpen`, so a ref written just before the call is exact.
        openReasonRef.current = details.reason ?? "none";
        setOpen(nextOpen);
        if (!nextOpen) {
            setQuery("");
            return;
        }
        // Opening onto the level holding the selection is the difference
        // between "edit this" and "start over".
        if (revealSelected) {
            setQuery("");
            const first = toArray(value)[0];
            setPathWithReason(first
                ? getCascaderPath(index, first)
                    .slice(0, -1)
                    .map((node) => node.value)
                : [], "reveal");
        }
    }, [
        setOpen,
        setQuery,
        revealSelected,
        value,
        index,
        setPathWithReason,
        hasOpenFlyout,
    ]);
    /* -------------------------------- context ------------------------------- */
    // NOT memoised further: render props must be the current closure, and only
    // rows consume this. See `CascaderRenderContextValue`.
    const renderContext = React.useMemo(() => ({ renderItem, renderLabel }), [renderItem, renderLabel]);
    /** The stable half: nothing in these deps moves on a keystroke, a level
     * change or a highlight, which is what makes `React.memo` on `CascaderItem`
     * hold while the user types. Destructured off `loader` so the memo depends
     * on its `[]`-dep callbacks, not the object it republishes per load. */
    const { active: hasLoader, loadMore, retryLevel, prefetchNode } = loader;
    const actionsValue = React.useMemo(() => ({
        index,
        mode,
        multiple,
        cascade,
        branchesSelectable,
        indicator,
        expandTrigger,
        actions: resolvedActions,
        searchScope,
        maxHeight,
        inline: !!inline,
        invalid: !!invalid,
        baseId,
        labels,
        virtualized,
        registerVirtualRenderer,
        virtualize,
        virtualizeThreshold,
        estimateRowSize,
        overscan,
        hasLoader,
        loadMore,
        retryLevel,
        invalidateLevel,
        getIndex,
        getState,
        getHighlighted,
        setPath,
        pushLevel,
        popLevel,
        goToDepth,
        toggleExpanded,
        setFlyoutOpen,
        hasOpenFlyout,
        setQuery,
        setSelection,
        commit,
        navigate,
        navigateAt,
        resolveNode,
        isBranch,
        isSelectable,
        isDisabled,
        isSelected,
        isIndeterminate,
        selectedDescendantCount,
    }), [
        index,
        mode,
        multiple,
        cascade,
        branchesSelectable,
        indicator,
        expandTrigger,
        resolvedActions,
        searchScope,
        maxHeight,
        inline,
        invalid,
        baseId,
        labels,
        virtualized,
        registerVirtualRenderer,
        virtualize,
        virtualizeThreshold,
        estimateRowSize,
        overscan,
        hasLoader,
        loadMore,
        retryLevel,
        invalidateLevel,
        getIndex,
        getState,
        getHighlighted,
        setPath,
        pushLevel,
        popLevel,
        goToDepth,
        toggleExpanded,
        setFlyoutOpen,
        hasOpenFlyout,
        setQuery,
        setSelection,
        commit,
        navigate,
        navigateAt,
        resolveNode,
        isBranch,
        isSelectable,
        isDisabled,
        isSelected,
        isIndeterminate,
        selectedDescendantCount,
    ]);
    // A fresh array identity each time windowing turns on, and once more after:
    // that identity is the ONLY thing that re-runs Base UI's `listRef` sizing
    // effect. See `virtualSyncs`.
    const comboboxItems = React.useMemo(() => (virtualized ? renderedItems.slice() : renderedItems), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [renderedItems, virtualized, virtualSyncs]);
    const comboboxValue = React.useMemo(() => {
        if (multiple)
            return selectedValues.map(resolveNode);
        return selectedValues.length ? resolveNode(selectedValues[0]) : null;
    }, [multiple, selectedValues, resolveNode]);
    return (
    // Providers store values with the item generic erased; the hooks re-apply
    // the caller's own `T` on the way back out.
    _jsx(CascaderActionsContext.Provider, { value: actionsValue, children: _jsx(CascaderStateContext.Provider, { value: stateValue, children: _jsx(CascaderHighlightContext.Provider, { value: highlightStore, children: _jsx(CascaderRenderContext.Provider, { value: renderContext, children: _jsx(ComboboxPrimitive.Root, { items: renderedItems, 
                        /* The empty frame that resets the highlight. See the comment above. */
                        filteredItems: swapping ? EMPTY : comboboxItems, 
                        /* Filtering is ours: the level, deep and global scopes cannot
                           be expressed through Base UI's single matcher. */
                        filter: null, value: comboboxValue, onValueChange: handleComboboxValueChange, open: open, onOpenChange: handleOpenChange, inputValue: query, onInputValueChange: (next) => setQuery(next), multiple: multiple, disabled: disabled, 
                        /* Form wiring, straight to Base UI's hidden input. Conditional
                           spreads: an explicit `undefined` on a controlled prop reads as
                           "deleted" rather than "not supplied". */
                        name: name, ...(form != null ? { form } : null), ...(id != null ? { id } : null), ...(required != null ? { required } : null), ...(readOnly != null ? { readOnly } : null), ...(inputRef ? { inputRef } : null), inline: inline, 
                        /* Stops Base UI rendering its composite list, which is what makes
                           an explicit row `index` legal. `items`/`filteredItems` stay full:
                           they size `listRef`, or ArrowDown stops at the last RENDERED row. */
                        virtualized: virtualized, itemToStringValue: (item) => item?.value ?? "", itemToStringLabel: (item) => item?.label ?? "", isItemEqualToValue: (a, b) => a?.value === b?.value, 
                        // Fires on every arrow key AND every pointer move, so it must
                        // never call setState. The ref serves keyboard handlers, the
                        // de-duping store anything that has to re-render.
                        onItemHighlighted: (item, details) => {
                            highlightedRef.current = item ?? null;
                            highlightStore.set({
                                index: details.index,
                                value: item?.value ?? null,
                            });
                            // Schedules a TIMEOUT and returns: inside a layout effect, a
                            // synchronous setState would cascade before paint.
                            prefetchNode(item);
                        }, children: children }) }) }) }) }));
}
function CascaderTrigger({ className, children, showIcon = true, ref, ...props }) {
    const { invalid } = useCascaderActions();
    // `ref` is the one prop `mergeProps` does not merge, so chain it by hand.
    const triggerRef = React.useRef(null);
    const setTrigger = React.useCallback((node) => {
        triggerRef.current = node;
        if (typeof ref === "function")
            ref(node);
        else if (ref)
            ref.current = node;
    }, [ref]);
    /** 18 of 19 audited examples shipped an unnamed combobox: the trigger's
     * contents are the field's VALUE, so a screen reader never hears its NAME.
     * Checked in the DOM, since the name may arrive as a `<label for>`. */
    React.useEffect(() => {
        if (process.env.NODE_ENV === "production")
            return;
        const element = triggerRef.current;
        if (!element)
            return;
        const named = element.hasAttribute("aria-label") ||
            element.hasAttribute("aria-labelledby") ||
            element.closest("label") !== null ||
            (element.id !== "" &&
                element.ownerDocument.querySelector(`label[for="${CSS.escape(element.id)}"]`) !== null);
        if (named)
            return;
        warnCascaderOnce("trigger-unnamed", "`CascaderTrigger` has no accessible name. Its contents are the field's VALUE - they change with the selection - so a screen reader hears what is picked but never what the field is for. Pass `aria-label` or `aria-labelledby`, or reference the trigger's `id` from a `<label>`.");
    });
    return (_jsxs(ComboboxPrimitive.Trigger, { ref: setTrigger, "data-slot": "cascader-trigger", ...(invalid ? { "aria-invalid": true, "data-invalid": "" } : null), className: cn(TRIGGER_ICON_FALLBACK_CLASS, className), ...props, children: [children, showIcon ? (_jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: `${TRIGGER_ICON_CLASS} pointer-events-none shrink-0` })) : null] }));
}
/* -------------------------------------------------------------------------- */
/*                              Resolved theme                                */
/* -------------------------------------------------------------------------- */
/* The eight registry styles each state a combobox surface differently, so the
 * classes below spell every one out with `style-<name>:` variants. Nothing
 * depends on ReUI's theme CSS; `build-registry` flattens one in on install. */
/** Icon size for a combobox surface: 14px in mira and sera, 16px elsewhere. */
const TRIGGER_ICON_CLASS = "text-muted-foreground style-vega:size-4 style-nova:size-4 style-maia:size-4 style-lyra:size-4 style-mira:size-3.5 style-luma:size-4 style-rhea:size-4 style-sera:size-3.5";
/** The same ladder, applied only to trigger children that carry no size. */
const TRIGGER_ICON_FALLBACK_CLASS = "style-vega:[&_svg:not([class*='size-'])]:size-4 style-nova:[&_svg:not([class*='size-'])]:size-4 style-maia:[&_svg:not([class*='size-'])]:size-4 style-lyra:[&_svg:not([class*='size-'])]:size-4 style-mira:[&_svg:not([class*='size-'])]:size-3.5 style-luma:[&_svg:not([class*='size-'])]:size-4 style-rhea:[&_svg:not([class*='size-'])]:size-4 style-sera:[&_svg:not([class*='size-'])]:size-3.5";
/** The chips field: a form-control surface, so it carries the invalid states. */
const CHIPS_CLASS = "flex flex-wrap items-center border bg-clip-padding style-vega:dark:bg-input/30 style-vega:border-input style-vega:focus-within:border-ring style-vega:focus-within:ring-ring/50 style-vega:has-aria-invalid:ring-destructive/20 style-vega:dark:has-aria-invalid:ring-destructive/40 style-vega:has-aria-invalid:border-destructive style-vega:dark:has-aria-invalid:border-destructive/50 style-vega:min-h-9 style-vega:gap-1.5 style-vega:rounded-md style-vega:bg-transparent style-vega:px-2.5 style-vega:py-1.5 style-vega:text-sm style-vega:shadow-xs style-vega:transition-[color,box-shadow] style-vega:focus-within:ring-3 style-vega:has-aria-invalid:ring-3 style-vega:has-data-[slot=combobox-chip]:px-1.5 style-nova:dark:bg-input/30 style-nova:border-input style-nova:focus-within:border-ring style-nova:focus-within:ring-ring/50 style-nova:has-aria-invalid:ring-destructive/20 style-nova:dark:has-aria-invalid:ring-destructive/40 style-nova:has-aria-invalid:border-destructive style-nova:dark:has-aria-invalid:border-destructive/50 style-nova:bg-transparent style-nova:px-2.5 style-nova:text-sm style-nova:focus-within:ring-3 style-nova:has-aria-invalid:ring-3 style-nova:min-h-8 style-nova:gap-1 style-nova:rounded-lg style-nova:py-1 style-nova:transition-colors style-nova:has-data-[slot=combobox-chip]:px-1 style-maia:border-input style-maia:focus-within:border-ring style-maia:focus-within:ring-ring/50 style-maia:has-aria-invalid:ring-destructive/20 style-maia:dark:has-aria-invalid:ring-destructive/40 style-maia:has-aria-invalid:border-destructive style-maia:dark:has-aria-invalid:border-destructive/50 style-maia:min-h-9 style-maia:gap-1.5 style-maia:px-2.5 style-maia:py-1.5 style-maia:text-sm style-maia:has-data-[slot=combobox-chip]:px-1.5 style-maia:transition-colors style-maia:bg-input/30 style-maia:rounded-4xl style-maia:focus-within:ring-[3px] style-maia:has-aria-invalid:ring-[3px] style-lyra:dark:bg-input/30 style-lyra:border-input style-lyra:focus-within:border-ring style-lyra:focus-within:ring-ring/50 style-lyra:has-aria-invalid:ring-destructive/20 style-lyra:dark:has-aria-invalid:ring-destructive/40 style-lyra:has-aria-invalid:border-destructive style-lyra:dark:has-aria-invalid:border-destructive/50 style-lyra:bg-transparent style-lyra:px-2.5 style-lyra:min-h-8 style-lyra:gap-1 style-lyra:py-1 style-lyra:transition-colors style-lyra:has-data-[slot=combobox-chip]:px-1 style-lyra:rounded-none style-lyra:text-xs style-lyra:focus-within:ring-1 style-lyra:has-aria-invalid:ring-1 style-mira:dark:bg-input/30 style-mira:border-input style-mira:focus-within:border-ring style-mira:has-aria-invalid:ring-destructive/20 style-mira:dark:has-aria-invalid:ring-destructive/40 style-mira:has-aria-invalid:border-destructive style-mira:dark:has-aria-invalid:border-destructive/50 style-mira:rounded-md style-mira:gap-1 style-mira:transition-colors style-mira:has-data-[slot=combobox-chip]:px-1 style-mira:bg-input/20 style-mira:focus-within:ring-ring/30 style-mira:min-h-7 style-mira:px-2 style-mira:py-0.5 style-mira:text-xs/relaxed style-mira:focus-within:ring-2 style-mira:has-aria-invalid:ring-2 style-luma:focus-within:border-ring style-luma:has-aria-invalid:ring-destructive/20 style-luma:dark:has-aria-invalid:ring-destructive/40 style-luma:has-aria-invalid:border-destructive style-luma:dark:has-aria-invalid:border-destructive/50 style-luma:min-h-9 style-luma:gap-1.5 style-luma:py-1.5 style-luma:text-sm style-luma:focus-within:ring-3 style-luma:has-aria-invalid:ring-3 style-luma:has-data-[slot=combobox-chip]:px-1.5 style-luma:focus-within:ring-ring/30 style-luma:bg-input/50 style-luma:border-transparent style-luma:rounded-3xl style-luma:px-3 style-luma:transition-[color,box-shadow,background-color] style-rhea:focus-within:border-ring style-rhea:has-aria-invalid:ring-destructive/20 style-rhea:dark:has-aria-invalid:ring-destructive/40 style-rhea:has-aria-invalid:border-destructive style-rhea:dark:has-aria-invalid:border-destructive/50 style-rhea:px-2.5 style-rhea:text-sm style-rhea:transition-[color,box-shadow] style-rhea:focus-within:ring-3 style-rhea:has-aria-invalid:ring-3 style-rhea:min-h-8 style-rhea:gap-1 style-rhea:py-1 style-rhea:has-data-[slot=combobox-chip]:px-1 style-rhea:focus-within:ring-ring/30 style-rhea:bg-input/50 style-rhea:border-transparent style-rhea:rounded-2xl style-rhea:duration-200 style-sera:gap-1.5 style-sera:bg-transparent style-sera:py-1.5 style-sera:text-sm style-sera:rounded-none style-sera:border-transparent style-sera:border-b-input style-sera:focus-within:border-b-ring style-sera:has-aria-invalid:border-b-destructive style-sera:dark:has-aria-invalid:border-b-destructive/50 style-sera:min-h-10 style-sera:px-0 style-sera:transition-[color,border-color] style-sera:has-data-[slot=combobox-chip]:px-0";
const CHIP_CLASS = "text-foreground flex w-fit items-center justify-center gap-1 font-medium whitespace-nowrap style-vega:bg-muted style-vega:h-[calc(--spacing(5.5))] style-vega:rounded-sm style-vega:px-1.5 style-vega:text-xs style-vega:has-data-[slot=combobox-chip-remove]:pr-0 style-nova:bg-muted style-nova:rounded-sm style-nova:px-1.5 style-nova:text-xs style-nova:has-data-[slot=combobox-chip-remove]:pr-0 style-nova:h-[calc(--spacing(5.25))] style-maia:h-[calc(--spacing(5.5))] style-maia:text-xs style-maia:has-data-[slot=combobox-chip-remove]:pr-0 style-maia:bg-muted-foreground/10 style-maia:rounded-4xl style-maia:px-2 style-lyra:bg-muted style-lyra:px-1.5 style-lyra:text-xs style-lyra:has-data-[slot=combobox-chip-remove]:pr-0 style-lyra:h-[calc(--spacing(5.25))] style-lyra:rounded-none style-mira:px-1.5 style-mira:has-data-[slot=combobox-chip-remove]:pr-0 style-mira:bg-muted-foreground/10 style-mira:h-[calc(--spacing(4.75))] style-mira:rounded-[calc(var(--radius-sm)-2px)] style-mira:text-xs/relaxed style-luma:h-[calc(--spacing(5.5))] style-luma:text-xs style-luma:has-data-[slot=combobox-chip-remove]:pr-0 style-luma:px-2 style-luma:bg-input style-luma:rounded-3xl style-luma:dark:bg-input/60 style-rhea:px-1.5 style-rhea:text-xs style-rhea:h-[calc(--spacing(5.25))] style-rhea:bg-input style-rhea:dark:bg-input/60 style-rhea:rounded-2xl style-rhea:has-data-[slot=combobox-chip-remove]:pr-0.5 style-sera:bg-muted style-sera:h-[calc(--spacing(5.5))] style-sera:text-xs style-sera:has-data-[slot=combobox-chip-remove]:pr-0 style-sera:px-2 style-sera:rounded-none";
const CHIP_REMOVE_CLASS = "opacity-50 hover:opacity-100 style-vega:-ml-1 style-nova:-ml-1 style-maia:-ml-1 style-lyra:-ml-1 style-mira:-ml-1 style-luma:-ml-1 style-rhea:-ml-0.5 style-rhea:size-4.5 style-rhea:aria-disabled:pointer-events-none style-sera:-ml-1";
/** The floating panel's surface. The shared popup's `InputGroup` sizing is
 * left out (mirrored in `cascader-nav.tsx`), as are its `max-h-72` and
 * `min-w-*`: `CascaderContent` sets both from the positioner's variables. */
const CONTENT_SURFACE_CLASS = "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 overflow-hidden ring-1 duration-100 style-vega:ring-foreground/10 style-vega:rounded-md style-vega:shadow-md style-nova:ring-foreground/10 style-nova:shadow-md style-nova:rounded-lg style-maia:ring-foreground/5 style-maia:rounded-2xl style-maia:shadow-2xl style-lyra:ring-foreground/10 style-lyra:shadow-md style-lyra:rounded-none style-mira:ring-foreground/10 style-mira:shadow-md style-mira:rounded-lg style-mira:dark:bg-popover style-luma:ring-foreground/5 style-luma:dark:ring-foreground/10 style-luma:rounded-3xl style-luma:shadow-lg style-rhea:ring-foreground/5 style-rhea:rounded-2xl style-rhea:dark:ring-foreground/10 style-rhea:shadow-lg style-sera:ring-foreground/10 style-sera:shadow-md style-sera:rounded-none data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2";
const EMPTY_CLASS = "text-muted-foreground hidden w-full justify-center py-2 text-center group-data-empty/combobox-content:flex style-vega:text-sm style-nova:text-sm style-maia:text-sm style-lyra:text-xs style-mira:text-xs/relaxed style-luma:text-sm style-rhea:text-sm style-sera:text-sm";
/* -------------------------------------------------------------------------- */
/*                                    Chips                                   */
/* -------------------------------------------------------------------------- */
/** Ref for the chips container: they replace the trigger, so the popup has to
 * be anchored to them. Hand it to `CascaderContent`'s `anchor`. */
export function useCascaderAnchor() {
    return React.useRef(null);
}
/**
 * The multi-select trigger surface: one removable chip per selection, where
 * `CascaderValue` would collapse to "3 selected". A component rather than a
 * recipe because of three easy misses: the popup anchored to the chips, an
 * accessible name on every remove button, and labels that disambiguate when
 * two branches use the same one.
 *
 * ```tsx
 * const anchor = useCascaderAnchor()
 * <Cascader multiple items={items}>
 *   <CascaderChips ref={anchor} placeholder="Select attributes" />
 *   <CascaderContent anchor={anchor}>...</CascaderContent>
 * </Cascader>
 * ```
 */
function CascaderChips({ className, children, placeholder, strategy = "all", ...props }) {
    const { labels, multiple, invalid, resolveNode, index, isSelectable, setSelection, } = useCascaderActions();
    const { selectedValues } = useCascaderState();
    React.useEffect(() => {
        if (process.env.NODE_ENV === "production")
            return;
        if (multiple)
            return;
        warnCascaderOnce("chips-without-multiple", "`CascaderChips` renders one chip per selection and there is only ever one without `multiple`. Use `CascaderValue` for a single-select trigger.");
    }, [multiple]);
    // DERIVED display: the selection stays the full closure, the chips condense.
    const displayedValues = strategy === "all"
        ? selectedValues
        : getCascaderCheckedValues(index, selectedValues, strategy);
    // Not memoised: one entry per SELECTION, not per row, so the pass is short.
    const nodes = displayedValues.map(resolveNode);
    const ambiguous = findAmbiguousCascaderLabels(nodes);
    // Removal for a CONDENSED chip: Base UI's `ChipRemove` maps a press onto the
    // STORED array, which is wrong once the chips are fewer, so this removes the
    // chip's whole subtree closure instead.
    const removeClosure = (node) => {
        setSelection(applyCascadeSelection(index, selectedValues, node.value, false, isSelectable), "deselect");
    };
    const content = typeof children === "function" ? children(nodes) : children;
    return (_jsx(ComboboxPrimitive.Chips, { "data-slot": "cascader-chips", "aria-label": labels.chipsLabel, ...(invalid ? { "aria-invalid": true, "data-invalid": "" } : null), className: cn(CHIPS_CLASS, className), ...props, children: content ??
            (nodes.length === 0 ? (_jsx("span", { "data-slot": "cascader-chips-placeholder", className: "text-muted-foreground truncate", children: placeholder })) : (nodes.map((node) => (_jsx(CascaderChip, { node: node, showPath: ambiguous.has(node.value), ...(strategy !== "all"
                    ? { onRemove: () => removeClosure(node) }
                    : null) }, node.value))))) }));
}
/** One chip. Removal goes through Base UI's `ChipRemove`, which reports the
 * shortened selection to the root, so it lands in the same `setSelection` as
 * every other deselection and `cascade` applies to it. */
function CascaderChip({ className, node, showPath = false, maxSegments = 2, showRemove = true, onRemove, children, ...props }) {
    const { labels, index } = useCascaderActions();
    const chain = showPath ? getCascaderPath(index, node.value) : [];
    const segments = collapseCascaderPath(chain, {
        maxSegments,
        collapse: "start",
    });
    const label = segments.length
        ? segments
            .map((segment) => (segment.type === "node" ? segment.node.label : "…"))
            .join(` ${labels.pathSeparator} `)
        : node.label;
    return (_jsxs(ComboboxPrimitive.Chip, { "data-slot": "cascader-chip", ...(onRemove
            ? {
                onKeyDown: (event) => {
                    if (event.key !== "Backspace" && event.key !== "Delete")
                        return;
                    event.preventBaseUIHandler();
                    onRemove();
                },
            }
            : null), className: cn(CHIP_CLASS, "has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50", className), ...props, children: [children ?? _jsx("span", { className: "truncate", children: label }), showRemove ? (_jsx(ComboboxPrimitive.ChipRemove, { "data-slot": "cascader-chip-remove", "aria-label": labels.removeChip(label), ...(onRemove
                    ? {
                        onClick: (event) => {
                            event.preventBaseUIHandler();
                            onRemove();
                        },
                    }
                    : null), className: CHIP_REMOVE_CLASS, children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "pointer-events-none" }) })) : null] }));
}
/** Portal + Positioner + floating panel. Unlike shadcn's `ComboboxContent` it
 * does NOT clamp the popup to the anchor width (a cascader panel is routinely
 * wider), but it keeps `group/combobox-content`, which `CascaderEmpty` needs. */
function CascaderContent({ className, side = "bottom", sideOffset = 6, align = "start", alignOffset = 0, anchor, collisionBoundary, collisionPadding, sticky, positionMethod, container, ref, ...props }) {
    const { labels } = useCascaderActions();
    const popupRef = React.useRef(null);
    // `initialFocus` needs the popup element, and `ref` is the one prop
    // `mergeProps` does NOT merge, so it is chained by hand rather than spread.
    const setPopup = React.useCallback((node) => {
        popupRef.current = node;
        if (typeof ref === "function")
            ref(node);
        else if (ref)
            ref.current = node;
    }, [ref]);
    /**
     * Focus goes to the search field, where the level keys and
     * `aria-activedescendant` live. Base UI's own default agrees but is COMPUTED
     * FROM THE FIRST RENDER, when the field has not mounted, and collapses to
     * "do not move focus": measured, a KEYBOARD open left focus on the trigger
     * and cost two Tabs to reach the footer where a pointer open cost one.
     *
     * `initialFocus` rather than an effect, because anything scheduled alongside
     * Base UI's focus manager is a race; the field is resolved INSIDE the
     * callback, which runs after the layout effects. Touch is handed back to
     * Base UI on purpose - focusing the popup keeps the Android keyboard shut.
     */
    const initialFocus = React.useCallback((openType) => {
        const popup = popupRef.current;
        if (!popup)
            return true;
        if (openType === "touch")
            return popup;
        return (popup.querySelector('[data-slot="cascader-input"]') ?? true);
    }, []);
    return (
    // Conditional spreads throughout: `mergeProps` iterates own keys, so an
    // explicit `undefined` reads as "deleted" rather than "not supplied".
    _jsx(ComboboxPrimitive.Portal, { ...(container !== undefined ? { container } : null), children: _jsx(ComboboxPrimitive.Positioner, { side: side, sideOffset: sideOffset, align: align, alignOffset: alignOffset, anchor: anchor, ...(collisionBoundary !== undefined ? { collisionBoundary } : null), ...(collisionPadding !== undefined ? { collisionPadding } : null), ...(sticky !== undefined ? { sticky } : null), ...(positionMethod !== undefined ? { positionMethod } : null), className: "isolate z-50", children: _jsx(ComboboxPrimitive.Popup, { ref: setPopup, "data-slot": "cascader-content", "data-menu-target": "", "aria-label": labels.panelLabel, initialFocus: initialFocus, className: cn(CONTENT_SURFACE_CLASS, "group/combobox-content relative flex max-h-(--available-height) max-w-(--available-width) min-w-(--anchor-width) origin-(--transform-origin) flex-col", className), ...props }) }) }));
}
/**
 * The nav + list(s) + footer container, with no positioning of its own: inside
 * `CascaderContent` for the popup case, alone for the embedded one.
 *
 * `min-h-0` and `max-h-full` are load-bearing. A flex child without `min-h-0`
 * refuses to shrink below its content, which is the usual reason a scroll area
 * never scrolls - worst embedded, where no positioner publishes
 * `--available-height`. It also owns the panel's TAB ORDER: the scroll area
 * makes itself a tab stop whenever the level overflows, stranding the footer,
 * and the panel is the only ancestor of both ends of that move in BOTH shapes.
 */
function CascaderPanel({ className, asChild = false, children, onKeyDown, ...props }) {
    const { mode } = useCascaderActions();
    const Comp = asChild ? Slot.Root : "div";
    const handleKeyDown = React.useCallback((event) => {
        // Called FIRST, so a consumer's handler can drop this one with
        // `preventDefault`; the base twin gets that ordering from `mergeProps`.
        onKeyDown?.(event);
        if (event.key !== "Tab" || event.defaultPrevented)
            return;
        // A browser-level move (Ctrl+Tab switches tabs) is never ours.
        if (event.altKey || event.ctrlKey || event.metaKey)
            return;
        const panel = event.currentTarget;
        const target = event.target;
        if (!target || !panel.contains(target))
            return;
        const next = getCascaderTabTarget(panel, target, event.shiftKey);
        // Off either end: left to the browser, since focus is never trapped.
        if (!next)
            return;
        event.preventDefault();
        next.focus();
    }, [onKeyDown]);
    return (_jsx(Comp, { "data-slot": "cascader-panel", "data-mode": mode, onKeyDown: handleKeyDown, className: cn("flex max-h-full min-h-0 w-full flex-col", className), ...props, children: children }));
}
/**
 * Scroll container for one level: pattern 3 of the house scroll reference,
 * viewport-bounded popup scroll. The height is `min()` of `--available-height`
 * (the positioner's space between anchor and viewport edge) and `maxHeight`,
 * so neither can be ignored; a fixed pixel cap alone still reserved 288px for
 * a panel opened 200px above the fold and spilled off screen, and wasted room
 * in a tall window. The four classes are shared with `CascaderColumns` and
 * live in `cascader-lib.tsx`.
 */
function CascaderList({ className, style, maxHeight: maxHeightProp, ...props }) {
    const { maxHeight, mode, labels, baseId, virtualized, searchScope } = useCascaderActions();
    const { currentParent, deepResults } = useCascaderState();
    const resolved = maxHeightProp ?? maxHeight;
    // Global hits come from the whole tree, so the parent would understate them.
    const listName = searchScope === "global" && deepResults
        ? labels.rootLevel
        : (currentParent?.label ?? labels.rootLevel);
    return (_jsx("div", { "data-slot": "cascader-list-shell", style: resolved != null
            ? {
                ...style,
                "--cascader-max-height": typeof resolved === "number" ? `${resolved}px` : resolved,
            }
            : style, className: cn("relative flex max-h-full min-h-0", CASCADER_LIST_PAD_CLASS), children: _jsx("div", { "data-slot": "cascader-list-bounds", className: cn("flex w-full min-w-0 flex-col overscroll-contain", CASCADER_LIST_HEIGHT_CLASS), children: _jsx(ScrollArea, { className: CASCADER_SCROLL_CLASS, children: _jsx(ComboboxPrimitive.List, { "data-slot": "cascader-list", "aria-label": listName, 
                    /* Replaces Base UI's floating id. `aria-controls` reads the live
                       id, so the columns trail gets a predictable target. */
                    id: `${baseId}-column-0`, ...(mode === "tree" ? { role: "tree" } : null), ...(virtualized ? { "data-virtualized": true } : null), className: cn(CASCADER_ROWS_CLASS, 
                    /* A windowed row is absolutely positioned, so the ROWS' box is
                       the containing block, not the scrollport: it carries the
                       padding the geometry is measured against. */
                    virtualized && "relative", className), ...props }) }) }) }));
}
/** The empty, loading and error surface, in ONE element that never unmounts.
 * `Combobox.Empty` renders whenever `filteredItems.length === 0`, as true of a
 * fetching level as of an empty one, so swapping siblings would announce "No
 * results found." over every async level. Swap the CHILDREN. */
function CascaderEmpty({ className, children, 
// Accepted and ignored; destructured so it is never spread onto the DOM.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
skeletonRows, ...props }) {
    const { labels, retryLevel } = useCascaderActions();
    const { query, path, searchState } = useCascaderState();
    // The level whose emptiness is on screen; tree always shows the root.
    const levelKey = path.length ? path[path.length - 1] : CASCADER_ROOT_KEY;
    const loadState = useCascaderLoadState(levelKey);
    const state = query.trim() ? (searchState ?? loadState) : loadState;
    let body = children ?? labels.empty;
    if (state?.error) {
        body = (_jsxs("span", { "data-slot": "cascader-error", className: "flex flex-col items-center gap-1.5", children: [_jsx("span", { children: labels.error }), _jsx("button", { type: "button", "data-slot": "cascader-retry", 
                    /* A real button because this lives OUTSIDE the listbox; a focusable
                       element inside a `role="option"` is `nested-interactive`. */
                    onClick: () => retryLevel(levelKey), className: "text-foreground hover:bg-accent focus-visible:ring-ring/50 rounded-md px-2 py-0.5 font-medium outline-hidden transition-colors focus-visible:ring-2", children: labels.retry })] }));
    }
    else if (state?.loading) {
        body = (_jsx("span", { "data-slot": "cascader-loading", className: "flex w-full items-center justify-center", children: labels.loading }));
    }
    return (_jsx(ComboboxPrimitive.Empty, { "data-slot": "cascader-empty", "data-state": state?.error ? "error" : state?.loading ? "loading" : "empty", className: cn(EMPTY_CLASS, className), 
        /* The ONE place an explicit `undefined` is right: it DELETES Base UI's
           live region, which is wanted. `CascaderStatus` is the single one, and
           leaving this one spoke "No results found." on every level swap, which
           renders one deliberately empty frame to reset the highlight. */
        role: undefined, "aria-live": undefined, "aria-atomic": undefined, ...props, children: body }));
}
/**
 * Polite live region for the current level and result count, which drill-down
 * otherwise hides in a visual breadcrumb. Built on `Combobox.Status` for its
 * initial-mutation marker: Safari and VoiceOver need a text change ~200ms
 * after mount before reading a polite region at all.
 */
function CascaderStatus({ className, children, asChild = false, ...props }) {
    const { announcement } = useCascaderState();
    // `asChild` only engages when there IS an element to slot into: with a bare
    // string, Radix's `Slot` answers `null` and deletes the live region.
    const asSlot = asChild && React.isValidElement(children);
    return (_jsx(ComboboxPrimitive.Status, { "data-slot": "cascader-status", className: cn("sr-only", className), ...(asSlot ? { render: _jsx(Slot.Root, {}) } : null), ...props, children: children ?? announcement }));
}
export { Cascader, CascaderTrigger, CascaderChip, CascaderChips, CascaderContent, CascaderPanel, CascaderList, CascaderEmpty, CascaderStatus, };
/** Re-exported from `cascader-context.tsx`: existing import paths keep
 * working, and the row component avoids an import cycle through this file. */
export { createCascaderHighlightStore, useCascaderActions, useCascaderHighlight, useCascaderRender, useCascaderState, };
