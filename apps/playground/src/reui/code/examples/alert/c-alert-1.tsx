// Owned correction for the adapted REUI recipe; retain the local adapters.
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../supporting/registry-reui/bases/radix/reui/alert"

export default function Pattern() {
  return (
    <Alert
      style={{
        backgroundColor: "var(--ku-surface)",
        color: "var(--ku-ink)",
        borderColor: "var(--ku-line)",
      }}
    >
      <AlertTitle className="!line-clamp-none min-w-0 [overflow-wrap:anywhere]">
        Alert!
      </AlertTitle>
      <AlertDescription
        className="min-w-0 [overflow-wrap:anywhere]"
        style={{ color: "var(--ku-muted)" }}
      >
        This is an alert with a title and description.
      </AlertDescription>
    </Alert>
  )
}
