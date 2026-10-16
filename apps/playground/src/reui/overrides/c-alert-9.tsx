import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../code/supporting/registry-reui/bases/radix/reui/alert"
import { IconPlaceholder } from "../adapters/icons"

export default function Pattern() {
  return (
    <Alert
      variant="invert"
      style={{ gridTemplateColumns: "calc(var(--spacing) * 3) minmax(0, 1fr)" }}
    >
      <IconPlaceholder
        lucide="CircleAlertIcon"
        tabler="IconAlertCircle"
        hugeicons="AlertCircleIcon"
        phosphor="WarningCircleIcon"
        remixicon="RiErrorWarningLine"
        className="text-invert-foreground"
      />
      <AlertTitle className="min-w-0 line-clamp-none whitespace-normal [overflow-wrap:anywhere]">
        Notification! All good
      </AlertTitle>
      <AlertDescription className="min-w-0 [overflow-wrap:anywhere]">
        This is a notification alert with a title and description.
      </AlertDescription>
    </Alert>
  )
}
