// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="relative">
        <AvatarImage
          src="/reui-assets/images/f1d4253436738aaf8fdf.jpg"
          alt="Nick Johnson"
        />
        <AvatarFallback>AJ</AvatarFallback>
        <AvatarBadge className="bg-primary" />
      </Avatar>
      <Avatar className="relative">
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson (away)"
        />
        <AvatarFallback>AJ</AvatarFallback>
        <AvatarBadge className="bg-green-500" />
      </Avatar>
      <Avatar className="relative">
        <AvatarImage
          src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
          alt="Sarah Chen"
        />
        <AvatarFallback>SC</AvatarFallback>
        <AvatarBadge className="bg-yellow-500" />
      </Avatar>
      <Avatar className="relative">
        <AvatarImage
          src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
          alt="Michael Rodriguez"
        />
        <AvatarFallback>MR</AvatarFallback>
        <AvatarBadge className="bg-destructive" />
      </Avatar>
    </div>
  )
}
