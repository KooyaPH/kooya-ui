// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../../adapters/controls.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../adapters/overlays.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-not-allowed">
              <Button variant="outline" disabled>
                Delete Project
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">You need admin access to delete projects</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
