// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { toast } from "../../../adapters/feedback.tsx"

import { Button } from "../../../adapters/controls.tsx"

export default function Pattern() {
  const showToast = () => {
    toast("Event has been created", {
      description: "Monday, January 3rd at 6:00pm",
    })
  }

  return (
    <div className="flex items-center justify-center">
      <Button onClick={showToast} variant="outline" className="w-fit">
        Show Toast with Description
      </Button>
    </div>
  )
}
