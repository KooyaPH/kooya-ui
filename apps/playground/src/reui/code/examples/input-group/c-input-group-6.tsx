// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Field } from "../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <IconPlaceholder
            lucide="MicIcon"
            tabler="IconMicrophone"
            hugeicons="Mic02Icon"
            phosphor="MicrophoneIcon"
            remixicon="RiMicLine"
          />
        </InputGroupAddon>
        <InputGroupInput placeholder="Listening..." />
        <InputGroupAddon align="inline-end">
          <IconPlaceholder
            lucide="RadioIcon"
            tabler="IconBroadcast"
            hugeicons="LiveStreaming02Icon"
            phosphor="BroadcastIcon"
            remixicon="RiRfidLine"
            className="text-destructive animate-pulse"
          />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
