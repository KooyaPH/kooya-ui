// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Badge } from "../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center gap-1.5">
      <Avatar>
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson"
        />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold">Alex Johnson</span>
          <Badge variant="default" size="xs">
            Pro
          </Badge>
        </div>
        <span className="text-muted-foreground text-xs">Founder & CEO</span>
      </div>
    </div>
  )
}
