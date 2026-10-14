// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Slider } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-12">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-40"
      />
      <Slider
        defaultValue={[25, 75]}
        max={100}
        step={5}
        orientation="vertical"
        className="h-40"
      />
    </div>
  )
}
