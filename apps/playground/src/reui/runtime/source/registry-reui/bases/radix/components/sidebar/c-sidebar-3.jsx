"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "cn";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "../../../../../../../adapters/navigation.tsx";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, } from "../../../../../registry/bases/radix/ui/sidebar.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const SECTIONS = [
    {
        id: "start",
        label: "Getting started",
        items: [
            { id: "install", label: "Installation" },
            { id: "structure", label: "Project structure" },
            { id: "theming", label: "Theming" },
        ],
    },
    {
        id: "components",
        label: "Components",
        items: [
            {
                id: "sidebar",
                label: "Sidebar",
                children: [
                    { id: "anatomy", label: "Anatomy", isActive: true },
                    { id: "collapsing", label: "Collapsing" },
                    { id: "sub-menus", label: "Sub-menus" },
                ],
            },
            {
                id: "data-grid",
                label: "Data grid",
                children: [
                    { id: "columns", label: "Columns" },
                    { id: "row-selection", label: "Row selection" },
                    { id: "virtualisation", label: "Virtualisation" },
                ],
            },
            {
                id: "filters",
                label: "Filters",
                children: [
                    { id: "operators", label: "Operators" },
                    { id: "async-options", label: "Async options" },
                ],
            },
            { id: "calendar", label: "Calendar" },
        ],
    },
    {
        id: "api",
        label: "API reference",
        items: [
            {
                id: "provider",
                label: "Provider props",
                children: [
                    { id: "open-state", label: "Open state" },
                    { id: "widths", label: "Widths" },
                ],
            },
            {
                id: "hooks",
                label: "Hooks",
                children: [{ id: "use-sidebar", label: "useSidebar" }],
            },
            { id: "tokens", label: "CSS variables" },
        ],
    },
];
function matches(label, query) {
    return label.toLowerCase().includes(query);
}
// A parent that matches keeps all of its children, so searching "sidebar"
// still shows the whole page tree under it. A parent that does not match
// survives only through the children that do, and drops out when none are
// left. Both cases are computed during render, never mirrored into state.
function filterItems(items, query) {
    if (!query) {
        return items;
    }
    return items
        .map((item) => matches(item.label, query)
        ? item
        : {
            ...item,
            children: item.children?.filter((child) => matches(child.label, query)),
        })
        .filter((item) => matches(item.label, query) || (item.children?.length ?? 0) > 0);
}
// The ReUI mark, the same path data the App Shell Pro blocks use. An inline
// SVG on `currentColor` rather than an <img> or an icon-package import: it
// ships inside the example, needs no asset and recolours with the panel.
function BrandMark({ className }) {
    return (_jsx("span", { "aria-hidden": "true", className: cn("bg-sidebar-primary text-sidebar-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-md", className), children: _jsxs("svg", { viewBox: "25.5002 25.1352 50 50", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "size-3", children: [_jsx("circle", { cx: "70.634", cy: "29.8334", r: "4.69799", fill: "currentColor" }), _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M25.668 57.0144V29.8332C25.668 27.2386 27.7713 25.1352 30.366 25.1352C32.9606 25.1352 35.0639 27.2386 35.0639 29.8332V57.0144C35.0639 61.833 38.9702 65.7392 43.7888 65.7392H57.2116C62.0302 65.7392 65.9364 61.833 65.9364 57.0144V43.7258C65.9364 41.1312 68.0398 39.0278 70.6344 39.0278C73.229 39.0278 75.3324 41.1312 75.3324 43.7258V57.0144C75.3324 67.0222 67.2194 75.1352 57.2116 75.1352H43.7888C33.7809 75.1352 25.668 67.0222 25.668 57.0144Z", fill: "currentColor" })] }) }));
}
// The chevron turns from a local boolean rather than from an open-state data
// attribute. Base emits `data-open` where radix emits `data-state="open"`, so
// reading the attribute would be the one line the two twins could not share.
function Chevron({ open }) {
    return (_jsx(IconPlaceholder, { lucide: "ChevronRightIcon", tabler: "IconChevronRight", hugeicons: "ArrowRight01Icon", phosphor: "CaretRightIcon", remixicon: "RiArrowRightSLine", className: cn("ml-auto size-4 shrink-0 opacity-60 transition-transform duration-200", open && "rotate-90"), "aria-hidden": "true" }));
}
// A page, or a page with a sub-tree under it. The open state is seeded in the
// useState INITIALIZER from whichever child is current, so the active trail is
// already expanded on the first paint and no effect ever has to re-derive it.
//
// SidebarMenuButton truncates `[&>span:last-child]` only, and on a disclosure
// row the last child is the chevron. The label therefore has to ask for
// `min-w-0 flex-1 truncate` itself, or a long page title grows past the
// button's overflow-hidden edge and takes the chevron with it.
function DocsNavItem({ item, forceOpen, }) {
    const [open, setOpen] = useState(() => item.children?.some((child) => child.isActive) ?? false);
    if (!item.children || item.children.length === 0) {
        return (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, isActive: item.isActive, children: _jsx("a", { href: "#", children: _jsx("span", { children: item.label }) }) }) }));
    }
    const expanded = forceOpen || open;
    return (_jsxs(SidebarMenuItem, { children: [_jsxs(SidebarMenuButton, { type: "button", onClick: () => setOpen((value) => !value), "aria-expanded": expanded, "aria-controls": `docs-sub-${item.id}`, children: [_jsx("span", { className: "min-w-0 flex-1 truncate", children: item.label }), _jsx(Chevron, { open: expanded })] }), expanded ? (_jsx(SidebarMenuSub, { id: `docs-sub-${item.id}`, children: item.children.map((child) => (_jsx(SidebarMenuSubItem, { children: _jsx(SidebarMenuSubButton, { asChild: true, isActive: child.isActive, children: _jsx("a", { href: "#", children: _jsx("span", { children: child.label }) }) }) }, child.id))) })) : null] }));
}
// A section, collapsible from its own label, composed the way shadcn's own
// sidebar docs compose one: a Collapsible wrapping the SidebarGroup, the label
// rendered AS the trigger, and the body in CollapsibleContent. Driving it from
// a hand-rolled button meant writing aria-expanded and aria-controls by hand;
// the trigger supplies both.
//
// Controlled rather than `defaultOpen`, because the filter field also forces a
// section open: while it has text in it every surviving section is expanded, so
// a match can never hide behind a collapsed heading.
//
// The hover classes are deliberate. SidebarGroupLabel renders a div by default
// and exposes no variant for an interactive one, so a label that became a
// trigger has to say for itself that it is pressable.
//
// `text-start` on the name is load-bearing, not decoration. The trigger is a
// <button>, a button's UA style is `text-align: center`, and the name sits in a
// `flex-1` span so it spans the row: without it every heading renders centred
// while the chevron stays hard right. SidebarGroupLabel has no overflow
// handling of its own either, which is why the span truncates.
function DocsSection({ section, items, filtering, }) {
    const [open, setOpen] = useState(() => section.items.some((item) => item.isActive || item.children?.some((child) => child.isActive)));
    const expanded = filtering || open;
    return (_jsx(Collapsible, { open: expanded, onOpenChange: setOpen, children: _jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { asChild: true, className: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full", children: _jsxs(CollapsibleTrigger, { children: [_jsx("span", { className: "min-w-0 flex-1 truncate text-start", children: section.label }), _jsx(Chevron, { open: expanded })] }) }), _jsx(CollapsibleContent, { children: _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: items.map((item) => (_jsx(DocsNavItem, { item: item, forceOpen: filtering }, item.id))) }) }) })] }) }));
}
// Two levels of disclosure in one panel: sections that collapse from their own
// label, and a SidebarMenuSub tree under any page that has one.
//
// The filter field owns the only other piece of state. Everything it affects,
// which sections survive, which pages survive and which trees are forced open,
// is derived from it during render, so there is nothing to keep in sync.
//
// `collapsible="none"` is the one Sidebar branch with no media query in it, so
// the panel is identical at every frame width. It also ignores the open state
// entirely, which is why no SidebarTrigger appears here: it would toggle
// something this branch never reads.
//
// `min-h-0` beside the height is load-bearing. SidebarProvider ships
// `min-h-svh`, and tailwind-merge only drops it when another `min-h-*` arrives
// with it, so without the pair the example is viewport tall inside its frame.
export default function Pattern() {
    const [query, setQuery] = useState("");
    const needle = query.trim().toLowerCase();
    const visible = SECTIONS.map((section) => ({
        section,
        items: filterItems(section.items, needle),
    })).filter((entry) => entry.items.length > 0);
    return (_jsxs(SidebarProvider, { className: "h-dvh min-h-0 w-full overflow-hidden", children: [_jsxs(Sidebar, { collapsible: "none", children: [_jsxs(SidebarHeader, { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BrandMark, {}), _jsx("span", { className: "truncate text-sm font-medium", children: "ReUI Docs" }), _jsx("span", { className: "text-sidebar-foreground/70 ml-auto shrink-0 text-xs", children: "v2.8" })] }), _jsx("label", { htmlFor: "docs-search", className: "sr-only", children: "Search the documentation" }), _jsx(SidebarInput, { id: "docs-search", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search docs" })] }), _jsxs(SidebarContent, { role: "navigation", "aria-label": "Documentation", children: [visible.map((entry) => (_jsx(DocsSection, { section: entry.section, items: entry.items, filtering: needle !== "" }, entry.section.id))), visible.length === 0 ? (_jsxs("p", { className: "text-sidebar-foreground/70 px-4 py-6 text-center text-xs", children: ["No pages match", " ", _jsx("span", { className: "text-sidebar-foreground", children: query }), "."] })) : null] })] }), _jsx(SidebarInset, { className: "min-w-0 overflow-auto", children: _jsxs("article", { className: "mx-auto w-full max-w-2xl px-6 py-6", children: [_jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "Sidebar anatomy" }), _jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "A sidebar is a provider, a panel and the inset beside it. The provider owns the open state and the widths, the panel owns the navigation, and the inset is the page the reader came for." }), _jsx("h2", { className: "mt-6 text-base font-medium", children: "Where the parts go" }), _jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Header and footer are pinned; only the content between them scrolls. Groups carry the labels, menus carry the rows, and a sub-menu nests one level under the row that owns it." }), _jsx("p", { className: "text-muted-foreground mt-2 text-sm", children: "Keep the panel to one job. A tree that needs three levels of indentation usually wants a page of its own." }), _jsxs("ul", { className: "text-muted-foreground mt-4 flex list-disc flex-col gap-1.5 ps-5 text-sm", children: [_jsx("li", { children: "One landmark per panel, labelled for screen readers." }), _jsx("li", { children: "Every disclosure reports aria-expanded and what it controls." }), _jsx("li", { children: "The current page is marked once, at the deepest level." })] })] }) })] }));
}
