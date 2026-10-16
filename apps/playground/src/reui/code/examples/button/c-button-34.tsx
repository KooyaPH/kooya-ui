// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Button } from "../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Button>
      <IconPlaceholder
        lucide="MailIcon"
        tabler="IconMail"
        hugeicons="MailIcon"
        phosphor="EnvelopeIcon"
        remixicon="RiMailLine"
        aria-hidden="true"
      />
      Login with Email
    </Button>
  )
}
