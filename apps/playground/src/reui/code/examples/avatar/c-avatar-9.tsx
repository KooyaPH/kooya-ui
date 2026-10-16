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
      <Avatar className="rounded-md relative">
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson (away)"
          className="rounded-md"
        />
        <AvatarFallback>AJ</AvatarFallback>
        <AvatarBadge className="-top-1 -right-1 bg-green-500" />
      </Avatar>
      <Avatar className="rounded-md relative">
        <AvatarImage
          src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
          alt="Sarah Chen"
          className="rounded-md"
        />
        <AvatarFallback>SC</AvatarFallback>
        <AvatarBadge className="-right-1 -bottom-1 bg-yellow-500" />
      </Avatar>
      <Avatar className="rounded-md relative">
        <AvatarImage
          src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
          alt="Michael Rodriguez"
          className="rounded-md"
        />
        <AvatarFallback>MR</AvatarFallback>
        <AvatarBadge className="bg-destructive -top-1 right-auto bottom-auto -left-1" />
      </Avatar>
      <Avatar className="rounded-md relative">
        <AvatarImage
          src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
          alt="Emma Wilson"
          className="rounded-md"
        />
        <AvatarFallback>EW</AvatarFallback>
        <AvatarBadge className="right-auto -bottom-1 -left-1 bg-blue-500" />
      </Avatar>
    </div>
  )
}
