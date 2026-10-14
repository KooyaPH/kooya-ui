import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
function NavigationMenu({ className, children, viewport = true, ...props }) {
    return (_jsxs(NavigationMenuPrimitive.Root, { "data-slot": "navigation-menu", "data-viewport": viewport, className: cn("cn-navigation-menu group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className), ...props, children: [children, viewport && _jsx(NavigationMenuViewport, {})] }));
}
function NavigationMenuList({ className, ...props }) {
    return (_jsx(NavigationMenuPrimitive.List, { "data-slot": "navigation-menu-list", className: cn("cn-navigation-menu-list group flex flex-1 list-none items-center justify-center", className), ...props }));
}
function NavigationMenuItem({ className, ...props }) {
    return (_jsx(NavigationMenuPrimitive.Item, { "data-slot": "navigation-menu-item", className: cn("cn-navigation-menu-item relative", className), ...props }));
}
const navigationMenuTriggerStyle = cva("cn-navigation-menu-trigger group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-none disabled:pointer-events-none");
function NavigationMenuTrigger({ className, children, ...props }) {
    return (_jsxs(NavigationMenuPrimitive.Trigger, { "data-slot": "navigation-menu-trigger", className: cn(navigationMenuTriggerStyle(), "group", className), ...props, children: [children, " ", _jsx(IconPlaceholder, { lucide: "ChevronDownIcon", tabler: "IconChevronDown", hugeicons: "ArrowDown01Icon", phosphor: "CaretDownIcon", remixicon: "RiArrowDownSLine", className: "cn-navigation-menu-trigger-icon", "aria-hidden": "true" })] }));
}
function NavigationMenuContent({ className, ...props }) {
    return (_jsx(NavigationMenuPrimitive.Content, { "data-slot": "navigation-menu-content", className: cn("cn-navigation-menu-content top-0 left-0 w-full group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none md:absolute md:w-auto", className), ...props }));
}
function NavigationMenuViewport({ className, ...props }) {
    return (_jsx("div", { className: cn("cn-navigation-menu-viewport-wrapper absolute top-full left-0 isolate z-50 flex justify-center"), children: _jsx(NavigationMenuPrimitive.Viewport, { "data-slot": "navigation-menu-viewport", className: cn("cn-navigation-menu-viewport origin-top-center relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden md:w-(--radix-navigation-menu-viewport-width)", className), ...props }) }));
}
function NavigationMenuLink({ className, ...props }) {
    return (_jsx(NavigationMenuPrimitive.Link, { "data-slot": "navigation-menu-link", className: cn("cn-navigation-menu-link", className), ...props }));
}
function NavigationMenuIndicator({ className, ...props }) {
    return (_jsx(NavigationMenuPrimitive.Indicator, { "data-slot": "navigation-menu-indicator", className: cn("cn-navigation-menu-indicator top-full z-1 flex h-1.5 items-end justify-center overflow-hidden", className), ...props, children: _jsx("div", { className: "cn-navigation-menu-indicator-arrow relative top-[60%] h-2 w-2 rotate-45" }) }));
}
export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, navigationMenuTriggerStyle, };
