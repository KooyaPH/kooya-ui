// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { IconTile } from "../../supporting/registry-reui/bases/radix/reui/icon-tile.tsx"

import { IconPlaceholder } from "../../../adapters/icons.tsx"

// The `solid` variant is a filled tone with a contrasting glyph. Override the
// fill with a `bg-*` class plus a readable text color. An empty class keeps the
// primary default.
const tones = [
  "",
  "bg-info text-white",
  "bg-success text-white",
  "bg-warning text-white",
  "bg-destructive text-white",
]

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-4">
      {tones.map((tone) => (
        <IconTile
          key={tone || "primary"}
          variant="solid"
          className={tone}
          aria-hidden="true"
        >
          <IconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheck"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
          />
        </IconTile>
      ))}
    </div>
  )
}
