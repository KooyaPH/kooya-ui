// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="sm">
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson"
        />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson"
        />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson"
        />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
    </div>
  )
}
