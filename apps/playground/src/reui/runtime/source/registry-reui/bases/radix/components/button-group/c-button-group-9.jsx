import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../../../../../adapters/controls.tsx";
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "../../../../../../../adapters/layout.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "../../../../../../../adapters/overlays.tsx";
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx";
export default function Pattern() {
    return (_jsxs(ButtonGroup, { children: [_jsx(ButtonGroup, { children: _jsx(Button, { variant: "outline", size: "icon", children: _jsx(IconPlaceholder, { lucide: "SendIcon", tabler: "IconSend", hugeicons: "SentIcon", phosphor: "PaperPlaneTiltIcon", remixicon: "RiSendInsLine", "aria-hidden": "true" }) }) }), _jsx(ButtonGroup, { children: _jsxs(InputGroup, { children: [_jsx(InputGroupInput, { placeholder: "Send a message..." }), _jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(InputGroupAddon, { align: "inline-end", children: _jsx(IconPlaceholder, { lucide: "AudioLinesIcon", tabler: "IconBrandGooglePodcasts", hugeicons: "AudioWave01Icon", phosphor: "WaveformIcon", remixicon: "RiVoiceprintLine", "aria-hidden": "true" }) }) }), _jsx(TooltipContent, { children: "Voice Mode" })] }) })] }) })] }));
}
