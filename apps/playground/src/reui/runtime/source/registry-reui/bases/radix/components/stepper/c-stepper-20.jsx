"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Tree, TreeItem, TreeItemLabel, } from "../../reui/tree.jsx";
import { hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature, } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "../../../../../../../adapters/menus.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const badges = {
    Ready: "success-light",
    Review: "warning-light",
};
const passed = { status: "passed" };
const pending = { status: "pending" };
const failed = (issues) => ({ status: "failed", issues });
// 3WIM is the three-way invoice match, the checks an order passes or fails.
// More holds plain links to what follows approval: they are not steps, so
// they carry no status and Previous and Next skip them.
const match = ["Document validation", "3-way line match", "Approve payment"];
const links = [
    {
        name: "Schedule payment",
        icon: (_jsx(IconPlaceholder, { lucide: "CalendarClockIcon", tabler: "IconCalendarTime", hugeicons: "Calendar03Icon", phosphor: "CalendarDotsIcon", remixicon: "RiCalendarScheduleLine" })),
    },
    {
        name: "Post to ledger",
        icon: (_jsx(IconPlaceholder, { lucide: "BookOpenIcon", tabler: "IconBook", hugeicons: "Book02Icon", phosphor: "BookOpenIcon", remixicon: "RiBookOpenLine" })),
    },
];
const orders = [
    { id: "PO-2026-10021", checks: [failed(1), failed(2), pending] },
    { id: "PO-2026-10001", checks: [passed, passed, passed] },
    { id: "PO-2026-10024", checks: [passed, pending, pending] },
    { id: "PO-2026-10032", checks: [passed, passed, pending] },
    { id: "PO-2026-10011", checks: [pending, pending, pending] },
    { id: "PO-2026-10033", checks: [passed, failed(3), pending] },
];
const items = {
    root: { name: "Purchase orders", children: orders.map(({ id }) => id) },
};
// Every check in tree order, across orders: the list Previous and Next walk.
const stepIds = [];
for (const { id, checks } of orders) {
    // A failed check sends the order to review; a fully passed match makes
    // it ready to pay.
    items[id] = {
        name: id,
        badge: checks.some((check) => check.status === "failed")
            ? "Review"
            : checks.every((check) => check.status === "passed")
                ? "Ready"
                : undefined,
        children: [`${id}/3WIM`, `${id}/More`],
    };
    items[`${id}/3WIM`] = {
        name: "3WIM",
        children: match.map((step) => `${id}/3WIM/${step}`),
    };
    match.forEach((step, index) => {
        stepIds.push(`${id}/3WIM/${step}`);
        items[`${id}/3WIM/${step}`] = {
            name: step,
            ...checks[index],
            next: checks[index + 1]?.status,
        };
    });
    items[`${id}/More`] = {
        name: "More",
        children: links.map((link) => `${id}/More/${link.name}`),
    };
    for (const link of links)
        items[`${id}/More/${link.name}`] = link;
}
const issueCount = (count = 0) => `${count} ${count === 1 ? "issue" : "issues"}`;
function note({ status, issues }) {
    if (status === "failed")
        return `${issueCount(issues)} to resolve before payment.`;
    return status === "passed" ? "Passed with no issues." : "Waiting to run.";
}
// A tone is a text color, so the ring, the dot and the start of the
// connector below it all paint with currentColor.
const tones = {
    passed: {
        color: "text-success",
        to: "to-success",
        icon: (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3 text-white *:stroke-3", "aria-hidden": "true" })),
    },
    failed: {
        color: "text-destructive",
        to: "to-destructive",
        icon: (_jsx(IconPlaceholder, { lucide: "XIcon", tabler: "IconX", hugeicons: "Cancel01Icon", phosphor: "XIcon", remixicon: "RiCloseLine", className: "size-3 text-white *:stroke-3", "aria-hidden": "true" })),
    },
    pending: {
        color: "text-ring/80",
        to: "to-ring/80",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleDashedIcon", tabler: "IconCircleDashed", hugeicons: "CircleDashedIcon", phosphor: "CircleDashedIcon", remixicon: "RiCheckboxBlankCircleLine", className: "size-3 text-white", "aria-hidden": "true" })),
    },
};
// A hollow 20px ring around a 16px dot, pulled back under the group's
// chevron so the rail continues that column. In the 32px rows the connector
// is three 2px dots cut from a gradient by a centered mask (tiles in rem, like
// the box), with 1px clear of each ring. It overhangs the next row, so it ignores
// the pointer and a click there reaches that row.
function Indicator({ status, next }) {
    return (_jsxs("span", { "aria-hidden": "true", className: cn("relative -ms-4.25 flex size-5 shrink-0 items-center justify-center rounded-full border border-current", tones[status].color), children: [_jsx("span", { className: "flex size-4 items-center justify-center rounded-full bg-current", children: tones[status].icon }), next && (_jsx("span", { className: cn("pointer-events-none absolute inset-x-0 top-5.25 mx-auto h-2.5 w-0.5 bg-linear-to-b from-current mask-[radial-gradient(circle_closest-side,#000_90%,transparent)] mask-size-[0.125rem_0.25rem] mask-center", tones[next].to) }))] }));
}
const indent = 20;
// The primitive paints rows bg-background, which reads as a box on any
// other surface (a card, a dark preview), so rows stay transparent.
const label = "text-muted-foreground gap-1.5 bg-transparent px-1.5 font-medium whitespace-nowrap";
export default function Pattern() {
    // The tree's container props set aria-label to "", so it is named by a
    // visually hidden label instead.
    const labelId = useId();
    const [active, setActive] = useState("PO-2026-10021/3WIM/Document validation");
    const [menuOpen, setMenuOpen] = useState(false);
    // selectedItems is pinned to the active step, so the tree's multi-select
    // gestures snap back to it and only a step's primary action, Previous or
    // Next moves it.
    const tree = useTree({
        state: { selectedItems: [active] },
        initialState: {
            expandedItems: ["PO-2026-10021", "PO-2026-10021/3WIM"],
            focusedItem: active,
        },
        indent,
        rootItemId: "root",
        // Rows are named by aria-label, so it carries the badge and status too.
        getItemName: (item) => {
            const { name, badge, status, issues } = item.getItemData();
            const state = status === "failed" ? `failed, ${issueCount(issues)}` : status;
            return [name, badge, state].filter(Boolean).join(", ");
        },
        isItemFolder: (item) => Boolean(item.getItemData().children),
        onPrimaryAction: (item) => {
            // Only a check becomes the active step; a More link is plain navigation.
            if (item.getItemData().status)
                setActive(item.getId());
        },
        dataLoader: {
            getItem: (itemId) => items[itemId],
            getChildren: (itemId) => items[itemId].children ?? [],
        },
        features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
    });
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const position = stepIds.indexOf(active);
    function goTo(index) {
        const id = stepIds[index];
        setActive(id);
        // Open the order and group above the step and give it the tree's tab
        // stop, so Tab into the tree lands on the active step.
        const [orderId, groupName] = id.split("/");
        for (const folder of [orderId, `${orderId}/${groupName}`]) {
            const instance = tree.getItemInstance(folder);
            if (!instance.isExpanded())
                instance.expand();
        }
        tree.getItemInstance(id).setFocused();
        // The pressed button disables itself at either end, so focus moves to
        // its partner.
        if (index === 0)
            nextRef.current?.focus();
        if (index === stepIds.length - 1)
            prevRef.current?.focus();
    }
    const [order, group] = active.split("/");
    const steps = items[`${order}/${group}`].children ?? [];
    const step = items[active];
    // 288px, not the design's 240px: 14px step labels need room for their
    // badge and actions button. Folder labels keep their 6px padding as hover
    // bleed, and step labels end 6px early to line up with the badges. Below
    // 32rem the content stacks under the tree in the same 288px column.
    return (_jsxs("div", { className: "@container mx-auto w-full max-w-xl", children: [_jsx("span", { id: labelId, className: "sr-only", children: "Purchase order checks" }), _jsxs("div", { className: "mx-auto flex max-w-72 flex-col gap-6 @lg:max-w-none @lg:flex-row @lg:items-start", children: [_jsx(Tree, { indent: indent, tree: tree, "aria-labelledby": labelId, className: "@lg:w-72 @lg:shrink-0", children: tree.getItems().map((item) => {
                            const data = item.getItemData();
                            // Rows sit flush instead of 2px apart, so the guide line under an
                            // order's chevron and the step connectors run unbroken.
                            const row = cn("not-last:pb-0", item.getItemMeta().level > 0 &&
                                "relative before:absolute before:inset-y-0 before:start-3.25 before:w-px before:-translate-x-1/2 before:bg-border rtl:before:translate-x-1/2");
                            // A More link keeps a plain row: its icon sits in the status column,
                            // so the label lines up with the checks above it.
                            if (data.icon) {
                                return (_jsxs(TreeItem, { item: item, className: cn(row, "flex items-center gap-1"), children: [_jsx("span", { "aria-hidden": "true", className: "text-ring -ms-4.25 flex size-5 shrink-0 items-center justify-center [&_svg]:size-3.5", children: data.icon }), _jsx(TreeItemLabel, { className: cn(label, "me-1.5 h-8 min-w-0 flex-1 not-in-data-[folder=true]:ps-1.5"), children: _jsx("span", { className: "truncate", children: data.name }) })] }, item.getId()));
                            }
                            if (!data.status) {
                                return (_jsx(TreeItem, { item: item, className: row, children: _jsxs(TreeItemLabel, { className: cn(label, "in-aria-expanded:text-foreground [&>svg]:text-ring h-8 [&>svg]:size-3.5 in-aria-expanded:[&>svg]:text-current"), children: [data.name, data.badge && (_jsx(Badge, { variant: badges[data.badge], className: "ms-auto", children: data.badge }))] }) }, item.getId()));
                            }
                            // A div row, so the active step can hold its actions button. That
                            // button is pointer-only and the tree keeps one Tab stop: the row
                            // itself opens the menu on Shift+F10 or the context menu key, and
                            // Enter and Space still activate the step.
                            const selected = item.isSelected();
                            return (_jsx(TreeItem, { item: item, asChild: true, "aria-current": selected ? "step" : undefined, "aria-haspopup": selected ? "menu" : undefined, "aria-keyshortcuts": selected ? "Shift+F10" : undefined, onContextMenu: (event) => {
                                    if (!selected)
                                        return;
                                    event.preventDefault();
                                    setMenuOpen(true);
                                }, onKeyDown: (event) => {
                                    // Keys from the portaled menu bubble here through React too.
                                    if (event.target !== event.currentTarget)
                                        return;
                                    if (selected && event.shiftKey && event.key === "F10") {
                                        event.preventDefault();
                                        setMenuOpen(true);
                                    }
                                    else if (event.key === "Enter" || event.key === " ") {
                                        event.preventDefault();
                                        item.primaryAction();
                                    }
                                }, className: cn(row, "flex items-center gap-1"), children: _jsxs("div", { children: [_jsx(Indicator, { status: data.status, next: data.next }), _jsxs(TreeItemLabel, { className: cn(label, "me-1.5 h-8 min-w-0 flex-1 not-in-data-[folder=true]:ps-1.5"), children: [_jsx("span", { className: "truncate", children: data.name }), data.issues ? (_jsx(Badge, { variant: "destructive-light", children: data.issues })) : null, selected && (_jsxs(DropdownMenu, { open: menuOpen, onOpenChange: setMenuOpen, children: [_jsx(DropdownMenuTrigger, { asChild: true, tabIndex: -1, "aria-hidden": "true", children: _jsx(Button, { variant: "ghost", size: "icon-xs", "aria-label": `${data.name} actions`, className: "text-ring ms-auto -me-1.25", children: _jsx(IconPlaceholder, { lucide: "EllipsisVerticalIcon", tabler: "IconDotsVertical", hugeicons: "MoreVerticalIcon", phosphor: "DotsThreeVerticalIcon", remixicon: "RiMore2Fill", className: "size-3.5", "aria-hidden": "true" }) }) }), _jsxs(DropdownMenuContent, { align: "end", onCloseAutoFocus: (event) => {
                                                                event.preventDefault();
                                                                item.getElement()?.focus();
                                                            }, className: "w-40", children: [_jsx(DropdownMenuItem, { children: "Re-run step" }), _jsx(DropdownMenuItem, { children: "Assign reviewer" }), _jsx(DropdownMenuItem, { children: "Add comment" })] })] }))] })] }) }, item.getId()));
                        }) }), _jsx(Separator, { "aria-hidden": "true", className: "@lg:hidden" }), _jsx(Separator, { "aria-hidden": "true", orientation: "vertical", className: "hidden @lg:block" }), _jsxs("div", { className: "min-w-0 flex-1 px-1.5", children: [_jsxs("div", { "aria-live": "polite", className: "flex flex-col gap-1", children: [_jsxs("p", { className: "text-muted-foreground flex items-center gap-1.5 text-xs", children: [order, _jsx("span", { "aria-hidden": "true", className: "bg-muted-foreground/40 size-1 shrink-0 rounded-full" }), "Step ", steps.indexOf(active) + 1, " of ", steps.length] }), _jsx("p", { className: "text-sm font-medium", children: step.name }), _jsx("p", { className: "text-muted-foreground text-sm", children: note(step) })] }), _jsxs("div", { className: "mt-3 flex flex-wrap justify-start gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: position === 0, onClick: () => goTo(position - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: position === stepIds.length - 1, onClick: () => goTo(position + 1), children: "Next" })] })] })] })] }));
}
