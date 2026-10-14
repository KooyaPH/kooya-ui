"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail, SidebarTrigger, } from "../../../../../registry/bases/radix/ui/sidebar.jsx";
import { TooltipProvider } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Each icon is a JSX node whose per-library names are STATIC literals. That is
// the shape `shadcn add` rewrites when it swaps the icon package, so an
// interpolated value would leave it nothing to rewrite.
const NAV = [
    {
        id: "overview",
        label: "Overview",
        icon: (_jsx(IconPlaceholder, { lucide: "LayoutDashboardIcon", tabler: "IconLayoutDashboard", hugeicons: "DashboardSquare02Icon", phosphor: "LayoutIcon", remixicon: "RiDashboardLine", "aria-hidden": "true" })),
    },
    {
        id: "inbox",
        label: "Inbox",
        badge: 12,
        icon: (_jsx(IconPlaceholder, { lucide: "InboxIcon", tabler: "IconInbox", hugeicons: "InboxIcon", phosphor: "TrayIcon", remixicon: "RiInboxLine", "aria-hidden": "true" })),
    },
    {
        id: "deployments",
        label: "Deployments",
        isActive: true,
        icon: (_jsx(IconPlaceholder, { lucide: "RocketIcon", tabler: "IconRocket", hugeicons: "RocketIcon", phosphor: "RocketIcon", remixicon: "RiRocketLine", "aria-hidden": "true" })),
    },
    {
        id: "monitoring",
        label: "Monitoring",
        icon: (_jsx(IconPlaceholder, { lucide: "ActivityIcon", tabler: "IconActivity", hugeicons: "Pulse01Icon", phosphor: "ActivityIcon", remixicon: "RiPulseLine", "aria-hidden": "true" })),
    },
    {
        id: "analytics",
        label: "Analytics",
        icon: (_jsx(IconPlaceholder, { lucide: "BarChart3Icon", tabler: "IconChartBar", hugeicons: "Analytics01Icon", phosphor: "ChartBarIcon", remixicon: "RiBarChartLine", "aria-hidden": "true" })),
    },
    {
        id: "audit",
        label: "Audit log",
        icon: (_jsx(IconPlaceholder, { lucide: "ShieldCheckIcon", tabler: "IconShieldCheck", hugeicons: "Shield01Icon", phosphor: "ShieldCheckIcon", remixicon: "RiShieldCheckLine", "aria-hidden": "true" })),
    },
    {
        id: "settings",
        label: "Settings",
        icon: (_jsx(IconPlaceholder, { lucide: "SettingsIcon", tabler: "IconSettings", hugeicons: "SettingsIcon", phosphor: "GearIcon", remixicon: "RiSettings3Line", "aria-hidden": "true" })),
    },
];
const MONITORS = [
    {
        id: "edge",
        label: "Edge network",
        value: "99.99%",
        icon: (_jsx(IconPlaceholder, { lucide: "GlobeIcon", tabler: "IconWorld", hugeicons: "Globe02Icon", phosphor: "GlobeIcon", remixicon: "RiGlobalLine", className: "text-muted-foreground size-4 shrink-0", "aria-hidden": "true" })),
    },
    {
        id: "webhooks",
        label: "Webhook delivery",
        value: "42ms p95",
        icon: (_jsx(IconPlaceholder, { lucide: "ZapIcon", tabler: "IconBolt", hugeicons: "FlashIcon", phosphor: "LightningIcon", remixicon: "RiFlashlightLine", className: "text-muted-foreground size-4 shrink-0", "aria-hidden": "true" })),
    },
    {
        id: "jobs",
        label: "Background jobs",
        value: "12 queued",
        icon: (_jsx(IconPlaceholder, { lucide: "DatabaseIcon", tabler: "IconDatabase", hugeicons: "Database02Icon", phosphor: "DatabaseIcon", remixicon: "RiDatabase2Line", className: "text-muted-foreground size-4 shrink-0", "aria-hidden": "true" })),
    },
];
// The rail itself. Two things the primitive already handles, so nothing here
// has to: the button clips its own label at a 3rem width instead of removing
// it, so the accessible name survives the collapse, and SidebarMenuBadge
// carries `group-data-[collapsible=icon]:hidden`, so counts disappear with the
// labels rather than stacking on top of an icon.
//
// `tooltip` is the other half of that bargain. The primitive renders it with
// `hidden` until `state` is collapsed, so it costs nothing while the labels
// are on screen and becomes the only name a mouse user sees once they are not.
function RailNav() {
    return (_jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "Platform" }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: NAV.map((item) => (_jsxs(SidebarMenuItem, { children: [_jsx(SidebarMenuButton, { asChild: true, isActive: item.isActive, tooltip: item.label, children: _jsxs("a", { href: "#", children: [item.icon, _jsx("span", { children: item.label })] }) }), item.badge ? (_jsx(SidebarMenuBadge, { children: item.badge })) : null] }, item.id))) }) })] }));
}
// The ReUI mark, the same path data the App Shell Pro blocks use. An inline
// SVG on `currentColor` rather than an <img> or an icon-package import: it
// ships inside the example, needs no asset and recolours with the panel.
function BrandMark({ className }) {
    return (_jsx("span", { "aria-hidden": "true", className: cn("bg-sidebar-primary text-sidebar-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-md", className), children: _jsxs("svg", { viewBox: "25.5002 25.1352 50 50", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "size-3", children: [_jsx("circle", { cx: "70.634", cy: "29.8334", r: "4.69799", fill: "currentColor" }), _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M25.668 57.0144V29.8332C25.668 27.2386 27.7713 25.1352 30.366 25.1352C32.9606 25.1352 35.0639 27.2386 35.0639 29.8332V57.0144C35.0639 61.833 38.9702 65.7392 43.7888 65.7392H57.2116C62.0302 65.7392 65.9364 61.833 65.9364 57.0144V43.7258C65.9364 41.1312 68.0398 39.0278 70.6344 39.0278C73.229 39.0278 75.3324 41.1312 75.3324 43.7258V57.0144C75.3324 67.0222 67.2194 75.1352 57.2116 75.1352H43.7888C33.7809 75.1352 25.668 67.0222 25.668 57.0144Z", fill: "currentColor" })] }) }));
}
// The mark is BrandMark, the same inline SVG the other sidebar examples carry,
// scaled at the call site from its 24px default to the 32px tile sidebar-08
// gives a `size="lg"` header row.
//
// `size="lg"` is what makes that tile survive the collapse: every menu button
// is forced to `size-8` on the rail, and large is the one size that zeroes the
// padding there in all eight styles, so a 32px tile fills it exactly.
// `group-data-[collapsible=icon]:sr-only` on the name block is the other half.
// It leaves the flex line, and takes the 8px gap with it, while keeping the
// button's accessible name, so the tile is the only child left and sits on the
// rail's axis with nothing needed to centre it.
function BrandButton() {
    return (_jsx(SidebarMenu, { children: _jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, size: "lg", tooltip: "ReUI Labs", children: _jsxs("a", { href: "#", children: [_jsx(BrandMark, { className: "size-8 rounded-lg [&>svg]:size-4" }), _jsxs("span", { className: "grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:sr-only", children: [_jsx("span", { className: "truncate text-sm font-medium", children: "ReUI Labs" }), _jsx("span", { className: "text-sidebar-foreground/70 truncate text-xs", children: "Production" })] })] }) }) }) }));
}
// The same collapsed-rail treatment as the brand mark, with the avatar sized
// to match it. Avatar's default is 32px, which is both what sidebar-07's
// footer row uses and what fills the collapsed button edge to edge.
function AccountButton() {
    return (_jsx(SidebarMenu, { children: _jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, size: "lg", tooltip: "Nadia Rahman", children: _jsxs("a", { href: "#", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: "/reui-assets/images/0a10b9bc070f3bdf606f.jpg", alt: "" }), _jsx(AvatarFallback, { children: "NR" })] }), _jsxs("span", { className: "grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:sr-only", children: [_jsx("span", { className: "truncate text-sm font-medium", children: "Nadia Rahman" }), _jsx("span", { className: "text-sidebar-foreground/70 truncate text-xs", children: "Owner" })] })] }) }) }) }));
}
// A rail that collapses to icons, and the two controls that drive it.
//
// The collapsed width is the provider's own `--sidebar-width-icon` (3rem), and
// the open state lives in SidebarProvider, so nothing here mirrors it: both
// controls call the same context.
//
// SidebarTrigger sits in the inset rather than in the panel because it is the
// only control that survives both branches. shadcn's Sidebar renders its
// desktop rail behind `hidden md:block` and swaps to a Sheet under 768px, and
// SidebarRail is `sm:flex` against that desktop wrapper, so on a narrow frame
// the trigger in the header is what opens the navigation at all.
//
// `min-h-0` beside the height is load-bearing. SidebarProvider ships
// `min-h-svh`, and tailwind-merge only drops it when another `min-h-*` arrives
// with it, so without the pair this shell is viewport tall wherever it lands.
//
// `absolute h-full` on the Sidebar is the other half of that. The desktop
// branch's panel ships `fixed inset-y-0 h-svh`, and a fixed box ignores both
// the height above and the ancestor's overflow, so it would size and position
// against the VIEWPORT and paint down the page beside a 468px shell. The
// className lands on that container and tailwind-merge swaps both groups, and
// `relative` on the provider is what the panel then measures itself against.
// The mobile branch is untouched: it renders a Sheet and never forwards
// className to it.
//
// TooltipProvider is required here and has no counterpart in the base twin.
// Every rail row asks SidebarMenuButton for a `tooltip`, and this Tooltip
// needs a provider above it: without one the whole panel throws on mount
// rather than quietly losing the tooltips.
export default function Pattern() {
    return (_jsx(TooltipProvider, { children: _jsxs(SidebarProvider, { className: "relative h-dvh min-h-0 w-full overflow-hidden", children: [_jsxs(Sidebar, { collapsible: "icon", className: "absolute h-full", children: [_jsx(SidebarHeader, { children: _jsx(BrandButton, {}) }), _jsx(SidebarContent, { role: "navigation", "aria-label": "Primary", children: _jsx(RailNav, {}) }), _jsx(SidebarFooter, { children: _jsx(AccountButton, {}) }), _jsx(SidebarRail, {})] }), _jsxs(SidebarInset, { className: "min-w-0 overflow-hidden", children: [_jsxs("header", { className: "flex h-12 shrink-0 items-center gap-2 border-b px-3", children: [_jsx(SidebarTrigger, {}), _jsx("h2", { className: "truncate text-sm font-medium", children: "Deployments" }), _jsx(Button, { variant: "outline", size: "sm", className: "ml-auto", children: "New deploy" })] }), _jsxs("div", { className: "min-w-0 flex-1 overflow-auto p-4", children: [_jsx("p", { className: "text-muted-foreground max-w-prose text-sm", children: "Every deploy runs against the edge network first. Collapse the rail with the panel button or the strip on its edge, and the labels give way to tooltips." }), _jsx("dl", { className: "mt-4 flex flex-col gap-3", children: MONITORS.map((monitor) => (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsxs("dt", { className: "flex min-w-0 flex-1 items-center gap-2", children: [monitor.icon, _jsx("span", { className: "truncate", children: monitor.label })] }), _jsx("dd", { className: "shrink-0 tabular-nums", children: monitor.value })] }, monitor.id))) })] })] })] }) }));
}
