import { Badge } from "../../../../../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../../../../../../../adapters/layout.tsx"

const activities = [
  {
    name: "Sarah Chen",
    avatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    action: "deployed",
    target: "v2.4.1 to production",
    badge: "success-light" as const,
    time: "5 min ago",
  },
  {
    name: "Marcus Johnson",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    action: "merged",
    target: "feat/dark-mode into main",
    badge: "info-light" as const,
    time: "32 min ago",
  },
  {
    name: "Emily Park",
    avatar:
      "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
    action: "opened",
    target: "issue #284: Fix mobile nav",
    badge: "warning-light" as const,
    time: "1 hour ago",
  },
]

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <ItemGroup>
        {activities.map((activity, index) => (
          <div key={index}>
            <Item variant="outline" size="xs">
              <ItemMedia>
                <Avatar size="sm">
                  <AvatarImage src={activity.avatar} alt={activity.name} />
                  <AvatarFallback>
                    {activity.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{activity.name}</ItemTitle>
                <ItemDescription>
                  <Badge
                    variant={activity.badge}
                    size="xs"
                    className="mr-1 align-text-top"
                  >
                    {activity.action}
                  </Badge>
                  {activity.target}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <span className="text-muted-foreground text-xs whitespace-nowrap">
                  {activity.time}
                </span>
              </ItemActions>
            </Item>
          </div>
        ))}
      </ItemGroup>
    </div>
  )
}
