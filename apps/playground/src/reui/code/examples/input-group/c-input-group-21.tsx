// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { toast } from "../../../adapters/feedback.tsx"

import { Field } from "../../../adapters/layout.tsx"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Component name..." />
        <InputGroupAddon align="inline-end">
          <IconPlaceholder
            lucide="StarIcon"
            tabler="IconStar"
            hugeicons="StarIcon"
            phosphor="StarIcon"
            remixicon="RiStarLine"
            className="text-muted-foreground size-4"
          />
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            onClick={() => toast.success("Copied to clipboard")}
          >
            <IconPlaceholder
              lucide="CopyIcon"
              tabler="IconCopy"
              hugeicons="CopyIcon"
              phosphor="CopyIcon"
              remixicon="RiFileCopyLine"
              className="size-4"
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
