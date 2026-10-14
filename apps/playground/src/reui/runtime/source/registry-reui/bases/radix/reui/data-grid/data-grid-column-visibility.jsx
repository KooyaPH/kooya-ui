"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getColumnHeaderLabel, useDataGrid, } from "./data-grid.jsx";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
function DataGridColumnVisibility({ table, trigger, }) {
    const { i18n } = useDataGrid();
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: trigger }), _jsx(DropdownMenuContent, { align: "end", className: "min-w-[150px]", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { className: "font-medium", children: i18n.labels.toggleColumns }), table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                            return (_jsx(DropdownMenuCheckboxItem, { 
                                // Title-casing is for a raw column id only; an authored
                                // label keeps its own casing.
                                className: getColumnHeaderLabel(column) === column.id
                                    ? "capitalize"
                                    : undefined, checked: column.getIsVisible(), onSelect: (event) => event.preventDefault(), onCheckedChange: (value) => column.toggleVisibility(!!value), children: getColumnHeaderLabel(column) }, column.id));
                        })] }) })] }));
}
export { DataGridColumnVisibility };
