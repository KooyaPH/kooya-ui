"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "cn";
function Avatar({ className, ...props }) {
    return (_jsx(AvatarPrimitive.Root, { "data-slot": "avatar", className: cn("site-rounded-full relative flex size-8 shrink-0 overflow-hidden", className), ...props }));
}
function AvatarImage({ className, ...props }) {
    return (_jsx(AvatarPrimitive.Image, { "data-slot": "avatar-image", className: cn("aspect-square size-full", className), ...props }));
}
function AvatarFallback({ className, ...props }) {
    return (_jsx(AvatarPrimitive.Fallback, { "data-slot": "avatar-fallback", 
        // Explicit foreground colour + medium weight so the initial
        // reads clearly against the muted background. Previously the
        // text inherited the parent context, which on white-on-white
        // surfaces (header user menu, account chrome) rendered the
        // initial almost invisible.
        className: cn("bg-site-muted text-site-foreground site-rounded-full flex size-full items-center justify-center font-medium", className), ...props }));
}
export { Avatar, AvatarImage, AvatarFallback };
