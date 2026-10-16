"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Rating } from "../../../../../../../adapters/utility.tsx";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { Textarea } from "../../../../../../../adapters/controls.tsx";
export default function Pattern() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    return (_jsx(Card, { className: "mx-auto w-full max-w-xs", children: _jsxs(CardContent, { className: "space-y-5", children: [_jsxs("div", { className: "flex flex-col items-center gap-3", children: [_jsx("h3", { className: "text-sm font-semibold", children: "Write a Review" }), _jsx(Rating, { rating: rating, onRatingChange: setRating, editable: true }), rating > 0 && (_jsx("p", { className: "text-muted-foreground text-xs", children: rating <= 2
                                ? "We're sorry to hear that"
                                : rating <= 3
                                    ? "Thanks for your feedback"
                                    : "Glad you enjoyed it!" }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "review-text", className: "text-sm", children: "Your review" }), _jsx(Textarea, { id: "review-text", value: review, onChange: (e) => setReview(e.target.value), placeholder: "Tell us what you think...", rows: 3 })] }), _jsx(Button, { disabled: rating === 0, size: "sm", className: "w-full", children: "Submit Review" })] }) }));
}
