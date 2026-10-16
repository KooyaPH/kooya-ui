import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../../../../../../adapters/layout.tsx"

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2">
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
          <ItemDescription>Senior Software Engineer</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Follow
          </Button>
        </ItemActions>
      </Item>
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
          <ItemDescription>Product Designer</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm">Following</Button>
        </ItemActions>
      </Item>
    </div>
  )
}
