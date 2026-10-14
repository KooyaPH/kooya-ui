import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <Button variant="outline" size="sm" className="gap-1.5">
      <Avatar className="size-5">
        <AvatarImage
          src="/reui-assets/images/5e888e99883ac22f0870.jpg"
          alt="@nick.bold"
        />
        <AvatarFallback>CH</AvatarFallback>
      </Avatar>
      <span className="text-xs">@nick.bold</span>
    </Button>
  )
}
