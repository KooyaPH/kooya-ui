// Title: Event Calendar Nav
// Description: Composable navigation - Today, prev/next, period title, view switcher dropdown, and a free toolbar slot.
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, } from "react";
import { useEventCalendarNavigation, useEventCalendarSettings, useEventCalendarView, useEventCalendarViewConfig, } from "./event-calendar.jsx";
import { toZoned } from "./event-calendar-lib.jsx";
import { addDays, format } from "date-fns";
import { Slot } from "radix-ui";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
/** Configured nav button variant/size (viewConfig.navButtonVariant/Size)
 *  plus the shared classNames.navButton hook, merged on every nav button. */
function useNavButtonProps() {
    const viewConfig = useEventCalendarViewConfig();
    return {
        variant: viewConfig.navButtonVariant,
        size: viewConfig.navButtonSize,
        iconSize: viewConfig.navButtonSize === "sm" ? "icon-sm" : "icon",
        className: viewConfig.classNames?.navButton,
    };
}
/** Resolved nav tooltip policy (viewConfig.navTooltips + classNames.navTooltip). */
function useNavTooltipConfig() {
    const viewConfig = useEventCalendarViewConfig();
    const config = viewConfig.navTooltips === false ? undefined : viewConfig.navTooltips;
    return {
        disabled: viewConfig.navTooltips === false,
        // the nav sits at the top of the calendar, so tooltips open upward by
        // default (away from the grid); collision flipping still drops them below
        // when there is no room above
        side: config?.side ?? "top",
        delay: config?.delay ?? 600,
        closeDelay: config?.closeDelay ?? 0,
        timeout: config?.timeout ?? 300,
        className: viewConfig.classNames?.navTooltip,
    };
}
/** Hover/focus-visible tooltip wrapper; renders the bare button when disabled
 *  (per-button content=null or viewConfig.navTooltips=false). */
function NavTooltip({ content, children, }) {
    const tooltips = useNavTooltipConfig();
    if (tooltips.disabled || content === null || content === undefined)
        return children;
    return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: children }), _jsx(TooltipContent, { side: tooltips.side, className: tooltips.className, children: content })] }));
}
function EventCalendarNavToday({ className, asChild = false, children, tooltip, ...props }) {
    const { today, isToday } = useEventCalendarNavigation();
    const settings = useEventCalendarSettings();
    const nav = useNavButtonProps();
    // display-zone "today", like every other today derivation in the calendar
    // (a system-zone new Date() can name a different day than Today opens)
    const defaultTooltip = format(toZoned(new Date(), settings.timeZone), settings.i18n.formats.dayTitle, { locale: settings.locale });
    return (_jsx(NavTooltip, { content: tooltip === undefined ? defaultTooltip : tooltip, children: _jsx(Button, { variant: nav.variant, size: nav.size, "data-slot": "event-calendar-nav-today", "data-active": isToday || undefined, className: cn(nav.className, className), onClick: today, asChild: asChild, ...props, children: children ?? settings.i18n.labels.today }) }));
}
function EventCalendarNavPrev({ className, asChild = false, children, tooltip, ...props }) {
    const { prev } = useEventCalendarNavigation();
    const settings = useEventCalendarSettings();
    const nav = useNavButtonProps();
    return (_jsx(NavTooltip, { content: tooltip === undefined ? settings.i18n.labels.previous : tooltip, children: _jsx(Button, { variant: nav.variant, size: nav.iconSize, "data-slot": "event-calendar-nav-prev", "aria-label": settings.i18n.labels.previous, className: cn(nav.className, className), onClick: prev, asChild: asChild, ...props, children: children ?? (_jsx(IconPlaceholder, { lucide: "ChevronLeftIcon", tabler: "IconChevronLeft", hugeicons: "ArrowLeft01Icon", phosphor: "CaretLeftIcon", remixicon: "RiArrowLeftSLine", className: "size-4", "aria-hidden": "true" })) }) }));
}
function EventCalendarNavNext({ className, asChild = false, children, tooltip, ...props }) {
    const { next } = useEventCalendarNavigation();
    const settings = useEventCalendarSettings();
    const nav = useNavButtonProps();
    return (_jsx(NavTooltip, { content: tooltip === undefined ? settings.i18n.labels.next : tooltip, children: _jsx(Button, { variant: nav.variant, size: nav.iconSize, "data-slot": "event-calendar-nav-next", "aria-label": settings.i18n.labels.next, className: cn(nav.className, className), onClick: next, asChild: asChild, ...props, children: children ?? (_jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", className: "size-4", "aria-hidden": "true" })) }) }));
}
function EventCalendarTitle({ className, asChild = false, format: formatTitle, children, ...props }) {
    const { title } = useEventCalendarNavigation();
    const viewConfig = useEventCalendarViewConfig();
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, { "data-slot": "event-calendar-title", "aria-live": "polite", className: cn("min-w-0 truncate text-sm font-semibold", viewConfig.classNames?.title, className), ...props, children: children ?? formatTitle?.({ title }) ?? title }));
}
function EventCalendarViewSwitcher({ className, asChild = false, children, tooltip, ...props }) {
    const { view, dayCount, availableViews, setView } = useEventCalendarView();
    const settings = useEventCalendarSettings();
    const viewConfig = useEventCalendarViewConfig();
    const nav = useNavButtonProps();
    const tooltips = useNavTooltipConfig();
    const labels = settings.i18n.labels;
    // Controlled open: selecting a view swaps the whole content subtree in the
    // same click, so closing must not depend on the menu's internal handler.
    const [open, setOpen] = useState(false);
    // Hover-only tooltip: when the menu closes, Radix focuses the trigger
    // again and a focus-opened tooltip would flash - ignore focus opens.
    const [tipOpen, setTipOpen] = useState(false);
    const selectView = (v, opts) => {
        setOpen(false);
        setView(v, opts);
    };
    const viewLabel = (v) => v === "days"
        ? settings.i18n.viewNames.days(dayCount)
        : settings.i18n.viewNames[v];
    return (_jsxs(DropdownMenu, { open: open, onOpenChange: (next) => {
            setOpen(next);
            if (next)
                setTipOpen(false);
        }, children: [_jsxs(Tooltip, { open: tipOpen && !open, onOpenChange: setTipOpen, children: [_jsx(DropdownMenuTrigger, { asChild: true, ...props, children: _jsx(TooltipTrigger, { asChild: true, onFocus: (event) => event.preventDefault(), children: _jsx(Button, { variant: nav.variant, size: nav.size, "data-slot": "event-calendar-view-switcher", "aria-label": labels.selectView, className: cn("gap-1", nav.className, className), asChild: asChild, children: children ?? (_jsxs(_Fragment, { children: [viewLabel(view), _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "size-4 opacity-60", "aria-hidden": "true" })] })) }) }) }), tipOpen && !open && tooltip !== null && !tooltips.disabled && (_jsx(TooltipContent, { side: tooltips.side, className: tooltips.className, children: tooltip ?? labels.selectView }))] }), _jsx(DropdownMenuContent, { align: "start", className: cn("min-w-44", viewConfig.classNames?.viewSwitcherContent), children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { className: cn("text-muted-foreground font-normal", viewConfig.classNames?.viewSwitcherLabel), children: settings.i18n.labels.selectView }), availableViews.map((v) => v === "days" ? (viewConfig.dayCountPresets.map((count) => (_jsxs(DropdownMenuItem, { "data-active": (view === "days" && dayCount === count) || undefined, onClick: () => selectView("days", { dayCount: count }), children: [settings.i18n.viewNames.days(count), viewConfig.enableShortcuts && (_jsx(EventCalendarViewShortcut, { children: count }))] }, `days-${count}`)))) : (_jsxs(DropdownMenuItem, { "data-active": view === v || undefined, onClick: () => selectView(v), children: [viewLabel(v), viewConfig.enableShortcuts && (_jsx(EventCalendarViewShortcut, { children: labels.viewShortcuts[v] }))] }, v)))] }) })] }));
}
/** Outline key badge; theme-token only, so it adapts to every style. */
function EventCalendarViewShortcut({ children }) {
    const viewConfig = useEventCalendarViewConfig();
    return (_jsx("kbd", { "data-slot": "event-calendar-view-shortcut", className: cn("text-muted-foreground ms-auto inline-flex size-5 shrink-0 items-center justify-center rounded-sm border font-sans text-xs", viewConfig.classNames?.viewShortcut), children: children }));
}
/** Views whose period reads better as a highlighted range. */
const RANGE_VIEWS = ["week", "days", "agenda"];
/**
 * Optional go-to-date picker (shadcn Calendar in a popover), view-aware:
 * week/N-days/agenda highlight the whole active range (any click re-anchors
 * the period), other views select a single date. Not part of the default
 * nav - compose it yourself (or any external picker driving
 * useEventCalendarNavigation().goTo). No tooltip by default: it opens an
 * overlay (see the NavButtonProps tooltip policy); pass `tooltip` to opt in.
 */
function EventCalendarDatePicker({ className, asChild = false, children, tooltip = null, mode, ...props }) {
    const { date, goTo, activeRange } = useEventCalendarNavigation();
    const { view } = useEventCalendarView();
    const settings = useEventCalendarSettings();
    const viewConfig = useEventCalendarViewConfig();
    const nav = useNavButtonProps();
    const [open, setOpen] = useState(false);
    const zoned = toZoned(date, settings.timeZone);
    const configured = mode ?? "auto";
    const resolved = configured === "auto"
        ? RANGE_VIEWS.includes(view)
            ? "range"
            : "single"
        : configured;
    const pick = (next) => {
        if (!next)
            return;
        goTo(next);
        setOpen(false);
    };
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(NavTooltip, { content: tooltip, children: _jsx(PopoverTrigger, { asChild: true, ...props, children: _jsx(Button, { variant: nav.variant, size: nav.iconSize, "data-slot": "event-calendar-date-picker", "data-mode": resolved, "aria-label": settings.i18n.labels.goToDate, className: cn(nav.className, className), asChild: asChild, children: children ?? (_jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", className: "size-4", "aria-hidden": "true" })) }) }) }), _jsx(PopoverContent, { align: "start", className: cn("w-auto p-0!", viewConfig.classNames?.datePickerContent), children: resolved === "range" ? (_jsx(Calendar, { mode: "range", selected: {
                        from: toZoned(activeRange.start, settings.timeZone),
                        to: toZoned(addDays(activeRange.end, -1), settings.timeZone),
                    }, defaultMonth: zoned, onDayClick: pick, locale: settings.locale, weekStartsOn: settings.weekStartsOn })) : (_jsx(Calendar, { mode: "single", selected: zoned, defaultMonth: zoned, onSelect: pick, locale: settings.locale, weekStartsOn: settings.weekStartsOn })) })] }));
}
/** Free slot for consumer toolbar buttons; pure layout shell. */
function EventCalendarToolbar({ className, asChild = false, children, ...props }) {
    const viewConfig = useEventCalendarViewConfig();
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, { "data-slot": "event-calendar-toolbar", className: cn("flex items-center gap-2", viewConfig.classNames?.toolbar, className), ...props, children: children }));
}
/**
 * Default composed nav: Today, prev/next, title, spacer, view switcher.
 * Pass children to use it as a pure layout shell instead.
 */
function EventCalendarNav({ className, asChild = false, children, showViewSwitcher = true, ...props }) {
    const viewConfig = useEventCalendarViewConfig();
    const tooltips = useNavTooltipConfig();
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, { "data-slot": "event-calendar-nav", className: cn("flex min-w-0 flex-wrap items-center gap-1 px-2 py-2", viewConfig.stickyNav && "bg-background sticky top-0 z-30", viewConfig.classNames?.nav, className), ...props, children: children ?? (
        // Shared provider: first tooltip waits, moving between buttons is instant
        _jsxs(TooltipProvider, { delayDuration: tooltips.delay, skipDelayDuration: tooltips.timeout, children: [_jsx(EventCalendarNavToday, {}), showViewSwitcher && _jsx(EventCalendarViewSwitcher, {}), _jsxs("div", { className: "flex items-center", children: [_jsx(EventCalendarNavPrev, {}), _jsx(EventCalendarNavNext, {})] }), _jsx(EventCalendarTitle, { className: "ms-3" }), _jsx("div", { className: "grow" })] })) }));
}
export { EventCalendarDatePicker, EventCalendarNav, EventCalendarNavNext, EventCalendarNavPrev, EventCalendarNavToday, EventCalendarTitle, EventCalendarToolbar, EventCalendarViewSwitcher, };
