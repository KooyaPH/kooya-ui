import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../../../../adapters/overlays.tsx"

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
    <TooltipProvider>
      <div className="flex -space-x-2">
        {avatars.map((avatar, index) => (
          <Tooltip key={index}>
            <TooltipTrigger>
              <Avatar className="ring-background ring-2 transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md">
                <AvatarImage src={avatar.src} alt={avatar.name} />
                <AvatarFallback className="text-xs">
                  {avatar.fallback}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>{avatar.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  )
}
