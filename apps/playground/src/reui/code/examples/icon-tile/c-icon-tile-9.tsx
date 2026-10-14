// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { IconTile } from "../../supporting/registry-reui/bases/radix/reui/icon-tile.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-3">
      <IconTile variant="elevated" className="text-xs font-medium">
        AK
      </IconTile>
      <IconTile
        variant="outline"
        radius="full"
        className="text-muted-foreground text-xs font-medium"
      >
        12
      </IconTile>
    </div>
  )
}
