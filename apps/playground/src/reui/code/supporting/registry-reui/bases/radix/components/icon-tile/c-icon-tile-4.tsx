import { IconTile } from "../../reui/icon-tile.tsx"

import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

const variants = ["outline", "elevated", "soft", "solid", "frame"] as const

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-4">
      {variants.map((variant) => (
        <IconTile key={variant} variant={variant} aria-hidden="true">
          <IconPlaceholder
            lucide="PackageIcon"
            tabler="IconPackage"
            hugeicons="Package01Icon"
            phosphor="PackageIcon"
            remixicon="RiBox3Line"
          />
        </IconTile>
      ))}
    </div>
  )
}
