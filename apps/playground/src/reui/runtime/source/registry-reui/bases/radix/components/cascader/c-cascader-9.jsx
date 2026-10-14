"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Cascader, CascaderContent, CascaderEmpty, CascaderList, CascaderPanel, CascaderStatus, CascaderTrigger, } from "../../../../../../../adapters/cascader.tsx";
import { CascaderItems } from "../../../../../../../adapters/cascader.tsx";
import { CascaderBreadcrumb, CascaderInput, CascaderNav, CascaderValue, } from "../../../../../../../adapters/cascader.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
const menu = [
    {
        value: "food",
        label: "Food",
        children: [
            {
                value: "food.mains",
                label: "Mains",
                children: [
                    { value: "food.mains.pasta", label: "Pasta" },
                    { value: "food.mains.curry", label: "Curry" },
                    { value: "food.mains.risotto", label: "Risotto" },
                ],
            },
            { value: "food.sides", label: "Sides" },
            { value: "food.salads", label: "Salads" },
        ],
    },
    {
        value: "drinks",
        label: "Drinks",
        children: [
            { value: "drinks.coffee", label: "Coffee" },
            { value: "drinks.tea", label: "Tea" },
            { value: "drinks.juice", label: "Juice" },
        ],
    },
    {
        value: "breakfast",
        label: "Breakfast",
        children: [
            { value: "breakfast.pastry", label: "Pastries" },
            { value: "breakfast.eggs", label: "Eggs" },
        ],
    },
    {
        value: "desserts",
        label: "Desserts",
        children: [
            { value: "desserts.cake", label: "Cake" },
            { value: "desserts.icecream", label: "Ice cream" },
        ],
    },
    {
        value: "snacks",
        label: "Snacks",
        children: [
            { value: "snacks.crisps", label: "Crisps" },
            { value: "snacks.nuts", label: "Nuts" },
        ],
    },
    {
        value: "specials",
        label: "Specials",
        children: [
            { value: "specials.soup", label: "Soup of the day" },
            { value: "specials.roast", label: "Sunday roast" },
        ],
    },
    {
        value: "kids",
        label: "Kids menu",
        children: [
            { value: "kids.pasta", label: "Pasta" },
            { value: "kids.fruit", label: "Fruit plate" },
        ],
    },
    { value: "water", label: "Still water" },
];
/**
 * Value to label for every node, flattened once at module scope so the readout
 * can name a path without walking the tree on each render.
 */
const LABELS = new Map();
function indexLabels(nodes) {
    for (const node of nodes) {
        LABELS.set(node.value, node.label);
        if (node.children)
            indexLabels(node.children);
    }
}
indexLabels(menu);
/**
 * Every piece of state the cascader holds is driven from outside here: the
 * selection, the navigation path, the query and the open state. The buttons
 * write the path and the selection directly, and the readout below prints all
 * four, so the controlled contract is observable rather than merely claimed.
 *
 * Both path buttons also OPEN the popup, and that is the point rather than a
 * convenience. The path is only ever drawn inside the panel, so writing it
 * while the popup is shut changes state nothing renders; and a press on a
 * button outside the popup dismisses an open panel before the handler runs, so
 * a handler that only writes the path looks dead in both states. Reopening is
 * what makes an external navigation visible at all.
 *
 * `onValueChange` also hands over a details object, so the change line is built
 * straight from the committed node and its ancestor chain rather than looking
 * the raw value back up in `menu`.
 */
export default function Pattern() {
    const [value, setValue] = useState("");
    const [path, setPath] = useState([]);
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [lastChange, setLastChange] = useState("(none yet)");
    // The query is cleared alongside the jump for the same reason the primitive's
    // own breadcrumb and back button clear it: a filter typed against one level
    // has no meaning against the level you just landed on.
    const goTo = (next) => {
        setPath(next);
        setQuery("");
        setOpen(true);
    };
    const here = path.length
        ? path.map((entry) => LABELS.get(entry) ?? entry).join(" / ")
        : "root";
    return (_jsxs("div", { className: "flex w-full flex-col items-center gap-3 p-4", children: [_jsxs(Cascader, { items: menu, value: value, onValueChange: (next, details) => {
                    setValue(next);
                    setLastChange(`${details.reason}: ${details.path.map((node) => node.label).join(" / ")}`);
                }, path: path, onPathChange: setPath, inputValue: query, onInputValueChange: setQuery, open: open, onOpenChange: setOpen, revealSelected: false, children: [_jsx(CascaderTrigger, { "aria-label": "Menu item", render: _jsx(Button, { variant: "outline", className: "w-72 justify-between gap-2 font-normal" }), children: _jsx(CascaderValue, { placeholder: "Pick an item" }) }), _jsx(CascaderContent, { className: "w-72", children: _jsxs(CascaderPanel, { children: [_jsx(CascaderNav, { children: _jsx(CascaderInput, {}) }), _jsx(CascaderBreadcrumb, {}), _jsx(CascaderEmpty, {}), _jsx(CascaderList, { children: _jsx(CascaderItems, {}) }), _jsx(CascaderStatus, {})] }) })] }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => goTo(["food", "food.mains"]), children: "Jump to Mains" }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => goTo([]), children: "Reset to root" }), _jsx(Button, { size: "sm", variant: "outline", disabled: !value, onClick: () => {
                            setValue("");
                            // Written from outside, so `onValueChange` never fires and the
                            // change line would otherwise still name the node just dropped.
                            setLastChange("cleared from outside");
                        }, children: "Clear selection" })] }), _jsxs("dl", { className: "text-muted-foreground grid w-72 grid-cols-[3.5rem_1fr] gap-x-3 gap-y-1 font-mono text-xs", children: [_jsx("dt", { children: "path" }), _jsx("dd", { className: "text-foreground truncate", children: here }), _jsx("dt", { children: "query" }), _jsx("dd", { className: "text-foreground truncate", children: query || "(empty)" }), _jsx("dt", { children: "open" }), _jsx("dd", { className: "text-foreground", children: open ? "true" : "false" }), _jsx("dt", { children: "change" }), _jsx("dd", { className: "text-foreground truncate", children: lastChange })] })] }));
}
