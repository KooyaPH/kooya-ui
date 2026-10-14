import { Button } from "../../../../../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Button variant="secondary">
      Open Project
      <IconPlaceholder
        lucide="ExternalLinkIcon"
        tabler="IconExternalLink"
        hugeicons="LinkSquare01Icon"
        phosphor="ArrowSquareOutIcon"
        remixicon="RiExternalLinkLine"
        aria-hidden="true"
      />
    </Button>
  )
}
