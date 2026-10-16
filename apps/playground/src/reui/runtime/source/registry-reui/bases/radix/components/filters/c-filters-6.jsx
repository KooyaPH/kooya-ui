"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Filters } from "../../reui/filters/filters.jsx";
import { createFilterQuery, createFilterRule, } from "../../reui/filters/filters-query.jsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Slider } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const SCORE = {
    min: 0,
    max: 100,
    step: 1,
    format: (value) => String(value),
};
const PRICE = {
    min: 0,
    max: 5000,
    step: 50,
    format: (value) => `$${value.toLocaleString()}`,
};
/**
 * A control with its own pointer model, as the value editor.
 *
 * The editor renders into a plain panel, never into a combobox, so a slider
 * keeps its own drag, its own arrow keys and its own focus ring. It receives
 * the shared services (`options`, `labels`) whether it uses them or not, and it
 * decides for itself what commit means: here the draft moves with the thumb and
 * only Apply writes it into the query, so a controlled parent is not asked to
 * re-render once per pixel.
 */
function makeSliderEditor({ min, max, step, format }) {
    function SliderEditor({ value, onValueChange, commit, cancel, labels, field, operator, autoFocusProps, }) {
        // Arity decides the shape: a range operator carries two bounds, everything
        // else carries one. The same editor answers both, so a field does not need
        // a second component to be filtered "between 30 and 70".
        const dual = operator.arity === "range";
        const current = dual
            ? Array.isArray(value)
                ? value
                : [min, max]
            : typeof value === "number"
                ? value
                : min;
        const reading = dual
            ? labels.valueRange(format(current[0]), format(current[1]))
            : format(current);
        // On the slider rather than on the panel, and that is the whole of it: the
        // arrows are the thumb's, so Enter is free to mean Apply for the keyboard
        // user who is standing on it, while the footer's own buttons keep answering
        // their own Enter. Escape stops here too, so a dialog around the bar does
        // not close along with the popover.
        const onKeyDown = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                commit(current);
                return;
            }
            if (event.key !== "Escape")
                return;
            event.preventDefault();
            event.stopPropagation();
            cancel();
        };
        return (
        // `gap-2 p-2` is the primitive's own editor panel, and the width sits in
        // the band its built-ins use (w-56 for a number, w-64 for text), so the
        // popover does not resize between a shipped editor and this one.
        _jsxs("div", { className: "flex w-64 flex-col gap-2 p-2", children: [_jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [_jsx("span", { className: "text-muted-foreground min-w-0 truncate text-xs font-medium", children: field.label }), _jsx("span", { className: "shrink-0 text-sm font-medium tabular-nums", children: reading })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-muted-foreground shrink-0 text-xs tabular-nums", children: format(min) }), _jsx(Slider, { ...autoFocusProps, className: "min-w-0 flex-1", 
                            // An ARRAY even for the single-value operators. The shadcn Slider
                            // counts its thumbs off the value it is handed, and a bare number is
                            // not a list, so it fell back to `[min, max]` and drew a SECOND
                            // thumb on top of the first: one slider with two tab stops, both
                            // moving the same number.
                            value: dual ? current : [current], min: min, max: max, step: step, 
                            // How the value comes back is the whole of the twin difference.
                            // Base UI types this callback as `number | readonly number[]`
                            // whatever it was handed, so the base twin casts on the way back;
                            // the Radix slider types it `number[]` and needs no assertion.
                            // Either twin then digs the single thumb out of the array.
                            onValueChange: (next) => onValueChange(dual ? next : next[0]), onKeyDown: onKeyDown }), _jsx("span", { className: "text-muted-foreground shrink-0 text-xs tabular-nums", children: format(max) })] }), _jsxs("div", { className: "flex items-center justify-end gap-1.5 pt-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: cancel, children: labels.discard }), _jsx(Button, { size: "sm", onClick: () => commit(current), children: labels.apply })] })] }));
    }
    return SliderEditor;
}
/* -------------------------------------------------------------------------- */
/*                             The closed chip                                */
/* -------------------------------------------------------------------------- */
/** The selected span as a rail. `bg-muted` and `bg-primary` are the Slider's own. */
function MiniTrack({ min, max, from, to, }) {
    const span = max - min;
    // Total on purpose: a restored query can hold whatever was persisted, and a
    // non-finite bound here would reach the style attribute as "left: NaN%".
    const at = (value) => span <= 0 || !Number.isFinite(value)
        ? 0
        : Math.min(Math.max((value - min) / span, 0), 1);
    const start = at(from);
    const end = Math.max(start, at(to));
    return (_jsx("span", { "aria-hidden": "true", className: "bg-muted relative inline-block h-1 w-8 shrink-0 rounded-full", children: _jsx("span", { className: "bg-primary absolute inset-y-0 rounded-full", style: { left: `${start * 100}%`, right: `${(1 - end) * 100}%` } }) }));
}
/**
 * The one reading behind both halves of the chip.
 *
 * The rail is drawn from it and the accessible name is spoken from it, so the
 * parse that turns a stored value into a band happens once rather than twice
 * and the two cannot drift.
 *
 * The context is typed as the primitive hands it over, `unknown` value and all,
 * and narrowed here: declaring the parameter as the narrower shape would put a
 * contravariant function in a `renderValue` slot that promises to accept any
 * value.
 */
function readBand({ min, max, format }, { value, operator, labels }) {
    if (Array.isArray(value)) {
        const from = Number(value[0]);
        const to = Number(value[1]);
        return { from, to, text: labels.valueRange(format(from), format(to)) };
    }
    if (typeof value !== "number")
        return null;
    // Which side of the value the matching range lies on: "at least $1,500"
    // fills from the value up, "at most" fills from the floor to it.
    const upward = operator.value === "gte" || operator.value === "gt";
    return {
        from: upward ? value : min,
        to: upward ? max : value,
        text: format(value),
    };
}
/**
 * A slider readout on the chip, not just the number the slider produced.
 *
 * "$1,500" alone says nothing about where in the field's range the rule sits,
 * which is the one thing a slider is picked for, so the closed chip carries a
 * miniature of the control behind it and the scale that miniature is measured
 * against follows the value as SECONDARY text - the muted, smaller companion
 * the first example sets beside its stacked avatars. `renderValue` returns a
 * NODE, so all of it costs the primitive nothing.
 *
 * `valueText` is the same reading as a sentence, and it is supplied for a
 * reason: the built-in name is `String(value)`, which announces "1500" where
 * the chip shows "$1,500", so a field that formats its value owns the
 * accessible name too. The scale is left out of THAT half, because it describes
 * a miniature a screen reader user is not being shown.
 */
function makeSliderDisplay(scale, empty) {
    const { min, max, format } = scale;
    return {
        renderValue: (context) => {
            const band = readBand(scale, context);
            if (!band)
                return empty;
            return (_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(MiniTrack, { min: min, max: max, from: band.from, to: band.to }), _jsxs("span", { className: "flex items-baseline gap-1", children: [_jsx("span", { className: "tabular-nums", children: band.text }), band.text.includes(format(max)) ? null : (_jsxs("span", { className: "text-muted-foreground text-xs tabular-nums", children: ["/ ", format(max)] }))] })] }));
        },
        valueText: (context) => readBand(scale, context)?.text ?? empty,
    };
}
const ScoreSlider = makeSliderEditor(SCORE);
const scoreDisplay = makeSliderDisplay(SCORE, "any score");
const PriceSlider = makeSliderEditor(PRICE);
const priceDisplay = makeSliderDisplay(PRICE, "any amount");
const fields = [
    {
        id: "score",
        label: "Health score",
        type: "range",
        defaultOperator: "between",
        // A component, so no registration is needed. A string here would look the
        // editor up in the `editors` map instead, and a concrete editor assigns
        // directly: `FilterEditorRef` widens for it.
        editor: ScoreSlider,
        renderValue: scoreDisplay.renderValue,
        valueText: scoreDisplay.valueText,
        icon: (_jsx(IconPlaceholder, { lucide: "ActivityIcon", tabler: "IconActivity", hugeicons: "PulseRectangle01Icon", phosphor: "PulseIcon", remixicon: "RiPulseLine" })),
    },
    {
        id: "mrr",
        label: "Monthly spend",
        type: "number",
        // Single-value operators, so the same editor renders one thumb.
        defaultOperator: "gte",
        editor: PriceSlider,
        renderValue: priceDisplay.renderValue,
        valueText: priceDisplay.valueText,
        icon: (_jsx(IconPlaceholder, { lucide: "BanknoteIcon", tabler: "IconCash", hugeicons: "MoneyBag02Icon", phosphor: "MoneyIcon", remixicon: "RiMoneyDollarCircleLine" })),
    },
    {
        id: "account",
        label: "Account",
        type: "text",
        icon: (_jsx(IconPlaceholder, { lucide: "Building2Icon", tabler: "IconBuilding", hugeicons: "Building02Icon", phosphor: "BuildingsIcon", remixicon: "RiBuilding2Line" })),
    },
];
export default function Pattern() {
    const [query, setQuery] = useState(() => createFilterQuery([
        createFilterRule({
            id: "seed-1",
            path: ["score"],
            operator: "between",
            value: [30, 70],
        }),
    ]));
    return (_jsx(Filters, { fields: fields, query: query, onQueryChange: setQuery, showClear: true }));
}
