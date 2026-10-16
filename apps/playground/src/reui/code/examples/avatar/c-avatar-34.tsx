// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Avatar className="relative">
      <AvatarImage
        src="/reui-assets/images/e93553df2422635515ee.jpg"
        alt="Alex Johnson"
      />
      <AvatarFallback>JB</AvatarFallback>
      <AvatarBadge className="bg-green-500" />
      <span className="border-background absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full border-2 bg-red-500 text-xs font-medium text-white">
        3
      </span>
    </Avatar>
  )
}
