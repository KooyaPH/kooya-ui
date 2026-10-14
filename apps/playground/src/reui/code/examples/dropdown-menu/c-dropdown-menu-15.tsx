// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Button } from "../../../adapters/controls.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../adapters/menus.tsx"
import { Separator } from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

const user = {
  name: "Alex Johnson",
  email: "alex@example.com",
  initials: "AJ",
}

export default function Pattern() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
              aria-hidden="true"
            />
            New
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40" sideOffset={12}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Create</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="UserPlusIcon"
                  tabler="IconUserPlus"
                  hugeicons="UserAdd01Icon"
                  phosphor="UserPlusIcon"
                  remixicon="RiUserAddLine"
                  className="size-4 opacity-60"
                  aria-hidden="true"
                />
                New Customer
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="ShoppingCartIcon"
                  tabler="IconShoppingCart"
                  hugeicons="ShoppingCart01Icon"
                  phosphor="ShoppingCartIcon"
                  remixicon="RiShoppingCartLine"
                  className="size-4 opacity-60"
                  aria-hidden="true"
                />
                New Order
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="FileTextIcon"
                  tabler="IconFileText"
                  hugeicons="File02Icon"
                  phosphor="FileTextIcon"
                  remixicon="RiFileTextLine"
                  className="size-4 opacity-60"
                  aria-hidden="true"
                />
                New Invoice
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="UploadIcon"
                tabler="IconUpload"
                hugeicons="Upload01Icon"
                phosphor="UploadSimpleIcon"
                remixicon="RiUploadLine"
                className="size-4 opacity-60"
                aria-hidden="true"
              />
              Import Data
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="my-auto h-4" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-6">
            <AvatarImage
              src="/reui-assets/images/e93553df2422635515ee.jpg"
              alt={user.name}
            />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={12} className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-foreground text-sm">{user.name}</span>
                <span className="text-muted-foreground text-xs">
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="UserIcon"
                  phosphor="UserIcon"
                  remixicon="RiUserLine"
                  className="size-4 opacity-60"
                  aria-hidden="true"
                />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                  phosphor="CreditCardIcon"
                  remixicon="RiBankCardLine"
                  className="size-4 opacity-60"
                  aria-hidden="true"
                />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="Settings01Icon"
                  phosphor="GearIcon"
                  remixicon="RiSettings3Line"
                  className="size-4 opacity-60"
                  aria-hidden="true"
                />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <IconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="LogoutSquare01Icon"
                phosphor="SignOutIcon"
                remixicon="RiLogoutBoxRLine"
                aria-hidden="true"
              />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
