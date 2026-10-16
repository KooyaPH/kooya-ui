import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="border-border flex items-center gap-1.5 rounded-full border p-0.5 shadow-sm shadow-black/5">
      <div className="flex -space-x-1.5">
        <Avatar className="border-background size-7 border-2">
          <AvatarImage
            src="/reui-assets/images/e93553df2422635515ee.jpg"
            alt="Alex Johnson"
          />
          <AvatarFallback>AJ</AvatarFallback>
        </Avatar>
        <Avatar className="border-background size-7 border-2">
          <AvatarImage
            src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
            alt="Sarah Chen"
          />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar className="border-background size-7 border-2">
          <AvatarImage
            src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
            alt="Michael Rodriguez"
          />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <Avatar className="border-background size-7 border-2">
          <AvatarImage
            src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
            alt="Emma Wilson"
          />
          <AvatarFallback>EW</AvatarFallback>
        </Avatar>
      </div>

      <p className="text-muted-foreground me-1.5 text-xs">+3</p>
    </div>
  )
}
