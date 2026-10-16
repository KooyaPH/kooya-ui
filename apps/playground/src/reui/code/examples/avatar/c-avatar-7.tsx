// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="relative">
        <AvatarImage
          src="/reui-assets/images/f1d4253436738aaf8fdf.jpg"
          alt="Nick Johnson"
        />
        <AvatarFallback>NJ</AvatarFallback>
        <AvatarBadge>
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
            aria-hidden="true"
          />
        </AvatarBadge>
      </Avatar>
      <Avatar className="relative">
        <AvatarImage
          src="/reui-assets/images/e93553df2422635515ee.jpg"
          alt="Alex Johnson (away)"
        />
        <AvatarFallback>AJ</AvatarFallback>
        <AvatarBadge className="bg-success">
          <IconPlaceholder
            lucide="CheckIcon"
            tabler="IconCheck"
            hugeicons="Tick02Icon"
            phosphor="CheckIcon"
            remixicon="RiCheckLine"
            aria-hidden="true"
          />
        </AvatarBadge>
      </Avatar>
      <Avatar className="relative">
        <AvatarImage
          src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
          alt="Sarah Chen"
        />
        <AvatarFallback>SC</AvatarFallback>
        <AvatarBadge className="bg-warning">
          <IconPlaceholder
            lucide="StarIcon"
            tabler="IconStar"
            hugeicons="StarIcon"
            phosphor="StarIcon"
            remixicon="RiStarLine"
            aria-hidden="true"
          />
        </AvatarBadge>
      </Avatar>
      <Avatar className="relative">
        <AvatarImage
          src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
          alt="Michael Rodriguez"
        />
        <AvatarFallback>MR</AvatarFallback>
        <AvatarBadge className="bg-info">
          <IconPlaceholder
            lucide="ShieldCheckIcon"
            tabler="IconShieldCheck"
            hugeicons="ShieldEnergyIcon"
            phosphor="ShieldCheckIcon"
            remixicon="RiShieldCheckLine"
            aria-hidden="true"
          />
        </AvatarBadge>
      </Avatar>
    </div>
  )
}
