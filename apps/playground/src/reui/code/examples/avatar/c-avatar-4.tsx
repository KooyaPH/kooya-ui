// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="rounded-md after:rounded-md">
        <AvatarImage
          src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
          alt="Emma Wilson"
          className="rounded-md"
        />
        <AvatarFallback>EW</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg after:rounded-lg">
        <AvatarImage
          src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
          alt="Emma Wilson"
          className="rounded-lg"
        />
        <AvatarFallback>EW</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg after:rounded-xl">
        <AvatarImage
          src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
          alt="Emma Wilson"
          className="rounded-xl"
        />
        <AvatarFallback>EW</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
          alt="Emma Wilson"
        />
        <AvatarFallback>EW</AvatarFallback>
      </Avatar>
    </div>
  )
}
