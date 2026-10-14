// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../adapters/overlays.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div className="flex cursor-pointer items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage
                src="/reui-assets/images/240c6b87e9fc32d07637.jpg"
                alt="Elena Soroka"
              />
              <AvatarFallback>ES</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium hover:underline">
                Elena Soroka
              </p>
              <p className="text-muted-foreground text-xs">@e.soroka</p>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-64">
          <div className="flex gap-2">
            <Avatar className="size-10 shrink-0">
              <AvatarImage
                src="/reui-assets/images/240c6b87e9fc32d07637.jpg"
                alt="Elena Soroka"
              />
              <AvatarFallback>ES</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div>
                <p className="text-sm font-medium hover:underline">
                  Elena Soroka
                </p>
                <p className="text-muted-foreground text-xs">@e.soroka</p>
              </div>
              <p className="text-foreground">Lead Product Designer at Vibe.</p>
              <div className="flex items-center gap-1">
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendarEvent"
                  hugeicons="Calendar04Icon"
                  phosphor="CalendarBlankIcon"
                  remixicon="RiCalendarLine"
                  className="size-3.5 opacity-60"
                />
                <span className="text-muted-foreground text-xs leading-none">
                  Joined December 2023
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
