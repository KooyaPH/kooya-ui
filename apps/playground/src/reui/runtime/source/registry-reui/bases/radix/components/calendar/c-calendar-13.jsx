"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState, } from "react";
import { eachMonthOfInterval, eachYearOfInterval, endOfYear, format, isAfter, isBefore, startOfYear, } from "date-fns";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { ScrollArea } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const today = new Date();
    const [month, setMonth] = useState(today);
    const [date, setDate] = useState(today);
    const [isYearView, setIsYearView] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null);
    const startYear = today.getFullYear() - 10;
    const endYear = today.getFullYear() + 10;
    const startDate = startOfYear(new Date(startYear, 0));
    const endDate = endOfYear(new Date(endYear, 11));
    const years = eachYearOfInterval({
        end: endOfYear(endDate),
        start: startOfYear(startDate),
    });
    return (_jsx(Card, { className: "p-0", children: _jsx(CardContent, { className: "p-0", children: _jsx(Calendar, { classNames: {
                    month_caption: "ms-2.5 justify-start",
                    nav: "flex items-center w-full absolute inset-x-0 justify-end pointer-events-none [&>button]:pointer-events-auto",
                }, components: {
                    CaptionLabel: (props) => (_jsx(CaptionLabel, { isYearView: isYearView, setIsYearView: (val) => {
                            setIsYearView(val);
                            if (!val)
                                setSelectedYear(null);
                        }, ...props })),
                    MonthGrid: (props) => {
                        return (_jsx(MonthGrid, { className: props.className, currentMonth: month.getMonth(), currentYear: month.getFullYear(), endDate: endDate, isYearView: isYearView, onMonthSelect: (selectedMonth) => {
                                setMonth(selectedMonth);
                                setIsYearView(false);
                                setSelectedYear(null);
                            }, setIsYearView: setIsYearView, startDate: startDate, years: years, selectedYear: selectedYear, setSelectedYear: setSelectedYear, children: props.children }));
                    },
                }, defaultMonth: new Date(), endMonth: endDate, mode: "single", month: month, onMonthChange: setMonth, onSelect: setDate, selected: date, startMonth: startDate }) }) }));
}
function MonthGrid({ className, children, isYearView, years, currentYear, currentMonth, onMonthSelect, selectedYear, setSelectedYear, startDate, endDate, }) {
    const scrollAreaRef = useRef(null);
    useEffect(() => {
        if (isYearView && scrollAreaRef.current) {
            const activeElement = scrollAreaRef.current.querySelector("[data-active='true']");
            if (activeElement) {
                activeElement.scrollIntoView({ block: "center" });
            }
        }
    }, [isYearView, selectedYear]);
    return (_jsxs("div", { className: "relative", children: [_jsx("table", { className: className, children: children }), isYearView && (_jsx("div", { className: "bg-background absolute inset-0 z-20 -m-2", children: _jsx("div", { className: "h-full", ref: scrollAreaRef, children: _jsx(ScrollArea, { className: "h-full", children: _jsx("div", { className: "px-3 pt-1 pb-3", children: selectedYear === null ? (_jsx("div", { className: "grid grid-cols-4 gap-2", children: years.map((year) => {
                                    const y = year.getFullYear();
                                    const isCurrent = y === currentYear;
                                    return (_jsx(Button, { variant: isCurrent ? "default" : "outline", size: "sm", className: "h-8", "data-active": isCurrent, onClick: () => setSelectedYear(y), children: y }, y));
                                }) })) : (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "px-2", onClick: () => setSelectedYear(null), children: [_jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "mr-1 size-4 rotate-90" }), selectedYear] }) }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: eachMonthOfInterval({
                                            start: startOfYear(new Date(selectedYear, 0)),
                                            end: endOfYear(new Date(selectedYear, 0)),
                                        }).map((month) => {
                                            const isCurrent = month.getMonth() === currentMonth &&
                                                selectedYear === currentYear;
                                            const isDisabled = isBefore(month, startOfYear(startDate)) ||
                                                isAfter(month, endOfYear(endDate));
                                            return (_jsx(Button, { variant: isCurrent ? "default" : "outline", size: "sm", className: "h-8", "data-active": isCurrent, disabled: isDisabled, onClick: () => onMonthSelect(month), children: format(month, "MMM") }, month.getTime()));
                                        }) })] })) }) }) }) }))] }));
}
function CaptionLabel({ children, isYearView, setIsYearView, }) {
    return (_jsxs(Button, { className: "data-[state=open]:text-muted-foreground/80 -ms-2 flex items-center gap-2 text-sm font-medium hover:bg-transparent [&[data-state=open]>svg]:rotate-180", "data-state": isYearView ? "open" : "closed", onClick: () => setIsYearView((prev) => !prev), size: "sm", variant: "ghost", children: [children, _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", "aria-hidden": "true", className: "text-muted-foreground/80 shrink-0 transition-transform duration-200" })] }));
}
