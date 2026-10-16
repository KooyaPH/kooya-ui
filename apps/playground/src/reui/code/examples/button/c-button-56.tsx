// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Button } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Button variant="outline">
      <Avatar className="size-5">
        <AvatarImage src="/reui-assets/images/0a10b9bc070f3bdf606f.jpg" alt="@shadcn" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <span className="text-xs">@shadcn</span>
    </Button>
  )
}
