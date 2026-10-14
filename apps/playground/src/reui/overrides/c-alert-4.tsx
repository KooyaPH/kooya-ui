import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../code/supporting/registry-reui/bases/radix/reui/alert"
import { IconPlaceholder } from "../adapters/icons"

export default function Pattern() {
  return (
    <Alert variant="destructive">
      <IconPlaceholder
        lucide="CircleAlertIcon"
        tabler="IconAlertCircle"
        hugeicons="AlertCircleIcon"
        phosphor="WarningCircleIcon"
        remixicon="RiErrorWarningLine"
        style={{ color: "var(--ku-danger)" }}
      />
      <AlertTitle className="min-w-0 line-clamp-none whitespace-normal [overflow-wrap:anywhere]">
        Payment Failed
      </AlertTitle>
      <AlertDescription
        className="min-w-0"
        style={{ color: "var(--ku-muted)", overflowWrap: "anywhere" }}
      >
        <p>Please check your payment details:</p>
        <ul className="mt-1 list-inside list-disc space-y-0.5 text-sm">
          <li>Card number and expiry</li>
          <li>Billing address</li>
          <li>Available funds</li>
        </ul>
      </AlertDescription>
    </Alert>
  )
}
