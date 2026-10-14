// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <AvatarGroup>
        <Avatar>
          <AvatarImage
            src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
            alt="sarah@example.com"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="/reui-assets/images/96b8bd25ab6ed38fc54f.png"
            alt="@maxleiter"
            className="grayscale"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="/reui-assets/images/eb59b55e1933bc432a9c.png"
            alt="@evilrabbit"
            className="grayscale"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount aria-label="Add collaborator">
          <IconPlaceholder
            lucide="UserPlusIcon"
            tabler="IconUserPlus"
            hugeicons="UserAdd01Icon"
            phosphor="UserPlusIcon"
            remixicon="RiUserAddLine"
            aria-hidden="true"
          />
        </AvatarGroupCount>
      </AvatarGroup>
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium">No active collaborators</h3>
        <p className="text-muted-foreground text-xs">
          Invite teammates to start working together.
        </p>
      </div>
    </div>
  )
}
