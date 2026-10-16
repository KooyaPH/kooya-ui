"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, } from "../../../../../registry/bases/radix/ui/sidebar.jsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
// Demo data only: every link is `href="#"` and the faces come from the fixed
// set of photo ids this registry already ships, so nothing here points at a
// real person or an invented endpoint.
const ASSIGNEES = [
    {
        id: "mara",
        name: "Mara Ellison",
        initials: "ME",
        avatar: "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    },
    {
        id: "tobias",
        name: "Tobias Reiner",
        initials: "TR",
        avatar: "/reui-assets/images/df73db9a2c25069a422d.jpg",
    },
    {
        id: "priya",
        name: "Priya Raman",
        initials: "PR",
        avatar: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    },
];
// Icons are JSX nodes carrying a STATIC name per library, which is the shape
// `shadcn add` rewrites when it swaps the icon package for the one the
// installing project already uses.
const LINKED = [
    {
        id: "subtasks",
        label: "Sub-tasks",
        count: 6,
        icon: (_jsx(IconPlaceholder, { lucide: "ListChecksIcon", tabler: "IconListCheck", hugeicons: "TaskDone01Icon", phosphor: "ChecksIcon", remixicon: "RiListCheck", "aria-hidden": "true" })),
    },
    {
        id: "pull-requests",
        label: "Pull requests",
        count: 2,
        icon: (_jsx(IconPlaceholder, { lucide: "GitPullRequestArrowIcon", tabler: "IconGitPullRequest", hugeicons: "GitPullRequestIcon", phosphor: "GitPullRequest", remixicon: "RiGitPullRequestLine", "aria-hidden": "true" })),
    },
    {
        id: "incidents",
        label: "Incidents",
        count: 1,
        icon: (_jsx(IconPlaceholder, { lucide: "BugIcon", tabler: "IconBug", hugeicons: "Bug01Icon", phosphor: "BugIcon", remixicon: "RiBugLine", "aria-hidden": "true" })),
    },
    {
        id: "docs",
        label: "Docs",
        count: 3,
        icon: (_jsx(IconPlaceholder, { lucide: "BookOpenIcon", tabler: "IconBook", hugeicons: "BookOpen01Icon", phosphor: "BookOpenIcon", remixicon: "RiBookOpenLine", "aria-hidden": "true" })),
    },
];
const ACTIVITY = [
    {
        id: "review",
        label: "Priya requested changes",
        time: "2h",
        icon: (_jsx(IconPlaceholder, { lucide: "MessageSquareIcon", tabler: "IconMessageDots", hugeicons: "Message02Icon", phosphor: "ChatIcon", remixicon: "RiChat4Line", "aria-hidden": "true" })),
    },
    {
        id: "deploy",
        label: "Deployed to staging",
        time: "5h",
        icon: (_jsx(IconPlaceholder, { lucide: "RocketIcon", tabler: "IconRocket", hugeicons: "RocketIcon", phosphor: "RocketIcon", remixicon: "RiRocketLine", "aria-hidden": "true" })),
    },
    {
        id: "assigned",
        label: "Mara took ownership",
        time: "Yesterday",
        icon: (_jsx(IconPlaceholder, { lucide: "UserPlusIcon", tabler: "IconUserPlus", hugeicons: "UserAdd01Icon", phosphor: "UserPlusIcon", remixicon: "RiUserAddLine", "aria-hidden": "true" })),
    },
];
// One person, with a row menu. `showOnHover` only hides the action from `md`
// up, so on a touch-width frame it stays visible, which is what makes the row
// usable without a hover state at all.
//
// The menu opens to the LEFT because the panel is flush against the right edge
// of the frame and a right-side popup would have nowhere to go.
function AssigneeRow({ assignee }) {
    return (_jsxs(SidebarMenuItem, { children: [_jsx(SidebarMenuButton, { asChild: true, children: _jsxs("a", { href: "#", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: assignee.avatar, alt: "" }), _jsx(AvatarFallback, { children: assignee.initials })] }), _jsx("span", { children: assignee.name })] }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(SidebarMenuAction, { showOnHover: true, "aria-label": `Actions for ${assignee.name}`, children: _jsx(IconPlaceholder, { lucide: "MoreHorizontalIcon", tabler: "IconDots", hugeicons: "MoreHorizontalCircle01Icon", phosphor: "DotsThreeIcon", remixicon: "RiMoreLine", "aria-hidden": "true" }) }) }), _jsxs(DropdownMenuContent, { side: "left", align: "start", children: [_jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuItem, { children: "Make owner" }), _jsx(DropdownMenuItem, { children: "Notify" })] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuGroup, { children: _jsx(DropdownMenuItem, { variant: "destructive", children: "Remove" }) })] })] })] }));
}
// The inspector itself. SidebarMenuBadge stays a SIBLING of the button rather
// than a child: `asChild` puts every child inside the anchor, so a count
// nested there would join the link's hit target and its accessible name.
//
// In the activity rows the timestamp is the last span, and the menu button
// applies `truncate` to whichever span comes last. Giving the timestamp
// `shrink-0` and the label `min-w-0 flex-1` puts the ellipsis back on the text
// that actually needs one.
//
// `absolute h-full` is what keeps the panel inside the example. This is the
// desktop branch, whose container ships `fixed inset-y-0 h-svh`, and a fixed
// box neither reads the provider's height nor is clipped by its
// overflow-hidden, so it would be window tall against the right edge of the
// page. The className lands on that container and tailwind-merge swaps both
// groups; the provider's `relative` is what it then measures against, and its
// overflow-hidden is what finally clips the off-canvas slide to the example.
function Inspector() {
    return (_jsxs(Sidebar, { side: "right", variant: "floating", collapsible: "offcanvas", className: "absolute h-full", children: [_jsx(SidebarHeader, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "truncate text-sm font-medium", children: "Details" }), _jsx(Badge, { variant: "warning-light", className: "ml-auto shrink-0", children: "In review" })] }) }), _jsxs(SidebarContent, { role: "complementary", "aria-label": "Issue details", children: [_jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "Assignees" }), _jsxs(SidebarGroupAction, { type: "button", children: [_jsx(IconPlaceholder, { lucide: "UserPlusIcon", tabler: "IconUserPlus", hugeicons: "UserAdd01Icon", phosphor: "UserPlusIcon", remixicon: "RiUserAddLine", "aria-hidden": "true" }), _jsx("span", { className: "sr-only", children: "Add assignee" })] }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: ASSIGNEES.map((assignee) => (_jsx(AssigneeRow, { assignee: assignee }, assignee.id))) }) })] }), _jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "Linked work" }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: LINKED.map((entry) => (_jsxs(SidebarMenuItem, { children: [_jsx(SidebarMenuButton, { asChild: true, children: _jsxs("a", { href: "#", children: [entry.icon, _jsx("span", { children: entry.label })] }) }), _jsx(SidebarMenuBadge, { children: entry.count })] }, entry.id))) }) })] }), _jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: "Activity" }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: ACTIVITY.map((entry) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { asChild: true, children: _jsxs("a", { href: "#", children: [entry.icon, _jsx("span", { className: "min-w-0 flex-1 truncate", children: entry.label }), _jsx("span", { className: "text-sidebar-foreground/60 shrink-0 text-xs", children: entry.time })] }) }) }, entry.id))) }) })] })] }), _jsx(SidebarFooter, { children: _jsx(Button, { variant: "outline", size: "sm", className: "w-full", children: "Open in board" }) })] }));
}
// The record the panel describes. `min-w-0` matters here: the inset is
// `w-full flex-1`, so without it a long title would grow the flex item and
// shove the inspector off the frame instead of wrapping.
function IssueView() {
    return (_jsxs(SidebarInset, { className: "min-w-0 overflow-hidden", children: [_jsxs("header", { className: "flex h-12 shrink-0 items-center gap-2 border-b px-4", children: [_jsx("span", { className: "text-muted-foreground shrink-0 text-xs font-medium tabular-nums", children: "ENG-2481" }), _jsx(Button, { variant: "outline", size: "sm", className: "ml-auto", children: "Share" }), _jsx(SidebarTrigger, {})] }), _jsxs("div", { className: "min-w-0 flex-1 overflow-auto px-4 py-4", children: [_jsx("h1", { className: "text-base font-medium", children: "Retry failed webhook deliveries" }), _jsx("p", { className: "text-muted-foreground mt-2 max-w-prose text-sm", children: "Deliveries that fail on a 5xx are dropped after the first attempt, so a customer whose endpoint restarts during a deploy never sees the event again." }), _jsx("p", { className: "text-muted-foreground mt-2 max-w-prose text-sm", children: "Queue the failures and retry them with a backoff, then surface the attempt count on the delivery record." }), _jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "MessageSquareIcon", tabler: "IconMessageDots", hugeicons: "Message02Icon", phosphor: "ChatIcon", remixicon: "RiChat4Line", "aria-hidden": "true" }), "Comment"] }), _jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "PaperclipIcon", tabler: "IconPaperclip", hugeicons: "Attachment02Icon", phosphor: "PaperclipIcon", remixicon: "RiAttachment2", "aria-hidden": "true" }), "Attach"] }), _jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(IconPlaceholder, { lucide: "EyeIcon", tabler: "IconEye", hugeicons: "ViewIcon", phosphor: "EyeIcon", remixicon: "RiEyeLine", "aria-hidden": "true" }), "Watch"] })] })] })] }));
}
// The same parts doing a second job: a right-hand inspector beside the record
// it describes, rather than a navigation panel.
//
// The children are in INSET-FIRST order, and that is what puts the panel on
// the right. `side="right"` only decides which edge the fixed container pins
// to; the space it occupies comes from a spacer rendered in flex order, so a
// Sidebar written before the inset would reserve its column on the left.
//
// `variant="floating"` draws its own chrome, a padded container with a ring
// and a radius that every style resolves for itself, so there is nothing here
// to hand-roll a border or a corner for.
//
// `collapsible="offcanvas"` means the panel can be entirely gone, so
// SidebarTrigger in the inset header is what brings it back. SidebarRail is
// left out rather than unavailable: it ships `tabIndex={-1}` and `sm:flex`, so
// it would add a second control for the one toggle that only a mouse on a wide
// frame can reach. Under 768px shadcn's Sidebar swaps to a Sheet and that same
// trigger opens it.
//
// `min-h-0` beside the height is load-bearing. SidebarProvider ships
// `min-h-svh`, and tailwind-merge only drops it when another `min-h-*` arrives
// with it, so without the pair the example is viewport tall inside its frame.
export default function Pattern() {
    return (_jsxs(SidebarProvider, { className: "relative h-dvh min-h-0 w-full overflow-hidden", children: [_jsx(IssueView, {}), _jsx(Inspector, {})] }));
}
