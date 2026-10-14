import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";
import { Button } from "../../../../../../adapters/controls.tsx";
const attachmentVariants = cva("cn-attachment group/attachment relative flex max-w-full min-w-0 shrink-0 flex-wrap border bg-card text-card-foreground transition-colors has-[>a,>button]:hover:bg-muted/50 data-[state=error]:border-destructive/30 data-[state=idle]:border-dashed", {
    variants: {
        size: {
            default: "cn-attachment-size-default",
            sm: "cn-attachment-size-sm",
            xs: "cn-attachment-size-xs",
        },
        orientation: {
            horizontal: "cn-attachment-orientation-horizontal items-center",
            vertical: "cn-attachment-orientation-vertical flex-col",
        },
    },
});
function Attachment({ className, state = "done", size = "default", orientation = "horizontal", ...props }) {
    return (_jsx("div", { "data-slot": "attachment", "data-state": state, "data-size": size, "data-orientation": orientation, className: cn(attachmentVariants({ size, orientation }), className), ...props }));
}
const attachmentMediaVariants = cva("cn-attachment-media relative flex aspect-square shrink-0 items-center justify-center overflow-hidden group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none", {
    variants: {
        variant: {
            icon: "cn-attachment-media-variant-icon",
            image: "cn-attachment-media-variant-image *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover",
        },
    },
    defaultVariants: {
        variant: "icon",
    },
});
function AttachmentMedia({ className, variant = "icon", ...props }) {
    return (_jsx("div", { "data-slot": "attachment-media", "data-variant": variant, className: cn(attachmentMediaVariants({ variant }), className), ...props }));
}
function AttachmentContent({ className, ...props }) {
    return (_jsx("div", { "data-slot": "attachment-content", className: cn("cn-attachment-content max-w-full min-w-0 flex-1", className), ...props }));
}
function AttachmentTitle({ className, ...props }) {
    return (_jsx("span", { "data-slot": "attachment-title", className: cn("cn-attachment-title block max-w-full min-w-0 truncate group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer", className), ...props }));
}
function AttachmentDescription({ className, ...props }) {
    return (_jsx("span", { "data-slot": "attachment-description", className: cn("cn-attachment-description block min-w-0 truncate text-muted-foreground group-data-[state=error]/attachment:text-destructive/80", "max-w-full", className), ...props }));
}
function AttachmentActions({ className, ...props }) {
    return (_jsx("div", { "data-slot": "attachment-actions", className: cn("cn-attachment-actions flex shrink-0 items-center", className), ...props }));
}
function AttachmentAction({ className, variant, size = "icon-xs", ...props }) {
    return (_jsx(Button, { "data-slot": "attachment-action", variant: variant ?? "ghost", size: size, className: cn("cn-attachment-action", className), ...props }));
}
function AttachmentTrigger({ className, asChild = false, type, ...props }) {
    const Comp = asChild ? Slot.Root : "button";
    return (_jsx(Comp, { "data-slot": "attachment-trigger", type: asChild ? undefined : (type ?? "button"), className: cn("cn-attachment-trigger absolute inset-0 z-10 outline-none", className), ...props }));
}
function AttachmentGroup({ className, ...props }) {
    return (_jsx("div", { "data-slot": "attachment-group", className: cn("cn-attachment-group flex min-w-0 scroll-fade-x snap-x snap-mandatory scrollbar-none overflow-x-auto overscroll-x-contain *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start", className), ...props }));
}
export { Attachment, AttachmentGroup, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction, AttachmentTrigger, };
