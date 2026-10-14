/** REUI cascader composition, with actual Ant Cascader/Tree controller surfaces.
 * Pure indexing, search and abort-aware loading remain the attributed upstream helpers.
 */
import React, {
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Breadcrumb,
  Button,
  Cascader as AntCascader,
  Checkbox,
  Dropdown,
  Input,
  Tag,
  Tree,
  type ButtonProps,
  type CascaderProps as AntCascaderProps,
  type GetProps,
  type InputProps,
} from "@kooyaph/ui/components";
import { findParts, role, type PartProps } from "./parts";
import type {
  CascaderFlatNode,
  CascaderNode,
  CascaderIndex,
  CascaderLabels,
  CascaderChangeDetails,
  CascaderChangeReason,
  CascaderLoadContext,
  CascaderLoadResult,
  CascaderLoadState,
  CascaderMode,
  CascaderSearchScope,
  CascaderSelectable,
  CascaderActionItem,
  CascaderSearchContext,
} from "./cascader-types";
export type * from "./cascader-types";
// The generator preserves these real, attributed helper modules as JS. Their
// dependency types are erased upstream; local interfaces restore the controller boundary.
// @ts-expect-error generated attributed JavaScript helper has no declaration file
import * as sourceLib from "../runtime/source/registry-reui/bases/radix/reui/cascader/cascader-lib.jsx";
// @ts-expect-error generated attributed JavaScript helper has no declaration file
import { useCascaderLoader as originalLoader } from "../runtime/source/registry-reui/bases/radix/reui/cascader/cascader-async.jsx";
// @ts-expect-error generated attributed JavaScript helper has no declaration file
import { resolveCascaderLabels } from "../runtime/source/registry-reui/bases/radix/reui/cascader/cascader-i18n.jsx";
const lib = sourceLib as {
  flattenCascaderTree<T>(
    index: CascaderIndex<T>,
    expanded: ReadonlySet<string>,
    sentinels?: ReadonlySet<string>,
  ): CascaderFlatNode<T>[];
  CASCADER_ROOT_KEY: string;
  CASCADER_MORE_PREFIX: string;
  buildCascaderIndex<T>(
    items: readonly CascaderNode<T>[],
    parent?: (node: CascaderNode<T>) => string | null | undefined,
  ): CascaderIndex<T>;
  mergeCascaderIndex<T>(
    base: CascaderIndex<T>,
    pages: ReadonlyMap<string, CascaderNode<T>[]>,
    detached: ReadonlyMap<string, CascaderNode<T>>,
  ): CascaderIndex<T>;
  getCascaderPath<T>(index: CascaderIndex<T>, value: string): CascaderNode<T>[];
  getCascaderChildren<T>(
    index: CascaderIndex<T>,
    parent?: string | null,
  ): CascaderNode<T>[];
  isCascaderBranch<T>(index: CascaderIndex<T>, node: CascaderNode<T>): boolean;
  isCascaderDisabled<T>(
    index: CascaderIndex<T>,
    node: CascaderNode<T>,
  ): boolean;
  isCascaderSelectable<T>(
    index: CascaderIndex<T>,
    node: CascaderNode<T>,
    predicate: CascaderSelectable<T>,
  ): boolean;
  matchesCascaderQuery<T>(node: CascaderNode<T>, query: string): boolean;
  getCascaderCount<T>(index: CascaderIndex<T>, node: CascaderNode<T>): number;
  getCascaderSelectedDescendants<T>(
    index: CascaderIndex<T>,
    selected: readonly string[],
  ): Map<string, number>;
  applyCascadeSelection<T>(
    index: CascaderIndex<T>,
    selected: readonly string[],
    value: string,
    selecting: boolean,
    predicate: (node: CascaderNode<T>) => boolean,
  ): string[];
  isCascaderMoreNode(node: CascaderNode): boolean;
  getCascaderMoreParent(node: CascaderNode): string | null;
  createCascaderMoreNode(parent: string, count: number): CascaderNode;
};
export const { CASCADER_ROOT_KEY, CASCADER_MORE_PREFIX } = lib;
// Retain helper-path consumers and source semantics, without reimplementing the pure library.
export const {
  buildCascaderIndex,
  mergeCascaderIndex,
  getCascaderPath,
  getCascaderChildren,
  isCascaderBranch,
  isCascaderDisabled,
  isCascaderSelectable,
  matchesCascaderQuery,
  getCascaderCount,
  getCascaderSelectedDescendants,
  applyCascadeSelection,
  isCascaderMoreNode,
  getCascaderMoreParent,
  createCascaderMoreNode,
} = lib;
export { resolveCascaderLabels };

type Loader<T> = {
  active: boolean;
  store: {
    pages: Map<string, CascaderNode<T>[]>;
    detached: Map<string, CascaderNode<T>>;
  };
  states: ReadonlyMap<string, CascaderLoadState>;
  searchResults: CascaderNode<T>[] | null;
  searchState: CascaderLoadState | null;
  ensureLevel: (key: string, reason: string) => void;
  retryLevel: (key: string) => void;
  invalidateLevel: (value: string | null) => void;
  loadMore: (key: string) => void;
  prefetchNode: (node: CascaderNode<T> | null) => void;
};
export type CascaderGetChildren<T = unknown> = (
  node: CascaderNode<T> | null,
  context: CascaderLoadContext,
) =>
  | CascaderNode<T>[]
  | CascaderLoadResult<T>
  | Promise<CascaderNode<T>[] | CascaderLoadResult<T>>;
export type CascaderOnSearch<T = unknown> = (
  query: string,
  context: CascaderSearchContext,
) =>
  | CascaderNode<T>[]
  | CascaderLoadResult<T>
  | Promise<CascaderNode<T>[] | CascaderLoadResult<T>>;
export type CascaderResolveValue<T = unknown> = (
  value: string,
  context: CascaderLoadContext,
) => CascaderNode<T>[] | Promise<CascaderNode<T>[]>;
export type CascaderPathChangeReason =
  | "drill"
  | "back"
  | "breadcrumb"
  | "reveal"
  | "external";
export interface CascaderBaseProps<T = unknown> {
  items: CascaderNode<T>[];
  children?: ReactNode;
  getParent?: (node: CascaderNode<T>) => string | null | undefined;
  getChildren?: CascaderGetChildren<T>;
  onSearch?: CascaderOnSearch<T>;
  searchDebounce?: number;
  resolveValue?: CascaderResolveValue<T>;
  loadKey?: unknown;
  prefetch?: boolean;
  onLoadError?: (
    error: unknown,
    context: { parent: string | null; reason: string },
  ) => void;
  selectable?: CascaderSelectable<T>;
  indicator?: boolean;
  actions?: CascaderActionItem[];
  cascade?: boolean;
  mode?: CascaderMode;
  expandTrigger?: "click" | "hover";
  path?: string[];
  defaultPath?: string[];
  onPathChange?: (
    path: string[],
    details: { reason: CascaderPathChangeReason },
  ) => void;
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (expanded: string[]) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean, details: { reason: string }) => void;
  closeOnSelect?: boolean;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
  searchScope?: CascaderSearchScope;
  filter?: (node: CascaderNode<T>, query: string) => boolean;
  revealSelected?: boolean;
  maxHeight?: number | string;
  virtualize?: boolean;
  virtualizeThreshold?: number;
  estimateRowSize?: number;
  overscan?: number;
  labels?: Partial<CascaderLabels>;
  renderItem?: (
    node: CascaderNode<T>,
    state: CascaderItemState<T>,
  ) => ReactNode;
  renderLabel?: (
    node: CascaderNode<T>,
    state: CascaderItemState<T>,
  ) => ReactNode;
  disabled?: boolean;
  name?: string;
  form?: string;
  id?: string;
  required?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  inline?: boolean;
}
export type CascaderSingleProps<T = unknown> = CascaderBaseProps<T> & {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, details: CascaderChangeDetails<T>) => void;
  max?: never;
};
export type CascaderMultipleProps<T = unknown> = CascaderBaseProps<T> & {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[], details: CascaderChangeDetails<T>) => void;
  max?: number;
};
export type CascaderProps<T = unknown> =
  | CascaderSingleProps<T>
  | CascaderMultipleProps<T>;
export interface CascaderItemState<T = unknown> {
  branch: boolean;
  selected: boolean;
  disabled: boolean;
  depth: number;
  count: number;
  path: CascaderNode<T>[];
}
export interface CascaderColumn<T = unknown> {
  parent: CascaderNode<T> | null;
  items: CascaderNode<T>[];
  depth: number;
  activeValue: string | null;
  active: boolean;
}
interface Controller<T = unknown> {
  props: CascaderProps<T>;
  index: CascaderIndex<T>;
  path: string[];
  expanded: ReadonlySet<string>;
  query: string;
  open: boolean;
  selectedValues: string[];
  currentParent: CascaderNode<T> | null;
  renderedItems: CascaderNode<T>[];
  levelItems: CascaderNode<T>[];
  deepResults: CascaderNode<T>[] | null;
  columns: CascaderColumn<T>[];
  treeRows: CascaderFlatNode<T>[];
  selectedDescendants: Map<string, number>;
  loadStates: ReadonlyMap<string, CascaderLoadState>;
  searchState: CascaderLoadState | null;
  announcement: string;
  mode: CascaderMode;
  multiple: boolean;
  cascade: boolean;
  indicator: boolean;
  searchScope: CascaderSearchScope;
  inline: boolean;
  invalid: boolean;
  disabled: boolean;
  virtualized: boolean;
  virtualizeThreshold: number;
  estimateRowSize: number;
  overscan: number;
  maxHeight?: number | string;
  baseId: string;
  labels: CascaderLabels;
  actions: CascaderActionItem[];
  hasLoader: boolean;
  content?: React.ReactElement<PartProps>;
  engine: GetProps<typeof AntCascader>;
  trigger: React.RefObject<HTMLButtonElement | null>;
  setOpen: (value: boolean, reason?: string) => void;
  setPath: (
    next: string[] | ((previous: string[]) => string[]),
    reason?: CascaderPathChangeReason,
  ) => void;
  pushLevel: (value: string) => void;
  popLevel: () => void;
  goToDepth: (depth: number) => void;
  setQuery: (value: string) => void;
  setSelection: (values: string[], reason?: CascaderChangeReason) => void;
  commit: (node: CascaderNode<T>) => void;
  navigate: (node: CascaderNode<T>) => void;
  navigateAt: (node: CascaderNode<T>, depth: number) => void;
  toggleExpanded: (value: string) => void;
  setExpanded: (values: string[]) => void;
  isBranch: (node: CascaderNode<T>) => boolean;
  isSelectable: (node: CascaderNode<T>) => boolean;
  isDisabled: (node: CascaderNode<T>) => boolean;
  isSelected: (node: CascaderNode<T>) => boolean;
  isIndeterminate: (node: CascaderNode<T>) => boolean;
  selectedDescendantCount: (node: CascaderNode<T>) => number;
  resolveNode: (value: string) => CascaderNode<T>;
  getIndex: () => CascaderIndex<T>;
  getState: () => Controller<T>;
  getHighlighted: () => CascaderNode<T> | null;
  retryLevel: (value: string) => void;
  invalidateLevel: (value: string | null) => void;
  loadMore: (value: string) => void;
  setFlyoutOpen: (key: string, open: boolean) => void;
  hasOpenFlyout: () => boolean;
  registerVirtualRenderer: () => () => void;
  highlight: { index: number; value: string | null };
  setHighlight: (index: number) => void;
}
export type CascaderActionsContextValue<T = unknown> = Controller<T>;
export type CascaderStateContextValue<T = unknown> = Controller<T>;
export type CascaderContextValue<T = unknown> = Controller<T>;
export type CascaderRenderContextValue<T = unknown> = Pick<
  CascaderBaseProps<T>,
  "renderLabel" | "renderItem"
>;
const Context = createContext<Controller | null>(null),
  NativeMenu = createContext<ReactNode>(null);
function useController<T = unknown>() {
  const value = useContext(Context);
  if (!value) throw Error("Cascader parts must be used within Cascader");
  return value as unknown as Controller<T>;
}
export const useCascader = useController,
  useCascaderActions = useController,
  useCascaderState = useController;
export function useCascaderRender<T = unknown>() {
  const { props } = useController<T>();
  return { renderLabel: props.renderLabel, renderItem: props.renderItem };
}
export function useCascaderHighlight() {
  return useController().highlight;
}
export function useCascaderLoadState(parent?: string) {
  return useController().loadStates.get(parent ?? CASCADER_ROOT_KEY) ?? null;
}
export function createCascaderHighlightStore() {
  let value = { index: -1, value: null as string | null };
  const listeners = new Set<() => void>();
  return {
    getSnapshot: () => value,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    set: (next: typeof value) => {
      value = next;
      listeners.forEach((listener) => listener());
    },
  };
}
function mark<T>(component: T, name: string): T {
  Object.assign(component as object, { recipeRole: name, displayName: name });
  return component;
}
function values(value: string | string[] | undefined) {
  return Array.isArray(value) ? value : value ? [value] : [];
}
function useValue<V>(
  controlled: V | undefined,
  initial: V,
  onChange?: (value: V) => void,
): [V, (next: V | ((previous: V) => V)) => void] {
  const [local, setLocal] = useState(initial);
  const value = controlled ?? local;
  const latest = useRef(value);
  latest.current = value;
  return [
    value,
    (next) => {
      const result =
        typeof next === "function"
          ? (next as (previous: V) => V)(latest.current)
          : next;
      if (controlled === undefined) {
        latest.current = result;
        setLocal(result);
      }
      onChange?.(result);
    },
  ];
}
export function Cascader<T>(props: CascaderProps<T>) {
  const {
    items,
    getParent,
    mode = "drill",
    multiple = false,
    cascade = false,
    selectable = "leaf",
    searchScope = "level",
    disabled = false,
    readOnly = false,
    inline = false,
    revealSelected = true,
    children,
  } = props;
  const suppressSelectionClose = useRef(false);
  const baseId = useId(),
    trigger = useRef<HTMLButtonElement>(null),
    flyouts = useRef(new Set<string>());
  const [value, setValue] = useValue<string | string[]>(
    props.value,
    props.defaultValue ?? (multiple ? [] : ""),
  );
  const [path, setLocalPath] = useValue(props.path, props.defaultPath ?? []);
  const [expandedList, setExpanded] = useValue(
    props.expanded,
    props.defaultExpanded ?? [],
    props.onExpandedChange,
  );
  const [query, setQuery] = useValue(
    props.inputValue,
    props.defaultInputValue ?? "",
    props.onInputValueChange,
  );
  const [open, setLocalOpen] = useValue(props.open, props.defaultOpen ?? false);
  const [pendingNavigation, setPendingNavigation] = useState<{
    value: string;
    depth: number;
  } | null>(null);
  const [notice, setNotice] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const selectedValues = values(value),
    expanded = new Set(expandedList);
  const baseIndex = useMemo(
    () => lib.buildCascaderIndex(items, getParent),
    [items, getParent],
  );
  const levels = useMemo(
    () =>
      mode === "tree"
        ? [CASCADER_ROOT_KEY, ...expandedList]
        : mode === "columns"
          ? [CASCADER_ROOT_KEY, ...path]
          : [path.at(-1) ?? CASCADER_ROOT_KEY],
    [mode, path, expandedList],
  );
  const loader = originalLoader({
    base: baseIndex,
    getChildren: props.getChildren,
    onSearch: mode === "tree" ? undefined : props.onSearch,
    searchDebounce: props.searchDebounce,
    resolveValue: props.resolveValue,
    loadKey: props.loadKey,
    prefetch: props.prefetch,
    onLoadError: props.onLoadError,
    enabled: open || inline,
    query,
    levels,
    path: searchScope === "global" ? [] : path,
    values: selectedValues,
  }) as Loader<T>;
  const index = useMemo(
    () =>
      lib.mergeCascaderIndex(
        baseIndex,
        loader.store.pages,
        loader.store.detached,
      ),
    [baseIndex, loader.store.pages, loader.store.detached],
  );
  const labels = resolveCascaderLabels(props.labels) as CascaderLabels;
  const isBranch = (node: CascaderNode<T>) => lib.isCascaderBranch(index, node),
    isDisabled = (node: CascaderNode<T>) =>
      disabled || !!node.disabled || lib.isCascaderDisabled(index, node),
    isSelectable = (node: CascaderNode<T>) =>
      !readOnly &&
      !isDisabled(node) &&
      lib.isCascaderSelectable(index, node, selectable);
  const resolveNode = (id: string): CascaderNode<T> =>
    index.byValue.get(id) ??
    (id.startsWith(CASCADER_MORE_PREFIX)
      ? { value: id, label: labels.loadMore }
      : { value: id, label: id });
  const setPath = (
    next: string[] | ((previous: string[]) => string[]),
    reason: CascaderPathChangeReason = "external",
  ) => {
    const resolved = typeof next === "function" ? next(path) : next;
    setPendingNavigation(null);
    setLocalPath(resolved);
    props.onPathChange?.(resolved, { reason });
    setHighlightIndex(-1);
  };
  const setOpen = (
    next: boolean,
    reason = next ? "trigger-press" : "dismiss",
  ) => {
    if (disabled || (!next && reason === "escape-key" && flyouts.current.size))
      return;
    setLocalOpen(next);
    props.onOpenChange?.(next, { reason });
    if (!next) {
      setPendingNavigation(null);
      setQuery("");
      requestAnimationFrame(() => trigger.current?.focus());
    } else if (revealSelected && !inline && mode !== "tree") {
      setPath(
        selectedValues.length
          ? lib
              .getCascaderPath(index, selectedValues[0])
              .slice(0, -1)
              .map((node) => node.value)
          : [],
        "reveal",
      );
    }
  };
  const currentParent = path.length
    ? (index.byValue.get(path.at(-1)!) ?? null)
    : null;
  const normalized = query.trim().toLocaleLowerCase();
  const match = (node: CascaderNode<T>) =>
    props.filter
      ? props.filter(node, normalized)
      : lib.matchesCascaderQuery(node, normalized);
  const levelItems = lib
    .getCascaderChildren(index, currentParent?.value)
    .filter(match);
  const candidates =
    searchScope === "global"
      ? index.all
      : searchScope === "deep" && currentParent
        ? index.all.filter((node) =>
            lib
              .getCascaderPath(index, node.value)
              .some((parent) => parent.value === currentParent.value),
          )
        : index.all;
  const deepResults =
    normalized && searchScope !== "level" ? candidates.filter(match) : null;
  const treeKeep = new Set<string>();
  if (mode === "tree" && normalized)
    for (const node of index.all)
      if (match(node))
        for (const parent of lib.getCascaderPath(index, node.value))
          treeKeep.add(parent.value);
  const treeSentinels = new Set<string>();
  if (mode === "tree" && !normalized)
    for (const key of [CASCADER_ROOT_KEY, ...expanded])
      if (loader.states.get(key)?.hasMore) treeSentinels.add(key);
  const treeRows =
    mode === "tree"
      ? lib
          .flattenCascaderTree(
            index,
            normalized ? new Set([...expanded, ...treeKeep]) : expanded,
            treeSentinels,
          )
          .filter((row) => !normalized || treeKeep.has(row.node.value))
      : [];
  const renderedItems =
    mode === "tree"
      ? treeRows.map((row) => row.node)
      : (loader.searchResults ?? deepResults ?? levelItems);
  const key = path.at(-1) ?? CASCADER_ROOT_KEY,
    loadState = loader.states.get(key);
  const pagedItems =
    mode !== "tree" && loadState?.hasMore && !normalized
      ? [
          ...renderedItems,
          lib.createCascaderMoreNode(
            key,
            renderedItems.length,
          ) as CascaderNode<T>,
        ]
      : renderedItems;
  const descendants = lib.getCascaderSelectedDescendants(index, selectedValues);
  const setSelection = (next: string[], reason?: CascaderChangeReason) => {
    if (disabled || readOnly) return;
    if (
      props.max != null &&
      next.length > selectedValues.length &&
      next.length > props.max
    ) {
      setNotice(labels.maxReachedAnnouncement(props.max));
      return;
    }
    const added = next.find((id) => !selectedValues.includes(id)),
      removed = selectedValues.find((id) => !next.includes(id)),
      node = added || removed ? resolveNode(added ?? removed!) : null;
    const result = multiple ? next : (next[0] ?? "");
    setValue(result);
    (
      props.onValueChange as
        | ((next: string | string[], details: CascaderChangeDetails<T>) => void)
        | undefined
    )?.(result, {
      node,
      path: node ? lib.getCascaderPath(index, node.value) : [],
      nodes: next.map(resolveNode),
      reason:
        reason ?? (added ? "select" : next.length === 0 ? "clear" : "deselect"),
    });
    setNotice("");
  };
  const applyNavigation = (node: CascaderNode<T>, depth: number) => {
    if (mode === "tree") {
      setExpanded(
        expanded.has(node.value)
          ? expandedList.filter((id) => id !== node.value)
          : [...expandedList, node.value],
      );
      return;
    }
    const chain = lib
      .getCascaderPath(index, node.value)
      .map((parent) => parent.value);
    setPath(
      chain.length ? chain : [...path.slice(0, depth), node.value],
      "drill",
    );
    setQuery("");
  };
  const navigateAt = (node: CascaderNode<T>, depth: number) => {
    if (isDisabled(node)) return;
    const state = loader.states.get(node.value);
    if (
      props.getChildren &&
      !index.childrenOf.has(node.value) &&
      (!state || state.loading || state.error) &&
      !(mode === "tree" && expanded.has(node.value))
    ) {
      setPendingNavigation({ value: node.value, depth });
      if (state?.error) loader.retryLevel(node.value);
      else loader.ensureLevel(node.value, "level");
      return;
    }
    applyNavigation(node, depth);
  };
  useEffect(() => {
    if (!pendingNavigation || !(open || inline)) return;
    const state = loader.states.get(pendingNavigation.value);
    if (!state || state.loading || state.error) return;
    setPendingNavigation(null);
    const node = index.byValue.get(pendingNavigation.value);
    if (node && !isDisabled(node))
      applyNavigation(node, pendingNavigation.depth);
  }, [pendingNavigation, loader.states, index, open, inline]);
  const navigate = (node: CascaderNode<T>) => navigateAt(node, path.length);
  const commit = (node: CascaderNode<T>) => {
    if (lib.isCascaderMoreNode(node as CascaderNode)) {
      loader.loadMore(lib.getCascaderMoreParent(node as CascaderNode)!);
      return;
    }
    if (!isSelectable(node)) {
      if (isBranch(node) && !isDisabled(node)) navigate(node);
      return;
    }
    const selected = selectedValues.includes(node.value);
    const next = multiple
      ? cascade
        ? lib.applyCascadeSelection(
            index,
            selectedValues,
            node.value,
            !selected,
            isSelectable,
          )
        : selected
          ? selectedValues.filter((id) => id !== node.value)
          : [...selectedValues, node.value]
      : [node.value];
    setSelection(next, selected ? "deselect" : "select");
    setQuery("");
    if (!multiple && props.closeOnSelect !== false && !inline)
      setOpen(false, "item-press");
  };
  const itemState = (node: CascaderNode<T>): CascaderItemState<T> => ({
    branch: isBranch(node),
    selected: selectedValues.includes(node.value),
    disabled: isDisabled(node),
    depth: index.depthOf.get(node.value) ?? 0,
    count: lib.getCascaderCount(index, node),
    path: lib.getCascaderPath(index, node.value),
  });
  const columnMultiple = multiple && mode === "columns";
  const renderOption = (node: CascaderNode<T>) =>
    props.renderItem ? (
      props.renderItem(node, itemState(node))
    ) : (
      <span
        id={`${baseId}-option-${node.value}`}
        data-highlighted={
          pagedItems[highlightIndex]?.value === node.value || undefined
        }
        data-slot="cascader-item"
        data-selected={selectedValues.includes(node.value) || undefined}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%",
          background:
            pagedItems[highlightIndex]?.value === node.value
              ? "var(--ku-subtle)"
              : undefined,
        }}
        onMouseEnter={() => {
          const next = pagedItems.findIndex(
            (item) => item.value === node.value,
          );
          setHighlightIndex(next);
          loader.prefetchNode(node);
        }}
        onClickCapture={(event) => {
          if (
            columnMultiple &&
            !isBranch(node) &&
            !(event.target as HTMLElement).closest(".ant-checkbox-wrapper")
          ) {
            event.stopPropagation();
            commit(node);
            return;
          }
          if (
            mode === "columns" &&
            isBranch(node) &&
            !(event.target as HTMLElement).closest("button")
          )
            navigate(node);
        }}
      >
        {columnMultiple && isSelectable(node) && (
          <Checkbox
            aria-label={`Select ${node.label}`}
            checked={selectedValues.includes(node.value)}
            indeterminate={
              cascade &&
              !selectedValues.includes(node.value) &&
              (descendants.get(node.value) ?? 0) > 0
            }
            disabled={isDisabled(node) || readOnly}
            onClick={(event) => event.stopPropagation()}
            onChange={() => commit(node)}
          />
        )}
        {node.icon}
        <span style={{ minWidth: 0, flex: 1 }}>
          {props.renderLabel?.(node, itemState(node)) ?? (
            <>
              <span>{node.label}</span>
              {node.description && (
                <small style={{ display: "block", color: "var(--ku-muted)" }}>
                  {node.description}
                </small>
              )}
            </>
          )}
        </span>
        {node.count != null && <span>{node.count}</span>}
        {loader.states.get(node.value)?.error && (
          <Button
            size="small"
            type="text"
            htmlType="button"
            aria-label={`${labels.retry} ${node.label}`}
            onClick={(event) => {
              event.stopPropagation();
              navigate(node);
            }}
          >
            {labels.retry}
          </Button>
        )}
      </span>
    );
  const optionTree = (
    nodes: CascaderNode<T>[],
    nested: boolean,
    seen = new Set<string>(),
  ): NonNullable<AntCascaderProps["options"]> =>
    nodes
      .filter(
        (node) =>
          !seen.has(node.value) &&
          !lib.isCascaderMoreNode(node as CascaderNode),
      )
      .map((node) => {
        const visited = new Set(seen).add(node.value),
          more = lib.isCascaderMoreNode(node as CascaderNode),
          branch = !more && isBranch(node),
          children = nested ? lib.getCascaderChildren(index, node.value) : [];
        return {
          value: node.value,
          label: more ? labels.loadMore : node.label,
          node,
          disabled: isDisabled(node),
          isLeaf: !branch,
          children: children.length
            ? optionTree(children, true, visited)
            : undefined,
          loading: loader.states.get(node.value)?.loading,
        };
      });
  const nativeOptions = optionTree(
    mode === "columns" && !normalized ? index.roots : pagedItems,
    mode === "columns" && !normalized,
  );
  const nativeValues = selectedValues.map((id) =>
    mode === "columns" && !normalized
      ? lib.getCascaderPath(index, id).map((node) => node.value)
      : [id],
  );
  const shared: Omit<
    AntCascaderProps,
    "multiple" | "value" | "defaultValue" | "onChange"
  > & { onChange: (next: unknown) => void } = {
    options: nativeOptions,
    disabled,
    open,
    status: props.invalid ? "error" : undefined,
    allowClear: false,
    changeOnSelect: selectable !== "leaf",
    expandTrigger: props.expandTrigger,
    onOpenChange: (next) => {
      if (!next && suppressSelectionClose.current) {
        suppressSelectionClose.current = false;
        return;
      }
      setOpen(next);
    },
    onChange: (next) => {
      if ((!multiple && props.closeOnSelect === false) || columnMultiple)
        suppressSelectionClose.current = true;
      if (multiple && !columnMultiple) {
        const paths = next as string[][],
          nextIds = paths.map((chain) => chain.at(-1)!).filter(Boolean);
        if (cascade) {
          const changed =
            nextIds.find((id) => !selectedValues.includes(id)) ??
            selectedValues.find((id) => !nextIds.includes(id));
          if (changed) commit(resolveNode(changed));
        } else setSelection(nextIds);
      } else {
        const chain = next as string[];
        if (chain.length) commit(resolveNode(String(chain.at(-1))));
        else setSelection([], "clear");
      }
    },
    loadData: (chosen) => {
      const node = chosen.at(-1)?.node as CascaderNode<T> | undefined;
      if (node && isBranch(node)) navigate(node);
    },
    optionRender: (option) => renderOption(option.node as CascaderNode<T>),
    notFoundContent: <span />,
    styles: { popup: { list: { maxHeight: props.maxHeight ?? 320 } } },
  };
  const engine: GetProps<typeof AntCascader> =
    multiple && !columnMultiple
      ? { ...shared, multiple: true, value: nativeValues }
      : { ...shared, multiple: false, value: nativeValues[0] ?? [] };
  const columns: CascaderColumn<T>[] = [null, ...path.map(resolveNode)].map(
    (parent, depth) => ({
      parent,
      depth,
      items: lib.getCascaderChildren(index, parent?.value),
      activeValue: path[depth] ?? null,
      active: depth === path.length,
    }),
  );
  const controller: Controller<T> = {
    props,
    index,
    path,
    expanded,
    query,
    open,
    selectedValues,
    currentParent,
    renderedItems: pagedItems,
    levelItems,
    deepResults,
    columns,
    treeRows,
    selectedDescendants: descendants,
    loadStates: loader.states,
    searchState: loader.searchState,
    announcement:
      notice ||
      (loader.searchState?.loading
        ? labels.searchingAnnouncement
        : normalized
          ? labels.resultsAnnouncement(
              mode === "tree"
                ? index.all.filter(match).length
                : renderedItems.length,
            )
          : currentParent
            ? labels.levelAnnouncement(
                currentParent.label,
                path.length,
                renderedItems.length,
              )
            : labels.rootAnnouncement(renderedItems.length)),
    mode,
    multiple,
    cascade,
    indicator: props.indicator ?? true,
    searchScope,
    inline,
    invalid: props.invalid ?? false,
    disabled,
    virtualized:
      props.virtualize ??
      renderedItems.length >= (props.virtualizeThreshold ?? 100),
    virtualizeThreshold: props.virtualizeThreshold ?? 100,
    estimateRowSize: props.estimateRowSize ?? 32,
    overscan: props.overscan ?? 8,
    maxHeight: props.maxHeight,
    baseId,
    labels,
    actions: props.actions ?? [],
    hasLoader: loader.active,
    content: findParts(children, ["CascaderContent"])[0],
    engine,
    trigger,
    setOpen,
    setPath,
    pushLevel: (id) => navigate(resolveNode(id)),
    popLevel: () => {
      setPath(path.slice(0, -1), "back");
      setQuery("");
    },
    goToDepth: (depth) => {
      setPath(path.slice(0, depth), "breadcrumb");
      setQuery("");
    },
    setQuery,
    setSelection,
    commit,
    navigate,
    navigateAt,
    toggleExpanded: (id) =>
      setExpanded(
        expanded.has(id)
          ? expandedList.filter((value) => value !== id)
          : [...expandedList, id],
      ),
    setExpanded,
    isBranch,
    isSelectable,
    isDisabled,
    isSelected: (node) => selectedValues.includes(node.value),
    isIndeterminate: (node) =>
      cascade &&
      !selectedValues.includes(node.value) &&
      (descendants.get(node.value) ?? 0) > 0,
    selectedDescendantCount: (node) => descendants.get(node.value) ?? 0,
    resolveNode,
    getIndex: () => index,
    getState: () => controller,
    getHighlighted: () => pagedItems[highlightIndex] ?? null,
    retryLevel: loader.retryLevel,
    invalidateLevel: loader.invalidateLevel,
    loadMore: loader.loadMore,
    setFlyoutOpen: (id, shown) => {
      if (shown) flyouts.current.add(id);
      else flyouts.current.delete(id);
    },
    hasOpenFlyout: () => flyouts.current.size > 0,
    registerVirtualRenderer: () => () => {},
    highlight: {
      index: highlightIndex,
      value: pagedItems[highlightIndex]?.value ?? null,
    },
    setHighlight: setHighlightIndex,
  };
  const {
    open: _panelOpen,
    onOpenChange: _panelOpenChange,
    allowClear: _panelClear,
    status: _panelStatus,
    styles: _panelStyles,
    ...panelProps
  } = engine;
  const nativePanel = (
    <AntCascader.Panel
      {...(panelProps as GetProps<typeof AntCascader.Panel>)}
    />
  );
  return (
    <Context.Provider value={controller as unknown as Controller}>
      <NativeMenu.Provider value={inline ? nativePanel : null}>
        {children}
        {props.name &&
          (selectedValues.length ? selectedValues : [""]).map((id, index) => (
            <input
              key={index}
              type="hidden"
              name={props.name}
              form={props.form}
              value={id}
              disabled={disabled}
              ref={index === 0 ? props.inputRef : undefined}
            />
          ))}
      </NativeMenu.Provider>
    </Context.Provider>
  );
}
mark(Cascader, "Cascader");

export interface CascaderTriggerProps extends Omit<ButtonProps, "children"> {
  children?: ReactNode;
  render?: React.ReactElement;
  showIcon?: boolean;
}
export const CascaderTrigger = mark(
  forwardRef<HTMLButtonElement, CascaderTriggerProps>(function CascaderTrigger(
    { render, showIcon = true, children, ...props },
    ref,
  ) {
    const controller = useController();
    const assign = (node: HTMLButtonElement | null) => {
      controller.trigger.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };
    const triggerProps = {
      ...props,
      htmlType: "button" as const,
      role: "combobox",
      id: props.id ?? controller.props.id,
      disabled: controller.disabled || props.disabled,
      "aria-expanded": controller.open,
      "aria-haspopup": "dialog" as const,
      "aria-invalid": controller.invalid || undefined,
      "data-slot": "cascader-trigger",
    };
    const child =
      render && isValidElement<PartProps>(render) ? (
        React.cloneElement(render, {
          ...triggerProps,
          children: (
            <>
              {children}
              {showIcon && <span aria-hidden="true">⌄</span>}
            </>
          ),
        } as PartProps)
      ) : (
        <Button {...triggerProps}>
          {children}
          {showIcon && <span aria-hidden="true">⌄</span>}
        </Button>
      );
    return (
      <span
        style={{ display: "contents" }}
        ref={(node) =>
          assign(
            node?.querySelector<HTMLButtonElement>(
              "[data-slot=cascader-trigger]",
            ) ?? null,
          )
        }
      >
        <AntCascader
          {...controller.engine}
          className="ant-cascader reui-ant-cascader"
          popupRender={(menu) => (
            <NativeMenu.Provider value={menu}>
              {controller.content ?? (
                <CascaderContent>
                  <CascaderPanel>
                    <CascaderNav>
                      <CascaderInput />
                    </CascaderNav>
                    <CascaderBreadcrumb />
                    <CascaderEmpty />
                    <CascaderList>
                      <CascaderItems />
                    </CascaderList>
                    <CascaderStatus />
                  </CascaderPanel>
                </CascaderContent>
              )}
            </NativeMenu.Provider>
          )}
        >
          {child}
        </AntCascader>
      </span>
    );
  }),
  "CascaderTrigger",
);
export function CascaderContent({
  children,
  side: _side,
  align: _align,
  sideOffset: _offset,
  alignOffset: _alignOffset,
  anchor: _anchor,
  container: _container,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  side?: unknown;
  align?: unknown;
  sideOffset?: number;
  alignOffset?: number;
  anchor?: unknown;
  container?: unknown;
}) {
  const menu = useContext(NativeMenu),
    controller = useController();
  if (!menu) return null;
  return (
    <div
      {...props}
      data-slot="cascader-content"
      role="dialog"
      aria-label={controller.labels.panelLabel}
      style={{ maxWidth: "min(90vw, 900px)", ...props.style }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === "Escape" && !controller.hasOpenFlyout()) {
          event.preventDefault();
          controller.setOpen(false, "escape-key");
        }
      }}
    >
      {children}
    </div>
  );
}
mark(CascaderContent, "CascaderContent");
export function CascaderPanel({
  asChild,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }) {
  if (asChild && isValidElement(children))
    return React.cloneElement(children, {
      ...props,
      "data-slot": "cascader-panel",
    } as PartProps);
  return (
    <div {...props} data-slot="cascader-panel">
      {children}
    </div>
  );
}
mark(CascaderPanel, "CascaderPanel");
export function CascaderNav(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-slot="cascader-nav" />;
}
export function CascaderBack(props: ButtonProps) {
  const controller = useController();
  return (
    <Button
      {...props}
      htmlType="button"
      type="text"
      disabled={!controller.path.length || props.disabled}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) controller.popLevel();
      }}
    >
      {props.children ?? controller.labels.back}
    </Button>
  );
}
export function CascaderBreadcrumb(props: React.HTMLAttributes<HTMLElement>) {
  const controller = useController();
  if (!controller.path.length || controller.mode === "tree") return null;
  return (
    <Breadcrumb
      aria-label={controller.labels.breadcrumbLabel}
      {...props}
      separator={controller.labels.pathSeparator}
      items={[
        {
          title: (
            <Button type="link" onClick={() => controller.goToDepth(0)}>
              {controller.labels.rootLevel}
            </Button>
          ),
        },
        ...controller.path.map((id, depth) => ({
          key: id,
          title: (
            <Button type="link" onClick={() => controller.goToDepth(depth + 1)}>
              {controller.resolveNode(id).label}
            </Button>
          ),
        })),
      ]}
    />
  );
}
export function CascaderInput({
  showBack = true,
  ...props
}: InputProps & { showBack?: boolean }) {
  const controller = useController();
  const searchLabel =
    typeof controller.labels.search === "function"
      ? controller.labels.search(controller.currentParent?.label)
      : controller.labels.search;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {showBack && controller.mode !== "tree" && controller.path.length > 0 && (
        <CascaderBack />
      )}
      <Input
        {...props}
        data-slot="cascader-input"
        aria-activedescendant={
          controller.highlight.value
            ? `${controller.baseId}-option-${controller.highlight.value}`
            : undefined
        }
        aria-label={props["aria-label"] ?? searchLabel}
        placeholder={props.placeholder ?? searchLabel}
        disabled={controller.disabled || props.disabled}
        readOnly={controller.props.readOnly || props.readOnly}
        value={controller.query}
        onChange={(event) => {
          props.onChange?.(event);
          if (!event.defaultPrevented) controller.setQuery(event.target.value);
        }}
        onKeyDown={(event) => {
          props.onKeyDown?.(event);
          if (event.defaultPrevented) return;
          const count = controller.renderedItems.length,
            index = controller.highlight.index;
          if (
            event.key === "Backspace" &&
            !controller.query &&
            controller.path.length
          ) {
            event.preventDefault();
            controller.popLevel();
          }
          if (event.key === "ArrowLeft" && !controller.query) {
            event.preventDefault();
            controller.popLevel();
          }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction = event.key === "ArrowDown" ? 1 : -1;
            for (let offset = 1; offset <= count; offset++) {
              const next = (index + direction * offset + count * 2) % count;
              if (!controller.isDisabled(controller.renderedItems[next])) {
                controller.setHighlight(next);
                break;
              }
            }
          }
          if (event.key === "Enter" || event.key === "ArrowRight") {
            const node = controller.getHighlighted();
            if (node) {
              event.preventDefault();
              if (controller.isBranch(node) && event.key === "ArrowRight")
                controller.navigate(node);
              else controller.commit(node);
            }
          }
        }}
      />
    </div>
  );
}
export function useCascaderSelection<T = unknown>() {
  const controller = useController<T>(),
    selected = controller.selectedValues.map(controller.resolveNode),
    paths = selected.map((node) =>
      lib.getCascaderPath(controller.index, node.value),
    );
  return {
    selected,
    paths,
    first: selected[0] ?? null,
    firstPath: paths[0] ?? [],
    count: selected.length,
    isEmpty: !selected.length,
    multiple: controller.multiple,
    remove: (id: string) =>
      controller.setSelection(
        controller.selectedValues.filter((value) => value !== id),
        "deselect",
      ),
    clear: () => controller.setSelection([], "clear"),
  };
}
export function CascaderValue({
  placeholder,
  display = "path",
  maxSegments = 3,
  collapse = "middle",
  showIcon = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  placeholder?: ReactNode;
  display?: "path" | "leaf" | "count";
  maxSegments?: number;
  collapse?: "middle" | "start" | "none";
  showIcon?: boolean;
}) {
  const controller = useController(),
    selection = useCascaderSelection();
  const trail = selection.firstPath;
  const shown =
    collapse !== "none" && trail.length > maxSegments
      ? collapse === "start"
        ? ["…", ...trail.slice(-(maxSegments - 1)).map((node) => node.label)]
        : [
            trail[0]?.label,
            "…",
            ...(maxSegments > 2 ? trail.slice(-(maxSegments - 2)) : []).map(
              (node) => node.label,
            ),
          ]
      : trail.map((node) => node.label);
  return (
    <span {...props} data-slot="cascader-value">
      {children ??
        (selection.isEmpty ? (
          placeholder
        ) : display === "count" || controller.multiple ? (
          controller.labels.selectedCount(selection.count)
        ) : (
          <>
            {showIcon && selection.first?.icon}
            {display === "leaf"
              ? selection.first?.label
              : shown.join(` ${controller.labels.pathSeparator} `)}
          </>
        ))}
    </span>
  );
}
export function CascaderChips({
  placeholder,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  placeholder?: ReactNode;
  strategy?: "all" | "parent" | "child";
}) {
  const selection = useCascaderSelection();
  return (
    <div {...props} data-slot="cascader-chips">
      {children ??
        (selection.isEmpty
          ? placeholder
          : selection.selected.map((node) => (
              <CascaderChip key={node.value} node={node} />
            )))}
    </div>
  );
}
export function CascaderChip({
  node,
  showRemove = true,
  onRemove,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  node: CascaderNode;
  showRemove?: boolean;
  onRemove?: () => void;
  showPath?: boolean;
  maxSegments?: number;
}) {
  const controller = useController(),
    selection = useCascaderSelection();
  return (
    <Tag
      {...props}
      data-slot="cascader-chip"
      closable={
        showRemove && !controller.disabled && !controller.props.readOnly
      }
      onClose={(event) => {
        event.preventDefault();
        (onRemove ?? (() => selection.remove(node.value)))();
      }}
    >
      {children ?? node.label}
    </Tag>
  );
}
export function CascaderEmpty({
  children,
  skeletonRows: _rows,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { skeletonRows?: number }) {
  const controller = useController(),
    state = controller.query.trim()
      ? (controller.searchState ??
        controller.loadStates.get(controller.path.at(-1) ?? CASCADER_ROOT_KEY))
      : controller.loadStates.get(controller.path.at(-1) ?? CASCADER_ROOT_KEY);
  if (controller.renderedItems.length && !state?.loading && !state?.error)
    return null;
  return (
    <div
      {...props}
      data-slot="cascader-empty"
      data-state={state?.error ? "error" : state?.loading ? "loading" : "empty"}
    >
      {state?.error ? (
        <>
          {controller.labels.error}
          <Button
            htmlType="button"
            onClick={() =>
              controller.retryLevel(controller.path.at(-1) ?? CASCADER_ROOT_KEY)
            }
          >
            {controller.labels.retry}
          </Button>
        </>
      ) : state?.loading ? (
        controller.labels.loading
      ) : (
        (children ?? controller.labels.empty)
      )}
    </div>
  );
}
export function CascaderStatus({
  asChild,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }) {
  const controller = useController();
  if (asChild && isValidElement<PartProps>(children))
    return React.cloneElement(children, {
      ...props,
      role: "status",
      "aria-live": "polite",
      children: children.props.children ?? controller.announcement,
    } as PartProps);
  return (
    <div
      {...props}
      role="status"
      aria-live="polite"
      data-slot="cascader-status"
      className={["sr-only", props.className].filter(Boolean).join(" ")}
    >
      {children ?? controller.announcement}
    </div>
  );
}

export interface CascaderItemProps extends Omit<ButtonProps, "children"> {
  node: CascaderNode;
  index?: number;
  depth?: number;
  showPath?: boolean;
  as?: "option" | "button";
  expanded?: boolean;
  indent?: number;
  branch?: boolean;
  selectable?: boolean;
  selected?: boolean;
  indeterminate?: boolean;
  selectedCount?: number;
  loading?: boolean;
  error?: boolean;
  childrenLoading?: boolean;
  childrenError?: boolean;
  children?: ReactNode;
}
function nodeBody(controller: Controller, node: CascaderNode): ReactNode {
  const state: CascaderItemState = {
    branch: controller.isBranch(node),
    selected: controller.isSelected(node),
    disabled: controller.isDisabled(node),
    depth: controller.index.depthOf.get(node.value) ?? 0,
    count: lib.getCascaderCount(controller.index, node),
    path: lib.getCascaderPath(controller.index, node.value),
  };
  if (controller.props.renderItem)
    return controller.props.renderItem(node, state);
  if (lib.isCascaderMoreNode(node)) {
    const loading = controller.loadStates.get(
      lib.getCascaderMoreParent(node)!,
    )?.loading;
    return loading ? controller.labels.loadingMore : controller.labels.loadMore;
  }
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        minWidth: 0,
        width: "100%",
      }}
    >
      {node.icon}
      <span style={{ flex: 1, minWidth: 0 }}>
        {controller.props.renderLabel?.(node, state) ?? (
          <>
            {node.label}
            {node.description && (
              <small style={{ display: "block", color: "var(--ku-muted)" }}>
                {node.description}
              </small>
            )}
          </>
        )}
      </span>
      {node.count != null && <span>{node.count}</span>}
    </span>
  );
}
export function CascaderItem({
  node,
  showPath,
  as: _as,
  branch: _branch,
  selectable: _selectable,
  selected: _selected,
  indeterminate: _mixed,
  expanded: _expanded,
  indent: _indent,
  index: _index,
  depth: _depth,
  selectedCount: _count,
  loading: _loading,
  error: _error,
  childrenLoading: _childrenLoading,
  childrenError: _childrenError,
  children,
  onClick,
  ...props
}: CascaderItemProps) {
  const controller = useController();
  const blocked = controller.isDisabled(node) || props.disabled;
  return (
    <div
      data-slot="cascader-item"
      data-selected={controller.isSelected(node) || undefined}
      style={{ display: "flex", alignItems: "center", gap: 4 }}
    >
      {controller.multiple && controller.isSelectable(node) && (
        <Checkbox
          aria-label={`Select ${node.label}`}
          checked={controller.isSelected(node)}
          indeterminate={controller.isIndeterminate(node)}
          disabled={blocked}
          onChange={() => controller.commit(node)}
        />
      )}
      <Button
        {...props}
        type="text"
        htmlType="button"
        disabled={blocked}
        aria-pressed={controller.isSelected(node)}
        style={{
          flex: 1,
          minWidth: 0,
          height: "auto",
          minHeight: controller.estimateRowSize,
          justifyContent: "flex-start",
          ...props.style,
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) controller.commit(node);
        }}
      >
        {children ?? nodeBody(controller, node)}
        {showPath && (
          <small>
            {lib
              .getCascaderPath(controller.index, node.value)
              .map((parent) => parent.label)
              .join(` ${controller.labels.pathSeparator} `)}
          </small>
        )}
      </Button>
      {controller.isBranch(node) && (
        <Button
          type="text"
          size="small"
          htmlType="button"
          disabled={blocked}
          aria-label={`${node.label} ${controller.labels.branchAffordance}`}
          onClick={() => controller.navigate(node)}
        >
          ›
        </Button>
      )}
    </div>
  );
}
mark(CascaderItem, "CascaderItem");
function withPaging(
  controller: Controller,
  nodes: CascaderNode[],
  parent: string,
): CascaderNode[] {
  return !controller.query && controller.loadStates.get(parent)?.hasMore
    ? [...nodes, lib.createCascaderMoreNode(parent, nodes.length)]
    : nodes;
}
function NativeTree({
  nodes,
  column,
  virtual = false,
  maxHeight,
}: {
  nodes: CascaderNode[];
  column?: CascaderColumn;
  virtual?: boolean;
  maxHeight?: number | string;
}) {
  const controller = useController();
  const nestedTree = controller.mode === "tree";
  type TreeNode = {
    key: string;
    title: ReactNode;
    disabled: boolean;
    selectable: boolean;
    checkable?: boolean;
    isLeaf: boolean;
    children?: TreeNode[];
  };
  const build = (
    items: CascaderNode[],
    nested: boolean,
    seen = new Set<string>(),
  ): TreeNode[] =>
    items
      .filter(
        (node) =>
          !seen.has(node.value) &&
          (!nestedTree ||
            !controller.query ||
            controller.renderedItems.some((item) => item.value === node.value)),
      )
      .map((node) => ({
        key: node.value,
        title: (
          <span
            id={`${controller.baseId}-option-${node.value}`}
            data-highlighted={
              controller.highlight.value === node.value || undefined
            }
            data-slot="cascader-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              width: "100%",
            }}
          >
            {nodeBody(controller, node)}
            {!nested && controller.isBranch(node) && (
              <Button
                type="text"
                size="small"
                htmlType="button"
                aria-label={`${node.label} ${controller.labels.branchAffordance}`}
                onClick={(event) => {
                  event.stopPropagation();
                  controller.navigateAt(
                    node,
                    column?.depth ?? controller.path.length,
                  );
                }}
              >
                ›
              </Button>
            )}
          </span>
        ),
        disabled: controller.isDisabled(node),
        selectable: !controller.multiple || lib.isCascaderMoreNode(node),
        checkable: controller.isSelectable(node),
        isLeaf: !controller.isBranch(node),
        children:
          nested && controller.isBranch(node)
            ? build(
                withPaging(
                  controller,
                  lib.getCascaderChildren(controller.index, node.value),
                  node.value,
                ),
                true,
                new Set(seen).add(node.value),
              )
            : undefined,
      }));
  const height =
    typeof maxHeight === "number"
      ? maxHeight
      : typeof controller.maxHeight === "number"
        ? controller.maxHeight
        : 320;
  return (
    <Tree
      blockNode
      virtual={virtual}
      height={virtual ? height : undefined}
      checkable={controller.multiple}
      checkStrictly
      selectable
      selectedKeys={controller.selectedValues}
      checkedKeys={{
        checked: controller.selectedValues,
        halfChecked: controller.index.all
          .filter(controller.isIndeterminate)
          .map((node) => node.value),
      }}
      expandedKeys={
        nestedTree
          ? controller.query
            ? controller.renderedItems.map((node) => node.value)
            : [...controller.expanded]
          : []
      }
      onExpand={(keys, info) => {
        if (info.expanded)
          controller.navigate(controller.resolveNode(String(info.node.key)));
        else controller.setExpanded(keys.map(String));
      }}
      treeData={build(nodes, nestedTree)}
      onSelect={(_keys, info) => {
        const node = controller.resolveNode(String(info.node.key));
        if (!controller.isSelectable(node) && controller.isBranch(node))
          controller.navigateAt(node, column?.depth ?? controller.path.length);
        else controller.commit(node);
      }}
      onCheck={(_keys, info) =>
        controller.commit(controller.resolveNode(String(info.node.key)))
      }
    />
  );
}
export interface CascaderItemsProps {
  children?: (node: CascaderNode, index: number) => ReactNode;
}
export function CascaderItems({ children }: CascaderItemsProps) {
  const controller = useController(),
    menu = useContext(NativeMenu);
  if (children)
    return (
      <>
        {controller.renderedItems.map((node, index) => (
          <React.Fragment key={node.value}>
            {children(node, index)}
          </React.Fragment>
        ))}
      </>
    );
  if (controller.mode === "tree")
    return (
      <NativeTree
        nodes={withPaging(
          controller,
          controller.index.roots,
          CASCADER_ROOT_KEY,
        )}
        virtual={controller.virtualized}
      />
    );
  return (
    <>
      {menu}
      <PagingControls />
    </>
  );
}
mark(CascaderItems, "CascaderItems");
export function CascaderVirtualItems({ children }: CascaderItemsProps) {
  const controller = useController();
  if (!controller.virtualized) return <CascaderItems>{children}</CascaderItems>;
  return (
    <NativeTree
      nodes={
        controller.mode === "tree"
          ? withPaging(controller, controller.index.roots, CASCADER_ROOT_KEY)
          : controller.renderedItems
      }
      virtual
    />
  );
}
mark(CascaderVirtualItems, "CascaderVirtualItems");
export function CascaderList({
  children,
  maxHeight,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { maxHeight?: number | string }) {
  return (
    <div
      {...props}
      data-slot="cascader-list"
      style={{
        minHeight: 0,
        maxHeight: maxHeight ?? "min(55vh, 24rem)",
        overflowY: "auto",
        overflowX: "auto",
        ...props.style,
      }}
    >
      {children ?? <CascaderItems />}
    </div>
  );
}
mark(CascaderList, "CascaderList");
export function CascaderColumns({
  columnWidth = 240,
  maxHeight = 320,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  columnWidth?: number | string;
  maxHeight?: number | string;
}) {
  const controller = useController(),
    menu = useContext(NativeMenu);
  return (
    <div
      {...props}
      data-slot="cascader-columns"
      style={{ maxWidth: "90vw", overflowX: "auto", ...props.style }}
    >
      {controller.virtualized ? (
        <div style={{ display: "flex" }}>
          {controller.columns.map((column, index) => (
            <div
              key={column.parent?.value ?? "root"}
              style={{
                width: columnWidth,
                maxHeight,
                overflowY: "auto",
                flexShrink: 0,
              }}
            >
              <NativeTree
                nodes={withPaging(
                  controller,
                  column.items,
                  column.parent?.value ?? CASCADER_ROOT_KEY,
                )}
                column={column}
                virtual
                maxHeight={maxHeight}
              />
            </div>
          ))}
        </div>
      ) : (
        menu
      )}
    </div>
  );
}
export function CascaderColumnPanel({
  column,
  children,
  virtualized,
}: {
  column: CascaderColumn;
  children?: ReactNode;
  virtualized?: boolean;
}) {
  const controller = useController();
  return (
    <div data-slot="cascader-column-panel">
      {children ?? (
        <NativeTree
          nodes={withPaging(
            controller,
            column.items,
            column.parent?.value ?? CASCADER_ROOT_KEY,
          )}
          column={column}
          virtual={virtualized}
        />
      )}
    </div>
  );
}
export const CascaderVirtualColumn = CascaderColumnPanel;
function PagingControls() {
  const controller = useController(),
    key = controller.path.at(-1) ?? CASCADER_ROOT_KEY,
    state = controller.loadStates.get(key);
  return state?.hasMore ? (
    <Button
      htmlType="button"
      loading={state.loading}
      onClick={() => controller.loadMore(key)}
    >
      {state.loading
        ? controller.labels.loadingMore
        : controller.labels.loadMore}
    </Button>
  ) : null;
}
const GroupContext = createContext<string | undefined>(undefined);
export function CascaderGroup({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const id = useId();
  return (
    <GroupContext.Provider value={id}>
      <div
        {...props}
        role="group"
        aria-labelledby={id}
        data-slot="cascader-group"
      >
        {children}
      </div>
    </GroupContext.Provider>
  );
}
export function CascaderLabel(props: React.HTMLAttributes<HTMLDivElement>) {
  const id = useContext(GroupContext);
  return <div {...props} id={props.id ?? id} data-slot="cascader-label" />;
}
export function CascaderSeparator(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      role="separator"
      data-slot="cascader-separator"
      style={{
        height: 1,
        background: "var(--ku-line)",
        marginBlock: 4,
        ...props.style,
      }}
    />
  );
}
export function CascaderFooter({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const controller = useController();
  return (
    <div
      {...props}
      data-slot="cascader-footer"
      aria-label={controller.labels.actionsLabel}
      style={{
        borderTop: "1px solid var(--ku-line)",
        paddingBlock: 4,
        ...props.style,
      }}
    >
      {children ??
        controller.actions.map((action, index) =>
          action.items ? (
            <Dropdown
              key={action.value ?? index}
              menu={{
                items: action.items.map((item, i) => ({
                  key: item.value ?? String(i),
                  label: item.label,
                  icon: item.icon,
                  disabled: item.disabled,
                  onClick: item.onSelect,
                })),
              }}
              trigger={["click"]}
            >
              <Button
                htmlType="button"
                disabled={action.disabled}
                icon={action.icon}
              >
                {action.label}
              </Button>
            </Dropdown>
          ) : (
            <CascaderAction
              key={action.value ?? index}
              icon={action.icon}
              disabled={action.disabled}
              onSelect={action.onSelect}
            >
              {action.label}
            </CascaderAction>
          ),
        )}
    </div>
  );
}
export function CascaderAction({
  onSelect,
  icon,
  children,
  onClick,
  ...props
}: ButtonProps & { onSelect?: () => void }) {
  const controller = useController();
  return (
    <Button
      {...props}
      htmlType="button"
      type="text"
      icon={icon}
      data-slot="cascader-action"
      style={{ width: "100%", justifyContent: "flex-start", ...props.style }}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !props.disabled) onSelect?.();
      }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (event.key === "Escape" && !event.defaultPrevented)
          controller.setOpen(false, "escape-key");
      }}
    >
      {children}
    </Button>
  );
}
interface SubmenuValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  close: () => void;
}
const SubmenuContext = createContext<SubmenuValue | null>(null);
export function useCascaderSubmenu() {
  const value = useContext(SubmenuContext);
  if (!value)
    throw Error("useCascaderSubmenu must be used within CascaderSubmenu");
  return value;
}
export function CascaderSubmenu({ children }: { children?: ReactNode }) {
  const controller = useController(),
    id = useId(),
    [open, setLocalOpen] = useState(false);
  const setOpen = (next: boolean) => {
    setLocalOpen(next);
    controller.setFlyoutOpen(id, next);
  };
  useEffect(() => () => controller.setFlyoutOpen(id, false), [id]);
  const trigger = findParts(children, ["CascaderSubmenuTrigger"])[0],
    content = findParts(children, ["CascaderSubmenuContent"])[0];
  return (
    <SubmenuContext.Provider
      value={{ open, setOpen, close: () => setOpen(false) }}
    >
      <Dropdown
        open={open}
        onOpenChange={setOpen}
        trigger={["click"]}
        placement="rightTop"
        popupRender={() => (
          <div
            role="menu"
            style={{
              background: "var(--ku-surface)",
              padding: 8,
              borderRadius: 8,
              boxShadow: "0 4px 16px #0002",
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                setOpen(false);
              }
            }}
          >
            {content?.props.children}
          </div>
        )}
      >
        {trigger ?? <Button>Actions</Button>}
      </Dropdown>
    </SubmenuContext.Provider>
  );
}
export function CascaderSubmenuTrigger({ children, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      htmlType="button"
      type="text"
      data-slot="cascader-submenu-trigger"
    >
      {children} ›
    </Button>
  );
}
mark(CascaderSubmenuTrigger, "CascaderSubmenuTrigger");
export function CascaderSubmenuContent(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  return <div {...props} data-slot="cascader-submenu-content" />;
}
mark(CascaderSubmenuContent, "CascaderSubmenuContent");
