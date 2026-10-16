"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useId, useState } from "react";
import { Filters } from "../../reui/filters/filters.jsx";
import { createFilterQuery, createFilterRule, } from "../../reui/filters/filters-query.jsx";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { ToggleGroup, ToggleGroupItem, } from "../../../../../../../adapters/selection.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/* -------------------------------------------------------------------------- */
/*                                    Copy                                    */
/* -------------------------------------------------------------------------- */
// Every operator the four field types below can offer, and no more. The
// primitive's own English list carries 25; the four it holds beyond these,
// is_before through is_on_or_after, belong to no entry in the operator catalog
// at all, so no field of any type can put one on screen. A dictionary padded
// with keys nothing renders is the fossil the shipped English copy was pruned
// of.
const OPERATORS = {
    en: {},
    de: {
        contains: "enthält",
        not_contains: "enthält nicht",
        starts_with: "beginnt mit",
        ends_with: "endet mit",
        is: "ist",
        is_not: "ist nicht",
        is_any_of: "ist eines von",
        is_none_of: "ist keines von",
        has_any_of: "enthält eines von",
        has_all_of: "enthält alle von",
        has_none_of: "enthält keines von",
        eq: "ist gleich",
        neq: "ist ungleich",
        gt: "ist größer als",
        gte: "ist mindestens",
        lt: "ist kleiner als",
        lte: "ist höchstens",
        between: "liegt zwischen",
        not_between: "liegt nicht zwischen",
        empty: "ist leer",
        not_empty: "ist nicht leer",
    },
    ja: {
        contains: "を含む",
        not_contains: "を含まない",
        starts_with: "で始まる",
        ends_with: "で終わる",
        is: "と等しい",
        is_not: "と等しくない",
        is_any_of: "のいずれか",
        is_none_of: "のいずれでもない",
        has_any_of: "のいずれかを含む",
        has_all_of: "のすべてを含む",
        has_none_of: "のいずれも含まない",
        eq: "と等しい",
        neq: "と等しくない",
        gt: "より大きい",
        gte: "以上",
        lt: "より小さい",
        lte: "以下",
        between: "の範囲内",
        not_between: "の範囲外",
        empty: "が空",
        not_empty: "が空でない",
    },
};
/**
 * Why `labels.negated` is a FUNCTION, demonstrated rather than asserted.
 *
 * Negate flips to the catalog's `inverse` where one exists, so `negated` is
 * only ever asked about the three operators here that have none: starts with,
 * ends with, and has all of. A prefix composes them in English ("not starts
 * with" is at worst clumsy) and composes in NEITHER of these languages: German
 * puts nicht after the verb, and Japanese conjugates the verb itself. Keyed by
 * the localised label because that is all the primitive hands the function, and
 * the labels it is keyed on are the ones declared directly above.
 */
const NEGATED_DE = {
    "beginnt mit": "beginnt nicht mit",
    "endet mit": "endet nicht mit",
    "enthält alle von": "enthält nicht alle von",
};
const NEGATED_JA = {
    で始まる: "で始まらない",
    で終わる: "で終わらない",
    のすべてを含む: "のすべては含まない",
};
// Chrome copy and operator wording are two separate surfaces. A team routinely
// rewords "contains" for their domain without translating anything else, and a
// translator localises the chrome without touching the operator catalog.
//
// The keys below are exactly the ones the chip row can reach with the schema in
// this file. `FilterLabels` carries 76. Thirty three of them are drawn only by
// the advanced builder, which this example does not offer. Fourteen more want a
// nested field, an async option list or an exclusive option, none of which this
// schema declares, or name a slot the primitive no longer renders anywhere.
// `filterLabel` is the last one out: it wraps a chip's accessible name and
// defaults to the identity, so what it returns is already assembled from the
// words below. That leaves these 28, every one of which this file's own bar can
// put on screen or into an accessible name. A dictionary padded past that is
// the fossil the shipped English copy was pruned of: work a translator is paid
// for and nobody ever sees.
const CHROME = {
    en: {},
    de: {
        addFilter: "Filter hinzufügen",
        searchFields: "Attribute suchen...",
        searchOperators: "Bedingungen suchen...",
        searchOptions: "Optionen suchen...",
        fieldsLabel: "Attribute",
        filtersLabel: "Filter",
        chipMenu: (fieldLabel) => `Optionen für ${fieldLabel}`,
        clear: "Zurücksetzen",
        apply: "Übernehmen",
        discard: "Verwerfen",
        remove: "Entfernen",
        duplicate: "Duplizieren",
        negate: "Umkehren",
        negated: (operatorLabel) => NEGATED_DE[operatorLabel] ?? operatorLabel,
        empty: "Keine Ergebnisse",
        valuePlaceholder: "Text eingeben...",
        noValue: "kein Wert",
        incomplete: "unvollständiger Filter",
        selectCondition: "Bedingung wählen",
        readOnly: "Schreibgeschützt. Diese Filter können nicht geändert werden.",
        valueCount: (count) => `${count} ausgewählt`,
        valueDetail: (summary, values) => `${summary}: ${values.join(", ")}`,
        valueRange: (from, to) => `${from} bis ${to}`,
        rangeFrom: (fieldLabel) => `${fieldLabel} von`,
        rangeTo: (fieldLabel) => `${fieldLabel} bis`,
        rangeSeparator: "bis",
        countAnnouncement: (count) => count === 1 ? "1 Filter aktiv" : `${count} Filter aktiv`,
        resultsAnnouncement: (count) => count === 1 ? "1 Ergebnis" : `${count} Ergebnisse`,
    },
    ja: {
        addFilter: "フィルターを追加",
        searchFields: "属性を検索...",
        searchOperators: "条件を検索...",
        searchOptions: "オプションを検索...",
        fieldsLabel: "属性",
        filtersLabel: "フィルター",
        chipMenu: (fieldLabel) => `${fieldLabel}のフィルターオプション`,
        clear: "クリア",
        apply: "適用",
        discard: "破棄",
        remove: "削除",
        duplicate: "複製",
        negate: "反転",
        negated: (operatorLabel) => NEGATED_JA[operatorLabel] ?? operatorLabel,
        empty: "結果がありません",
        valuePlaceholder: "テキストを入力...",
        noValue: "値なし",
        incomplete: "不完全なフィルター",
        selectCondition: "条件を選択",
        readOnly: "読み取り専用です。これらのフィルターは変更できません。",
        valueCount: (count) => `${count}件選択`,
        valueDetail: (summary, values) => `${summary}: ${values.join("、")}`,
        valueRange: (from, to) => `${from}から${to}`,
        rangeFrom: (fieldLabel) => `${fieldLabel}（開始）`,
        rangeTo: (fieldLabel) => `${fieldLabel}（終了）`,
        rangeSeparator: "から",
        countAnnouncement: (count) => `フィルター${count}件を適用中`,
        resultsAnnouncement: (count) => `${count}件の結果`,
    },
};
const FIELD_LABELS = {
    en: {
        title: "Title",
        status: "Status",
        priority: "Priority",
        assignee: "Assignee",
        score: "Score",
    },
    de: {
        title: "Titel",
        status: "Status",
        priority: "Priorität",
        assignee: "Bearbeiter",
        score: "Punktzahl",
    },
    ja: {
        title: "タイトル",
        status: "ステータス",
        priority: "優先度",
        assignee: "担当者",
        score: "スコア",
    },
};
// Status and priority share one dictionary, keyed by option value, because
// their values are disjoint and because the colour map below is keyed the same
// way. Two maps over one key space, one holding what translates and one holding
// what does not.
const OPTION_LABELS = {
    en: {
        todo: "To Do",
        "in-progress": "In Progress",
        review: "In Review",
        done: "Done",
        cancelled: "Cancelled",
        low: "Low",
        medium: "Medium",
        high: "High",
        urgent: "Urgent",
        critical: "Critical",
    },
    de: {
        todo: "Offen",
        "in-progress": "In Bearbeitung",
        review: "In Prüfung",
        done: "Erledigt",
        cancelled: "Abgebrochen",
        low: "Niedrig",
        medium: "Mittel",
        high: "Hoch",
        urgent: "Dringend",
        critical: "Kritisch",
    },
    ja: {
        todo: "未着手",
        "in-progress": "進行中",
        review: "レビュー中",
        done: "完了",
        cancelled: "中止",
        low: "低",
        medium: "中",
        high: "高",
        urgent: "緊急",
        critical: "重大",
    },
};
// What a stacked display says when nothing is picked yet. It arrives through
// `renderValue`, so it belongs to the CONSUMER rather than to `labels`, and a
// consumer who translates the chrome and forgets this ships a German bar with
// an English chip in it.
const ANY_LABELS = {
    en: { status: "any status", priority: "any priority", assignee: "anyone" },
    de: {
        status: "beliebiger Status",
        priority: "beliebige Priorität",
        assignee: "alle",
    },
    ja: {
        status: "すべてのステータス",
        priority: "すべての優先度",
        assignee: "全員",
    },
};
// How many times `onQueryChange` has fired, in words. Consumer copy again, for
// the same reason `ANY_LABELS` is: it is drawn over a CALLBACK's output, which
// no key in `labels` covers, so a locale switch reaches it only if the consumer
// wired it. Pluralisation is why each entry is a function rather than a string:
// German inflects the noun, and Japanese counts with a suffix and does not
// inflect at all, so the count cannot be concatenated onto a fixed word.
const CHANGE_LABELS = {
    en: (count) => (count === 1 ? "1 change" : `${count} changes`),
    de: (count) => (count === 1 ? "1 Änderung" : `${count} Änderungen`),
    ja: (count) => `変更${count}件`,
};
/* -------------------------------------------------------------------------- */
/*                                  Fixtures                                  */
/* -------------------------------------------------------------------------- */
// The colour is keyed by value and NOT by locale, which is the whole point of
// the pairing: swapping locale rewrites every label on screen and moves none of
// these.
const TONES = {
    todo: "bg-zinc-400",
    "in-progress": "bg-amber-500",
    review: "bg-sky-500",
    done: "bg-emerald-500",
    cancelled: "bg-destructive",
    low: "bg-emerald-500",
    medium: "bg-yellow-500",
    high: "bg-violet-500",
    urgent: "bg-orange-500",
    critical: "bg-destructive",
};
const STATUSES = ["todo", "in-progress", "review", "done", "cancelled"];
const PRIORITIES = ["low", "medium", "high", "urgent", "critical"];
// Names are proper nouns, so they are the one set of option labels that stays
// put across all three locales, exactly as the faces do. The FIELD label above
// them still translates.
const TEAM = [
    { value: "ada", label: "Ada Lovelace", img: "women/1" },
    { value: "grace", label: "Grace Hopper", img: "women/2" },
    { value: "alan", label: "Alan Turing", img: "men/3" },
    { value: "katherine", label: "Katherine Johnson", img: "women/4" },
    { value: "edsger", label: "Edsger Dijkstra", img: "men/5" },
    { value: "barbara", label: "Barbara Liskov", img: "women/6" },
    { value: "tim", label: "Tim Berners-Lee", img: "men/7" },
    { value: "margaret", label: "Margaret Hamilton", img: "women/8" },
];
function Dot({ className }) {
    return _jsx("span", { className: cn("size-2 shrink-0 rounded-full", className) });
}
function Person({ img, name }) {
    return (_jsxs(Avatar, { className: "size-5", children: [_jsx(AvatarImage, { src: `https://randomuser.me/api/portraits/${img}.jpg`, alt: name }), _jsx(AvatarFallback, { className: "text-[10px]", children: name
                    .split(" ")
                    .map((part) => part[0])
                    .join("") })] }));
}
/**
 * Overlapping swatches plus a count, instead of "3 selected". The empty word is
 * a prop because the same renderer serves Status and Priority: a hardcoded noun
 * would put "any status" on the Priority chip, and a hardcoded ENGLISH noun
 * would put it there in every locale.
 */
function StackedDots({ options, empty, }) {
    if (options.length === 0)
        return _jsx(_Fragment, { children: empty });
    if (options.length === 1) {
        return (_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(Dot, { className: TONES[options[0].value] ?? "bg-muted-foreground" }), options[0].label] }));
    }
    return (_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "flex items-center", children: options.slice(0, 4).map((option) => (_jsx("span", { className: cn("ring-background -ml-1 size-2.5 rounded-full ring-2 first:ml-0", TONES[option.value] ?? "bg-muted-foreground") }, option.value))) }), _jsx("span", { className: "text-muted-foreground text-xs tabular-nums", children: options.length })] }));
}
/** A teammate's face, resolved from the option the query stored. */
function Face({ option }) {
    const entry = TEAM.find((candidate) => candidate.value === option.value);
    return _jsx(Person, { img: entry?.img ?? "men/1", name: option.label });
}
/**
 * A real `AvatarGroup`, plus an overflow count.
 *
 * The group keeps its default `ring-2`, which reads as a wider collar once the
 * faces drop to 16px, and the two overrides both follow from that size: the
 * stack tightens to `-space-x-1`, because the default `-space-x-2` hides half
 * of a 16px face, and `size-4` beats `Person`'s own `size-5` on specificity
 * exactly as the group's own ring does. Both selectors reach DIRECT children,
 * so the faces are rendered as components rather than wrapped in a keyed span,
 * which would put a wrapper between the group and every avatar it styles. The
 * count appears only on genuine overflow, so three picks show three faces and
 * no redundant "3" beside them.
 */
function StackedPeople({ options, empty, }) {
    if (options.length === 0)
        return _jsx(_Fragment, { children: empty });
    if (options.length === 1) {
        return (_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(Face, { option: options[0] }), options[0].label] }));
    }
    const overflow = options.length - 3;
    return (_jsxs("span", { className: "flex items-center gap-1.5", children: [_jsx(AvatarGroup, { className: "-space-x-1 *:data-[slot=avatar]:size-4", children: options.slice(0, 3).map((option) => (_jsx(Face, { option: option }, option.value))) }), overflow > 0 ? (_jsxs("span", { className: "text-muted-foreground text-xs tabular-nums", children: ["+", overflow] })) : null] }));
}
/* -------------------------------------------------------------------------- */
/*                                   Schema                                   */
/* -------------------------------------------------------------------------- */
/**
 * Rebuilt per locale, and declared inline on purpose.
 *
 * The schema index is memoized on a content SIGNATURE rather than on the array
 * identity, so a rebuild that changes nothing structural returns the identical
 * index object. Changing a label DOES change the signature, which is exactly
 * when the index should be rebuilt, and it is why the chips redraw in the new
 * language without the query being touched.
 *
 * Icon names are written out per field rather than built by a helper: the
 * shadcn CLI rewrites these attributes to a real import at install time and
 * only accepts string literals.
 */
function buildFields(locale) {
    return [
        {
            id: "title",
            label: FIELD_LABELS[locale].title,
            type: "text",
            icon: (_jsx(IconPlaceholder, { lucide: "TypeIcon", tabler: "IconLetterT", hugeicons: "TextIcon", phosphor: "TextTIcon", remixicon: "RiText" })),
        },
        {
            id: "status",
            label: FIELD_LABELS[locale].status,
            type: "select",
            defaultOperator: "is_any_of",
            icon: (_jsx(IconPlaceholder, { lucide: "CircleDotIcon", tabler: "IconCircleDot", hugeicons: "RecordIcon", phosphor: "CircleIcon", remixicon: "RiRecordCircleLine" })),
            options: STATUSES.map((value) => ({
                value,
                label: OPTION_LABELS[locale][value],
                icon: _jsx(Dot, { className: TONES[value] }),
            })),
            // Five options, so the search box is more chrome than the rows under it.
            searchable: false,
            renderValue: ({ options }) => (_jsx(StackedDots, { options: options, empty: ANY_LABELS[locale].status })),
        },
        {
            id: "priority",
            label: FIELD_LABELS[locale].priority,
            type: "multiselect",
            icon: (_jsx(IconPlaceholder, { lucide: "FlagIcon", tabler: "IconFlag", hugeicons: "Flag01Icon", phosphor: "FlagIcon", remixicon: "RiFlagLine" })),
            options: PRIORITIES.map((value) => ({
                value,
                label: OPTION_LABELS[locale][value],
                icon: _jsx(Dot, { className: TONES[value] }),
            })),
            searchable: false,
            renderValue: ({ options }) => (_jsx(StackedDots, { options: options, empty: ANY_LABELS[locale].priority })),
        },
        {
            id: "assignee",
            label: FIELD_LABELS[locale].assignee,
            type: "multiselect",
            // Wider than the panel's own `w-48`: a face plus a full name is the
            // widest row the option menu draws, and this example runs in three
            // locales, where a name that fits in one may not in another.
            className: "w-56",
            icon: (_jsx(IconPlaceholder, { lucide: "UserRoundCheckIcon", tabler: "IconUserCheck", hugeicons: "UserCheck01Icon", phosphor: "UserCheckIcon", remixicon: "RiUserFollowLine" })),
            options: TEAM.map((person) => ({
                value: person.value,
                label: person.label,
                icon: _jsx(Person, { img: person.img, name: person.label }),
            })),
            // A list of PEOPLE carries no semantic order, unlike Priority above.
            sortSelected: "label",
            renderValue: ({ options }) => (_jsx(StackedPeople, { options: options, empty: ANY_LABELS[locale].assignee })),
        },
        {
            id: "score",
            label: FIELD_LABELS[locale].score,
            type: "number",
            icon: (_jsx(IconPlaceholder, { lucide: "HashIcon", tabler: "IconHash", hugeicons: "HashtagIcon", phosphor: "HashIcon", remixicon: "RiHashtag" })),
        },
    ];
}
/* -------------------------------------------------------------------------- */
/*                                   Query                                    */
/* -------------------------------------------------------------------------- */
// Four rules, chosen for what each one says under a locale swap. Status
// collapses to two dots and a count, which is the case `labels.valueDetail`
// spells out for a screen reader once the bar is read only. Priority holds one
// pick, so its chip shows a colour AND a translated word side by side. Assignee
// holds four people, so the faces and their names stay put while the attribute
// above them changes language. Score holds neither a colour nor a face, so it
// is the control case: every glyph in it is copy, and every glyph changes.
const SEED = createFilterQuery([
    createFilterRule({
        id: "seed-1",
        path: ["status"],
        operator: "is_any_of",
        value: ["in-progress", "review"],
    }),
    createFilterRule({
        id: "seed-2",
        path: ["priority"],
        operator: "has_any_of",
        value: ["urgent"],
    }),
    createFilterRule({
        id: "seed-3",
        path: ["assignee"],
        operator: "has_any_of",
        value: ["ada", "grace", "alan", "katherine"],
    }),
    createFilterRule({
        id: "seed-4",
        path: ["score"],
        operator: "gte",
        value: 60,
    }),
], "and");
const LOCALE_OPTIONS = [
    { value: "en", label: "English" },
    { value: "de", label: "Deutsch" },
    { value: "ja", label: "日本語" },
];
const SIZE_OPTIONS = [
    { value: "sm", label: "Small" },
    { value: "default", label: "Default" },
];
const INTERACTION_OPTIONS = [
    { value: "editable", label: "Editable" },
    { value: "readOnly", label: "Read only" },
    { value: "disabled", label: "Disabled" },
];
/**
 * One control of the toolbar: the PROP, and every value it can take as one
 * segmented group beside it.
 *
 * The name is load-bearing. Three unlabelled segments reading sm and default
 * leave a reader to infer the prop from the values, which almost works for
 * `size` and fails completely for a group that reads English, Deutsch, 日本語.
 * Naming the prop costs one span and removes the inference entirely, and a
 * segmented group is what keeps every value on screen while still reading as
 * one control: a demo setting hidden behind a select is one more click between
 * a reader and the thing they came to see, and three loose radios are three
 * controls where the prop has one.
 *
 * ABOVE the group rather than beside it, which is what buys the row. Beside,
 * a control is its name plus its segments end to end, and the three of them
 * come to 921px against the 889 the catalog frame is wide - so the toolbar
 * this is meant to form wrapped on the very frame it was drawn for, and the
 * two prop pairs would have had to give up half their names to fit. Stacked,
 * each control is only as wide as the WIDER of its two lines, the three come to
 * about 590px, and every prop keeps the name it actually has in the API.
 *
 * The label is a span rather than `FieldSet` plus `FieldLegend`. The thing it
 * names is the toggle group, which is already named through `aria-labelledby`,
 * so a fieldset around it would be a second group announcing the same words
 * twice.
 *
 * It is also NOT a `ButtonGroupText` addon fused onto the group, which is the
 * obvious way to draw a labelled segmented control and the wrong one here:
 * every style paints that addon `bg-muted` and every style paints a pressed
 * segment `bg-muted` too, so the label and a selected FIRST value would merge
 * into one unreadable block in each of these three groups. A plain span keeps
 * the fill meaning exactly one thing.
 *
 * `shrink-0` on the whole control, so a toolbar too narrow to hold three of
 * them wraps between controls rather than squeezing a group until its segments
 * clip.
 */
function PropControl({ prop, value, options, onValueChange, }) {
    const id = useId();
    return (_jsxs("div", { className: "flex shrink-0 flex-col gap-1.5", children: [_jsx("span", { id: id, className: "text-muted-foreground text-xs font-medium", children: prop }), _jsx(ToggleGroup, { "aria-labelledby": id, variant: "outline", size: "sm", 
                // Fused, because the segments are the values of ONE prop and exactly
                // one of them is true at a time. Gapped pills would draw three
                // independent switches over a single-valued setting.
                spacing: 0, 
                // Single-select, and pressing the pressed segment CLEARS the group.
                // None of these three props has a way to hold nothing, so the current
                // value is kept when that happens: this control chooses between values
                // and cannot unset one.
                //
                // The two props below are the whole base/radix split in this file.
                // Radix's ToggleGroup is a discriminated union on `type`, so the radix
                // twin names the single-select variant and exchanges a string where
                // Base UI's group takes and returns an array whether it is
                // single-select or not.
                //
                // That split reaches the accessibility tree, and neither side is this
                // file's to fix. Radix knows it is single-select, so it publishes
                // `role="radiogroup"` over `role="radio"` items and announces the
                // choice as one of three. Base UI's group has no single-select mode: it
                // publishes `role="group"` over `aria-pressed` toggles, which is three
                // buttons that happen to agree. `aria-labelledby` names the group on
                // both sides either way, and hand-writing radio roles onto Base UI's
                // toggles would leave `aria-pressed` on a radio, which is worse than
                // the honest difference.
                type: "single", value: value, onValueChange: (next) => onValueChange((next || value)), children: options.map((option) => (_jsx(ToggleGroupItem, { value: option.value, children: option.label }, option.value))) })] }));
}
export default function Pattern() {
    const [locale, setLocale] = useState("en");
    const [size, setSize] = useState("default");
    const [interaction, setInteraction] = useState("editable");
    const [changes, setChanges] = useState({ fires: 0, entries: [] });
    const [query, setQuery] = useState(SEED);
    return (
    // Spacing tightens below the breakpoint the toolbar already wraps at, and
    // is restored above it. The catalog frames this example at one authored
    // height, and a phone-width frame spends 244 of it on a five-row bar and
    // the rest on a toolbar that has folded into a column, so the gaps are the
    // only budget left to give back. Nothing changes at the widths where there
    // is room.
    _jsxs("div", { className: "flex w-full flex-col gap-2.5 min-[30rem]:gap-4", children: [_jsx(Filters, { fields: buildFields(locale), query: query, size: size, readOnly: interaction === "readOnly", disabled: interaction === "disabled", labels: CHROME[locale], operatorLabels: OPERATORS[locale], showClear: true, className: cn(
                // Padding first, so the two states below differ in FILL alone and the
                // bar does not move when one is flipped on. The negative margin pulls
                // that padding back out, so the first chip still lines up with the
                // tray's outside edge underneath it.
                "-mx-1.5 rounded-md p-1.5 transition-colors", 
                // `data-readonly` is the container hook the primitive puts on the bar
                // for exactly this, and tint is the right treatment for it: a
                // read-only control keeps full contrast, the same way a read-only
                // input does, because everything in it is still legible and every
                // control in it is still reachable.
                //
                // The ring comes with it because the tint alone is 3% of lightness in
                // the light theme, which is the difference between a state a reader
                // notices on the flip and one they do not. Inset, so it is drawn
                // inside the padding declared above and the bar still does not move.
                "data-readonly:bg-muted data-readonly:inset-ring-border data-readonly:inset-ring", 
                // `disabled` gets no such hook, so it is painted from the flag this
                // file already holds. Dimming is the honest word for it, and the two
                // treatments have to differ or the control below has three states and
                // two appearances.
                interaction === "disabled" && "opacity-60"), 
                // Fully controlled. The second argument says WHAT happened and WHICH
                // field it happened to, so a consumer does not have to diff two trees
                // to find out.
                onQueryChange: (next, details) => {
                    setQuery(next);
                    setChanges((current) => {
                        const field = details.field?.id ?? null;
                        const [newest, ...rest] = current.entries;
                        // Repeats fold into the newest entry instead of pushing a copy of
                        // it, which is what keeps a slider or a text field from filling the
                        // strip with one reason.
                        const entries = newest?.reason === details.reason && newest.field === field
                            ? [{ ...newest, count: newest.count + 1 }, ...rest]
                            : [
                                { reason: details.reason, field, count: 1 },
                                ...current.entries,
                            ].slice(0, 3);
                        return { fires: current.fires + 1, entries };
                    });
                } }), _jsxs("div", { className: "w-full", children: [_jsxs("div", { className: "flex flex-wrap items-end gap-x-6 gap-y-3 pb-3", children: [_jsx(PropControl, { prop: "Language", value: locale, options: LOCALE_OPTIONS, onValueChange: setLocale }), _jsx(PropControl, { prop: "Size", value: size, options: SIZE_OPTIONS, onValueChange: setSize }), _jsx(PropControl, { prop: "State", value: interaction, options: INTERACTION_OPTIONS, onValueChange: setInteraction })] }), _jsxs("div", { className: "border-border/60 flex flex-wrap items-center gap-1.5 border-t py-2", children: [_jsx("span", { className: "text-muted-foreground text-xs tabular-nums", children: CHANGE_LABELS[locale](changes.fires) }), changes.entries.map((entry, index) => (_jsxs(Badge, { variant: index === 0 ? "default" : "secondary", className: "gap-1.5", children: [_jsx("span", { className: "font-mono", children: entry.reason }), entry.field ? (_jsx("span", { className: "opacity-75", children: FIELD_LABELS[locale][entry.field] ?? entry.field })) : null, entry.count > 1 ? (_jsxs("span", { className: "tabular-nums opacity-75", children: ["\u00D7", entry.count] })) : null] }, `${entry.reason}-${entry.field}-${index}`)))] })] })] }));
}
