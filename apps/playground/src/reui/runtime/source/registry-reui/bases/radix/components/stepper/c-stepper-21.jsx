"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useId, useRef, useState } from "react";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Tree, TreeItem, TreeItemLabel, } from "../../reui/tree.jsx";
import { hotkeysCoreFeature, selectionFeature, syncDataLoaderFeature, } from "@headless-tree/core";
import { useTree } from "@headless-tree/react";
import { cn } from "cn";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Separator } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const severities = {
    High: "destructive-light",
    Mild: "success-light",
};
const statusLabels = {
    complete: "complete",
    current: "in progress",
    upcoming: "pending",
};
// Areas hold numbered steps and steps hold checks. The checks are what the
// stepper moves through, in this order.
const areas = [
    {
        name: "Endpoint Security",
        icon: (_jsx(IconPlaceholder, { lucide: "MonitorSmartphoneIcon", tabler: "IconDevices", hugeicons: "ComputerPhoneSyncIcon", phosphor: "DevicesIcon", remixicon: "RiDeviceLine", className: "size-4", "aria-hidden": "true" })),
        items: [
            {
                name: "Inventory",
                count: 248,
                items: ["Device Discovery", "Agent Coverage", "Installed Software"],
            },
            {
                name: "Threat Detection",
                count: 12,
                items: [
                    "Overview",
                    "Suspicious Activity",
                    "Malware Events",
                    "Network Anomalies",
                ],
            },
            {
                name: "Vulnerabilities",
                count: 37,
                severity: "High",
                items: ["Critical CVEs", "Missing Patches", "Exposed Services"],
            },
            {
                name: "Policies",
                count: 8,
                items: ["Disk Encryption", "Firewall Rules", "Screen Lock"],
            },
            {
                name: "Quarantine",
                count: 5,
                items: ["Isolated Devices", "Held Files"],
            },
            {
                name: "Response",
                count: 7,
                severity: "Mild",
                items: ["Open Incidents", "Remediation"],
            },
        ],
    },
    {
        name: "Identity & Access",
        icon: (_jsx(IconPlaceholder, { lucide: "KeyRoundIcon", tabler: "IconKey", hugeicons: "Key02Icon", phosphor: "KeyIcon", remixicon: "RiKey2Line", className: "size-4", "aria-hidden": "true" })),
        items: [
            {
                name: "Accounts",
                count: 64,
                items: ["Privileged Users", "Stale Accounts"],
            },
            {
                name: "Authentication",
                count: 9,
                severity: "High",
                items: ["MFA Coverage", "Password Policy"],
            },
        ],
    },
    {
        name: "Application Security",
        icon: (_jsx(IconPlaceholder, { lucide: "BracesIcon", tabler: "IconBraces", hugeicons: "CodeIcon", phosphor: "BracketsCurly", remixicon: "RiBracesLine", className: "size-4", "aria-hidden": "true" })),
        items: [
            {
                name: "Dependencies",
                count: 112,
                severity: "High",
                items: ["Known CVEs", "License Risks"],
            },
            {
                name: "Code Scanning",
                count: 23,
                items: ["Hardcoded Secrets", "Injection Flaws"],
            },
        ],
    },
    {
        name: "Data Protection",
        icon: (_jsx(IconPlaceholder, { lucide: "DatabaseZapIcon", tabler: "IconDatabase", hugeicons: "DatabaseLightningIcon", phosphor: "DatabaseIcon", remixicon: "RiDatabase2Line", className: "size-4", "aria-hidden": "true" })),
        items: [
            {
                name: "Encryption",
                count: 4,
                items: ["Data at Rest", "Data in Transit"],
            },
            {
                name: "Backups",
                count: 3,
                severity: "Mild",
                items: ["Retention", "Restore Tests"],
            },
        ],
    },
];
const nodes = {};
const checks = [];
// first and last are the positions of the first and last check under a node,
// so comparing them with the active check gives any row its status.
function add(id, entry, parent) {
    const { items, ...rest } = typeof entry === "string" ? { name: entry } : entry;
    const first = checks.length;
    const children = items?.map((item, index) => add(`${id}.${index}`, item, id));
    if (!children)
        checks.push(id);
    nodes[id] = { ...rest, parent, children, first, last: checks.length - 1 };
    return id;
}
nodes.root = {
    name: "Security review",
    parent: "",
    children: areas.map((area, index) => add(`${index}`, area, "root")),
    first: 0,
    last: checks.length - 1,
};
function foldersAbove(id) {
    const parent = nodes[id].parent;
    return parent === "root" ? [] : [parent, ...foldersAbove(parent)];
}
// Rows sit flush (no pb-0.5) and each draws the guide of every indent level
// it sits under, so a guide runs unbroken down a branch and stops at its end.
// The gradient only runs left to right, so RTL mirrors the strip instead.
const guides = "relative not-last:pb-0 before:absolute before:inset-y-0 before:-start-1 before:w-(--tree-padding) before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))] rtl:before:-scale-x-100";
// r=7 gives a circumference of 44: the track is eleven 3+1 dashes and the
// in-progress arc is 17 long (139 degrees), offset to start at 11 o'clock as
// in the design. Only the arc spins, so the dashed track holds still.
function StatusIcon({ status }) {
    return (_jsx("span", { className: "flex size-4.5 shrink-0 items-center justify-center", children: status === "complete" ? (_jsx("span", { className: "border-success bg-success/10 text-success flex size-4 items-center justify-center rounded-full border", children: _jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3", "aria-hidden": "true" }) })) : (_jsxs("svg", { viewBox: "0 0 16 16", fill: "none", strokeWidth: "1.6", "aria-hidden": "true", className: "size-4", children: [_jsx("circle", { cx: "8", cy: "8", r: "7", strokeDasharray: "3 1", className: "stroke-ring/50" }), status === "current" && (_jsx("circle", { cx: "8", cy: "8", r: "7", strokeDasharray: "17 27", strokeDashoffset: "14.4", className: "stroke-success origin-center motion-safe:animate-spin" }))] })) }));
}
export default function Pattern() {
    const labelId = useId();
    // Ids are index paths, so 0.1.1 is Endpoint Security, Threat Detection,
    // Suspicious Activity.
    const [active, setActive] = useState("0.1.1");
    // Next on the last check finishes the review: every row then reads
    // complete, and Previous returns to that check.
    const [allDone, setAllDone] = useState(false);
    const activeIndex = checks.indexOf(active);
    const progress = allDone ? checks.length : activeIndex;
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const step = nodes[nodes[active].parent];
    const statusOf = (node) => node.last < progress
        ? "complete"
        : node.first > progress
            ? "upcoming"
            : "current";
    const tree = useTree({
        // Selection is pinned to the active check, so a click on a folder or a
        // multi-select gesture snaps back and only a check's primary action
        // moves it. Focusing it up front makes Tab land on it too.
        state: { selectedItems: allDone ? [] : [active] },
        initialState: {
            expandedItems: foldersAbove(active),
            focusedItem: active,
        },
        rootItemId: "root",
        // TreeItem announces this name in place of the row's content, so it
        // carries the count, severity and status the row shows.
        getItemName: (item) => {
            const node = item.getItemData();
            return [
                node.name,
                node.count !== undefined && `${node.count} findings`,
                node.severity && `${node.severity} severity`,
                statusLabels[statusOf(node)],
            ]
                .filter(Boolean)
                .join(", ");
        },
        isItemFolder: (item) => Boolean(item.getItemData().children),
        onPrimaryAction: (item) => {
            if (item.isFolder())
                return;
            setActive(item.getId());
            setAllDone(false);
        },
        dataLoader: {
            getItem: (itemId) => nodes[itemId],
            getChildren: (itemId) => nodes[itemId].children ?? [],
        },
        features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
    });
    // Previous and Next fold the branch being left and open the new check's, so
    // the open branch follows the active check as on first render, and move the
    // tree's focus along so Tab lands on the new check.
    function goTo(index) {
        const check = checks[index];
        const path = foldersAbove(check);
        for (const id of foldersAbove(active)) {
            if (!path.includes(id))
                tree.getItemInstance(id).collapse();
        }
        for (const id of path) {
            const folder = tree.getItemInstance(id);
            if (!folder.isExpanded())
                folder.expand();
        }
        tree.getItemInstance(check).setFocused();
        setActive(check);
        // The pressed button disables itself at either end, so focus moves to
        // its partner.
        if (index === 0)
            nextRef.current?.focus();
    }
    function finish() {
        setAllDone(true);
        prevRef.current?.focus();
    }
    // Side by side from 32rem, which leaves 12rem beside the 18rem tree for the
    // text and the Previous and Next row.
    return (_jsx("div", { className: "@container w-full", children: _jsxs("div", { className: "mx-auto flex max-w-72 flex-col gap-6 @lg:max-w-none @lg:flex-row @lg:items-start", children: [_jsx("span", { id: labelId, className: "sr-only", children: nodes.root.name }), _jsx(Tree, { tree: tree, "aria-labelledby": labelId, className: "@lg:w-72 @lg:shrink-0", children: tree.getItems().map((item) => {
                        const node = item.getItemData();
                        const status = statusOf(node);
                        const current = status === "current";
                        return (_jsx(TreeItem, { item: item, "aria-current": item.getId() === active ? "step" : undefined, className: guides, children: _jsxs(TreeItemLabel, { className: cn("h-8 gap-1.5 bg-transparent font-medium not-in-data-[folder=true]:ps-2 [&>svg:first-child]:size-3.5", current ? "[&>svg]:text-foreground" : "[&>svg]:text-ring"), children: [node.icon ??
                                        (item.isFolder() ? (_jsx(Badge, { variant: status === "upcoming"
                                                ? "warning-light"
                                                : "success-light", radius: "full", children: item.getIndexInParent() + 1 })) : (_jsx(StatusIcon, { status: status }))), _jsx("span", { className: cn("truncate", !current && "text-muted-foreground"), children: node.name }), node.count !== undefined && (_jsx(Badge, { variant: "outline", children: node.count })), node.severity && (_jsx(Badge, { variant: severities[node.severity], className: "ms-auto", children: node.severity })), node.icon && current && (_jsx(Badge, { variant: "focus-light", className: "ms-auto border-blue-500/15 bg-blue-500/10 text-blue-900 dark:border-blue-500/25 dark:bg-blue-500/15 dark:text-blue-400", children: "Review" }))] }) }, item.getId()));
                    }) }), _jsx(Separator, { "aria-hidden": "true", className: "@lg:hidden" }), _jsx(Separator, { "aria-hidden": "true", orientation: "vertical", className: "hidden @lg:block" }), _jsxs("div", { className: "min-w-0 flex-1 px-2 @lg:px-0", children: [_jsx("div", { role: "status", className: "flex flex-col gap-1", children: allDone ? (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["All ", checks.length, " checks done"] }), _jsx("p", { className: "text-sm font-medium", children: "Review complete" }), _jsxs("p", { className: "text-muted-foreground text-sm", children: [nodes.root.name, " finished across every area"] })] })) : (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-muted-foreground text-xs", children: ["Check ", activeIndex - step.first + 1, " of", " ", step.last - step.first + 1] }), _jsx("p", { className: "text-sm font-medium", children: nodes[active].name }), _jsxs("p", { className: "text-muted-foreground text-sm", children: [step.name, " in ", nodes[step.parent].name] })] })) }), _jsxs("div", { className: "mt-3 flex justify-start gap-2", children: [_jsx(Button, { ref: prevRef, variant: "outline", size: "sm", disabled: activeIndex === 0 && !allDone, onClick: () => allDone ? setAllDone(false) : goTo(activeIndex - 1), children: "Previous" }), _jsx(Button, { ref: nextRef, variant: "outline", size: "sm", disabled: allDone, onClick: () => activeIndex === checks.length - 1
                                        ? finish()
                                        : goTo(activeIndex + 1), children: "Next" })] })] })] }) }));
}
