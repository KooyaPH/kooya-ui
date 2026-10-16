// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { ComponentProps, useState } from "react"
import { Badge } from "../adapters/structured"
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "../code/supporting/registry-reui/bases/radix/reui/frame"
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
  type KanbanMoveEvent,
} from "../code/supporting/registry-reui/bases/radix/reui/kanban"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../adapters/layout"
import { Progress } from "../adapters/controls"

interface Task {
  id: string
  title: string
  assignee: string
  assigneeAvatar: string
  progress: number
}

function TaskCard({
  task,
  asHandle,
  ...props
}: { task: Task; asHandle?: boolean } & Omit<
  ComponentProps<typeof KanbanItem>,
  "value" | "children"
>) {
  const content = (
    <Frame variant="ghost" spacing="xs" className="p-0">
      <FramePanel className="space-y-3 p-3">
        <p className="text-sm font-medium" style={{ overflowWrap: "anywhere" }}>{task.title}</p>
        <Progress value={task.progress} className="h-1" />
        <div className="flex items-center justify-between" style={{ flexWrap: "wrap", gap: 8, minWidth: 0 }}>
          <div className="flex items-center gap-1.5" style={{ minWidth: 0 }}>
            <Avatar className="size-5" style={{ flexShrink: 0 }}>
              <AvatarImage src={task.assigneeAvatar} alt={task.assignee} />
              <AvatarFallback className="text-[9px]">
                {task.assignee.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground text-xs" style={{ minWidth: 0, overflowWrap: "anywhere" }}>
              {task.assignee}
            </span>
          </div>
          <span className="text-muted-foreground text-xs">
            {task.progress}%
          </span>
        </div>
      </FramePanel>
    </Frame>
  )

  return (
    <KanbanItem value={task.id} {...props}>
      {asHandle ? <KanbanItemHandle>{content}</KanbanItemHandle> : content}
    </KanbanItem>
  )
}

export default function Pattern() {
  const [columns, setColumns] = useState<Record<string, Task[]>>({
    planning: [
      {
        id: "1",
        title: "Research competitors",
        assignee: "Alex J.",
        assigneeAvatar:
          "/reui-assets/images/e93553df2422635515ee.jpg",
        progress: 20,
      },
    ],
    active: [
      {
        id: "2",
        title: "Build dashboard",
        assignee: "Sarah C.",
        assigneeAvatar:
          "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
        progress: 65,
      },
      {
        id: "3",
        title: "API integration",
        assignee: "David K.",
        assigneeAvatar:
          "/reui-assets/images/973d47055c51440af7dc.jpg",
        progress: 40,
      },
    ],
    completed: [
      {
        id: "4",
        title: "Setup repository",
        assignee: "Emma W.",
        assigneeAvatar:
          "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
        progress: 100,
      },
    ],
  })

  function moveTask({ event, activeContainer, overContainer, overIndex }: KanbanMoveEvent) {
    setColumns((previous) => {
      const source = previous[activeContainer]
      const target = previous[overContainer]
      if (!source || !target) return previous
      const activeIndex = source.findIndex((task) => task.id === String(event.active.id))
      if (activeIndex < 0) return previous
      if (activeContainer === overContainer && activeIndex === overIndex) return previous
      const remaining = [...source]
      const [task] = remaining.splice(activeIndex, 1)
      const destination = activeContainer === overContainer ? remaining : [...target]
      destination.splice(Math.max(0, Math.min(overIndex, destination.length)), 0, task)
      return { ...previous, [activeContainer]: remaining, [overContainer]: destination }
    })
  }

  return (
    <Kanban
      className="ku-kanban-4"
      style={{ width: "100%", minWidth: 0, containerType: "inline-size" }}
      value={columns}
      onValueChange={setColumns}
      onMove={moveTask}
      getItemValue={(item) => item.id}
    >
      <KanbanBoard className="grid auto-rows-fr grid-cols-3" style={{ width: "100%", minWidth: 0, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
        {Object.entries(columns).map(([columnId, tasks]) => (
          <KanbanColumn key={columnId} value={columnId} style={{ minWidth: 0 }}>
            <Frame stacked spacing="sm" className="h-full">
              <FrameHeader>
                <div className="flex items-center justify-between" style={{ flexWrap: "wrap", gap: 8, minWidth: 0 }}>
                  <FrameTitle className="capitalize">{columnId}</FrameTitle>
                  <Badge variant="outline" size="sm">
                    {tasks.length}
                  </Badge>
                </div>
                <FrameDescription>
                  {columnId === "planning" && "Tasks being scoped"}
                  {columnId === "active" && "Currently in development"}
                  {columnId === "completed" && "Finished and deployed"}
                </FrameDescription>
              </FrameHeader>
              <KanbanColumnContent
                value={columnId}
                style={{ minHeight: 44 }}
                className="flex flex-col gap-2 p-0.5"
              >
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} asHandle />
                ))}
              </KanbanColumnContent>
            </Frame>
          </KanbanColumn>
        ))}
      </KanbanBoard>
      <KanbanOverlay className="bg-muted/10 rounded-md border-2 border-dashed" />
    </Kanban>
  )
}
