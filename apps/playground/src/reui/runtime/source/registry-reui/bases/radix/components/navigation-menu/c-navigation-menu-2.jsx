import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "../../../../../../../adapters/navigation.tsx";
const components = [
    {
        title: "Alert Dialog",
        href: "#",
        description: "A modal dialog that interrupts the user with important content.",
    },
    {
        title: "Hover Card",
        href: "#",
        description: "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "#",
        description: "Displays an indicator showing the completion progress of a task.",
    },
    {
        title: "Scroll-area",
        href: "#",
        description: "Visually or semantically separates content.",
    },
];
export default function Pattern() {
    return (_jsx("div", { className: "flex items-center justify-center", children: _jsx(NavigationMenu, { children: _jsx(NavigationMenuList, { children: _jsxs(NavigationMenuItem, { children: [_jsx(NavigationMenuTrigger, { children: "Components" }), _jsx(NavigationMenuContent, { children: _jsx("ul", { className: "grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2", children: components.map((component) => (_jsx("li", { children: _jsx(NavigationMenuLink, { asChild: true, className: "flex flex-col items-start gap-2 p-3", children: _jsxs("a", { href: component.href, children: [_jsx("div", { className: "text-sm leading-none font-medium", children: component.title }), _jsx("p", { className: "text-muted-foreground line-clamp-2 text-sm leading-snug", children: component.description })] }) }) }, component.title))) }) })] }) }) }) }));
}
