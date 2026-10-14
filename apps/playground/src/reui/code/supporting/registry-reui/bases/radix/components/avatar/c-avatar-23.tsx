import { cn } from "cn"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"

const avatars = [
  {
    src: "/reui-assets/images/973d47055c51440af7dc.jpg",
    fallback: "DK",
    name: "David Kim",
  },
  {
    src: "/reui-assets/images/96b8bd25ab6ed38fc54f.png",
    fallback: "ML",
    name: "Max Leiter",
  },
  {
    src: "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    fallback: "ER",
    name: "James Brown",
  },
  {
    src: "/reui-assets/images/fc5e87c5ff3500323dd1.png",
    fallback: "JW",
    name: "Jenny Wilson",
  },
]

export default function Pattern() {
  return (
    <div className="group/avatars flex items-center px-2 py-4">
      {avatars.map((avatar, index) => (
        <div
          key={index}
          style={
            {
              "--index": index,
              zIndex: avatars.length - index,
            } as React.CSSProperties
          }
          className="group/avatar-item translate-x-[calc(var(--index)*-8px)] transition-all duration-300 ease-in-out will-change-transform group-hover/avatars:translate-x-[calc(var(--index)*6px)]"
        >
          <Avatar
            className={cn(
              "ring-background origin-center ring-2 transition-transform duration-300 ease-in-out",
              "group-hover/avatar-item:scale-110"
            )}
          >
            <AvatarImage src={avatar.src} alt={avatar.name} />
            <AvatarFallback className="text-xs">
              {avatar.fallback}
            </AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  )
}
