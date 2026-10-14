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

const members = [
  {
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    role: "Admin",
    roleVariant: "default" as const,
    status: "Active",
    statusVariant: "success-light" as const,
  },
  {
    name: "Marcus Johnson",
    email: "marcus@example.com",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    role: "Developer",
    roleVariant: "info-light" as const,
    status: "Active",
    statusVariant: "success-light" as const,
  },
  {
    name: "Emily Park",
    email: "emily@example.com",
    avatar:
      "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
    role: "Designer",
    roleVariant: "warning-light" as const,
    status: "Away",
    statusVariant: "warning-light" as const,
  },
  {
    name: "David Kim",
    email: "david@example.com",
    avatar:
      "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
    role: "Viewer",
    roleVariant: "outline" as const,
    status: "Offline",
    statusVariant: "outline" as const,
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
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {member.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.roleVariant} size="sm">
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.statusVariant} size="sm">
                      {member.status}
                    </Badge>
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
