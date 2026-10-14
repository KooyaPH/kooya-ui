import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsx(Button, { variant: "outline", size: "icon", "aria-label": "Skip back", children: _jsx(IconPlaceholder, { lucide: "SkipBackIcon", tabler: "IconPlayerSkipBack", hugeicons: "PreviousIcon", phosphor: "SkipBackIcon", remixicon: "RiSkipBackLine", "aria-hidden": "true" }) }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Play", children: _jsx(IconPlaceholder, { lucide: "PlayIcon", tabler: "IconPlayerPlay", hugeicons: "PlayIcon", phosphor: "PlayIcon", remixicon: "RiPlayLine", "aria-hidden": "true" }) }), _jsx(Button, { variant: "outline", size: "icon", "aria-label": "Skip forward", children: _jsx(IconPlaceholder, { lucide: "SkipForwardIcon", tabler: "IconPlayerSkipForward", hugeicons: "NextIcon", phosphor: "SkipForwardIcon", remixicon: "RiSkipForwardLine", "aria-hidden": "true" }) })] }));
}
