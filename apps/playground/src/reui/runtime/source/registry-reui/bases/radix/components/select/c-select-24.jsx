import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const frontend = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
];
const backend = [
    { label: "Node.js", value: "nodejs" },
    { label: "Python", value: "python" },
    { label: "Go", value: "go" },
];
const allItems = [
    { label: "Select a framework", value: null },
    ...frontend,
    ...backend,
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a framework" }) }), _jsxs(SelectContent, { position: "popper", children: [_jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Frontend" }), frontend.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value)))] }), _jsx(SelectSeparator, {}), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Backend" }), backend.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value)))] })] })] }) }));
}
