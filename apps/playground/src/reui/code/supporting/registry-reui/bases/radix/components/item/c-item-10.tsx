import { Badge } from "../../../../../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "../../../../../../../adapters/layout.tsx"
import { Progress } from "../../../../../../../adapters/controls.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
      <Item variant="outline">
        <ItemHeader>
          <div className="flex items-center gap-2">
            <IconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
              phosphor="FolderIcon"
              remixicon="RiFolderLine"
              className="text-muted-foreground size-3.5"
              aria-hidden="true"
            />
            <span className="text-muted-foreground text-xs">Project</span>
          </div>
          <Badge variant="info-light" size="xs">
            In Progress
          </Badge>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>Website Redesign</ItemTitle>
          <ItemDescription>
            Complete overhaul of the marketing site with a focus on conversion
            optimization and modern design patterns.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
        <ItemFooter>
          <AvatarGroup>
            <Avatar size="sm">
              <AvatarImage
                src="/reui-assets/images/c6e9e0d487c842b94fea.jpg"
                alt="SC"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage
                src="/reui-assets/images/e93553df2422635515ee.jpg"
                alt="AJ"
              />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarImage
                src="/reui-assets/images/dbc92c73c5f6acf7373d.jpg"
                alt="EP"
              />
              <AvatarFallback>EP</AvatarFallback>
            </Avatar>
          </AvatarGroup>
          <div className="flex items-center gap-2">
            <Progress value={65} className="w-20" />
            <span className="text-muted-foreground text-xs">65%</span>
          </div>
        </ItemFooter>
      </Item>
    </div>
  )
}
