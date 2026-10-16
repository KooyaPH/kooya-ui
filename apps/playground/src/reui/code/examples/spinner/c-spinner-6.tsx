// Owned correction for the adapted REUI recipe; retain the local adapters.
// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../../adapters/controls"
import { Spinner } from "../../../adapters/controls"

export default function Pattern() {
  return (
    <div className="flex max-w-full flex-wrap items-center justify-center gap-3 [&_button]:shrink-0">
      <Button disabled>
        <Spinner />
        Saving...
      </Button>
      <Button variant="outline" disabled>
        <Spinner />
        Loading
      </Button>
      <Button variant="secondary" disabled>
        <Spinner />
        Processing
      </Button>
    </div>
  )
}
