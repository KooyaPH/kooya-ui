// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Button className="pe-0">
      <IconPlaceholder
        lucide="ThumbsUpIcon"
        tabler="IconThumbUp"
        hugeicons="ThumbsUpIcon"
        phosphor="ThumbsUpIcon"
        remixicon="RiThumbUpLine"
        aria-hidden="true"
      />
      Like
      <span className="relative ms-1 px-3 text-xs font-medium opacity-80 before:absolute before:inset-0 before:left-0 before:w-px before:bg-[currentColor]/60">
        456
      </span>
    </Button>
  )
}
