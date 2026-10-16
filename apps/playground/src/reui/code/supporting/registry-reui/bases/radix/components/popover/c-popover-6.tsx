import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../../adapters/overlays.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-auto justify-start py-1.5">
            <Avatar className="size-8">
              <AvatarImage
                src="/reui-assets/images/40ea444605145b8c3389.jpg"
                alt="Marcus Chen"
              />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5 text-left">
              <p className="leading-none font-medium">Marcus Chen</p>
              <p className="text-muted-foreground">@mchen_design</p>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <Avatar className="size-12">
                <AvatarImage
                  src="/reui-assets/images/215f428abd6d940f511b.jpg"
                  alt="Marcus Chen"
                />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <Button size="sm" variant="outline">
                Follow
              </Button>
            </div>
            <div className="space-y-1">
              <h4 className="leading-none font-semibold">Marcus Chen</h4>
              <p className="text-muted-foreground">@mchen_design</p>
            </div>
            <p className="leading-relaxed">
              Product Designer specializing in design systems.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="font-semibold tabular-nums">1.2k</span>
                <span className="text-muted-foreground">Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-semibold tabular-nums">482</span>
                <span className="text-muted-foreground">Following</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
