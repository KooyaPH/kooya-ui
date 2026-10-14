import { Button } from "../../../../../../../adapters/controls.tsx"
import { Spinner } from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Button disabled>
      <Spinner aria-hidden="true" />
      Please wait
    </Button>
  )
}
