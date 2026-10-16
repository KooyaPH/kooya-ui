import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, } from "../../../../../../../adapters/selection.tsx";
const americas = [
    { value: "est", label: "EST", offset: "UTC-5" },
    { value: "cst", label: "CST", offset: "UTC-6" },
    { value: "pst", label: "PST", offset: "UTC-8" },
];
const europe = [
    { value: "gmt", label: "GMT", offset: "UTC+0" },
    { value: "cet", label: "CET", offset: "UTC+1" },
];
const asia = [
    { value: "ist", label: "IST", offset: "UTC+5:30" },
    { value: "jst", label: "JST", offset: "UTC+9" },
];
const allItems = [
    { label: "Select a timezone", value: null },
    ...americas.map((tz) => ({
        label: `${tz.label} (${tz.offset})`,
        value: tz.value,
    })),
    ...europe.map((tz) => ({
        label: `${tz.label} (${tz.offset})`,
        value: tz.value,
    })),
    ...asia.map((tz) => ({
        label: `${tz.label} (${tz.offset})`,
        value: tz.value,
    })),
];
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(Select, { children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a timezone" }) }), _jsxs(SelectContent, { position: "popper", children: [_jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Americas" }), americas.map((tz) => (_jsx(SelectItem, { value: tz.value, children: _jsxs("span", { className: "flex items-center justify-between gap-3", children: [_jsx("span", { children: tz.label }), _jsx("span", { className: "text-muted-foreground text-xs", children: tz.offset })] }) }, tz.value)))] }), _jsx(SelectSeparator, {}), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Europe" }), europe.map((tz) => (_jsx(SelectItem, { value: tz.value, children: _jsxs("span", { className: "flex items-center justify-between gap-3", children: [_jsx("span", { children: tz.label }), _jsx("span", { className: "text-muted-foreground text-xs", children: tz.offset })] }) }, tz.value)))] }), _jsx(SelectSeparator, {}), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Asia" }), asia.map((tz) => (_jsx(SelectItem, { value: tz.value, children: _jsxs("span", { className: "flex items-center justify-between gap-3", children: [_jsx("span", { children: tz.label }), _jsx("span", { className: "text-muted-foreground text-xs", children: tz.offset })] }) }, tz.value)))] })] })] }) }));
}
