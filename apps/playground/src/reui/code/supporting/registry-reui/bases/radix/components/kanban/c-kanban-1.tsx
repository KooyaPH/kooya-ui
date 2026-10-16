"use client"

import { ComponentProps, useState } from "react"
import { Badge } from "../../../../../../../adapters/structured.tsx"
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "../../reui/kanban.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import { Card, CardContent, CardHeader } from "../../../../../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

interface Task {
  id: string
  title: string
  priority: "low" | "medium" | "high"
  description?: string
  assignee?: string
  assigneeAvatar?: string
  dueDate?: string
}

const COLUMN_TITLES: Record<string, string> = {
  backlog: "Backlog",
  inProgress: "In Progress",
  done: "Done",
}

interface TaskCardProps extends Omit<
  ComponentProps<typeof KanbanItem>,
  "value" | "children"
> {
  task: Task
  asHandle?: boolean
  isOverlay?: boolean
}

function TaskCard({ task, asHandle, isOverlay, ...props }: TaskCardProps) {
  const cardContent = (
    <Card>
      <CardContent className="space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="line-clamp-1 text-sm font-medium">{task.title}</span>
          <Badge
            variant={
              task.priority === "high"
                ? "destructive-light"
                : task.priority === "medium"
                  ? "primary-light"
                  : "warning-light"
            }
            className="pointer-events-none h-5 shrink-0 rounded-sm px-1.5 text-xs capitalize"
          >
            {task.priority}
          </Badge>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          {task.assignee && (
            <div className="flex items-center gap-1">
              <Avatar className="size-4">
                <AvatarImage src={task.assigneeAvatar} />
                <AvatarFallback>{task.assignee.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="line-clamp-1">{task.assignee}</span>
            </div>
          )}
          {task.dueDate && (
            <time className="text-[10px] whitespace-nowrap tabular-nums">
              {task.dueDate}
            </time>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <KanbanItem value={task.id} {...props}>
      {asHandle && !isOverlay ? (
        <KanbanItemHandle>{cardContent}</KanbanItemHandle>
      ) : (
        cardContent
      )}
    </KanbanItem>
  )
}

interface TaskColumnProps extends Omit<
  ComponentProps<typeof KanbanColumn>,
  "children"
> {
  tasks: Task[]
  isOverlay?: boolean
}

function TaskColumn({ value, tasks, isOverlay, ...props }: TaskColumnProps) {
  return (
    <KanbanColumn value={value} {...props}>
      <Card className="mb-2.5">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold">
              {COLUMN_TITLES[value]}
            </span>
            <Badge variant="outline">{tasks.length}</Badge>
          </div>
          <KanbanColumnHandle asChild>
            <Button size="icon-xs" variant="ghost">
              <IconPlaceholder
                lucide="GripVerticalIcon"
                tabler="IconGripVertical"
                hugeicons="DragDropVerticalIcon"
                phosphor="DotsSixVerticalIcon"
                remixicon="RiDraggable"
              />
            </Button>
          </KanbanColumnHandle>
        </CardHeader>
        <CardContent>
          <KanbanColumnContent value={value} className="flex flex-col gap-2.5">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                asHandle={!isOverlay}
                isOverlay={isOverlay}
              />
            ))}
          </KanbanColumnContent>
        </CardContent>
      </Card>
    </KanbanColumn>
  )
}

export default function Pattern() {
  const [columns, setColumns] = useState<Record<string, Task[]>>({
    backlog: [
      {
        id: "1",
        title: "Add authentication",
        priority: "high",
        assignee: "Alex Johnson",
        assigneeAvatar:
          "/reui-assets/images/e93553df2422635515ee.jpg",
        dueDate: "Jan 10, 2025",
      },
      {
        id: "2",
        title: "Create API endpoints",
        priority: "medium",
        assignee: "Sarah Chen",
        assigneeAvatar:
          "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        dueDate: "Jan 15, 2025",
      },
      {
        id: "3",
        title: "Write documentation",
        priority: "low",
        assignee: "Michael Rodriguez",
        assigneeAvatar:
          "/reui-assets/images/4349381d8a8476edbc4c.jpg",
        dueDate: "Jan 20, 2025",
      },
    ],
    inProgress: [
      {
        id: "4",
        title: "Design system updates",
        priority: "high",
        assignee: "Emma Wilson",
        assigneeAvatar:
          "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        dueDate: "Aug 25, 2025",
      },
      {
        id: "5",
        title: "Implement dark mode",
        priority: "medium",
        assignee: "David Kim",
        assigneeAvatar:
          "/reui-assets/images/973d47055c51440af7dc.jpg",
        dueDate: "Aug 25, 2025",
      },
    ],
    done: [
      {
        id: "7",
        title: "Setup project",
        priority: "high",
        assignee: "Aron Thompson",
        assigneeAvatar:
          "/reui-assets/images/df73db9a2c25069a422d.jpg",
        dueDate: "Sep 25, 2025",
      },
      {
        id: "8",
        title: "Initial commit",
        priority: "low",
        assignee: "James Brown",
        assigneeAvatar:
          "/reui-assets/images/c75592a667f30cfd44b0.jpg",
        dueDate: "Sep 20, 2025",
      },
    ],
  })

  return (
    <Kanban
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
    >
      <KanbanBoard className="grid auto-rows-fr grid-cols-3">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
        ))}
      </KanbanBoard>
      <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
    </Kanban>
  )
}
