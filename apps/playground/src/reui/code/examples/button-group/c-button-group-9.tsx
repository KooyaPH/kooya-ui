// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../../adapters/controls.tsx"
import { ButtonGroup } from "../../../adapters/controls.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../adapters/layout.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../adapters/overlays.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <IconPlaceholder
            lucide="SendIcon"
            tabler="IconSend"
            hugeicons="SentIcon"
            phosphor="PaperPlaneTiltIcon"
            remixicon="RiSendInsLine"
            aria-hidden="true"
          />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Send a message..." />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupAddon align="inline-end">
                  <IconPlaceholder
                    lucide="AudioLinesIcon"
                    tabler="IconBrandGooglePodcasts"
                    hugeicons="AudioWave01Icon"
                    phosphor="WaveformIcon"
                    remixicon="RiVoiceprintLine"
                    aria-hidden="true"
                  />
                </InputGroupAddon>
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  )
}
