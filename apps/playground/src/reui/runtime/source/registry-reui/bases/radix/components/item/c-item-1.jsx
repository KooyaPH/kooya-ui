import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Item, ItemContent, ItemDescription, ItemTitle, } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-md flex-col gap-2", children: [_jsx(Item, { children: _jsxs(ItemContent, { children: [_jsx(ItemTitle, { children: "Default Item" }), _jsx(ItemDescription, { children: "A simple item with title and description." })] }) }), _jsx(Item, { variant: "outline", children: _jsxs(ItemContent, { children: [_jsx(ItemTitle, { children: "Outline Item" }), _jsx(ItemDescription, { children: "An outlined item with visible border." })] }) }), _jsx(Item, { variant: "muted", children: _jsxs(ItemContent, { children: [_jsx(ItemTitle, { children: "Muted Item" }), _jsx(ItemDescription, { children: "A muted item with subtle background." })] }) })] }));
}
