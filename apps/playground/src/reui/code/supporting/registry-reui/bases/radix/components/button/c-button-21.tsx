import { Button } from "../../../../../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Button variant="ghost">
      Logout
      <IconPlaceholder
        lucide="LogOutIcon"
        tabler="IconLogout"
        hugeicons="LogoutSquare01Icon"
        phosphor="SignOutIcon"
        remixicon="RiLogoutBoxRLine"
        aria-hidden="true"
      />
    </Button>
  )
}
