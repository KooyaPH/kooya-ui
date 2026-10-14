"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TimePicker, TimePickerPanel, } from "../../reui/time-picker.jsx";
import { Card } from "../../../../../../../adapters/layout.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../../../../../../adapters/selection.tsx";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
/* Module scope keeps each `i18n` object stable, so the picker merges it
   with the English defaults once, not on every render. English is the
   default config, so it passes none. */
const LOCALES = [
    { lang: "en", name: "English", dir: "ltr", hourCycle: 12 },
    {
        lang: "de",
        name: "Deutsch",
        dir: "ltr",
        /* A 24-hour clock has no period column, so `period`, `am` and `pm` are
           left out. */
        hourCycle: 24,
        i18n: {
            labels: {
                placeholder: "Uhrzeit wählen",
                hour: "Stunde",
                minute: "Minute",
                second: "Sekunde",
                now: "Jetzt",
                clear: "Löschen",
                confirm: "OK",
                panelLabel: "Uhrzeit wählen",
                openPicker: "Zeitauswahl öffnen",
            },
        },
    },
    {
        lang: "zh",
        name: "中文",
        dir: "ltr",
        hourCycle: 12,
        /* 上午 and 下午 come before the time, so the period column leads. */
        periodPosition: "start",
        i18n: {
            labels: {
                placeholder: "选择时间",
                hour: "时",
                minute: "分",
                second: "秒",
                period: "上午/下午",
                am: "上午",
                pm: "下午",
                now: "现在",
                clear: "清除",
                confirm: "确定",
                panelLabel: "选择时间",
                openPicker: "打开时间选择器",
            },
        },
    },
    {
        lang: "ar",
        name: "العربية",
        dir: "rtl",
        hourCycle: 12,
        i18n: {
            labels: {
                placeholder: "اختر الوقت",
                hour: "الساعة",
                minute: "الدقيقة",
                second: "الثانية",
                period: "ص/م",
                am: "ص",
                pm: "م",
                now: "الآن",
                clear: "مسح",
                confirm: "تم",
                panelLabel: "اختر الوقت",
                openPicker: "فتح منتقي الوقت",
            },
            functions: {
                /* A string map rather than Intl, so the server and the browser print
                   the same digits. Column typeahead accepts both digit sets. */
                formatSegment: (value) => String(value)
                    .padStart(2, "0")
                    .replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)]),
            },
        },
    },
];
export default function Pattern() {
    /* One value for every tab: the language changes the labels and the
       clock, never the stored `HH:mm`. */
    const [value, setValue] = useState("14:30");
    return (_jsxs("div", { className: "mx-auto flex w-full max-w-sm flex-col gap-3", children: [_jsxs(Tabs, { defaultValue: "en", children: [_jsx(TabsList, { children: LOCALES.map((locale) => (_jsx(TabsTrigger, { value: locale.lang, lang: locale.lang, children: locale.name }, locale.lang))) }), LOCALES.map((locale) => (_jsx(TabsContent, { value: locale.lang, children: _jsx("div", { dir: locale.dir, lang: locale.lang, children: _jsx(Card, { className: "w-fit py-0", children: _jsx(TimePicker, { value: value, onValueChange: setValue, hourCycle: locale.hourCycle, periodPosition: locale.periodPosition, i18n: locale.i18n, children: _jsx(TimePickerPanel, {}) }) }) }) }, locale.lang)))] }), _jsx("p", { role: "status", className: "text-muted-foreground text-sm", children: value ? `Stored as ${value} in every language` : "No time stored" })] }));
}
