"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { ScrollArea } from "../../../../../registry/bases/radix/ui/scroll-area.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [date, setDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState("10:00");
    const timeSlots = Array.from({ length: 37 }, (_, i) => {
        const totalMinutes = i * 15;
        const hour = Math.floor(totalMinutes / 60) + 9;
        const minute = totalMinutes % 60;
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    });
    const bookedDates = Array.from({ length: 3 }, (_, i) => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + i));
    return (_jsxs(Card, { className: "gap-0 p-0", children: [_jsx(CardHeader, { className: "flex h-max items-center justify-start border-b px-4! py-3!", children: _jsx(CardTitle, { children: "Book your appointment" }) }), _jsxs(CardContent, { className: "relative p-0 md:pr-48", children: [_jsx("div", { className: "p-4", children: _jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, defaultMonth: date, disabled: bookedDates, showOutsideDays: false, modifiers: {
                                booked: bookedDates,
                            } }) }), _jsx("div", { className: "inset-y-0 right-0 flex w-full flex-col gap-4 border-t max-md:h-60 md:absolute md:w-48 md:border-t-0 md:border-l", children: _jsx(ScrollArea, { className: "h-full", children: _jsx("div", { className: "flex flex-col gap-2 p-4", children: timeSlots.map((time) => (_jsx(Button, { variant: selectedTime === time ? "default" : "outline", onClick: () => setSelectedTime(time), className: "w-full shadow-none", children: time }, time))) }) }) })] }), _jsxs(CardFooter, { className: "flex flex-col gap-4 border-t px-4 py-3! md:flex-row", children: [_jsx("div", { className: "flex max-w-64 items-center gap-2 text-sm", children: date && selectedTime ? (_jsxs(_Fragment, { children: [_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle01Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", className: "size-4 shrink-0" }), _jsxs("span", { className: "text-sm", children: ["Your meeting is booked for", " ", _jsxs("span", { className: "font-medium", children: [" ", date?.toLocaleDateString("en-US", {
                                                    weekday: "long",
                                                    day: "numeric",
                                                    month: "long",
                                                }), " "] }), "at ", _jsx("span", { className: "font-medium", children: selectedTime })] })] })) : (_jsx(_Fragment, { children: "Select a date and time for your meeting." })) }), _jsx(Button, { disabled: !date || !selectedTime, className: "w-full md:ml-auto md:w-auto", variant: "outline", children: "Confirm" })] })] }));
}
