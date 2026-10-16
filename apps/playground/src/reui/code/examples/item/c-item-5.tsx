// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Badge } from "../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <ItemGroup>
        <Item variant="outline" size="xs">
          <ItemMedia>
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/c6e9e0d487c842b94fea.jpg"
                alt="Sarah Chen"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Sarah Chen</ItemTitle>
            <ItemDescription>Team Lead</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="success" size="sm">
              Online
            </Badge>
          </ItemActions>
        </Item>
        <Item variant="outline" size="xs">
          <ItemMedia>
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/e93553df2422635515ee.jpg"
                alt="Alex Johnson"
              />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Alex Johnson</ItemTitle>
            <ItemDescription>Developer</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="warning" size="sm">
              Away
            </Badge>
          </ItemActions>
        </Item>
        <Item variant="outline" size="xs">
          <ItemMedia>
            <Avatar>
              <AvatarImage
                src="/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg"
                alt="David Kim"
              />
              <AvatarFallback>DK</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>David Kim</ItemTitle>
            <ItemDescription>Designer</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="outline" size="sm">
              Offline
            </Badge>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  )
}
