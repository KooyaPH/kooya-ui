// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { toast } from "../../../adapters/feedback.tsx"

import { Button } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={() =>
          toast("Message archived", {
            description: "The conversation has been moved to archive.",
            action: {
              label: "Undo",
              onClick: () => toast.success("Action undone"),
            },
          })
        }
        variant="outline"
        className="w-fit"
      >
        Toast with Action
      </Button>
    </div>
  )
}
