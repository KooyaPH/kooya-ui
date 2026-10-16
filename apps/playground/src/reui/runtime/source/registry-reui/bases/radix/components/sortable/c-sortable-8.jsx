"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Sortable, SortableItem, SortableItemHandle, } from "../../reui/sortable.jsx";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const defaultItems = [
    { id: "1", title: "Draft the release notes" },
    { id: "2", title: "Review open pull requests" },
    { id: "3", title: "Update the changelog" },
    { id: "4", title: "Cut the release tag" },
    { id: "5", title: "Announce on the blog" },
];
// Simulated backend. Swap for a tRPC mutation or fetch in your app. Rejects
// roughly one in four calls so the optimistic rollback is easy to see.
function persistOrder(meta) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.25) {
                reject(new Error("Network error"));
            }
            else {
                resolve();
            }
        }, 700);
    });
}
export default function Pattern() {
    const [items, setItems] = useState(defaultItems);
    // Sortable commits once, on drop. `onValueChange` has already applied the
    // new order optimistically; meta.previousValue is the order before the drag.
    const handleValueCommit = (next, meta) => {
        const previous = meta.previousValue;
        const moved = next[meta.overIndex];
        toast.promise(persistOrder(meta), {
            loading: "Saving order...",
            success: () => `Saved "${moved.title}" at position ${meta.overIndex + 1}`,
            error: () => {
                // Roll back to the pre-drag order. In production prefer a refetch here
                // so a newer drag is not clobbered by this snapshot.
                setItems(previous);
                return "Could not save the new order. Restored.";
            },
        });
    };
    return (_jsx("div", { className: "mx-auto w-full max-w-xl p-6", children: _jsx(Sortable, { value: items, onValueChange: setItems, onValueCommit: handleValueCommit, getItemValue: (item) => item.id, strategy: "vertical", className: "space-y-2", children: items.map((item, index) => (_jsx(SortableItem, { value: item.id, children: _jsxs("div", { className: "bg-background border-border flex items-center gap-3 rounded-md border p-3", children: [_jsx(SortableItemHandle, { className: "text-muted-foreground hover:text-foreground", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "h-4 w-4" }) }), _jsx(Badge, { variant: "outline", className: "tabular-nums", children: index + 1 }), _jsx("span", { className: "min-w-0 flex-1 truncate text-sm font-medium", children: item.title })] }) }, item.id))) }) }));
}
