import { Button } from "../../../../../../../adapters/controls.tsx"
import {
  ButtonGroup,
  ButtonGroupText,
} from "../../../../../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button size="sm" variant="outline">
        <IconPlaceholder
          lucide="UserPlusIcon"
          tabler="IconUserPlus"
          hugeicons="UserAdd01Icon"
          phosphor="UserPlusIcon"
          remixicon="RiUserAddLine"
          aria-hidden="true"
        />
        Follow
      </Button>
      <ButtonGroupText className="text-muted-foreground">
        2.4k followers
      </ButtonGroupText>
    </ButtonGroup>
  )
}
