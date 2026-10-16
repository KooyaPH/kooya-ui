import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../code/supporting/registry-reui/bases/radix/reui/alert"
import { IconPlaceholder } from "../adapters/icons"

export default function Pattern() {
  return (
    <Alert
      variant="success"
      className="min-w-0 !grid-cols-[16px_minmax(0,1fr)] dark:border-[#d7f20f]/30 dark:bg-[#d7f20f]/[0.04] dark:[&>svg]:text-[#d7f20f]"
    >
      <IconPlaceholder
        lucide="CircleCheckIcon"
        tabler="IconCircleCheck"
        hugeicons="CheckmarkCircle01Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleLine"
      />
      <AlertTitle className="!line-clamp-none min-w-0 [overflow-wrap:anywhere]">
        Success! All good
      </AlertTitle>
      <AlertDescription
        className="min-w-0 [overflow-wrap:anywhere]"
        style={{ color: "var(--ku-muted)" }}
      >
        Everything is working as expected. You can continue with your task.
      </AlertDescription>
    </Alert>
  )
}
