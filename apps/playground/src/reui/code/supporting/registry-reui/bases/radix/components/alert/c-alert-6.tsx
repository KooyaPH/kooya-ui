import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../reui/alert.tsx"

import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Alert variant="success">
      <IconPlaceholder
        lucide="CircleCheckIcon"
        tabler="IconCircleCheck"
        hugeicons="CheckmarkCircle01Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleLine"
      />
      <AlertTitle>Success! All good</AlertTitle>
      <AlertDescription>
        Everything is working as expected. You can continue with your task.
      </AlertDescription>
    </Alert>
  )
}
