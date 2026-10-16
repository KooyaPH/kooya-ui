"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
function Table({ className, ...props }) {
    return (_jsx("div", { "data-slot": "table-container", className: "cn-table-container", children: _jsx("table", { "data-slot": "table", className: cn("cn-table", className), ...props }) }));
}
function TableHeader({ className, ...props }) {
    return (_jsx("thead", { "data-slot": "table-header", className: cn("cn-table-header", className), ...props }));
}
function TableBody({ className, ...props }) {
    return (_jsx("tbody", { "data-slot": "table-body", className: cn("cn-table-body", className), ...props }));
}
function TableFooter({ className, ...props }) {
    return (_jsx("tfoot", { "data-slot": "table-footer", className: cn("cn-table-footer", className), ...props }));
}
function TableRow({ className, ...props }) {
    return (_jsx("tr", { "data-slot": "table-row", className: cn("cn-table-row has-aria-expanded:bg-muted/50", className), ...props }));
}
function TableHead({ className, ...props }) {
    return (_jsx("th", { "data-slot": "table-head", className: cn("cn-table-head", className), ...props }));
}
function TableCell({ className, ...props }) {
    return (_jsx("td", { "data-slot": "table-cell", className: cn("cn-table-cell", className), ...props }));
}
function TableCaption({ className, ...props }) {
    return (_jsx("caption", { "data-slot": "table-caption", className: cn("cn-table-caption", className), ...props }));
}
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, };
