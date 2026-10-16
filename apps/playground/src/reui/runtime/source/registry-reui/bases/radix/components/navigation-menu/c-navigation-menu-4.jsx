import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "../../../../../../../adapters/navigation.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
const industries = [
    {
        title: "Individuals",
        description: "Keep your finances organized.",
        href: "#",
        icon: (_jsx(IconPlaceholder, { lucide: "UserIcon", tabler: "IconUser", hugeicons: "UserIcon", phosphor: "UserIcon", remixicon: "RiUserLine" })),
    },
    {
        title: "LLCs",
        description: "Benefit from tax write-offs.",
        href: "#",
        icon: (_jsx(IconPlaceholder, { lucide: "BuildingIcon", tabler: "IconBuilding", hugeicons: "Building01Icon", phosphor: "BuildingsIcon", remixicon: "RiBuildingLine" })),
    },
    {
        title: "Freelancers",
        description: "For independent workers.",
        href: "#",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleDollarSignIcon", tabler: "IconPremiumRights", hugeicons: "DollarCircleIcon", phosphor: "CurrencyCircleDollarIcon", remixicon: "RiMoneyDollarCircleLine" })),
    },
    {
        title: "Investors",
        description: "Make and grow your money.",
        href: "#",
        icon: (_jsx(IconPlaceholder, { lucide: "LayoutGridIcon", tabler: "IconLayoutGrid", hugeicons: "GridViewIcon", phosphor: "SquaresFourIcon", remixicon: "RiGalleryView2" })),
    },
    {
        title: "Small businesses",
        description: "We take care of your taxes.",
        href: "#",
        icon: (_jsx(IconPlaceholder, { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine" })),
    },
    {
        title: "Crypto",
        description: "For tech enthusiasts.",
        href: "#",
        icon: (_jsx(IconPlaceholder, { lucide: "CircleDollarSignIcon", tabler: "IconPremiumRights", hugeicons: "DollarCircleIcon", phosphor: "CurrencyCircleDollarIcon", remixicon: "RiMoneyDollarCircleLine" })),
    },
    {
        title: "Big companies",
        description: "Run your finances easily.",
        href: "#",
        icon: (_jsx(IconPlaceholder, { lucide: "BuildingIcon", tabler: "IconBuilding", hugeicons: "Building01Icon", phosphor: "BuildingsIcon", remixicon: "RiBuildingLine" })),
    },
    {
        title: "Investments",
        description: "Launch your ideas worldwide.",
        href: "#",
        icon: (_jsx(IconPlaceholder, { lucide: "RadioIcon", tabler: "IconBroadcast", hugeicons: "LiveStreaming02Icon", phosphor: "BroadcastIcon", remixicon: "RiRfidLine" })),
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(NavigationMenu, { children: _jsx(NavigationMenuList, { children: _jsxs(NavigationMenuItem, { children: [_jsx(NavigationMenuTrigger, { children: "Industries" }), _jsx(NavigationMenuContent, { children: _jsxs("div", { className: "w-[500px]", children: [_jsx("ul", { className: "grid grid-cols-2 gap-1", children: industries.map((item) => (_jsx("li", { children: _jsx(NavigationMenuLink, { asChild: true, className: "flex items-start gap-2 p-3", children: _jsxs("a", { href: "#", children: [item.icon, _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("div", { className: "text-sm leading-none font-medium", children: item.title }), _jsx("p", { className: "text-muted-foreground text-xs leading-snug", children: item.description })] })] }) }) }, item.title))) }), _jsx("div", { className: "mt-2 px-1 pb-1", children: _jsx(Button, { className: "w-full", asChild: true, children: _jsx("a", { href: "#", children: "Learn more" }) }) })] }) })] }) }) }) }));
}
