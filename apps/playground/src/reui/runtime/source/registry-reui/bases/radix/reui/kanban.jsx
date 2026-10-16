/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, } from "react";
import { closestCenter, defaultDropAnimationSideEffects, DndContext, DragOverlay, getFirstCollision, KeyboardSensor, MeasuringStrategy, MouseSensor, pointerWithin, rectIntersection, TouchSensor, useSensor, useSensors, } from "@dnd-kit/core";
import { arrayMove, defaultAnimateLayoutChanges, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Slot } from "radix-ui";
import { createPortal } from "react-dom";
import { cn } from "cn";
const KanbanContext = createContext({
    columns: {},
    setColumns: () => { },
    getItemId: () => "",
    columnIds: [],
    activeId: null,
    setActiveId: () => { },
    findContainer: () => undefined,
    isColumn: () => false,
    modifiers: undefined,
});
const ColumnContext = createContext({
    attributes: {},
    listeners: undefined,
    isDragging: false,
    disabled: false,
});
const ItemContext = createContext({
    listeners: undefined,
    isDragging: false,
    disabled: false,
});
const IsOverlayContext = createContext(false);
const animateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true });
const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: "0.4",
            },
        },
    }),
};
/**
 * Client-mount gate for the `createPortal` call in KanbanOverlay, which needs
 * `document.body` and so must not run on the server or during hydration.
 *
 * A never-notifying subscription makes `useSyncExternalStore` return the server
 * snapshot (`false`) while rendering on the server and while hydrating, then the
 * client snapshot (`true`) once mounted - the same gate the previous
 * `useLayoutEffect(() => setMounted(true), [])` provided, minus the extra render
 * pass that `react-hooks/set-state-in-effect` flags. All three functions are
 * module-scoped so their identities stay stable; an inline `getSnapshot` is the
 * classic cause of an infinite re-subscribe loop.
 */
const subscribeToNothing = () => () => { };
const getIsMounted = () => true;
const getIsMountedOnServer = () => false;
const MOUSE_SENSOR_OPTIONS = { activationConstraint: { distance: 10 } };
const TOUCH_SENSOR_OPTIONS = {
    activationConstraint: { delay: 250, tolerance: 5 },
};
const KEYBOARD_SENSOR_OPTIONS = {
    coordinateGetter: sortableKeyboardCoordinates,
};
const MEASURING_CONFIG = {
    droppable: { strategy: MeasuringStrategy.Always },
};
function Kanban({ value, onValueChange, getItemValue, children, className, asChild = false, onMove, onValueCommit, restoreOnCancel = false, onDragStart, onDragEnd, onDragCancel, accessibility, modifiers, ...props }) {
    const columns = value;
    const setColumns = onValueChange;
    const [activeId, setActiveId] = useState(null);
    // Always-current mirrors so the drag handlers can read fresh values without
    // widening their dependency arrays (keeps handler identity stable). The
    // handlers only fire after commit, so syncing the mirrors in an effect is
    // safe. Assigning to a ref during render breaks under concurrent rendering.
    const valueRef = useRef(value);
    const getItemValueRef = useRef(getItemValue);
    useLayoutEffect(() => {
        valueRef.current = value;
        getItemValueRef.current = getItemValue;
    });
    const dragOriginRef = useRef(null);
    const sensors = useSensors(useSensor(MouseSensor, MOUSE_SENSOR_OPTIONS), useSensor(TouchSensor, TOUCH_SENSOR_OPTIONS), useSensor(KeyboardSensor, KEYBOARD_SENSOR_OPTIONS));
    const columnIds = useMemo(() => {
        const keys = Object.keys(columns);
        if (process.env.NODE_ENV !== "production") {
            const seen = new Set();
            for (const key of keys) {
                for (const item of columns[key]) {
                    const itemId = getItemValue(item);
                    if (seen.has(itemId)) {
                        console.warn(`[Kanban] Duplicate item id "${itemId}". Item ids must be unique across all columns, or drag and drop will misbehave.`);
                        break;
                    }
                    seen.add(itemId);
                }
            }
        }
        return keys;
    }, [columns, getItemValue]);
    const isColumn = useCallback((id) => columnIds.includes(id), [columnIds]);
    const findContainer = useCallback((id) => {
        if (isColumn(id))
            return id;
        return columnIds.find((key) => columns[key].some((item) => getItemValue(item) === id));
    }, [columns, columnIds, getItemValue, isColumn]);
    // The droppable under the pointer, not the one the dragged rect overlaps
    // most: in the gap between columns that overlap flips with every live-preview
    // move, and each flip re-runs dragOver until React bails out.
    const lastOverIdRef = useRef(null);
    const collisionDetection = useCallback((args) => {
        if (isColumn(args.active.id)) {
            return closestCenter({
                ...args,
                droppableContainers: args.droppableContainers.filter((container) => isColumn(container.id)),
            });
        }
        // Keyboard drags carry no pointer.
        if (!args.pointerCoordinates)
            return rectIntersection(args);
        let overId = getFirstCollision(pointerWithin(args), "id");
        if (overId != null) {
            // Over a column's empty space: resolve to its closest item, if any.
            if (isColumn(overId)) {
                const itemIds = new Set(columns[overId].map(getItemValue));
                overId =
                    closestCenter({
                        ...args,
                        droppableContainers: args.droppableContainers.filter((container) => itemIds.has(container.id)),
                    })[0]?.id ?? overId;
            }
            lastOverIdRef.current = overId;
            return [{ id: overId }];
        }
        // Between droppables: hold the last target so the preview stays put.
        return lastOverIdRef.current != null
            ? [{ id: lastOverIdRef.current }]
            : rectIntersection(args);
    }, [columns, getItemValue, isColumn]);
    const commitChange = useCallback((finalValue, event, kind) => {
        if (!onValueCommit)
            return;
        const origin = dragOriginRef.current;
        if (!origin)
            return;
        const id = event.active.id;
        if (kind === "column") {
            const keys = Object.keys(finalValue);
            const overIndex = keys.indexOf(id);
            if (overIndex === -1 || overIndex === origin.index)
                return;
            onValueCommit(finalValue, {
                kind: "column",
                event,
                activeContainer: id,
                activeIndex: origin.index,
                overContainer: String(event.over?.id ?? id),
                overIndex,
                previousValue: origin.value,
            });
            return;
        }
        const getId = getItemValueRef.current;
        let overContainer;
        let overIndex = -1;
        for (const key of Object.keys(finalValue)) {
            const found = finalValue[key].findIndex((item) => getId(item) === id);
            if (found !== -1) {
                overContainer = key;
                overIndex = found;
                break;
            }
        }
        if (overContainer === undefined)
            return;
        if (overContainer === origin.container && overIndex === origin.index) {
            return;
        }
        onValueCommit(finalValue, {
            kind: "item",
            event,
            activeContainer: origin.container ?? overContainer,
            activeIndex: origin.index,
            overContainer,
            overIndex,
            previousValue: origin.value,
        });
    }, [onValueCommit]);
    const handleDragStart = useCallback((event) => {
        lastOverIdRef.current = null;
        setActiveId(event.active.id);
        onDragStart?.(event);
        if (onValueCommit || restoreOnCancel) {
            const snapshot = valueRef.current;
            const id = event.active.id;
            const keys = Object.keys(snapshot);
            if (keys.includes(id)) {
                dragOriginRef.current = {
                    value: snapshot,
                    container: id,
                    index: keys.indexOf(id),
                };
            }
            else {
                const getId = getItemValueRef.current;
                let container;
                let index = -1;
                for (const key of keys) {
                    const found = snapshot[key].findIndex((item) => getId(item) === id);
                    if (found !== -1) {
                        container = key;
                        index = found;
                        break;
                    }
                }
                dragOriginRef.current = { value: snapshot, container, index };
            }
        }
    }, [onDragStart, onValueCommit, restoreOnCancel]);
    const handleDragOver = useCallback((event) => {
        if (onMove) {
            return;
        }
        const { active, over } = event;
        if (!over)
            return;
        if (isColumn(active.id))
            return;
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);
        if (!activeContainer || !overContainer) {
            return;
        }
        if (activeContainer !== overContainer) {
            const activeItems = columns[activeContainer];
            const overItems = columns[overContainer];
            const activeIndex = activeItems.findIndex((item) => getItemValue(item) === active.id);
            let overIndex = overItems.findIndex((item) => getItemValue(item) === over.id);
            // If dropping on the column itself, not an item
            if (isColumn(over.id)) {
                overIndex = overItems.length;
            }
            const newActiveItems = [...activeItems];
            const newOverItems = [...overItems];
            const [movedItem] = newActiveItems.splice(activeIndex, 1);
            newOverItems.splice(overIndex, 0, movedItem);
            setColumns({
                ...columns,
                [activeContainer]: newActiveItems,
                [overContainer]: newOverItems,
            });
        }
        else {
            const container = activeContainer;
            const activeIndex = columns[container].findIndex((item) => getItemValue(item) === active.id);
            const overIndex = columns[container].findIndex((item) => getItemValue(item) === over.id);
            if (activeIndex !== overIndex) {
                setColumns({
                    ...columns,
                    [container]: arrayMove(columns[container], activeIndex, overIndex),
                });
            }
        }
    }, [findContainer, getItemValue, isColumn, setColumns, columns, onMove]);
    const handleDragCancel = useCallback((event) => {
        const origin = dragOriginRef.current;
        if (restoreOnCancel && origin && !onMove) {
            // Escape/cancel: undo the live-preview reshuffle applied during dragOver.
            setColumns(origin.value);
        }
        else if (onValueCommit && origin && !onMove) {
            // No restore requested: the live preview stays visible, so commit it.
            commitChange(valueRef.current, event, "item");
        }
        dragOriginRef.current = null;
        lastOverIdRef.current = null;
        setActiveId(null);
        onDragCancel?.(event);
    }, [
        restoreOnCancel,
        onMove,
        onValueCommit,
        setColumns,
        onDragCancel,
        commitChange,
    ]);
    const handleDragEnd = useCallback((event) => {
        const { active, over } = event;
        lastOverIdRef.current = null;
        setActiveId(null);
        onDragEnd?.(event);
        if (!over) {
            // Released over nothing. In default mode the live preview during
            // dragOver may have already moved the item, so commit the current value.
            commitChange(valueRef.current, event, "item");
            dragOriginRef.current = null;
            return;
        }
        // Handle item move callback
        if (onMove && !isColumn(active.id)) {
            const activeContainer = findContainer(active.id);
            const overContainer = findContainer(over.id);
            if (activeContainer && overContainer) {
                const activeIndex = columns[activeContainer].findIndex((item) => getItemValue(item) === active.id);
                const overIndex = isColumn(over.id)
                    ? columns[overContainer].length
                    : columns[overContainer].findIndex((item) => getItemValue(item) === over.id);
                onMove({
                    event,
                    activeContainer,
                    activeIndex,
                    overContainer,
                    overIndex,
                });
            }
            // In onMove mode the consumer owns applying the item move, so do not
            // fire onValueCommit for item moves; column reorders still commit below.
            dragOriginRef.current = null;
            return;
        }
        // Handle column reordering
        if (isColumn(active.id) && isColumn(over.id)) {
            const activeIndex = columnIds.indexOf(active.id);
            const overIndex = columnIds.indexOf(over.id);
            if (activeIndex !== overIndex) {
                const newOrder = arrayMove(Object.keys(columns), activeIndex, overIndex);
                const newColumns = {};
                newOrder.forEach((key) => {
                    newColumns[key] = columns[key];
                });
                setColumns(newColumns);
                commitChange(newColumns, event, "column");
            }
            dragOriginRef.current = null;
            return;
        }
        // A column drag that ends over a non-column droppable is not an item move.
        if (isColumn(active.id)) {
            dragOriginRef.current = null;
            return;
        }
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);
        // Handle item reordering within the same column
        if (activeContainer &&
            overContainer &&
            activeContainer === overContainer) {
            const container = activeContainer;
            const activeIndex = columns[container].findIndex((item) => getItemValue(item) === active.id);
            const overIndex = columns[container].findIndex((item) => getItemValue(item) === over.id);
            if (activeIndex !== overIndex) {
                const newColumns = {
                    ...columns,
                    [container]: arrayMove(columns[container], activeIndex, overIndex),
                };
                setColumns(newColumns);
                commitChange(newColumns, event, "item");
            }
            else {
                // Cross-column moves are applied during dragOver, so the current
                // value is already final.
                commitChange(columns, event, "item");
            }
        }
        else {
            commitChange(columns, event, "item");
        }
        dragOriginRef.current = null;
    }, [
        columnIds,
        columns,
        findContainer,
        getItemValue,
        isColumn,
        setColumns,
        onMove,
        onDragEnd,
        commitChange,
    ]);
    const contextValue = useMemo(() => ({
        columns,
        setColumns,
        getItemId: getItemValue,
        columnIds,
        activeId,
        setActiveId,
        findContainer,
        isColumn,
        modifiers,
    }), [
        columns,
        setColumns,
        getItemValue,
        columnIds,
        activeId,
        findContainer,
        isColumn,
        modifiers,
    ]);
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(KanbanContext.Provider, { value: contextValue, children: _jsx(DndContext, { sensors: sensors, modifiers: modifiers, accessibility: accessibility, measuring: MEASURING_CONFIG, collisionDetection: collisionDetection, onDragStart: handleDragStart, onDragOver: handleDragOver, onDragEnd: handleDragEnd, onDragCancel: handleDragCancel, children: _jsx(Comp, { "data-slot": "kanban", "data-dragging": activeId !== null, className: cn(activeId !== null && "cursor-grabbing!", className), ...props, children: children }) }) }));
}
function KanbanBoard({ className, asChild = false, children, ...props }) {
    const { columnIds } = useContext(KanbanContext);
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(SortableContext, { items: columnIds, strategy: rectSortingStrategy, children: _jsx(Comp, { "data-slot": "kanban-board", className: cn("grid auto-rows-fr gap-4 sm:grid-cols-3", className), ...props, children: children }) }));
}
function KanbanColumn({ value, className, asChild = false, disabled, children, ...props }) {
    const isOverlay = useContext(IsOverlayContext);
    const { setNodeRef, transform, transition, attributes, listeners, isDragging: isSortableDragging, } = useSortable({
        id: value,
        disabled: disabled || isOverlay,
        animateLayoutChanges,
    });
    const { activeId, isColumn } = useContext(KanbanContext);
    const isColumnDragging = activeId ? isColumn(activeId) : false;
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    const Comp = asChild ? Slot.Root : "div";
    if (isOverlay) {
        return (_jsx(ColumnContext.Provider, { value: {
                attributes: {},
                listeners: undefined,
                isDragging: true,
                disabled: false,
            }, children: _jsx(Comp, { "data-slot": "kanban-column", "data-value": value, "data-dragging": true, className: cn("group/kanban-column flex flex-col", className), ...props, children: children }) }));
    }
    return (_jsx(ColumnContext.Provider, { value: { attributes, listeners, isDragging: isColumnDragging, disabled }, children: _jsx(Comp, { "data-slot": "kanban-column", "data-value": value, "data-dragging": isSortableDragging, "data-disabled": disabled, ref: setNodeRef, style: style, className: cn("group/kanban-column flex flex-col", isSortableDragging && "z-50 opacity-50", disabled && "opacity-50", className), ...props, children: children }) }));
}
function KanbanColumnHandle({ className, asChild = false, cursor = true, children, ...props }) {
    const { attributes, listeners, isDragging, disabled } = useContext(ColumnContext);
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, { "data-slot": "kanban-column-handle", "data-dragging": isDragging, "data-disabled": disabled, ...attributes, ...listeners, className: cn(
        /* Keyboard focus shows it too. focus-within would also match the focus
           a mousedown gives the handle, so it would stay shown after a drag. */
        "opacity-0 transition-opacity group-hover/kanban-column:opacity-100 focus-visible:opacity-100 has-focus-visible:opacity-100", cursor && (isDragging ? "cursor-grabbing!" : "cursor-grab!"), className), ...props, children: children }));
}
function KanbanItem({ value, className, asChild = false, disabled, children, ...props }) {
    const isOverlay = useContext(IsOverlayContext);
    const { setNodeRef, transform, transition, attributes, listeners, isDragging: isSortableDragging, } = useSortable({
        id: value,
        disabled: disabled || isOverlay,
        animateLayoutChanges,
    });
    const { activeId, isColumn } = useContext(KanbanContext);
    const isItemDragging = activeId ? !isColumn(activeId) : false;
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    const Comp = asChild ? Slot.Root : "div";
    if (isOverlay) {
        return (_jsx(ItemContext.Provider, { value: { listeners: undefined, isDragging: true, disabled: false }, children: _jsx(Comp, { "data-slot": "kanban-item", "data-value": value, "data-dragging": true, className: cn(className), ...props, children: children }) }));
    }
    return (_jsx(ItemContext.Provider, { value: { listeners, isDragging: isItemDragging, disabled }, children: _jsx(Comp, { "data-slot": "kanban-item", "data-value": value, "data-dragging": isSortableDragging, "data-disabled": disabled, ref: setNodeRef, style: style, ...attributes, onKeyDown: (event) => {
                if (event.target === event.currentTarget)
                    listeners?.onKeyDown?.(event);
            }, className: cn(isSortableDragging && "z-50 opacity-50", disabled && "opacity-50", className), ...props, children: children }) }));
}
function KanbanItemHandle({ className, asChild = false, cursor = true, children, ...props }) {
    const { listeners, isDragging, disabled } = useContext(ItemContext);
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, { "data-slot": "kanban-item-handle", "data-dragging": isDragging, "data-disabled": disabled, ...listeners, className: cn(cursor && (isDragging ? "cursor-grabbing!" : "cursor-grab!"), className), ...props, children: children }));
}
function KanbanColumnContent({ value, className, asChild = false, children, ...props }) {
    const { columns, getItemId } = useContext(KanbanContext);
    const itemIds = useMemo(() => {
        const items = columns[value];
        if (!items) {
            throw new Error(`KanbanColumnContent: column "${value}" was not found in the Kanban value. ` +
                `Available columns: ${Object.keys(columns).join(", ") || "(none)"}.`);
        }
        return items.map(getItemId);
    }, [columns, getItemId, value]);
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(SortableContext, { items: itemIds, strategy: verticalListSortingStrategy, children: _jsx(Comp, { "data-slot": "kanban-column-content", className: cn("flex flex-col gap-2", className), ...props, children: children }) }));
}
function KanbanOverlay({ children, className, ...props }) {
    const { activeId, isColumn, modifiers } = useContext(KanbanContext);
    const mounted = useSyncExternalStore(subscribeToNothing, getIsMounted, getIsMountedOnServer);
    const variant = activeId ? (isColumn(activeId) ? "column" : "item") : "item";
    const content = activeId && children
        ? typeof children === "function"
            ? children({ value: activeId, variant })
            : children
        : null;
    if (!mounted)
        return null;
    return createPortal(_jsx(DragOverlay, { dropAnimation: dropAnimationConfig, modifiers: modifiers, className: cn("z-50", activeId && "cursor-grabbing", className), ...props, children: _jsx(IsOverlayContext.Provider, { value: true, children: content }) }), document.body);
}
export { Kanban, KanbanBoard, KanbanColumn, KanbanColumnHandle, KanbanItem, KanbanItemHandle, KanbanColumnContent, KanbanOverlay, };
