"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { Checkbox } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldLabel } from "../../../../../../../adapters/layout.tsx";
const data = [
    {
        id: "admin",
        label: "Administration",
        children: [
            {
                id: "user-management",
                label: "User Management",
                children: [
                    { id: "view-users", label: "View Users" },
                    { id: "create-users", label: "Create Users" },
                    { id: "edit-users", label: "Edit Users" },
                ],
            },
            {
                id: "role-management",
                label: "Role Management",
                children: [
                    { id: "view-roles", label: "View Roles" },
                    { id: "assign-roles", label: "Assign Roles" },
                ],
            },
        ],
    },
];
export default function Pattern() {
    const [checked, setChecked] = useState({
        "view-users": true,
        "create-users": true,
        "view-roles": true,
    });
    // Get all leaf nodes for a given node
    const getLeafIds = useCallback((item) => {
        if (!item.children)
            return [item.id];
        return item.children.flatMap(getLeafIds);
    }, []);
    // Check if a node is fully checked
    const isChecked = useCallback((item) => {
        const leafIds = getLeafIds(item);
        return leafIds.every((id) => checked[id]);
    }, [checked, getLeafIds]);
    // Check if a node is indeterminate
    const isIndeterminate = useCallback((item) => {
        const leafIds = getLeafIds(item);
        const checkedCount = leafIds.filter((id) => checked[id]).length;
        return checkedCount > 0 && checkedCount < leafIds.length;
    }, [checked, getLeafIds]);
    const toggle = (item) => {
        const leafIds = getLeafIds(item);
        const shouldCheck = !isChecked(item);
        const nextChecked = { ...checked };
        leafIds.forEach((id) => {
            nextChecked[id] = shouldCheck;
        });
        setChecked(nextChecked);
    };
    const renderItem = (item, level = 0) => {
        return (_jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs(Field, { orientation: "horizontal", children: [_jsx(Checkbox, { id: item.id, checked: isIndeterminate(item) ? "indeterminate" : isChecked(item), onCheckedChange: () => toggle(item) }), _jsx(FieldLabel, { htmlFor: item.id, className: level === 0 ? "font-semibold" : "text-sm", children: item.label })] }), item.children && (_jsx("div", { className: "ml-7 flex flex-col gap-3", children: item.children.map((child) => renderItem(child, level + 1)) }))] }, item.id));
    };
    return (_jsx("div", { className: "mx-auto flex flex-col gap-3", children: data.map((item) => renderItem(item)) }));
}
