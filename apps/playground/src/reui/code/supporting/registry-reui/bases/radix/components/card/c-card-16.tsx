import { Badge } from "../../../../../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../../../../adapters/menus.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <Card className="w-full max-w-sm p-0">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <Badge variant="secondary">
            <IconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
              aria-hidden="true"
            />
            Live
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                aria-label="More options"
              >
                <IconPlaceholder
                  lucide="MoreVerticalIcon"
                  tabler="IconDotsVertical"
                  hugeicons="MoreVerticalCircleIcon"
                  phosphor="DotsThreeVerticalIcon"
                  remixicon="RiMoreLine"
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32" align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm leading-tight font-medium">
              Integration name
            </h3>
            <Badge variant="success-light" size="sm">
              Installed
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            Short description of the integration and what it does in one line.
          </p>
          <AvatarGroup>
            <Avatar className="size-6">
              <AvatarImage
                src="/reui-assets/images/dfed3098ae0011e5a5a3.jpg"
                alt="User 1"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar className="size-6">
              <AvatarImage
                src="/reui-assets/images/4349381d8a8476edbc4c.jpg"
                alt="User 2"
              />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <Avatar className="size-6">
              <AvatarImage
                src="/reui-assets/images/046af0b7d159f9f4fd2b.jpg"
                alt="User 3"
              />
              <AvatarFallback>EW</AvatarFallback>
            </Avatar>
            <AvatarGroupCount className="size-6 border text-[10px]">
              +3
            </AvatarGroupCount>
          </AvatarGroup>
        </div>
        <div className="border-t p-3">
          <Button variant="outline" className="w-full">
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
