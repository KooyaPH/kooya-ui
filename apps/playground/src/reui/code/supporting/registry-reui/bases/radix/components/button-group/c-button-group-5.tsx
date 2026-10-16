import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import {
  ButtonGroup,
  ButtonGroupText,
} from "../../../../../../../adapters/controls.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../../../adapters/menus.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

const team = [
  { name: "Shadcn", src: "/reui-assets/images/0a10b9bc070f3bdf606f.jpg", fallback: "CN" },
  { name: "Max", src: "/reui-assets/images/96b8bd25ab6ed38fc54f.png", fallback: "ML" },
  {
    name: "Evil Rabbit",
    src: "/reui-assets/images/eb59b55e1933bc432a9c.png",
    fallback: "ER",
  },
]

export default function Pattern() {
  return (
    <ButtonGroup>
      {/* Team Context */}
      <Button variant="outline">
        <IconPlaceholder
          lucide="UsersIcon"
          tabler="IconUsers"
          hugeicons="UserMultiple02Icon"
          phosphor="UsersIcon"
          remixicon="RiGroupLine"
          aria-hidden="true"
        />
        <span>Team</span>
      </Button>

      {/* Active Members - Inspired by Avatar Patterns */}
      <ButtonGroupText className="gap-0 bg-transparent">
        <AvatarGroup>
          {team.map((member) => (
            <Avatar key={member.name} className="size-5">
              <AvatarImage src={member.src} alt={member.name} />
              <AvatarFallback>{member.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="ml-2 flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-green-500" />
          <span className="text-muted-foreground text-xs font-medium">
            3 Live
          </span>
        </div>
      </ButtonGroupText>

      {/* Collaboration Actions */}
      <Button variant="outline" size="icon">
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="PlusSignIcon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
          aria-hidden="true"
        />
      </Button>
      <Button variant="outline" size="icon">
        <IconPlaceholder
          lucide="ClockIcon"
          tabler="IconClock"
          hugeicons="ClockIcon"
          phosphor="ClockIcon"
          remixicon="RiTimeLine"
          aria-hidden="true"
        />
      </Button>

      {/* Options Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <IconPlaceholder
              lucide="MoreHorizontalIcon"
              tabler="IconDots"
              hugeicons="MoreHorizontalCircle01Icon"
              phosphor="DotsThreeIcon"
              remixicon="RiMoreLine"
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Team Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="UserIcon"
                tabler="IconUser"
                hugeicons="UserIcon"
                phosphor="UserIcon"
                remixicon="RiUserLine"
                aria-hidden="true"
              />
              <span>Manage members</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="SettingsIcon"
                tabler="IconSettings"
                hugeicons="SettingsIcon"
                phosphor="GearIcon"
                remixicon="RiSettings3Line"
                aria-hidden="true"
              />
              <span>Team preferences</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="ExternalLinkIcon"
              tabler="IconExternalLink"
              hugeicons="LinkSquare01Icon"
              phosphor="ArrowSquareOutIcon"
              remixicon="RiExternalLinkLine"
              aria-hidden="true"
            />
            <span>Open dashboard</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
