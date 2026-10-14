import { IconStack } from "../../reui/icon-stack.tsx"

import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <IconStack aria-hidden="true">
        <IconPlaceholder
          lucide="LayersIcon"
          tabler="IconStack2"
          hugeicons="Layers01Icon"
          phosphor="StackIcon"
          remixicon="RiStackLine"
          className="size-4"
        />
      </IconStack>
    </div>
  )
}
