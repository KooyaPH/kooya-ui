// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "../../supporting/registry-reui/bases/radix/reui/alert.tsx"
import { Frame, FramePanel } from "../../supporting/registry-reui/bases/radix/reui/frame.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Button } from "../../../adapters/controls.tsx"

export default function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert className="grid-cols-[32px_1fr] gap-x-3 border-0 shadow-none">
            <Avatar className="size-8 border">
              <AvatarImage
                src="/reui-assets/images/e93553df2422635515ee.jpg"
                alt="Alex Johnson"
              />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <AlertTitle className="flex items-center gap-2">
              <span className="truncate">Alex Johnson</span>
              <span className="text-muted-foreground truncate font-normal">
                sent you a message
              </span>
            </AlertTitle>
            <AlertAction>
              <Button size="xs" variant="outline">
                View
              </Button>
              <Button size="xs">Reply</Button>
            </AlertAction>
            <AlertDescription className="line-clamp-1">
              &quot;Hey! I&apos;ve finished the draft for the new design system.
              Let me know what you think when you have a moment.&quot;
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}
