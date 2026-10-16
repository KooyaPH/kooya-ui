import { Button } from "../../../../../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Button size="icon-lg" aria-label="Play">
      <IconPlaceholder
        lucide="PlayIcon"
        tabler="IconPlayerPlay"
        hugeicons="PlayIcon"
        phosphor="PlayIcon"
        remixicon="RiPlayLine"
        aria-hidden="true"
      />
    </Button>
  )
}
