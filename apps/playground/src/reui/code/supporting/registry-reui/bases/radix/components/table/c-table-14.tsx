import { Badge } from "../../../../../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Card, CardContent } from "../../../../../../../adapters/layout.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../../../adapters/data.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

const issues = [
  {
    id: "ISS-421",
    title: "Login page returns 500 on mobile",
    priority: "Critical",
    priorityVariant: "destructive" as const,
    priorityIcon: (
      <IconPlaceholder
        lucide="ArrowUpIcon"
        tabler="IconArrowUp"
        hugeicons="ArrowUp02Icon"
        phosphor="ArrowUpIcon"
        remixicon="RiArrowUpLine"
        className="size-3"
        aria-hidden="true"
      />
    ),
    label: "Bug",
    labelVariant: "destructive-light" as const,
    assignee: "Sarah Chen",
    assigneeAvatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    status: "Open",
    statusVariant: "info-light" as const,
  },
  {
    id: "ISS-420",
    title: "Add dark mode support",
    priority: "High",
    priorityVariant: "warning" as const,
    priorityIcon: (
      <IconPlaceholder
        lucide="ArrowUpIcon"
        tabler="IconArrowUp"
        hugeicons="ArrowUp02Icon"
        phosphor="ArrowUpIcon"
        remixicon="RiArrowUpLine"
        className="size-3"
        aria-hidden="true"
      />
    ),
    label: "Feature",
    labelVariant: "info-light" as const,
    assignee: "Marcus Johnson",
    assigneeAvatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    status: "In Progress",
    statusVariant: "warning-light" as const,
  },
  {
    id: "ISS-419",
    title: "Update user onboarding flow",
    priority: "Medium",
    priorityVariant: "info" as const,
    priorityIcon: (
      <IconPlaceholder
        lucide="ArrowRightIcon"
        tabler="IconArrowRight"
        hugeicons="ArrowRight02Icon"
        phosphor="ArrowRightIcon"
        remixicon="RiArrowRightLine"
        className="size-3"
        aria-hidden="true"
      />
    ),
    label: "Improvement",
    labelVariant: "success-light" as const,
    assignee: "Emily Park",
    assigneeAvatar:
      "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
    status: "In Review",
    statusVariant: "info-light" as const,
  },
  {
    id: "ISS-418",
    title: "Refactor API rate limiter module",
    priority: "Low",
    priorityVariant: "secondary" as const,
    priorityIcon: (
      <IconPlaceholder
        lucide="ArrowDownIcon"
        tabler="IconArrowDown"
        hugeicons="ArrowDown02Icon"
        phosphor="ArrowDownIcon"
        remixicon="RiArrowDownLine"
        className="size-3"
        aria-hidden="true"
      />
    ),
    label: "Tech Debt",
    labelVariant: "outline" as const,
    assignee: "David Kim",
    assigneeAvatar:
      "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
    status: "Closed",
    statusVariant: "success-light" as const,
  },
]

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Card className="p-0">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">ID</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {issue.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">
                        {issue.title}
                      </span>
                      <Badge variant="outline" size="xs">
                        {issue.label}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <AvatarImage
                          src={issue.assigneeAvatar}
                          alt={issue.assignee}
                        />
                        <AvatarFallback>
                          {issue.assignee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{issue.assignee}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={issue.statusVariant} size="sm">
                      {issue.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
