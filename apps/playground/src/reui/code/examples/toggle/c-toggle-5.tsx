// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Toggle } from "../../../adapters/selection.tsx"

export default function Pattern() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle aria-label="Disabled toggle" disabled>
        Disabled
      </Toggle>
      <Toggle variant="outline" aria-label="Disabled outline toggle" disabled>
        Disabled
      </Toggle>
    </div>
  )
}
