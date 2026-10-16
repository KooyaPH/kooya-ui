// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../../adapters/controls.tsx"
import {
  ButtonGroup,
  ButtonGroupText,
} from "../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button size="sm" className="border-primary">
        <IconPlaceholder
          lucide="Share2Icon"
          tabler="IconShare"
          hugeicons="Share08Icon"
          phosphor="ShareNetworkIcon"
          remixicon="RiStackshareLine"
        />
        Share
      </Button>
      <ButtonGroupText className="text-muted-foreground bg-transparent px-2">
        128 Shares
      </ButtonGroupText>
    </ButtonGroup>
  )
}
