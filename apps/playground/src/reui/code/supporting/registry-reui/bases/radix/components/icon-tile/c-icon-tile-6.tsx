import { IconTile } from "../../reui/icon-tile.tsx"

import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-4">
      <IconTile variant="outline" size="lg" radius="full" aria-hidden="true">
        <IconPlaceholder
          lucide="GlobeIcon"
          tabler="IconWorld"
          hugeicons="Globe02Icon"
          phosphor="GlobeSimpleIcon"
          remixicon="RiGlobalLine"
        />
      </IconTile>
      <IconTile variant="elevated" size="lg" radius="full" aria-hidden="true">
        <IconPlaceholder
          lucide="StarIcon"
          tabler="IconStar"
          hugeicons="StarIcon"
          phosphor="StarIcon"
          remixicon="RiStarLine"
        />
      </IconTile>
      <IconTile variant="frame" size="lg" radius="full" aria-hidden="true">
        <IconPlaceholder
          lucide="CircleCheckIcon"
          tabler="IconCircleCheck"
          hugeicons="CheckmarkCircle01Icon"
          phosphor="CheckCircleIcon"
          remixicon="RiCheckboxCircleLine"
        />
      </IconTile>
    </div>
  )
}
