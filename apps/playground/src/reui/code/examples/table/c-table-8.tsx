// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Badge } from "../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../adapters/data.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

const projects = [
  {
    name: "Website Redesign",
    description: "Landing page and marketing site",
    status: "In Progress",
    statusVariant: "info-light" as const,
    team: [
      {
        src: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        fallback: "SC",
      },
      {
        src: "/reui-assets/images/e93553df2422635515ee.jpg",
        fallback: "MJ",
      },
      {
        src: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        fallback: "EP",
      },
    ],
    extra: 2,
    dueDate: "Mar 15",
  },
  {
    name: "Mobile App v2",
    description: "iOS and Android release",
    status: "Review",
    statusVariant: "warning-light" as const,
    team: [
      {
        src: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
        fallback: "DK",
      },
      {
        src: "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        fallback: "SD",
      },
    ],
    extra: 0,
    dueDate: "Apr 1",
  },
  {
    name: "API Integration",
    description: "Third-party payment gateway",
    status: "Completed",
    statusVariant: "success-light" as const,
    team: [
      {
        src: "/reui-assets/images/e93553df2422635515ee.jpg",
        fallback: "MJ",
      },
    ],
    extra: 0,
    dueDate: "Feb 28",
  },
  {
    name: "Analytics Dashboard",
    description: "Real-time metrics and reporting",
    status: "Planning",
    statusVariant: "outline" as const,
    team: [
      {
        src: "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
        fallback: "SC",
      },
      {
        src: "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
        fallback: "DK",
      },
      {
        src: "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
        fallback: "EP",
      },
    ],
    extra: 4,
    dueDate: "May 10",
  },
]

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.name}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="bg-muted rounded-sm flex size-8 shrink-0 items-center justify-center">
                    <IconPlaceholder
                      lucide="FolderIcon"
                      tabler="IconFolder"
                      hugeicons="FolderIcon"
                      phosphor="FolderIcon"
                      remixicon="RiFolderLine"
                      className="text-muted-foreground size-4"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{project.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {project.description}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={project.statusVariant} size="sm">
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>
                <AvatarGroup>
                  {project.team.map((member) => (
                    <Avatar key={member.fallback} size="sm">
                      <AvatarImage src={member.src} alt={member.fallback} />
                      <AvatarFallback>{member.fallback}</AvatarFallback>
                    </Avatar>
                  ))}
                  {project.extra > 0 && (
                    <AvatarGroupCount>
                      <span className="text-muted-foreground text-[0.625rem]">
                        +{project.extra}
                      </span>
                    </AvatarGroupCount>
                  )}
                </AvatarGroup>
              </TableCell>
              <TableCell className="text-muted-foreground text-right text-sm">
                {project.dueDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
