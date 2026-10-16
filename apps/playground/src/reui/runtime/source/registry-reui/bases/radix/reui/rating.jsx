"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "cn";
import { IconPlaceholder } from "../../../../../../adapters/icons.tsx";
const ratingVariants = cva("flex items-center", {
    variants: {
        size: {
            sm: "gap-2",
            default: "gap-2.5",
            lg: "gap-3",
        },
    },
    defaultVariants: {
        size: "default",
    },
});
const starVariants = cva("", {
    variants: {
        size: {
            sm: "w-4 h-4",
            default: "w-5 h-5",
            lg: "w-6 h-6",
        },
    },
    defaultVariants: {
        size: "default",
    },
});
const valueVariants = cva("text-muted-foreground w-5", {
    variants: {
        size: {
            sm: "text-xs",
            default: "text-sm",
            lg: "text-base",
        },
    },
    defaultVariants: {
        size: "default",
    },
});
function Rating({ rating, maxRating = 5, size, className, starClassName, showValue = false, editable = false, onRatingChange, ...props }) {
    const [hoveredRating, setHoveredRating] = useState(null);
    const displayRating = editable && hoveredRating !== null ? hoveredRating : rating;
    const handleStarClick = (starRating) => {
        if (editable && onRatingChange) {
            onRatingChange(starRating);
        }
    };
    const handleStarMouseEnter = (starRating) => {
        if (editable) {
            setHoveredRating(starRating);
        }
    };
    const handleStarMouseLeave = () => {
        if (editable) {
            setHoveredRating(null);
        }
    };
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= maxRating; i++) {
            const filled = displayRating >= i;
            const partiallyFilled = displayRating > i - 1 && displayRating < i;
            const fillPercentage = partiallyFilled
                ? (displayRating - (i - 1)) * 100
                : 0;
            stars.push(_jsxs("div", { className: cn("relative", editable && "cursor-pointer"), onClick: () => handleStarClick(i), onMouseEnter: () => handleStarMouseEnter(i), onMouseLeave: handleStarMouseLeave, children: [_jsx(IconPlaceholder, { lucide: "StarIcon", tabler: "IconStar", hugeicons: "StarIcon", phosphor: "StarIcon", remixicon: "RiStarLine", "data-slot": "rating-star-empty", className: cn(starVariants({ size }), "text-muted-foreground/30") }), _jsx("div", { className: "absolute inset-0 overflow-hidden", style: {
                            width: filled ? "100%" : `${fillPercentage}%`,
                        }, children: _jsx(IconPlaceholder, { lucide: "StarIcon", tabler: "IconStar", hugeicons: "StarIcon", phosphor: "StarIcon", remixicon: "RiStarLine", "data-slot": "rating-star-filled", className: cn(starVariants({ size }), "fill-yellow-400 text-yellow-400") }) })] }, i));
        }
        return stars;
    };
    return (_jsxs("div", { "data-slot": "rating", className: cn(ratingVariants({ size }), className), ...props, children: [_jsx("div", { className: "flex items-center", children: renderStars() }), showValue && (_jsx("span", { "data-slot": "rating-value", className: cn(valueVariants({ size }), starClassName), children: displayRating.toFixed(1) }))] }));
}
export { Rating };
