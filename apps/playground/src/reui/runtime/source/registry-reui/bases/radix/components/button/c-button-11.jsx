import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Button, { size: "icon", "aria-label": "Search", children: _jsx(IconPlaceholder, { lucide: "SearchIcon", tabler: "IconSearch", hugeicons: "Search01Icon", phosphor: "MagnifyingGlassIcon", remixicon: "RiSearchLine", "aria-hidden": "true" }) }));
}
