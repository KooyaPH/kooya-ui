import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "../../../../../../../adapters/structured.tsx";
import { Avatar, AvatarFallback, AvatarImage, } from "../../../../../../../adapters/layout.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../../../../../../adapters/data.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const leaders = [
    {
        rank: 1,
        name: "Sarah Chen",
        handle: "@sarahchen",
        avatar: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        score: 12840,
        change: "+320",
        changeUp: true,
        level: "Diamond",
        levelVariant: "info",
    },
    {
        rank: 2,
        name: "Marcus Johnson",
        handle: "@marcusj",
        avatar: "/reui-assets/images/e93553df2422635515ee.jpg",
        score: 11250,
        change: "+180",
        changeUp: true,
        level: "Platinum",
        levelVariant: "default",
    },
    {
        rank: 3,
        name: "Emily Park",
        handle: "@emilyp",
        avatar: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        score: 10890,
        change: "-45",
        changeUp: false,
        level: "Platinum",
        levelVariant: "default",
    },
    {
        rank: 4,
        name: "David Kim",
        handle: "@davidk",
        avatar: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
        score: 9420,
        change: "+520",
        changeUp: true,
        level: "Gold",
        levelVariant: "warning",
    },
    {
        rank: 5,
        name: "Sofia Davis",
        handle: "@sofiad",
        avatar: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        score: 8750,
        change: "+90",
        changeUp: true,
        level: "Gold",
        levelVariant: "warning",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "mx-auto flex w-full max-w-2xl flex-col", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-12 text-center", children: "#" }), _jsx(TableHead, { children: "Player" }), _jsx(TableHead, { children: "Level" }), _jsx(TableHead, { className: "text-right", children: "Score" }), _jsx(TableHead, { className: "text-right", children: "Change" })] }) }), _jsx(TableBody, { children: leaders.map((leader) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "text-center text-sm font-bold", children: leader.rank }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { size: "sm", children: [_jsx(AvatarImage, { src: leader.avatar, alt: leader.name }), _jsx(AvatarFallback, { children: leader.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("") })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium", children: leader.name }), _jsx("span", { className: "text-muted-foreground text-xs", children: leader.handle })] })] }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: leader.levelVariant, size: "sm", children: leader.level }) }), _jsx(TableCell, { className: "text-right font-mono text-sm font-medium", children: leader.score.toLocaleString() }), _jsx(TableCell, { className: "text-right", children: _jsxs("span", { className: "inline-flex items-center gap-0.5 text-sm", children: [leader.changeUp ? (_jsx(IconPlaceholder, { lucide: "TrendingUpIcon", tabler: "IconTrendingUp", hugeicons: "TradeUpIcon", phosphor: "TrendUpIcon", remixicon: "RiArrowRightUpLongLine", "aria-hidden": "true", className: "text-success size-3.5" })) : (_jsx(IconPlaceholder, { lucide: "TrendingDownIcon", tabler: "IconTrendingDown", hugeicons: "TradeDownIcon", phosphor: "TrendDownIcon", remixicon: "RiArrowRightDownLongLine", "aria-hidden": "true", className: "text-destructive size-3.5" })), _jsx("span", { className: leader.changeUp ? "text-success" : "text-destructive", children: leader.change })] }) })] }, leader.rank))) })] }) }));
}
