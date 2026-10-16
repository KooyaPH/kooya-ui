import { Button } from "../../../../../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Button variant="link" asChild>
      <a href="#">
        <IconPlaceholder
          lucide="ChevronLeftIcon"
          tabler="IconChevronLeft"
          hugeicons="ArrowLeft01Icon"
          phosphor="CaretLeftIcon"
          remixicon="RiArrowLeftSLine"
          data-icon="inline-start"
          aria-hidden="true"
        />
        Go back
      </a>
    </Button>
  )
}
