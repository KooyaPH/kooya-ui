// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { IconTile } from "../../supporting/registry-reui/bases/radix/reui/icon-tile.tsx"

import { IconPlaceholder } from "../../../adapters/icons.tsx"

const sizes = ["xs", "sm", "default", "lg", "xl"] as const

export default function Pattern() {
  return (
    <div className="flex items-end justify-center gap-4">
      {sizes.map((size) => (
        <IconTile key={size} variant="elevated" size={size} aria-hidden="true">
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
