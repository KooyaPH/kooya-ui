// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../adapters/selection.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup type="single" defaultValue="asc" variant="outline" size="sm">
        <ToggleGroupItem value="asc" aria-label="Sort ascending">
          <IconPlaceholder
            lucide="ArrowUpIcon"
            tabler="IconArrowUp"
            hugeicons="ArrowUp02Icon"
            phosphor="ArrowUpIcon"
            remixicon="RiArrowUpLine"
          />
          Ascending
        </ToggleGroupItem>
        <ToggleGroupItem value="desc" aria-label="Sort descending">
          <IconPlaceholder
            lucide="ArrowDownIcon"
            tabler="IconArrowDown"
            hugeicons="ArrowDown02Icon"
            phosphor="ArrowDownIcon"
            remixicon="RiArrowDownLine"
          />
          Descending
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
