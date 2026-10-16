// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
import { Badge } from "../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
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

const files = [
  {
    name: "Q4 Financial Report.pdf",
    icon: (
      <IconPlaceholder
        lucide="FileTextIcon"
        tabler="IconFileText"
        hugeicons="File02Icon"
        phosphor="FileTextIcon"
        remixicon="RiFileTextLine"
        className="text-muted-foreground size-4 shrink-0"
        aria-hidden="true"
      />
    ),
    size: "2.4 MB",
    owner: "Sarah Chen",
    ownerAvatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    sharing: "Team",
    sharingVariant: "info-light" as const,
    modified: "2 hours ago",
  },
  {
    name: "Brand Guidelines",
    icon: (
      <IconPlaceholder
        lucide="FolderIcon"
        tabler="IconFolder"
        hugeicons="FolderIcon"
        phosphor="FolderIcon"
        remixicon="RiFolderLine"
        className="text-muted-foreground size-4 shrink-0"
        aria-hidden="true"
      />
    ),
    size: "—",
    owner: "Emily Park",
    ownerAvatar:
      "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
    sharing: "Public",
    sharingVariant: "success-light" as const,
    modified: "1 day ago",
  },
  {
    name: "Product Roadmap 2025.xlsx",
    icon: (
      <IconPlaceholder
        lucide="FileSpreadsheetIcon"
        tabler="IconFileSpreadsheet"
        hugeicons="GoogleSheetIcon"
        phosphor="FileTextIcon"
        remixicon="RiFileTextLine"
        className="text-muted-foreground size-4 shrink-0"
        aria-hidden="true"
      />
    ),
    size: "856 KB",
    owner: "Marcus Johnson",
    ownerAvatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    sharing: "Private",
    sharingVariant: "outline" as const,
    modified: "3 days ago",
  },
  {
    name: "App Screenshots",
    icon: (
      <IconPlaceholder
        lucide="ImageIcon"
        tabler="IconPhoto"
        hugeicons="ImageIcon"
        phosphor="ImageIcon"
        remixicon="RiImageLine"
        className="text-muted-foreground size-4 shrink-0"
        aria-hidden="true"
      />
    ),
    size: "48.2 MB",
    owner: "David Kim",
    ownerAvatar:
      "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
    sharing: "Team",
    sharingVariant: "info-light" as const,
    modified: "1 week ago",
  },
  {
    name: "Architecture Diagram.fig",
    icon: (
      <IconPlaceholder
        lucide="PenToolIcon"
        tabler="IconEdit"
        hugeicons="PenTool03Icon"
        phosphor="PenNibIcon"
        remixicon="RiPenNibLine"
        className="text-muted-foreground size-4 shrink-0"
        aria-hidden="true"
      />
    ),
    size: "12.8 MB",
    owner: "Sofia Davis",
    ownerAvatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    sharing: "Restricted",
    sharingVariant: "warning-light" as const,
    modified: "2 weeks ago",
  },
]

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Sharing</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-right">Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {file.icon}
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarImage src={file.ownerAvatar} alt={file.owner} />
                    <AvatarFallback>
                      {file.owner
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{file.owner}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={file.sharingVariant} size="sm">
                  {file.sharing}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {file.size}
              </TableCell>
              <TableCell className="text-muted-foreground text-right text-sm">
                {file.modified}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
