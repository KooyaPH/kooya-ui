import { createContext, useContext, useState, type ReactNode } from "react";
export type ContentRecord = {
  key: string;
  title: string;
  type: string;
  status: string;
  owner: string;
  updated: string;
  body: string;
};
export type TaskRecord = {
  key: string;
  title: string;
  status: string;
  priority: string;
  owner: string;
};
export type Person = {
  key: string;
  name: string;
  email: string;
  role: string;
  team: string;
  status: string;
};
export const initialContent: ContentRecord[] = [
  {
    key: "01",
    title: "A better way to work together",
    type: "Landing page",
    status: "Published",
    owner: "Alex Morgan",
    updated: "Today",
    body: "Good work starts with a clear direction. Bring your people, projects, and ideas into one considered workspace.",
  },
  {
    key: "02",
    title: "Introducing the autumn collection",
    type: "Article",
    status: "In review",
    owner: "Jamie Chen",
    updated: "Today",
    body: "A collection of small improvements that make a meaningful difference to the working day.",
  },
  {
    key: "03",
    title: "The Northstar customer story",
    type: "Case study",
    status: "Draft",
    owner: "Sam Rivera",
    updated: "Yesterday",
    body: "How one team found a calmer, more connected way of working.",
  },
  {
    key: "04",
    title: "Meet the people behind Kooya",
    type: "Company page",
    status: "Published",
    owner: "Alex Morgan",
    updated: "Oct 12",
    body: "A shared curiosity. A practical approach. A team that cares about the details.",
  },
  {
    key: "05",
    title: "Getting started with your workspace",
    type: "Guide",
    status: "Published",
    owner: "Taylor Park",
    updated: "Oct 11",
    body: "Make yourself at home. Set up your team, create your first project, and find your rhythm.",
  },
  {
    key: "06",
    title: "Your questions, answered",
    type: "Help page",
    status: "Draft",
    owner: "Jamie Chen",
    updated: "Oct 10",
    body: "Useful answers to the questions that come up along the way.",
  },
  {
    key: "07",
    title: "Security and trust",
    type: "Company page",
    status: "In review",
    owner: "Sam Rivera",
    updated: "Oct 9",
    body: "Trust is built through clear commitments and thoughtful decisions.",
  },
];
export const initialTasks: TaskRecord[] = [
  {
    key: "KOO-142",
    title: "Review the autumn campaign",
    status: "In progress",
    priority: "High",
    owner: "Jamie Chen",
  },
  {
    key: "KOO-143",
    title: "Publish the customer story",
    status: "To do",
    priority: "Medium",
    owner: "Sam Rivera",
  },
  {
    key: "KOO-144",
    title: "Refresh workspace guidelines",
    status: "Done",
    priority: "Low",
    owner: "Alex Morgan",
  },
  {
    key: "KOO-145",
    title: "Prepare the content calendar",
    status: "In progress",
    priority: "Medium",
    owner: "Taylor Park",
  },
  {
    key: "KOO-146",
    title: "Check accessibility of new pages",
    status: "To do",
    priority: "High",
    owner: "Jamie Chen",
  },
];
export const initialPeople: Person[] = [
  {
    key: "1",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "Administrator",
    team: "Operations",
    status: "Active",
  },
  {
    key: "2",
    name: "Jamie Chen",
    email: "jamie@example.com",
    role: "Editor",
    team: "Marketing",
    status: "Active",
  },
  {
    key: "3",
    name: "Sam Rivera",
    email: "sam@example.com",
    role: "Editor",
    team: "Content",
    status: "Active",
  },
  {
    key: "4",
    name: "Taylor Park",
    email: "taylor@example.com",
    role: "Member",
    team: "Design",
    status: "Active",
  },
];
function useData() {
  const [content, setContent] = useState(initialContent);
  const [contentFilter, setContentFilter] = useState("All content");
  const [tasks, setTasks] = useState(initialTasks);
  const [people, setPeople] = useState(initialPeople);
  const [settings, setSettings] = useState({
    name: "Northstar Studio",
    website: "northstar.example",
    notifications: true,
    weekly: true,
  });
  return {
    content,
    setContent,
    contentFilter,
    setContentFilter,
    tasks,
    setTasks,
    people,
    setPeople,
    settings,
    setSettings,
    reset() {
      setContent(initialContent);
      setContentFilter("All content");
      setTasks(initialTasks);
      setPeople(initialPeople);
      setSettings({
        name: "Northstar Studio",
        website: "northstar.example",
        notifications: true,
        weekly: true,
      });
    },
  };
}
const Context = createContext<ReturnType<typeof useData> | null>(null);
export function DemoState({ children }: { children: ReactNode }) {
  const data = useData();
  return <Context.Provider value={data}>{children}</Context.Provider>;
}
export function useDemo() {
  const data = useContext(Context);
  if (!data) throw new Error("DemoState is required");
  return data;
}
