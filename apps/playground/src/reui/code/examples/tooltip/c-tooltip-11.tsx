// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Badge } from "../../../adapters/structured.tsx"

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
    <div className="flex items-center justify-center p-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
                alt="Emma Wilson"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-2 p-2">
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
                alt="Emma Wilson"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="font-semibold">Emma Wilson</span>
                <Badge variant="info" size="xs">
                  Admin
                </Badge>
              </div>
              <p className="opacity-80">emma@example.com</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
