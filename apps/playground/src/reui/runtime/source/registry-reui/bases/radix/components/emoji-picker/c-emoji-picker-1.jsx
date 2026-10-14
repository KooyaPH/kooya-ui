"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { EmojiPicker, EmojiPickerPanel, } from "../../reui/emoji-picker.jsx";
import { Card } from "../../../../../../../adapters/layout.tsx";
export default function Pattern() {
    // Controlled, as an inline picker usually feeds a form. Nothing echoes it:
    // the footer preview falls back to it and the panel announces each pick.
    const [value, setValue] = useState(null);
    return (
    // Card has no flush size, so `py-0` keeps its padding off the panel's own
    // insets; `w-fit` hugs the panel when the parent is not a flex row.
    _jsx(Card, { className: "w-fit py-0", children: _jsx(EmojiPicker, { value: value, onValueChange: setValue, children: _jsx(EmojiPickerPanel, {}) }) }));
}
