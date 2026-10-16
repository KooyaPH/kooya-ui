// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../adapters/selection.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup type="single" variant="outline" defaultValue="all">
        <ToggleGroupItem value="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="missed" aria-label="Toggle missed">
          Missed
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
