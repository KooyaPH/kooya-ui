// Owned correction for the adapted REUI recipe; retain the local adapters.
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../supporting/registry-reui/bases/radix/reui/alert"
import { IconPlaceholder } from "../../../adapters/icons"

const darkInfoIconStyle = `
  [data-mode="dark"] .ku-alert-5 [role="alert"] > svg {
    color: #9fb1ff !important;
  }
`

export default function Pattern() {
  return (
    <div className="ku-alert-5">
      <style>{darkInfoIconStyle}</style>
      <Alert variant="info">
        <IconPlaceholder
          lucide="CircleAlertIcon"
          tabler="IconAlertCircle"
          hugeicons="AlertCircleIcon"
          phosphor="WarningCircleIcon"
          remixicon="RiErrorWarningLine"
        />
        <AlertTitle className="line-clamp-none whitespace-normal [overflow-wrap:anywhere]">
          Info! Something important
        </AlertTitle>
        <AlertDescription
          style={{ color: "var(--ku-muted)", overflowWrap: "anywhere" }}
        >
          This is an important message. Please read it carefully.
        </AlertDescription>
      </Alert>
    </div>
  )
}
