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
            <Button variant="outline" className="w-fit">
              Show Tooltip
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Add to library</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
