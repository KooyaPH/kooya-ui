import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
const markerVariants = cva("cn-marker group/marker relative flex w-full items-center", {
    variants: {
        variant: {
            default: "cn-marker-variant-default",
            separator: "cn-marker-variant-separator",
            border: "cn-marker-variant-border",
        },
    },
});
function Marker({ className, variant = "default", asChild = false, ...props }) {
    const Comp = asChild ? Slot.Root : "div";
    return (_jsx(Comp, { "data-slot": "marker", "data-variant": variant, className: cn(markerVariants({ variant, className })), ...props }));
}
function MarkerIcon({ className, ...props }) {
    return (_jsx("span", { "data-slot": "marker-icon", "aria-hidden": "true", className: cn("cn-marker-icon shrink-0", className), ...props }));
}
function MarkerContent({ className, ...props }) {
    return (_jsx("span", { "data-slot": "marker-content", className: cn("cn-marker-content min-w-0 wrap-break-word", className), ...props }));
}
export { Marker, MarkerIcon, MarkerContent, markerVariants };
