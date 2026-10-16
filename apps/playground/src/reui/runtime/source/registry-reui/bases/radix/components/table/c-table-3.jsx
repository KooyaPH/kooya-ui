import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
const tasks = [
    {
        id: "1",
        name: "Design homepage",
        status: "Completed",
        statusColor: "bg-green-500/10 text-green-700",
    },
    {
        id: "2",
        name: "Implement API",
        status: "In Progress",
        statusColor: "bg-yellow-500/10 text-yellow-700",
    },
    {
        id: "3",
        name: "Write tests",
        status: "Pending",
        statusColor: "bg-gray-500/10 text-gray-700",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-lg flex-col", children: _jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Task" }), _jsx(TableHead, { className: "text-right", children: "Status" })] }) }), _jsx(TableBody, { children: tasks.map((task) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: task.name }), _jsx(TableCell, { className: "text-right", children: _jsx("span", { className: `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${task.statusColor}`, children: task.status }) })] }, task.id))) })] }) }) }) }));
}
