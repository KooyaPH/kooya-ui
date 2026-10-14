import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "../code/supporting/registry-reui/bases/radix/reui/alert"
import { Frame, FramePanel } from "../code/supporting/registry-reui/bases/radix/reui/frame"
import { Button } from "../adapters/controls"
import { IconPlaceholder } from "../adapters/icons"

const styles = `
  .ku-alert-13 { width: 100%; min-width: 0; }
  .ku-alert-13 [data-slot="alert"] {
    min-width: 0;
    grid-template-columns: 16px minmax(0, 1fr);
  }
  .ku-alert-13 [data-slot="alert-title"] {
    display: block;
    min-width: 0;
    overflow: visible;
    overflow-wrap: anywhere;
    white-space: normal;
    -webkit-line-clamp: unset;
  }
  .ku-alert-13 [data-slot="alert-description"] {
    min-width: 0;
    overflow-wrap: anywhere;
    color: var(--ku-muted);
  }
  [data-mode="dark"] .ku-alert-13 [data-slot="alert"] > svg:not(.text-yellow-500) {
    color: #d7f20f;
  }
  [data-mode="dark"] .ku-alert-13 [data-slot="alert"] > svg.text-yellow-500 {
    color: #f4b701;
  }
`

export default function Pattern() {
  return (
    <div className="ku-alert-13 mx-auto mb-auto w-full max-w-lg min-w-0">
      <style>{styles}</style>
      <Frame stacked>
        <FramePanel className="p-0!">
          <Alert
            variant="success"
            className="rounded-none border-0 shadow-none"
          >
            <IconPlaceholder
              lucide="CircleCheckIcon"
              tabler="IconCircleCheck"
              hugeicons="CheckmarkCircle01Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
            />
            <AlertTitle>Deployment Successful</AlertTitle>
            <AlertDescription>
              Your application has been successfully deployed to the production
              environment.
            </AlertDescription>
          </Alert>
        </FramePanel>
        <FramePanel className="p-0!">
          <Alert
            variant="warning"
            className="rounded-none border-0 shadow-none"
          >
            <IconPlaceholder
              lucide="AlertTriangleIcon"
              tabler="IconAlertTriangle"
              hugeicons="Alert02Icon"
              phosphor="WarningIcon"
              remixicon="RiAlertLine"
              className="text-yellow-500"
            />
            <AlertTitle>Resource Limit Reached</AlertTitle>
            <AlertAction>
              <Button size="xs">Verify</Button>
            </AlertAction>
            <AlertDescription>
              Your current plan has reached its resource limits. Consider
              upgrading to a higher tier.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}
