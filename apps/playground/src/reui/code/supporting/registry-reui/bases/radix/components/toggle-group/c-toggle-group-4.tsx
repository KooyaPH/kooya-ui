import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../../../../adapters/selection.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup
        type="single"
        variant="outline"
        spacing={2}
        defaultValue="week"
      >
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
