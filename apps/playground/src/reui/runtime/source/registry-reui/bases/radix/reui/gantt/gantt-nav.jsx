// Title: Gantt Nav
// Description: Composable navigation - Today, view selector, prev/next, go-to-date, period title, and a free toolbar slot.
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, } from "react";
import { useGanttNavigation, useGanttScale, useGanttSettings, useGanttViewConfig, } from "./gantt.jsx";
import { toZoned } from "./gantt-lib.jsx";
import { format } from "date-fns";
import { Slot } from "radix-ui";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Calendar } from "../../../../../registry/bases/radix/ui/calendar.jsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Popover, PopoverContent, PopoverTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const GANTT_SCALES = ["day", "week", "month", "quarter", "year"];
/** Configured nav button variant/size (viewConfig.navButtonVariant/Size). */
function useNavButtonProps() {
    const viewConfig = useGanttViewConfig();
    return {
        variant: viewConfig.navButtonVariant,
        size: viewConfig.navButtonSize,
        iconSize: viewConfig.navButtonSize === "sm" ? "icon-sm" : "icon",
    };
}
/** Hover/focus-visible tooltip wrapper; renders the bare button when disabled. */
function NavTooltip({ content, children, }) {
    if (content === null || content === undefined)
        return children;
    return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: children }), _jsx(TooltipContent, { side: "bottom", children: content })] }));
}
function GanttNavToday({ className, asChild = false, children, tooltip, ...props }) {
    const { today, isToday } = useGanttNavigation();
    const settings = useGanttSettings();
    const nav = useNavButtonProps();
    // zoned: a system-zone new Date() can name a different day than Today opens
    const defaultTooltip = format(toZoned(new Date(), settings.timeZone), settings.i18n.formats.dayTitle, { locale: settings.locale });
    return (_jsx(NavTooltip, { content: tooltip === undefined ? defaultTooltip : tooltip, children: _jsx(Button, { variant: nav.variant, size: nav.size, "data-slot": "gantt-nav-today", "data-active": isToday || undefined, className: cn(className), onClick: today, asChild: asChild, ...props, children: children ?? settings.i18n.labels.today }) }));
}
function GanttNavPrev({ className, asChild = false, children, tooltip, ...props }) {
    const { prev } = useGanttNavigation();
    const settings = useGanttSettings();
    const nav = useNavButtonProps();
    return (_jsx(NavTooltip, { content: tooltip === undefined ? settings.i18n.labels.previous : tooltip, children: _jsx(Button, { variant: nav.variant, size: nav.iconSize, "data-slot": "gantt-nav-prev", "aria-label": settings.i18n.labels.previous, className: cn(className), onClick: prev, asChild: asChild, ...props, children: children ?? (_jsx(IconPlaceholder, { lucide: "ChevronLeftIcon", tabler: "IconChevronLeft", hugeicons: "ArrowLeft01Icon", phosphor: "CaretLeftIcon", remixicon: "RiArrowLeftSLine", className: "size-4", "aria-hidden": "true" })) }) }));
}
function GanttNavNext({ className, asChild = false, children, tooltip, ...props }) {
    const { next } = useGanttNavigation();
    const settings = useGanttSettings();
    const nav = useNavButtonProps();
    return (_jsx(NavTooltip, { content: tooltip === undefined ? settings.i18n.labels.next : tooltip, children: _jsx(Button, { variant: nav.variant, size: nav.iconSize, "data-slot": "gantt-nav-next", "aria-label": settings.i18n.labels.next, className: cn(className), onClick: next, asChild: asChild, ...props, children: children ?? (_jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", className: "size-4", "aria-hidden": "true" })) }) }));
}
function GanttTitle({ className, asChild = false, children, format: formatTitle, ...props }) {
    const { title } = useGanttNavigation();
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, { "data-slot": "gantt-title", "aria-live": "polite", className: cn("min-w-0 truncate text-sm font-semibold", className), ...props, children: children ?? formatTitle?.({ title }) ?? title }));
}
/**
 * Scale switcher ("Select view"): Day / Week / Month / Quarter / Year, a ghost
 * dropdown button (same shape as the event-calendar view switcher).
 */
function GanttScaleSwitcher({ className, asChild, children, tooltip, scales = GANTT_SCALES, ...props }) {
    const { scale, setScale } = useGanttScale();
    const settings = useGanttSettings();
    const nav = useNavButtonProps();
    const labels = settings.i18n.labels;
    // Controlled open: selecting a scale swaps the whole track subtree in the
    // same click, so closing must not depend on the menu's internal handler.
    const [open, setOpen] = useState(false);
    // Hover-only tooltip: when the menu closes, Radix focuses the trigger
    // again and a focus-opened tooltip would flash - Radix has no open reason,
    // so focus opens are suppressed at the trigger via preventDefault.
    const [tipOpen, setTipOpen] = useState(false);
    const selectScale = (next) => {
        setOpen(false);
        setScale(next);
    };
    return (_jsxs(DropdownMenu, { open: open, onOpenChange: (next) => {
            setOpen(next);
            if (next)
                setTipOpen(false);
        }, children: [_jsxs(Tooltip, { open: tipOpen && !open, onOpenChange: (next) => setTipOpen(next), children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(TooltipTrigger, { asChild: true, onFocus: (e) => e.preventDefault(), children: _jsx(Button, { variant: nav.variant, size: nav.size, "data-slot": "gantt-scale-switcher", "aria-label": labels.selectView, className: cn("gap-1", className), ...props, children: children ?? (_jsxs(_Fragment, { children: [labels.scales[scale], _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "size-4 opacity-60", "aria-hidden": "true" })] })) }) }) }), tipOpen && !open && tooltip !== null && (_jsx(TooltipContent, { side: "bottom", children: tooltip ?? labels.selectView }))] }), _jsx(DropdownMenuContent, { align: "start", className: "min-w-36", children: _jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { className: "text-muted-foreground font-normal", children: labels.selectView }), scales.map((value) => (_jsx(DropdownMenuItem, { "data-active": scale === value || undefined, onClick: () => selectScale(value), children: labels.scales[value] }, value)))] }) })] }));
}
/**
 * Compact go-to-date picker (shadcn Calendar in a popover). No tooltip by
 * design: it opens an overlay (see the NavButtonProps tooltip policy).
 */
function GanttDatePicker({ className }) {
    const { date, goTo } = useGanttNavigation();
    const settings = useGanttSettings();
    const nav = useNavButtonProps();
    const [open, setOpen] = useState(false);
    const zoned = toZoned(date, settings.timeZone);
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { variant: nav.variant, size: nav.iconSize, "data-slot": "gantt-date-picker", "aria-label": settings.i18n.labels.goToDate, className: cn(className), children: _jsx(IconPlaceholder, { lucide: "CalendarIcon", tabler: "IconCalendarEvent", hugeicons: "Calendar04Icon", phosphor: "CalendarBlankIcon", remixicon: "RiCalendarLine", className: "size-4", "aria-hidden": "true" }) }) }), _jsx(PopoverContent, { align: "start", className: "w-auto p-0!", children: _jsx(Calendar, { mode: "single", selected: zoned, defaultMonth: zoned, locale: settings.locale, weekStartsOn: settings.weekStartsOn, onSelect: (next) => {
                        if (next) {
                            goTo(next);
                            setOpen(false);
                        }
                    } }) })] }));
}
/** Free slot for consumer toolbar buttons; pure layout shell. */
function GanttToolbar({ className, asChild = false, children, ...props }) {
    const viewConfig = useGanttViewConfig();
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, { "data-slot": "gantt-toolbar", className: cn("flex items-center gap-2", viewConfig.classNames?.toolbar, className), ...props, children: children }));
}
/**
 * Default composed nav (event-calendar parity): Today, time-period switcher,
 * prev/next, title, spacer. GanttDatePicker stays available for custom
 * compositions. Pass children to use it as a pure layout shell instead.
 */
function GanttNav({ className, asChild = false, children, ...props }) {
    const viewConfig = useGanttViewConfig();
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, { "data-slot": "gantt-nav", className: cn(
        // px so the toolbar controls do not hug the container edge; border-b
        // separates the toolbar from the column header below it
        "flex min-w-0 flex-wrap items-center gap-2 border-b px-3 py-2", viewConfig.stickyNav && "bg-background sticky top-0 z-30", viewConfig.classNames?.nav, className), ...props, children: children ?? (
        // Shared provider: first tooltip waits, moving between buttons is instant
        _jsxs(TooltipProvider, { delayDuration: 600, skipDelayDuration: 300, children: [_jsx(GanttNavToday, {}), _jsx(GanttScaleSwitcher, {}), _jsxs("div", { className: "flex items-center", children: [_jsx(GanttNavPrev, {}), _jsx(GanttNavNext, {})] }), _jsx(GanttTitle, {}), _jsx("div", { className: "grow" })] })) }));
}
export { GANTT_SCALES, GanttDatePicker, GanttNav, GanttNavNext, GanttNavPrev, GanttNavToday, GanttScaleSwitcher, GanttTitle, GanttToolbar, };
