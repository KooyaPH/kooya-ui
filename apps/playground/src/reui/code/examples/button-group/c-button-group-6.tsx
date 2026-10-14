// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../../adapters/controls.tsx"
import { ButtonGroup } from "../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <IconPlaceholder
          lucide="FlipHorizontalIcon"
          tabler="IconBorderHorizontal"
          hugeicons="BorderHorizontalIcon"
          phosphor="SquareSplitHorizontalIcon"
          remixicon="RiSplitCellsHorizontal"
          aria-hidden="true"
        />
      </Button>
      <Button variant="outline" size="icon">
        <IconPlaceholder
          lucide="FlipVerticalIcon"
          tabler="IconBorderVertical"
          hugeicons="BorderVerticalIcon"
          phosphor="SquareSplitVerticalIcon"
          remixicon="RiSplitCellsVertical"
          aria-hidden="true"
        />
      </Button>
      <Button variant="outline" size="icon">
        <IconPlaceholder
          lucide="RotateCwIcon"
          tabler="IconRotateClockwise"
          hugeicons="Rotate01Icon"
          phosphor="ArrowClockwiseIcon"
          remixicon="RiResetRightLine"
          aria-hidden="true"
        />
      </Button>
    </ButtonGroup>
  )
}
