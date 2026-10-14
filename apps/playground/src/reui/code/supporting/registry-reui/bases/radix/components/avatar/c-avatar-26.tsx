import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full gap-1 pl-0.5"
    >
      <Avatar className="border-background size-6 border-2">
        <AvatarImage src="/reui-assets/images/0a10b9bc070f3bdf606f.jpg" alt="@shadcn" />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <span className="text-xs">@shadcn</span>
    </Button>
  )
}
