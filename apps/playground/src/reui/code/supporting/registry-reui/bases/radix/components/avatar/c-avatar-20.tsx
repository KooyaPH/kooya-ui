import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="border-border rounded-full flex items-center gap-1.5 border p-1 shadow-sm shadow-black/5">
      <AvatarGroup>
        <Avatar className="size-7">
          <AvatarImage
            src="/reui-assets/images/a3afee2f77d259ce6a59.jpg"
            alt="Liam Thompson"
          />
          <AvatarFallback>LT</AvatarFallback>
        </Avatar>
        <Avatar className="size-7">
          <AvatarImage
            src="/reui-assets/images/f1d4253436738aaf8fdf.jpg"
            alt="Nick Johnson"
          />
          <AvatarFallback>NJ</AvatarFallback>
        </Avatar>
        <Avatar className="size-7">
          <AvatarImage
            src="/reui-assets/images/067c566cd567259bb9aa.jpg"
            alt="Maria Garcia"
          />
          <AvatarFallback>MG</AvatarFallback>
        </Avatar>
        <Avatar className="size-7">
          <AvatarImage src="/reui-assets/images/f51fb1d8b3e4cbbd471d.png" alt="@leerob" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <p className="text-muted-foreground me-1.5 text-xs">
        Trusted by <span className="text-foreground font-semibold">100K+</span>{" "}
        users.
      </p>
    </div>
  )
}
