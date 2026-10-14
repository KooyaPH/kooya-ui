"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { Field, FieldDescription } from "../../../../../../../adapters/layout.tsx";
import { Input } from "../../../../../../../adapters/controls.tsx";
import { Label } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("My Awesome Project");
    return (_jsxs(Field, { className: "w-full max-w-xs", children: [_jsxs(Label, { htmlFor: "label-inline-edit", className: "gap-2", children: ["Project Name", _jsx(Button, { size: "icon-xs", variant: "ghost", onClick: () => setIsEditing(!isEditing), children: isEditing ? (_jsx(IconPlaceholder, { lucide: "CheckIcon", tabler: "IconCheck", hugeicons: "Tick02Icon", phosphor: "CheckIcon", remixicon: "RiCheckLine", className: "size-3.5" })) : (_jsx(IconPlaceholder, { lucide: "PencilIcon", tabler: "IconPencil", hugeicons: "PenIcon", phosphor: "PencilIcon", remixicon: "RiPencilLine", className: "size-3.5" })) })] }), isEditing ? (_jsx(Input, { id: "label-inline-edit", value: value, onChange: (e) => setValue(e.target.value), autoFocus: true })) : (_jsx(FieldDescription, { children: value }))] }));
}
