import { Badge } from "../../../../../../../adapters/structured.tsx"
import { Frame, FramePanel } from "../../reui/frame.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../../../adapters/data.tsx"

const activities = [
  {
    user: "Sarah Chen",
    avatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    action: "Deployed",
    target: "production",
    badge: "success" as const,
    timestamp: "2 minutes ago",
  },
  {
    user: "Marcus Johnson",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    action: "Merged",
    target: "feat/auth-flow",
    badge: "info" as const,
    timestamp: "15 minutes ago",
  },
  {
    user: "Emily Park",
    avatar:
      "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
    action: "Commented",
    target: "PR #284",
    badge: "outline" as const,
    timestamp: "1 hour ago",
  },
  {
    user: "David Kim",
    avatar:
      "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
    action: "Reverted",
    target: "hotfix/api-crash",
    badge: "destructive" as const,
    timestamp: "3 hours ago",
  },
  {
    user: "Sofia Davis",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    action: "Created",
    target: "issue #512",
    badge: "secondary" as const,
    timestamp: "5 hours ago",
  },
]

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Frame spacing="xs">
        <FramePanel className="p-0!">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarImage
                          src={activity.avatar}
                          alt={activity.user}
                        />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {activity.user}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={activity.badge} size="sm">
                      {activity.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {activity.target}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-right text-sm">
                    {activity.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FramePanel>
      </Frame>
    </div>
  )
}
