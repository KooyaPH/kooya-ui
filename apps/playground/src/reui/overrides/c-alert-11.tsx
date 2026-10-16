import {
  Alert,
  AlertAction,
  AlertDescription,
} from "../code/supporting/registry-reui/bases/radix/reui/alert"
import { Button } from "../adapters/controls"
import { IconPlaceholder } from "../adapters/icons"

export default function Pattern() {
  return (
    <Alert
      className="min-w-0 items-start !grid-cols-[16px_minmax(0,1fr)]"
      style={{
        backgroundColor: "var(--ku-surface)",
        color: "var(--ku-ink)",
        borderColor: "var(--ku-line)",
      }}
    >
      <IconPlaceholder
        lucide="ShieldCheckIcon"
        tabler="IconShieldCheck"
        hugeicons="ShieldEnergyIcon"
        phosphor="ShieldCheckIcon"
        remixicon="RiShieldCheckLine"
      />
      <AlertDescription
        className="min-w-0 [overflow-wrap:anywhere]"
        style={{ color: "var(--ku-muted)" }}
      >
        Update your password and enable 2FA.
      </AlertDescription>
      <AlertAction className="min-w-0 flex-wrap">
        <Button variant="outline" size="xs">
          Dismiss
        </Button>
        <Button size="xs">Update</Button>
      </AlertAction>
    </Alert>
  )
}
