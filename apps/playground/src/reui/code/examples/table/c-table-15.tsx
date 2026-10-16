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

const leaders = [
  {
    rank: 1,
    name: "Sarah Chen",
    handle: "@sarahchen",
    avatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    score: 12840,
    change: "+320",
    changeUp: true,
    level: "Diamond",
    levelVariant: "info" as const,
  },
  {
    rank: 2,
    name: "Marcus Johnson",
    handle: "@marcusj",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    score: 11250,
    change: "+180",
    changeUp: true,
    level: "Platinum",
    levelVariant: "default" as const,
  },
  {
    rank: 3,
    name: "Emily Park",
    handle: "@emilyp",
    avatar:
      "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
    score: 10890,
    change: "-45",
    changeUp: false,
    level: "Platinum",
    levelVariant: "default" as const,
  },
  {
    rank: 4,
    name: "David Kim",
    handle: "@davidk",
    avatar:
      "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
    score: 9420,
    change: "+520",
    changeUp: true,
    level: "Gold",
    levelVariant: "warning" as const,
  },
  {
    rank: 5,
    name: "Sofia Davis",
    handle: "@sofiad",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    score: 8750,
    change: "+90",
    changeUp: true,
    level: "Gold",
    levelVariant: "warning" as const,
  },
]

export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead>Player</TableHead>
            <TableHead>Level</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead className="text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaders.map((leader) => (
            <TableRow key={leader.rank}>
              <TableCell className="text-center text-sm font-bold">
                {leader.rank}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar size="sm">
                    <AvatarImage src={leader.avatar} alt={leader.name} />
                    <AvatarFallback>
                      {leader.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{leader.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {leader.handle}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={leader.levelVariant} size="sm">
                  {leader.level}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-mono text-sm font-medium">
                {leader.score.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <span className="inline-flex items-center gap-0.5 text-sm">
                  {leader.changeUp ? (
                    <IconPlaceholder
                      lucide="TrendingUpIcon"
                      tabler="IconTrendingUp"
                      hugeicons="TradeUpIcon"
                      phosphor="TrendUpIcon"
                      remixicon="RiArrowRightUpLongLine"
                      aria-hidden="true"
                      className="text-success size-3.5"
                    />
                  ) : (
                    <IconPlaceholder
                      lucide="TrendingDownIcon"
                      tabler="IconTrendingDown"
                      hugeicons="TradeDownIcon"
                      phosphor="TrendDownIcon"
                      remixicon="RiArrowRightDownLongLine"
                      aria-hidden="true"
                      className="text-destructive size-3.5"
                    />
                  )}
                  <span
                    className={
                      leader.changeUp ? "text-success" : "text-destructive"
                    }
                  >
                    {leader.change}
                  </span>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
