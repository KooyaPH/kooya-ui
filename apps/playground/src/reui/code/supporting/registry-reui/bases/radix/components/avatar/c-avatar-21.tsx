import { Frame, FramePanel } from "../../reui/frame.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <Frame>
      <FramePanel className="flex items-center gap-2 p-2!">
        <AvatarGroup>
          <Avatar className="size-7">
            <AvatarImage src="/reui-assets/images/0a10b9bc070f3bdf606f.jpg" alt="@shadcn" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <Avatar className="size-7">
            <AvatarImage
              src="/reui-assets/images/96b8bd25ab6ed38fc54f.png"
              alt="@maxleiter"
            />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <Avatar className="size-7">
            <AvatarImage
              src="/reui-assets/images/eb59b55e1933bc432a9c.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <Avatar className="size-7">
            <AvatarImage src="/reui-assets/images/f51fb1d8b3e4cbbd471d.png" alt="@leerob" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
        </AvatarGroup>

        <p className="text-muted-foreground me-1.5 text-xs">
          Joined by <span className="text-foreground font-semibold">500+</span>{" "}
          developers.
        </p>
      </FramePanel>
    </Frame>
  )
}
