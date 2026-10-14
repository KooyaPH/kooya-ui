"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Sortable, SortableItem, SortableItemHandle, } from "../../reui/sortable.jsx";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const defaultOptionGroups = [
    {
        id: "1",
        name: "Colors",
        values: [
            { id: "1-1", value: "White" },
            { id: "1-2", value: "Black" },
            { id: "1-3", value: "Grey" },
            { id: "1-4", value: "Green" },
        ],
    },
    {
        id: "2",
        name: "Sizes",
        values: [
            { id: "2-1", value: "Small" },
            { id: "2-2", value: "Medium" },
            { id: "2-3", value: "Large" },
        ],
    },
    {
        id: "3",
        name: "Materials",
        values: [
            { id: "3-1", value: "Cotton" },
            { id: "3-2", value: "Polyester" },
            { id: "3-3", value: "Wool" },
        ],
    },
];
export default function Pattern() {
    const [optionGroups, setOptionGroups] = useState(defaultOptionGroups);
    const handleParentReorder = (newGroups) => {
        setOptionGroups(newGroups);
        toast.success("Option groups reordered successfully!", {
            description: `${newGroups.map((group, index) => `${index + 1}. ${group.name}`).join(", ")}`,
        });
    };
    const getParentValue = (group) => group.id;
    const getChildValue = (value) => value.id;
    const handleChildReorder = (groupId, newValues) => {
        setOptionGroups((prev) => prev.map((group) => group.id === groupId ? { ...group, values: newValues } : group));
        toast.success("Values reordered successfully!", {
            description: newValues
                .map((value, index) => `${index + 1}. ${value.value}`)
                .join(", "),
        });
    };
    return (_jsx("div", { className: "mx-auto w-full max-w-sm space-y-6 p-6", children: _jsx(Sortable, { value: optionGroups, onValueChange: handleParentReorder, getItemValue: getParentValue, strategy: "vertical", className: "space-y-4", children: optionGroups.map((group) => (_jsx(SortableItem, { value: group.id, children: _jsx(Card, { className: "p-2", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { className: "mb-2 flex items-center gap-2", children: [_jsx(SortableItemHandle, { className: "text-muted-foreground hover:text-foreground cursor-grab", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "h-4 w-4" }) }), _jsx("h3", { className: "text-sm font-semibold", children: group.name })] }), _jsx(Sortable, { value: group.values, onValueChange: (newValues) => handleChildReorder(group.id, newValues), getItemValue: getChildValue, strategy: "vertical", className: "space-y-2", children: group.values.map((value) => (_jsx(SortableItem, { value: value.id, children: _jsxs("div", { className: "border-border rounded-md flex items-center gap-2 border p-1.5", children: [_jsx(SortableItemHandle, { className: "text-muted-foreground hover:text-foreground cursor-grab", children: _jsx(IconPlaceholder, { lucide: "GripVerticalIcon", tabler: "IconGripVertical", hugeicons: "DragDropVerticalIcon", phosphor: "DotsSixVerticalIcon", remixicon: "RiDraggable", className: "h-4 w-4" }) }), _jsx("span", { className: "flex-1 text-sm", children: value.value })] }) }, value.id))) })] }) }) }, group.id))) }) }));
}
