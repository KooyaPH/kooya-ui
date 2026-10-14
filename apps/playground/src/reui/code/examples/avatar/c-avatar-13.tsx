// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="ring-primary ring-offset-background size-8 ring-2 ring-offset-2">
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson"
        />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <Avatar className="ring-destructive ring-offset-background size-8 ring-2 ring-offset-2">
        <AvatarImage
          src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
          alt="Sarah Chen"
        />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="ring-offset-background size-8 ring-2 ring-violet-500 ring-offset-2">
        <AvatarImage
          src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
          alt="Michael Rodriguez"
        />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar className="ring-offset-background size-8 ring-2 ring-yellow-500 ring-offset-2">
        <AvatarImage
          src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
          alt="Emma Wilson"
        />
        <AvatarFallback>EW</AvatarFallback>
      </Avatar>
    </div>
  )
}
