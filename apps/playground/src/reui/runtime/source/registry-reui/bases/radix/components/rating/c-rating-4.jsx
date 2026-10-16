"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Rating } from "../../../../../../../adapters/utility.tsx";
import { toast } from "../../../../../../../adapters/feedback.tsx";
export default function Pattern() {
    const [productRating, setProductRating] = useState(0);
    const handleRatingChange = (rating) => {
        setProductRating(rating);
        toast.success("Rated {rating} out of 5", {
            description: `Rated ${rating} out of 5`,
        });
    };
    return (_jsx("div", { className: "space-y-8", children: _jsx(Rating, { rating: productRating, editable: true, onRatingChange: handleRatingChange, showValue: true }) }));
}
