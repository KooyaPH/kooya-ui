// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
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
          <TooltipTrigger className="relative cursor-pointer">
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/e93553df2422635515ee.jpg"
                alt="James Davis"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span className="border-background absolute right-0 bottom-0 block size-3 rounded-full border-2 bg-green-500" />
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-2 p-2">
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/e93553df2422635515ee.jpg"
                alt="James Davis"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">James Davis</span>
              <div className="flex items-center gap-1.5 opacity-80">
                <span className="block size-1.5 shrink-0 rounded-full bg-green-500" />
                Online now
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
