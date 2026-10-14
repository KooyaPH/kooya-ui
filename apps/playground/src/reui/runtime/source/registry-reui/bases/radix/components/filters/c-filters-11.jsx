"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { Filters } from "../../reui/filters/filters.jsx";
import { countFilterRules, createFilterGroup, createFilterQuery, createFilterRule, isFilterRule, } from "../../reui/filters/filters-query.jsx";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/* -------------------------------------------------------------------------- */
/*                              Value rendering                               */
/* -------------------------------------------------------------------------- */
/**
 * The builder draws the SAME value output the chip row does.
 *
 * A condition in the advanced builder is the same sentence as a chip, so its
 * value cell gets the same treatment: a coloured dot for a state, a ranked
 * glyph for a priority, faces for people. Left as plain labels it read as a
 * form, and the one thing the builder is for - taking in a whole query at a
 * glance - is exactly what a column of identical grey words defeats.
 */
function Dot({ className }) {
    return _jsx("span", { className: cn("size-2 shrink-0 rounded-full", className) });
}
function Person({ img, name }) {
    return (_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: `https://randomuser.me/api/portraits/${img}.jpg`, alt: name }), _jsx(AvatarFallback, { className: "text-[10px]", children: name
                    .split(" ")
                    .map((part) => part[0])
                    .join("") })] }));
}
const STATUSES = [
    { value: "todo", label: "To do", dot: "bg-zinc-400" },
    { value: "in-progress", label: "In progress", dot: "bg-amber-500" },
    { value: "blocked", label: "Blocked", dot: "bg-destructive" },
    { value: "done", label: "Done", dot: "bg-emerald-500" },
];
// A ramp rather than a set of labels, so the tones run one way: cool to hot,
// rising in chroma the whole way, which is what puts the four in an order the
// eye can take without reading the words.
const PRIORITIES = [
    { value: "low", label: "Low", tone: "bg-emerald-500" },
    { value: "medium", label: "Medium", tone: "bg-yellow-500" },
    { value: "high", label: "High", tone: "bg-orange-500" },
    { value: "urgent", label: "Urgent", tone: "bg-rose-500" },
];
const TEAM = [
    { value: "ada", label: "Ada Lovelace", img: "women/1" },
    { value: "grace", label: "Grace Hopper", img: "women/2" },
    { value: "alan", label: "Alan Turing", img: "men/3" },
    { value: "katherine", label: "Katherine Johnson", img: "women/4" },
    { value: "edsger", label: "Edsger Dijkstra", img: "men/5" },
    { value: "barbara", label: "Barbara Liskov", img: "women/6" },
];
const LABELS = [
    { value: "bug", label: "Bug" },
    { value: "feature", label: "Feature" },
    { value: "chore", label: "Chore" },
    { value: "regression", label: "Regression" },
];
/** Swatches then a count, so several picks stay one glance rather than a list. */
function StackedDots({ options, palette, empty, }) {
    const swatch = (value) => {
        const entry = palette.find((candidate) => candidate.value === value);
        return entry?.dot ?? entry?.tone ?? "bg-muted-foreground";
    };
    if (options.length === 0)
        return _jsx(_Fragment, { children: empty });
    if (options.length === 1) {
        return (_jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [_jsx(Dot, { className: swatch(options[0].value) }), _jsx("span", { className: "truncate", children: options[0].label })] }));
    }
    return (_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "flex items-center", children: options.slice(0, 4).map((option) => (_jsx("span", { className: cn("ring-background -ml-1 size-2.5 rounded-full ring-2 first:ml-0", swatch(option.value)) }, option.value))) }), _jsx("span", { className: "text-muted-foreground text-xs tabular-nums", children: options.length })] }));
}
/** Faces, overlapped, which is what an assignee filter looks like everywhere. */
function StackedPeople({ options }) {
    if (options.length === 0)
        return _jsx(_Fragment, { children: "anyone" });
    return (_jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [_jsx(AvatarGroup, { children: options.slice(0, 3).map((option) => {
                    const person = TEAM.find((entry) => entry.value === option.value);
                    return (_jsx(Person, { img: person?.img ?? "men/1", name: option.label }, option.value));
                }) }), options.length === 1 ? (_jsx("span", { className: "truncate", children: options[0].label })) : (_jsx("span", { className: "text-muted-foreground text-xs tabular-nums", children: options.length }))] }));
}
// `column` is carried through untouched: the primitive never reads it, and it
// exists for exactly the moment below, where the query is walked back out. A
// picker says "Title" and a path says `title`, but the table says `subject`,
// so without the mapping every rule would come out naming a column the storage
// does not have. A schema whose ids already ARE the storage names can leave it
// off entirely and the walk falls back to the path.
const fields = [
    {
        id: "title",
        label: "Title",
        type: "text",
        column: "subject",
        icon: (_jsx(IconPlaceholder, { lucide: "TypeIcon", tabler: "IconLetterT", hugeicons: "TextIcon", phosphor: "TextTIcon", remixicon: "RiText" })),
    },
    {
        id: "status",
        label: "Status",
        type: "select",
        defaultOperator: "is_any_of",
        options: STATUSES.map((entry) => ({
            value: entry.value,
            label: entry.label,
            icon: _jsx(Dot, { className: entry.dot }),
        })),
        column: "state",
        renderValue: ({ options }) => (_jsx(StackedDots, { options: options, palette: STATUSES, empty: "any status" })),
        // Four options, so the built-in editor drops its search box: the input is
        // still there and still owns the keyboard, it is only visually hidden, and
        // typing narrows the list exactly as it does in a native select.
        searchable: false,
        icon: (_jsx(IconPlaceholder, { lucide: "CircleDotIcon", tabler: "IconCircleDot", hugeicons: "RecordIcon", phosphor: "CircleIcon", remixicon: "RiRecordCircleLine" })),
    },
    {
        id: "labels",
        label: "Labels",
        type: "multiselect",
        options: LABELS,
        column: "label_slugs",
        icon: (_jsx(IconPlaceholder, { lucide: "TagsIcon", tabler: "IconTags", hugeicons: "Tag01Icon", phosphor: "TagIcon", remixicon: "RiPriceTag3Line" })),
    },
    {
        id: "priority",
        label: "Priority",
        // A task has ONE priority, so this is a select whose VALUE happens to be a
        // list: `is any of` asks about that single rank, where the `has any of` a
        // multiselect defaults to asks about a set the row does not have.
        type: "select",
        defaultOperator: "is_any_of",
        searchable: false,
        options: PRIORITIES.map((entry) => ({
            value: entry.value,
            label: entry.label,
            icon: _jsx(Dot, { className: entry.tone }),
        })),
        column: "priority",
        renderValue: ({ options }) => (_jsx(StackedDots, { options: options, palette: PRIORITIES, empty: "any priority" })),
        icon: (_jsx(IconPlaceholder, { lucide: "SignalIcon", tabler: "IconAntennaBars5", hugeicons: "ChartUpIcon", phosphor: "CellSignalHighIcon", remixicon: "RiSignalTowerLine" })),
    },
    {
        id: "assignee",
        label: "Assignee",
        type: "multiselect",
        placeholder: "Search people...",
        // The option panel, widened by the field that needs it. The built-in menu
        // defaults to `w-48`, which holds a status or a tag; these rows carry a
        // 20px face and a full name, and at the default width a two-part name
        // truncates. `className` lands last in the panel's own `cn`, so this wins.
        className: "w-56",
        options: TEAM.map((person) => ({
            value: person.value,
            label: person.label,
            icon: _jsx(Person, { img: person.img, name: person.label }),
        })),
        column: "assignee_ids",
        // A list of PEOPLE carries no semantic order, unlike the two ramps above.
        pinSelected: true,
        sortSelected: "label",
        renderValue: ({ options }) => _jsx(StackedPeople, { options: options }),
        icon: (_jsx(IconPlaceholder, { lucide: "UserRoundCheckIcon", tabler: "IconUserCheck", hugeicons: "UserCheck01Icon", phosphor: "UserCheckIcon", remixicon: "RiUserFollowLine" })),
    },
    {
        id: "estimate",
        label: "Estimate",
        type: "number",
        defaultOperator: "lte",
        column: "story_points",
        icon: (_jsx(IconPlaceholder, { lucide: "HashIcon", tabler: "IconHash", hugeicons: "HashtagIcon", phosphor: "HashIcon", remixicon: "RiHashtag" })),
    },
    {
        id: "repo",
        label: "Repository",
        icon: (_jsx(IconPlaceholder, { lucide: "FolderGit2Icon", tabler: "IconGitBranch", hugeicons: "GitBranchIcon", phosphor: "GitBranchIcon", remixicon: "RiGitBranchLine" })),
        // A branch carries no column of its own; its LEAVES do. The mapping is
        // collected by dotted path, so `repo.stars` resolves to `repository_stars`
        // while a leaf that omits `column` keeps its own path.
        fields: [
            { id: "name", label: "Name", type: "text", column: "repository_name" },
            {
                id: "branch",
                label: "Branch",
                type: "text",
                column: "repository_branch",
            },
            {
                id: "stars",
                label: "Stars",
                type: "number",
                column: "repository_stars",
            },
        ],
    },
];
// The query model is a boolean TREE and the builder draws it as one, so the
// example opens on a query the chip row could not express:
// `status is any of (in progress, blocked) AND (estimate between 3 and 8 OR
// title contains migration) AND repo.stars >= 100`. The middle term renders as
// an indented, bordered card carrying its own combinator.
// Annotated as FilterNode[], because the rules hold different value shapes and
// the array would otherwise infer the first one for all of them.
const SEED_RULES = [
    createFilterRule({
        id: "seed-1",
        path: ["status"],
        operator: "is_any_of",
        value: ["in-progress", "blocked"],
    }),
    createFilterGroup({
        id: "seed-group",
        combinator: "or",
        rules: [
            createFilterRule({
                id: "seed-2",
                path: ["estimate"],
                operator: "between",
                value: [3, 8],
            }),
            createFilterRule({
                id: "seed-3",
                path: ["title"],
                operator: "contains",
                value: "migration",
            }),
        ],
    }),
    createFilterRule({
        id: "seed-4",
        path: ["repo", "stars"],
        operator: "gte",
        value: 100,
    }),
];
const SEED = createFilterQuery(SEED_RULES, "and");
// Two levels down, to show that depth is not capped at one: the inner AND sits
// inside the OR, so `(a OR (b AND c))` survives the round trip through the
// builder and the chip row unchanged.
const DEEP = createFilterQuery([
    createFilterRule({
        id: "deep-1",
        path: ["labels"],
        operator: "has_any_of",
        value: ["bug", "regression"],
    }),
    createFilterGroup({
        id: "deep-outer",
        combinator: "or",
        rules: [
            createFilterRule({
                id: "deep-2",
                path: ["status"],
                operator: "is",
                value: "blocked",
            }),
            createFilterGroup({
                id: "deep-inner",
                combinator: "and",
                rules: [
                    createFilterRule({
                        id: "deep-3",
                        path: ["estimate"],
                        operator: "gte",
                        value: 8,
                    }),
                    createFilterRule({
                        id: "deep-4",
                        path: ["repo", "branch"],
                        operator: "starts_with",
                        value: "release/",
                    }),
                ],
            }),
        ],
    }),
], "and");
/**
 * Every field's storage name, keyed by dotted path.
 *
 * Collected once from the schema rather than looked up per rule, because a
 * nested field's path is only knowable while walking down to it.
 */
function collectColumns(list, prefix = [], out = {}) {
    for (const field of list) {
        const path = [...prefix, field.id];
        if (field.column)
            out[path.join(".")] = field.column;
        if (field.fields)
            collectColumns(field.fields, path, out);
    }
    return out;
}
const COLUMNS = collectColumns(fields);
const OPERATOR_TEXT = {
    contains: "contains",
    not_contains: "does not contain",
    starts_with: "starts with",
    ends_with: "ends with",
    is: "is",
    is_not: "is not",
    empty: "is empty",
    not_empty: "is not empty",
    eq: "=",
    neq: "!=",
    gt: ">",
    gte: ">=",
    lt: "<",
    lte: "<=",
    between: "between",
    not_between: "not between",
    is_any_of: "is any of",
    is_none_of: "is none of",
    has_any_of: "has any of",
    has_all_of: "has all of",
    has_none_of: "has none of",
};
function formatValue(value) {
    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    return `'${String(value)}'`;
}
/**
 * One node as text, groups parenthesised.
 *
 * The root is NOT wrapped: a query is already an implicit group, and drawing
 * its brackets would suggest a level the tree does not have. Every nested
 * group is, because that is the whole point of one - the reader has to see
 * where the OR stops.
 */
function describeNode(node, depth = 0) {
    if (isFilterRule(node)) {
        const key = node.path.join(".");
        // A field the schema no longer has still renders, under its own path.
        const column = COLUMNS[key] ?? key;
        // A rule exists from the moment an attribute is picked, before a condition
        // has been chosen, so an empty operator is a real state and not a bug.
        if (!node.operator)
            return `${column} ...`;
        const word = OPERATOR_TEXT[node.operator] ?? node.operator;
        const values = Array.isArray(node.value) ? node.value : [node.value];
        let text;
        if (node.value === undefined || node.value === null) {
            text = `${column} ${word}`;
        }
        else if (node.operator === "between" || node.operator === "not_between") {
            text = `${column} ${word} ${formatValue(values[0])} and ${formatValue(values[1])}`;
        }
        else if (values.length > 1) {
            text = `${column} ${word} (${values.map(formatValue).join(", ")})`;
        }
        else {
            text = `${column} ${word} ${formatValue(values[0])}`;
        }
        // `negated` is set rather than the operator swapped whenever the operator
        // declares no inverse, which in the built-in catalog means `starts_with`,
        // `ends_with` and `has_all_of`. Reading the query without honouring it
        // would describe the exact opposite of what the chip says.
        return node.negated ? `NOT (${text})` : text;
    }
    if (node.rules.length === 0)
        return "";
    const joiner = ` ${node.combinator.toUpperCase()} `;
    const inner = node.rules
        .map((child) => describeNode(child, depth + 1))
        .filter(Boolean)
        .join(joiner);
    return depth === 0 ? inner : `(${inner})`;
}
export default function Pattern() {
    const [query, setQuery] = useState(SEED);
    const expression = useMemo(() => describeNode(query) || "everything", [query]);
    return (_jsxs("div", { className: "flex w-full flex-col gap-4", children: [_jsx(Card, { className: "w-full", children: _jsx(CardContent, { children: _jsx(Filters, { variant: "advanced", advancedMode: "inline", 
                        // Reordering is opt-in, and this is the example it is for: a nested
                        // tree somebody is shaping, where the ORDER is part of reading it.
                        reorderable: true, fields: fields, query: query, onQueryChange: setQuery }) }) }), _jsxs("div", { className: "flex min-w-0 flex-col gap-2", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => setQuery(DEEP), children: "Nest two levels" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setQuery(SEED), children: "Reset" }), _jsxs("span", { className: "text-muted-foreground ms-auto text-sm tabular-nums", children: [countFilterRules(query), " rules"] })] }), _jsx("code", { className: "bg-muted dark:bg-muted/60 block w-full overflow-x-auto rounded-md border p-3 text-xs", children: expression })] })] }));
}
