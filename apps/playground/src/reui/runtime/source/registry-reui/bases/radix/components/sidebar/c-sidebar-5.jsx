"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent, CardHeader, CardTitle, } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarProvider, SidebarSeparator, SidebarTrigger, } from "../../../../../registry/bases/radix/ui/sidebar.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Demo data only: every row links to `href="#"`, so nothing here invents a
// route or an endpoint on the way into someone else's app.
const PINNED = [
    { id: "checkout", name: "Checkout API" },
    { id: "design-system", name: "Design system" },
    { id: "status", name: "Status page" },
];
// Icons are JSX nodes with a STATIC name per library, which is the shape
// `shadcn add` rewrites when it swaps in whichever icon package the installing
// project already uses.
const PROJECTS = [
    {
        id: "checkout",
        name: "Checkout API",
        open: 8,
        icon: (_jsx(IconPlaceholder, { lucide: "PackageIcon", tabler: "IconPackage", hugeicons: "PackageIcon", phosphor: "PackageIcon", remixicon: "RiBox3Line", "aria-hidden": "true" })),
    },
    {
        id: "design-system",
        name: "Design system",
        open: 3,
        icon: (_jsx(IconPlaceholder, { lucide: "PaletteIcon", tabler: "IconPalette", hugeicons: "PaintBoardIcon", phosphor: "PaletteIcon", remixicon: "RiPaletteLine", "aria-hidden": "true" })),
    },
    {
        id: "edge-cache",
        name: "Edge cache",
        open: 2,
        icon: (_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeIcon", remixicon: "RiGlobalLine", "aria-hidden": "true" })),
    },
    {
        id: "growth",
        name: "Growth experiments",
        open: 11,
        icon: (_jsx(IconPlaceholder, { lucide: "BarChart3Icon", tabler: "IconChartBar", hugeicons: "Analytics01Icon", phosphor: "ChartBarIcon", remixicon: "RiBarChartLine", "aria-hidden": "true" })),
    },
    {
        id: "marketing",
        name: "Marketing site",
        open: 4,
        icon: (_jsx(IconPlaceholder, { lucide: "FileTextIcon", tabler: "IconFileText", hugeicons: "File02Icon", phosphor: "FileTextIcon", remixicon: "RiFileTextLine", "aria-hidden": "true" })),
    },
    {
        id: "mobile",
        name: "Mobile client",
        open: 6,
        icon: (_jsx(IconPlaceholder, { lucide: "SmartphoneIcon", tabler: "IconDeviceMobile", hugeicons: "SmartPhone01Icon", phosphor: "DeviceMobileIcon", remixicon: "RiSmartphoneLine", "aria-hidden": "true" })),
    },
    {
        id: "payments",
        name: "Payments ledger",
        open: 1,
        icon: (_jsx(IconPlaceholder, { lucide: "DatabaseIcon", tabler: "IconDatabase", hugeicons: "Database02Icon", phosphor: "DatabaseIcon", remixicon: "RiDatabase2Line", "aria-hidden": "true" })),
    },
    {
        id: "search",
        name: "Search index",
        open: 5,
        icon: (_jsx(IconPlaceholder, { lucide: "TerminalIcon", tabler: "IconTerminal", hugeicons: "ComputerTerminal01Icon", phosphor: "TerminalIcon", remixicon: "RiTerminalLine", "aria-hidden": "true" })),
    },
];
const RUNS = [
    { id: "r-311", label: "Nightly contract tests", time: "08:12" },
    { id: "r-310", label: "Payment webhook replay", time: "07:40", failed: true },
    { id: "r-309", label: "Index rebuild", time: "06:55" },
    { id: "r-308", label: "Locale export", time: "06:02" },
];
// Pinned rows sit above the filter's reach on purpose: a query that matches
// nothing still leaves a usable panel instead of an empty column.
function PinnedProjects() {
    return (_jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "Pinned" }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: PINNED.map((project) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, children: _jsxs("a", { href: "#", children: [_jsx(IconPlaceholder, { lucide: "BookmarkIcon", tabler: "IconBookmark", hugeicons: "Bookmark02Icon", phosphor: "BookmarkSimpleIcon", remixicon: "RiBookmarkLine", "aria-hidden": "true" }), _jsx("span", { children: project.name })] }) }) }, project.id))) }) })] }));
}
// One recent run. Glyph and colour both carry the outcome visually, which is
// what makes the row readable without colour vision; neither reaches a screen
// reader, so the `sr-only` word is what does.
function RunRow({ run }) {
    return (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [run.failed ? (_jsx(IconPlaceholder, { lucide: "AlertCircleIcon", tabler: "IconAlertCircle", hugeicons: "AlertCircleIcon", phosphor: "WarningCircleIcon", remixicon: "RiErrorWarningLine", className: "text-destructive size-3.5 shrink-0", "aria-hidden": "true" })) : (_jsx(IconPlaceholder, { lucide: "CircleCheckIcon", tabler: "IconCircleCheck", hugeicons: "CheckmarkCircle02Icon", phosphor: "CheckCircleIcon", remixicon: "RiCheckboxCircleLine", className: "text-success size-3.5 shrink-0", "aria-hidden": "true" })), _jsx("span", { className: "sr-only", children: run.failed ? "Failed" : "Succeeded" }), _jsx("span", { className: "min-w-0 flex-1 truncate", children: run.label }), _jsx("span", { className: "text-muted-foreground shrink-0 text-xs tabular-nums", children: run.time })] }));
}
// The filter field. It boots empty, so the unfiltered list is what a visitor
// sees first, and the clear button only exists while there is something to
// clear rather than sitting there permanently disabled.
//
// Both affordances sit in an InputGroupAddon rather than on top of the input.
// The addon reserves real space in the group and the input's padding follows
// it, so neither the icon nor the clear button can ever overlap typed text the
// way an absolutely positioned overlay would.
function ProjectFilter({ query, onChange, }) {
    return (
    /*
      The form and the `py-0` group are shadcn's own SearchForm shape
      (blocks/sidebar-05): the form gives Enter somewhere to go instead of
      submitting the page, and the group lines the field up with the panel's
      gutter rather than the header's padding.
    */
    _jsx("form", { onSubmit: (event) => event.preventDefault(), children: _jsx(SidebarGroup, { className: "py-0", children: _jsx(SidebarGroupContent, { children: _jsxs(InputGroup, { children: [_jsx(InputGroupAddon, { children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", "aria-hidden": "true" }) }), _jsx(InputGroupInput, { value: query, onChange: (event) => onChange(event.target.value), placeholder: "Filter projects", "aria-label": "Filter projects" }), query ? (_jsx(InputGroupAddon, { align: "inline-end", children: _jsx(InputGroupButton, { size: "icon-xs", "aria-label": "Clear filter", onClick: () => onChange(""), children: _jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", "aria-hidden": "true" }) }) })) : null] }) }) }) }));
}
// The three states one list can be in. Six skeleton rows is roughly what the
// loaded list runs to, so the panel does not jump height while a refresh is in
// flight, and `aria-busy` tells assistive technology the rows are stale rather
// than gone.
//
// The empty message sits OUTSIDE SidebarMenu. That element is a `ul`, and a
// paragraph is not a permitted child of one.
function ProjectList({ projects, loading, query, onRefresh, }) {
    return (_jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "All projects" }), _jsxs(SidebarGroupAction, { type: "button", onClick: onRefresh, children: [_jsx(IconPlaceholder, { lucide: "LoaderCircleIcon", tabler: "IconLoader2", hugeicons: "Loading02Icon", phosphor: "CircleNotchIcon", remixicon: "RiLoader4Line", className: cn("size-4", loading && "animate-spin"), "aria-hidden": "true" }), _jsx("span", { className: "sr-only", children: "Refresh projects" })] }), _jsxs(SidebarGroupContent, { children: [_jsx(SidebarMenu, { "aria-busy": loading, children: loading
                            ? Array.from({ length: 6 }, (_, index) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuSkeleton, { showIcon: true }) }, `skeleton-${index}`)))
                            : projects.map((project) => (_jsxs(SidebarMenuItem, { children: [_jsx(SidebarMenuButton, { asChild: true, children: _jsxs("a", { href: "#", children: [project.icon, _jsx("span", { children: project.name })] }) }), _jsx(SidebarMenuBadge, { children: project.open })] }, project.id))) }), !loading && projects.length === 0 ? (_jsxs("p", { className: "text-sidebar-foreground/70 px-2 py-6 text-center text-xs", children: ["No projects match", " ", _jsx("span", { className: "text-sidebar-foreground", children: query }), "."] })) : null] })] }));
}
// The page beside the panel. The run list is a Card rather than a div with a
// border and a radius, because a literal `rounded-lg` is square in lyra and
// sera and much rounder in maia and luma: only a component resolves the panel
// correctly under all eight styles.
function ProjectOverview() {
    return (_jsxs(SidebarInset, { className: "min-w-0 overflow-hidden", children: [_jsxs("header", { className: "flex h-12 shrink-0 items-center gap-2 border-b px-4", children: [_jsx(SidebarTrigger, { className: "-ms-1" }), _jsx("h2", { className: "truncate text-sm font-medium", children: "Checkout API" }), _jsx("span", { className: "text-muted-foreground ml-auto shrink-0 text-xs", children: "Updated 4m ago" })] }), _jsx("div", { className: "min-w-0 flex-1 overflow-auto p-4", children: _jsxs(Card, { size: "sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent runs" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex flex-col gap-2.5", children: RUNS.map((run) => (_jsx(RunRow, { run: run }, run.id))) }) })] }) })] }));
}
// A filter field, a loading state and an empty state, which is the set a real
// sidebar needs and a demo usually skips.
//
// The visible list is derived during render from the query. Nothing copies the
// result into state, so there is no second source of truth to fall out of step.
//
// The refresh is an event handler, not an effect, so the panel boots LOADED and
// the skeletons are something the reader triggers. That also keeps
// SidebarMenuSkeleton out of the first paint, which matters because it picks a
// random width in a useState initializer and would otherwise differ between the
// server and the client render. The only effect in the file clears the pending
// timer, so a refresh can never land on an unmounted panel.
//
// `collapsible="none"` is the one Sidebar branch with no media query in it, so
// the panel is identical at every frame width. It ignores the open state too,
// which is why no SidebarTrigger appears here.
//
// `min-h-0` beside the height is load-bearing. SidebarProvider ships
// `min-h-svh`, and tailwind-merge only drops it when another `min-h-*` arrives
// with it, so without the pair the example is viewport tall inside its frame.
export default function Pattern() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const timer = useRef(null);
    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);
    function startRefresh() {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        setLoading(true);
        timer.current = setTimeout(() => setLoading(false), 900);
    }
    const needle = query.trim().toLowerCase();
    const visible = PROJECTS.filter((project) => project.name.toLowerCase().includes(needle));
    return (_jsxs(SidebarProvider, { className: "relative h-dvh min-h-0 w-full overflow-hidden", children: [_jsxs(Sidebar, { className: "absolute h-full", children: [_jsx(SidebarHeader, { children: _jsx(ProjectFilter, { query: query, onChange: setQuery }) }), _jsxs(SidebarContent, { role: "navigation", "aria-label": "Projects", children: [_jsx(PinnedProjects, {}), _jsx(SidebarSeparator, { className: "mx-0" }), _jsx(ProjectList, { projects: visible, loading: loading, query: query, onRefresh: startRefresh })] }), _jsxs(SidebarFooter, { children: [_jsx(SidebarSeparator, { className: "mx-0" }), _jsx("p", { className: "text-sidebar-foreground/70 px-2 text-xs", children: "Free plan, 8 of 10 projects" }), _jsx(Button, { variant: "outline", size: "sm", className: "w-full", children: "Upgrade plan" })] })] }), _jsx(ProjectOverview, {})] }));
}
