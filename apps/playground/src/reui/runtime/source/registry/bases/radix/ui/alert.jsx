import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "cn";
const alertVariants = cva("cn-alert group/alert relative w-full", {
    variants: {
        variant: {
            default: "cn-alert-variant-default",
            destructive: "cn-alert-variant-destructive",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
function Alert({ className, variant, ...props }) {
    return (_jsx("div", { "data-slot": "alert", role: "alert", className: cn(alertVariants({ variant }), className), ...props }));
}
function AlertTitle({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-title", className: cn("cn-alert-title [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", className), ...props }));
}
function AlertDescription({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-description", className: cn("cn-alert-description [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground", className), ...props }));
}
function AlertAction({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-action", className: cn("cn-alert-action", className), ...props }));
}
export { Alert, AlertTitle, AlertDescription, AlertAction };
