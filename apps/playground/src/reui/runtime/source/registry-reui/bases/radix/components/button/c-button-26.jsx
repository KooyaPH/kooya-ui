import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsx(Button, { size: "icon-lg", "aria-label": "Play", children: _jsx(IconPlaceholder, { lucide: "PlayIcon", tabler: "IconPlayerPlay", hugeicons: "PlayIcon", phosphor: "PlayIcon", remixicon: "RiPlayLine", "aria-hidden": "true" }) }));
}
