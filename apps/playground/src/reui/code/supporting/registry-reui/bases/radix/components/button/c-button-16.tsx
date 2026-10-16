import { Button } from "../../../../../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Button variant="secondary">
      <IconPlaceholder
        lucide="GithubIcon"
        tabler="IconBrandGithub"
        hugeicons="GithubIcon"
        phosphor="GithubLogoIcon"
        remixicon="RiGithubLine"
        aria-hidden="true"
      />
      Github
    </Button>
  )
}
