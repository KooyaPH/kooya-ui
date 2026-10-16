// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../adapters/selection.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup type="single" defaultValue="m" size="sm" variant="outline">
        <ToggleGroupItem value="s">S</ToggleGroupItem>
        <ToggleGroupItem value="m">M</ToggleGroupItem>
        <ToggleGroupItem value="l">L</ToggleGroupItem>
        <ToggleGroupItem value="xl">XL</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
