import { IconTile } from "../../reui/icon-tile.tsx"

import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <IconTile variant="frame" aria-hidden="true">
        <IconPlaceholder
          lucide="LayoutDashboardIcon"
          tabler="IconLayoutDashboard"
          hugeicons="DashboardSquare02Icon"
          phosphor="LayoutIcon"
          remixicon="RiDashboardLine"
        />
      </IconTile>
    </div>
  )
}
