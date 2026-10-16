import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from "../../../../../../../adapters/structured.tsx"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"

const activities = [
  {
    id: 1,
    user: "Alex Johnson",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    action: "pushed 3 commits to",
    target: "main",
    date: "5 minutes ago",
  },
  {
    id: 2,
    user: "Sarah Chen",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    action: "opened pull request",
    target: "#284 — Add dark mode",
    date: "20 minutes ago",
  },
  {
    id: 3,
    user: "David Kim",
    avatar:
      "/reui-assets/images/973d47055c51440af7dc.jpg",
    action: "commented on",
    target: "Issue #142",
    date: "1 hour ago",
  },
  {
    id: 4,
    user: "Emma Wilson",
    avatar:
      "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    action: "deployed to",
    target: "production",
    date: "2 hours ago",
  },
  {
    id: 5,
    user: "Michael Rodriguez",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    action: "merged branch",
    target: "feat/notifications",
    date: "3 hours ago",
  },
]

export default function Pattern() {
  return (
    <div className="w-full max-w-md">
      <Timeline defaultValue={5}>
        {activities.map((activity) => (
          <TimelineItem
            key={activity.id}
            step={activity.id}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="bg-input! group-data-[orientation=vertical]/timeline:top-2 group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:h-[calc(100%-2.5rem)] group-data-[orientation=vertical]/timeline:translate-y-7" />
              <TimelineIndicator className="size-8 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8">
                <Avatar className="size-8">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback className="text-[10px]">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>{" "}
                <span className="font-medium">{activity.target}</span>
              </p>
              <TimelineDate className="mt-0.5 mb-0">
                {activity.date}
              </TimelineDate>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
