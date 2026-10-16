import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "../code/supporting/registry-reui/bases/radix/reui/alert"
import { Frame, FramePanel } from "../code/supporting/registry-reui/bases/radix/reui/frame"

import { Button } from "../adapters/controls"
import { IconPlaceholder } from "../adapters/icons"

export default function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg min-w-0">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert
            variant="invert"
            className="min-w-0 !grid-cols-[16px_minmax(0,1fr)] border-0 shadow-none"
          >
            <IconPlaceholder
              lucide="ZapIcon"
              tabler="IconBolt"
              hugeicons="ZapIcon"
              phosphor="LightningIcon"
              remixicon="RiFlashlightLine"
              className="text-yellow-500"
            />
            <AlertTitle className="!line-clamp-none min-w-0 [overflow-wrap:anywhere]">
              Pro Feature
            </AlertTitle>
            <AlertAction className="flex-wrap [&_button]:shrink-0">
              <Button
                variant="outline"
                size="xs"
                className="bg-background/10 border-border/10"
              >
                Dismiss
              </Button>
              <Button
                size="xs"
                className="border-blue-800 bg-blue-500 text-white hover:border-blue-900 hover:bg-blue-600"
              >
                Upgrade
              </Button>
            </AlertAction>
            <AlertDescription className="min-w-0 [overflow-wrap:anywhere]">
              This feature is only available for Pro users. Upgrade your plan to
              get access.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}
