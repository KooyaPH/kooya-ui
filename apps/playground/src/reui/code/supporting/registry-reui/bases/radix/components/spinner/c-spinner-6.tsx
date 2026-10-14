import { Button } from "../../../../../../../adapters/controls.tsx"
import { Spinner } from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-3">
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
