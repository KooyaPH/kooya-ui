import { Button } from "../../../../../../../adapters/controls.tsx"
import { ButtonGroup } from "../../../../../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline" size="icon" aria-label="Add">
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="PlusSignIcon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
          aria-hidden="true"
        />
      </Button>
      <Button variant="outline" size="icon" aria-label="Subtract">
        <IconPlaceholder
          lucide="MinusIcon"
          tabler="IconMinus"
          hugeicons="MinusSignIcon"
          phosphor="MinusIcon"
          remixicon="RiSubtractLine"
          aria-hidden="true"
        />
      </Button>
    </ButtonGroup>
  )
}
