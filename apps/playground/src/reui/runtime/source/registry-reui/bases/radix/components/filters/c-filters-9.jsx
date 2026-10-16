"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Filters } from "../../reui/filters/filters.jsx";
import { createFilterQuery, createFilterRule, } from "../../reui/filters/filters-query.jsx";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, } from "../../../../../../../adapters/layout.tsx";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, } from "../../../../../../../adapters/selection.tsx";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const asArray = (value) => Array.isArray(value) ? value : [];
const toNumber = (raw) => {
    const parsed = Number(raw.replace(/,/g, ""));
    return raw.trim() === "" || Number.isNaN(parsed) ? undefined : parsed;
};
/**
 * One panel width for the whole example, and it is the shipped text editor's.
 *
 * These four editors replace built-in ones, so they are measured against them
 * rather than against each other: `w-64` is what `FilterTextEditor` sizes its
 * panel to, and a bar whose custom editors each picked their own width would
 * resize its popover every time a different chip was opened. The access code
 * editor below is the one exception, and it says why.
 */
const PANEL = "flex w-64 flex-col gap-2 p-2";
/** The footer the shipped editors draw, to the pixel. */
const FOOTER = "flex items-center justify-end gap-1.5 pt-1";
/** A helper line under a control. Carries the error wording too. */
const HELPER = "text-muted-foreground text-xs";
/* -------------------------------------------------------------------------- */
/*                              Money, one or two                             */
/* -------------------------------------------------------------------------- */
/**
 * An input group carrying the unit, so the value never has to.
 *
 * Storing "$1,200/mo" would make every consumer parse the display back out
 * again. The currency and the period are ADDONS instead: the input holds a bare
 * number, the group says what the number means, and the chip's `renderValue`
 * puts the symbol back for reading.
 *
 * One editor answers both arities. `range` renders two groups joined by
 * `rangeSeparator`, which is the word `valueRange` puts between the bounds on
 * the chip, so the editor and the chip read as one sentence. It used to say
 * `and`, and the chip has never said that.
 */
function AmountEditor({ value, onValueChange, commit, cancel, labels, field, operator, autoFocusProps, }) {
    const dual = operator.arity === "range";
    const tuple = Array.isArray(value) ? value : [];
    const single = typeof value === "number" ? value : undefined;
    const [from, setFrom] = useState(() => dual ? String(tuple[0] ?? "") : String(single ?? ""));
    const [to, setTo] = useState(() => (dual ? String(tuple[1] ?? "") : ""));
    // Takes both halves rather than reading state, because a change handler runs
    // BEFORE its own setState lands: deriving the draft from `from` inside the
    // `from` handler would publish the previous keystroke every time.
    const draft = (low, high) => {
        if (!dual)
            return toNumber(low);
        const start = toNumber(low);
        const end = toNumber(high);
        return start === undefined || end === undefined ? undefined : [start, end];
    };
    const money = (children) => (_jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsx(InputGroupText, { children: "$" }) }), children, _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(InputGroupText, { children: "/mo" }) })] }));
    const onKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            commit(draft(from, to));
        }
        if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            cancel();
        }
    };
    return (_jsxs("div", { className: PANEL, children: [money(_jsx(InputGroupInput, { ...autoFocusProps, inputMode: "decimal", value: from, "aria-label": dual ? labels.rangeFrom(field.label) : field.label, placeholder: field.placeholder, onChange: (event) => {
                    setFrom(event.target.value);
                    onValueChange(draft(event.target.value, to));
                }, onKeyDown: onKeyDown })), dual ? (_jsxs(_Fragment, { children: [_jsx("span", { className: cn(HELPER, "ps-1"), children: labels.rangeSeparator }), money(_jsx(InputGroupInput, { inputMode: "decimal", value: to, "aria-label": labels.rangeTo(field.label), onChange: (event) => {
                            setTo(event.target.value);
                            onValueChange(draft(from, event.target.value));
                        }, onKeyDown: onKeyDown }))] })) : null, _jsxs("div", { className: FOOTER, children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: cancel, children: labels.discard }), _jsx(Button, { size: "sm", onClick: () => commit(draft(from, to)), children: labels.apply })] })] }));
}
/* -------------------------------------------------------------------------- */
/*                              A pasted term list                            */
/* -------------------------------------------------------------------------- */
/** A textarea, so a list of terms is pasted rather than typed one at a time. */
function KeywordList({ value, onValueChange, commit, cancel, autoFocusProps, labels, field, }) {
    const current = asArray(value);
    const [text, setText] = useState(() => current.join("\n"));
    const hintId = useId();
    const parse = (raw) => raw
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    return (_jsxs("div", { className: PANEL, children: [_jsx(Textarea, { ...autoFocusProps, rows: 4, value: text, "aria-label": field.label, "aria-describedby": hintId, placeholder: field.placeholder, onChange: (event) => {
                    setText(event.target.value);
                    onValueChange(parse(event.target.value));
                }, onKeyDown: (event) => {
                    // Enter is a newline here, so the commit key has to be the modified
                    // one. Escape still discards, as it does in every other editor.
                    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                        event.preventDefault();
                        commit(parse(text));
                    }
                    if (event.key === "Escape") {
                        event.preventDefault();
                        event.stopPropagation();
                        cancel();
                    }
                } }), _jsx("span", { id: hintId, className: HELPER, children: "One per line" }), _jsxs("div", { className: FOOTER, children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: cancel, children: labels.discard }), _jsx(Button, { size: "sm", onClick: () => commit(parse(text)), children: labels.apply })] })] }));
}
/* -------------------------------------------------------------------------- */
/*                             A fixed width code                             */
/* -------------------------------------------------------------------------- */
/**
 * A value with a known LENGTH, so completion is the commit.
 *
 * There is no Apply here and no Escape handler either: the control knows when
 * the value is whole, so `onComplete` closes the popover, and an incomplete code
 * is never written into the query at all. Dismissing by clicking away discards
 * the draft the same way `cancel` would.
 *
 * The one panel here that is NOT `PANEL`. Six slots are a measured object whose
 * width is the style's own control size, from mira's 28px to sera's 40px, so
 * the panel takes its width from the control rather than the other way round.
 * At `w-64` the slots would sit in a pool of empty space in mira and overflow
 * it in sera.
 */
function AccessCodeEditor({ value, onValueChange, commit, field, autoFocusProps, }) {
    return (_jsx("div", { className: "p-2", children: _jsxs(InputOTP, { ...autoFocusProps, maxLength: 6, value: typeof value === "string" ? value : "", "aria-label": field.label, 
            // The control defaults to a numeric keypad, which would be wrong for a
            // code that carries letters, so both the mode and the accepted set are
            // stated rather than inherited.
            inputMode: "text", pattern: "^[a-zA-Z0-9]*$", onChange: (next) => onValueChange(next.toUpperCase()), onComplete: (next) => commit(next.toUpperCase()), children: [_jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 0 }), _jsx(InputOTPSlot, { index: 1 }), _jsx(InputOTPSlot, { index: 2 })] }), _jsx(InputOTPSeparator, {}), _jsxs(InputOTPGroup, { children: [_jsx(InputOTPSlot, { index: 3 }), _jsx(InputOTPSlot, { index: 4 }), _jsx(InputOTPSlot, { index: 5 })] })] }) }));
}
/* -------------------------------------------------------------------------- */
/*                            A validated free text                           */
/* -------------------------------------------------------------------------- */
const DOMAIN = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i;
/**
 * Free text that refuses to commit while it is wrong.
 *
 * Validation belongs to the editor, not to the primitive: what counts as a
 * legal value is a field's own business, and a core that tried to own it would
 * need a schema language nobody asked for. The editor simply declines to call
 * `commit`, so an invalid draft can never reach the query and the chip never
 * shows a value the backend will reject.
 */
function DomainEditor({ value, onValueChange, commit, cancel, labels, field, autoFocusProps, }) {
    const [text, setText] = useState(() => typeof value === "string" ? value : "");
    const hintId = useId();
    const invalid = text.trim() !== "" && !DOMAIN.test(text.trim());
    const submit = () => {
        if (invalid || text.trim() === "")
            return;
        commit(text.trim().toLowerCase());
    };
    return (_jsxs("div", { className: PANEL, children: [_jsx(Input, { ...autoFocusProps, value: text, "aria-label": field.label, "aria-invalid": invalid, "aria-describedby": hintId, placeholder: field.placeholder, onChange: (event) => {
                    setText(event.target.value);
                    onValueChange(event.target.value);
                }, onKeyDown: (event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        submit();
                    }
                    if (event.key === "Escape") {
                        event.preventDefault();
                        event.stopPropagation();
                        cancel();
                    }
                } }), _jsx("span", { id: hintId, "aria-live": "polite", className: cn(HELPER, invalid && "text-destructive"), children: invalid ? "Needs a dot, as in acme.com" : "example.com" }), _jsxs("div", { className: FOOTER, children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: cancel, children: labels.discard }), _jsx(Button, { size: "sm", disabled: invalid, onClick: submit, children: labels.apply })] })] }));
}
/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */
const fields = [
    {
        id: "spend",
        label: "Monthly spend",
        type: "number",
        // Ships with a range operator selected, so the editor opens as two groups.
        defaultOperator: "between",
        placeholder: "0",
        editor: AmountEditor,
        renderValue: ({ value, labels }) => Array.isArray(value)
            ? labels.valueRange(`$${Number(value[0]).toLocaleString()}`, `$${Number(value[1]).toLocaleString()}`)
            : typeof value === "number"
                ? `$${value.toLocaleString()}`
                : "any amount",
        icon: (_jsx(IconPlaceholder, { lucide: "BanknoteIcon", tabler: "IconCash", hugeicons: "MoneyBag02Icon", phosphor: "MoneyIcon", remixicon: "RiMoneyDollarCircleLine" })),
    },
    {
        id: "keywords",
        label: "Keywords",
        type: "multiselect",
        defaultOperator: "has_any_of",
        placeholder: "onboarding\nchurn\nrenewal",
        editor: KeywordList,
        // The first term, plus what it stands in for. A pasted list collapses to
        // "5 selected" by default, which names none of them; the leading term with
        // an overflow count beside it is the same treatment c-filters-1 gives a
        // stack of people, and it fits in the same space.
        renderValue: ({ values }) => values.length === 0 ? ("none") : (_jsxs("span", { className: "flex items-center gap-1.5", children: [String(values[0]), values.length > 1 ? (_jsxs("span", { className: "text-muted-foreground text-xs tabular-nums", children: ["+", values.length - 1] })) : null] })),
        icon: (_jsx(IconPlaceholder, { lucide: "TagsIcon", tabler: "IconTags", hugeicons: "Tag01Icon", phosphor: "TagIcon", remixicon: "RiPriceTag3Line" })),
    },
    {
        id: "accessCode",
        label: "Access code",
        type: "text",
        // Only the two operators a fixed width code can answer. A `contains` on a
        // six character code would be a filter nobody means.
        operators: [
            { value: "is", label: "is", inverse: "is_not" },
            { value: "is_not", label: "is not", inverse: "is" },
        ],
        defaultOperator: "is",
        editor: AccessCodeEditor,
        renderValue: ({ value }) => typeof value === "string" && value ? (_jsx("span", { className: "font-mono tracking-wider", children: value })) : ("any code"),
        icon: (_jsx(IconPlaceholder, { lucide: "KeyRoundIcon", tabler: "IconKey", hugeicons: "SquareLock02Icon", phosphor: "KeyIcon", remixicon: "RiKey2Line" })),
    },
    {
        id: "domain",
        label: "Domain",
        type: "text",
        defaultOperator: "is",
        placeholder: "acme.com",
        editor: DomainEditor,
        icon: (_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeSimpleIcon", remixicon: "RiGlobalLine" })),
    },
];
export default function Pattern() {
    const [query, setQuery] = useState(() => createFilterQuery([
        createFilterRule({
            id: "seed-1",
            path: ["spend"],
            operator: "between",
            value: [500, 2500],
        }),
        createFilterRule({
            id: "seed-2",
            path: ["accessCode"],
            operator: "is",
            value: "R7K2QX",
        }),
        /*
          THREE chips, not four, and the arithmetic decides which three.
  
          The bar is a wrapping row whose chips sit in an inner toolbar, and a
          flex child that wraps internally claims its whole line, so a fourth chip
          that spills does not simply take a second row: it hands the toolbar both
          rows and strands Add filter and Clear alone on a third. At the width a
          catalog card gives this bar (1128px) the four chips run 1164 to 1314
          across the styles, against a budget of 977 to 1036.
  
          Keywords is the one that goes, and the arithmetic picks it rather than
          taste. Spend is the widest chip in every style, but it is the input
          group this example leads with, so it stays and one of the other three
          goes. Only dropping Keywords clears the budget in all eight: spend, code
          and domain run 839 to 943. Keeping Keywords instead wraps in four styles
          (with domain) or six (with code). Its editor and its overflow display
          are one press of Add filter away.
        */
        createFilterRule({
            id: "seed-3",
            path: ["domain"],
            operator: "is",
            value: "acme.com",
        }),
    ]));
    return (_jsx(Filters, { fields: fields, query: query, onQueryChange: setQuery, showClear: true }));
}
