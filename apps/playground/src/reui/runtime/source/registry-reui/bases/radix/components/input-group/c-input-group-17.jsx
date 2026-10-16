"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    const [value, setValue] = useState("");
    const maxLength = 140;
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupTextarea, { placeholder: "Description...", value: value, onChange: (e) => setValue(e.target.value), maxLength: maxLength, className: "min-h-16 pb-12" }), _jsxs(InputGroupAddon, { align: "block-end", children: [_jsxs(InputGroupText, { className: "text-muted-foreground text-xs", children: [value.length, "/", maxLength, " characters"] }), _jsx(IconPlaceholder, { lucide: "InfoIcon", tabler: "IconInfoCircle", hugeicons: "InformationCircleIcon", phosphor: "InfoIcon", remixicon: "RiInformationLine", className: "text-muted-foreground ml-auto" })] })] }) }));
}
