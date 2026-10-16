import { Button } from "../../../../../../../adapters/controls.tsx"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../../../../adapters/overlays.tsx"

export default function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="outline">View Image</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-[320px] overflow-hidden p-0">
          <img
            src="/reui-assets/images/b7c3c9f06c829166588e.jpg"
            alt="Card Image"
            className="aspect-video w-full object-cover"
          />
          <div className="space-y-1 p-3">
            <p className="font-medium">Image Overview</p>
            <p className="text-muted-foreground leading-relaxed">
              Visual overview of generated landing page.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
