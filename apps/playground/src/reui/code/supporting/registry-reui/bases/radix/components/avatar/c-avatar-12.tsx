import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage
          src="/reui-assets/images/f1d4253436738aaf8fdf.jpg"
          alt="Nick Johnson"
        />
        <AvatarFallback>NJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson (away)"
        />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
          alt="Sarah Chen"
        />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="PlusSignIcon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
          aria-hidden="true"
        />
      </AvatarGroupCount>
    </AvatarGroup>
  )
}
