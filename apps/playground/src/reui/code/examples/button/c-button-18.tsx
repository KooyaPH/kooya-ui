// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Button variant="outline">
      <IconPlaceholder
        lucide="PlusIcon"
        tabler="IconPlus"
        hugeicons="PlusSignIcon"
        phosphor="PlusIcon"
        remixicon="RiAddLine"
        aria-hidden="true"
      />
      Add Item
    </Button>
  )
}
