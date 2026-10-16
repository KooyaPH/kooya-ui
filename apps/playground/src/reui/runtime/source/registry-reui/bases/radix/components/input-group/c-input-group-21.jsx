import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "../../../../../../../adapters/feedback.tsx";
import { Field } from "../../../../../../../adapters/layout.tsx";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Field, { className: "max-w-xs", children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { placeholder: "Component name..." }), _jsxs(InputGroupAddon, { align: "inline-end", children: [_jsx(IconPlaceholder, { lucide: "StarIcon", tabler: "IconStar", hugeicons: "StarIcon", phosphor: "StarIcon", remixicon: "RiStarLine", className: "text-muted-foreground size-4" }), _jsx(InputGroupButton, { size: "icon-xs", variant: "ghost", onClick: () => toast.success("Copied to clipboard"), children: _jsx(IconPlaceholder, { lucide: "CopyIcon", tabler: "IconCopy", hugeicons: "CopyIcon", phosphor: "CopyIcon", remixicon: "RiFileCopyLine", className: "size-4" }) })] })] }) }));
}
