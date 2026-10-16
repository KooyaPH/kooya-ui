import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../code/supporting/registry-reui/bases/radix/reui/alert"
import { IconPlaceholder } from "../adapters/icons"

export default function Pattern() {
  return (
    <Alert
      variant="warning"
      className="min-w-0 !grid-cols-[16px_minmax(0,1fr)]"
    >
      <IconPlaceholder
        lucide="AlertTriangleIcon"
        tabler="IconAlertTriangle"
        hugeicons="Alert02Icon"
        phosphor="WarningIcon"
        remixicon="RiAlertLine"
        style={{ color: "var(--ku-warning)" }}
      />
      <AlertTitle className="!line-clamp-none min-w-0 [overflow-wrap:anywhere]">
        Warning! Something is wrong
      </AlertTitle>
      <AlertDescription
        className="min-w-0 [overflow-wrap:anywhere]"
        style={{ color: "var(--ku-muted)" }}
      >
        Please check your settings. If the problem persists, contact support.
      </AlertDescription>
    </Alert>
  )
}
