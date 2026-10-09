import type { Composition } from "@kooyaph/ui";
export interface Account {
  id: string;
  name: string;
  owner: string;
  status: string;
  value: string;
  type: string;
}
export const initialAccounts: Account[] = [
  {
    id: "northstar",
    name: "Northstar Health",
    owner: "Maya Chen",
    status: "Active",
    value: "$48,200",
    type: "Customer",
  },
  {
    id: "meridian",
    name: "Meridian Labs",
    owner: "Jordan Lee",
    status: "Qualified",
    value: "$22,800",
    type: "Prospect",
  },
  {
    id: "clearline",
    name: "Clearline Studio",
    owner: "Ari Morgan",
    status: "Onboarding",
    value: "$9,600",
    type: "Partner",
  },
  {
    id: "atlas",
    name: "Atlas Research",
    owner: "Maya Chen",
    status: "Qualified",
    value: "$14,200",
    type: "Prospect",
  },
  {
    id: "harbor",
    name: "Harbor Creative",
    owner: "Jordan Lee",
    status: "Active",
    value: "$18,400",
    type: "Customer",
  },
  {
    id: "willow",
    name: "Willow Group",
    owner: "Ari Morgan",
    status: "Onboarding",
    value: "$12,600",
    type: "Partner",
  },
];
export interface ContentPage {
  id: string;
  title: string;
  type: string;
  status: string;
  updated: string;
}
export const initialPages: ContentPage[] = [
  {
    id: "launch",
    title: "Acme product launch",
    type: "Product page",
    status: "Published",
    updated: "Today, 10:42 AM",
  },
  {
    id: "story",
    title: "Northstar customer story",
    type: "Case study",
    status: "Draft",
    updated: "Yesterday",
  },
  {
    id: "contact",
    title: "Contact our team",
    type: "Landing page",
    status: "In review",
    updated: "Oct 4, 2026",
  },
  {
    id: "about",
    title: "A little about Acme",
    type: "Business page",
    status: "Published",
    updated: "Oct 3, 2026",
  },
  {
    id: "ideas",
    title: "Better conversations, by design",
    type: "Resource",
    status: "Draft",
    updated: "Oct 2, 2026",
  },
  {
    id: "services",
    title: "Our services",
    type: "Business page",
    status: "Published",
    updated: "Oct 1, 2026",
  },
];
export type Route =
  | "atomic"
  | "crm"
  | "pages"
  | "components"
  | "templates"
  | "settings"
  | "usage"
  | "foundations"
  | "navigation"
  | "data"
  | "forms"
  | "overlays"
  | "library-templates";
export const routes: Record<
  Route,
  { title: string; area: string; section: string }
> = {
  atomic: { title: "Atomic catalog", area: "library", section: "atomic" },
  crm: { title: "CRM & accounts", area: "console", section: "admin" },
  pages: { title: "Pages", area: "business", section: "pages" },
  components: { title: "Components", area: "business", section: "components" },
  templates: { title: "Templates", area: "business", section: "templates" },
  settings: { title: "Settings", area: "console", section: "settings" },
  usage: { title: "Usage overview", area: "client", section: "usage" },
  "library-templates": {
    title: "Templates",
    area: "library",
    section: "templates",
  },
  foundations: {
    title: "Foundations",
    area: "library",
    section: "foundations",
  },
  navigation: { title: "Navigation", area: "library", section: "navigation" },
  data: { title: "Data", area: "library", section: "data" },
  forms: { title: "Forms", area: "library", section: "forms" },
  overlays: { title: "Overlays", area: "library", section: "overlays" },
};
export const compositions: { id: Composition; name: string }[] = [
  { id: "mosaic", name: "Mosaic · Bento" },
  { id: "orbit", name: "Orbit · Dock" },
  { id: "canvas", name: "Canvas · Studio" },
  { id: "flow", name: "Flow · Board" },
];
export const templates: {
  title: string;
  description: string;
  composition: Composition;
  route: Route;
  category: string;
}[] = [
  {
    title: "Mosaic workspace",
    description:
      "Floating navigation tiles, varied summaries, and an account table.",
    composition: "mosaic",
    route: "crm",
    category: "Console / CRM",
  },
  {
    title: "Orbit workspace",
    description: "A dark app dock with a wide operations canvas.",
    composition: "orbit",
    route: "crm",
    category: "Console / Operations",
  },
  {
    title: "Canvas studio",
    description: "Content cards and a public page side by side.",
    composition: "canvas",
    route: "pages",
    category: "Business / CMS",
  },
  {
    title: "Flow workspace",
    description: "A compact app stack with relationship stages.",
    composition: "flow",
    route: "crm",
    category: "Console / Pipeline",
  },
  {
    title: "Control room",
    description:
      "Branding, publishing, and notification settings in one canvas.",
    composition: "mosaic",
    route: "settings",
    category: "Console / Settings",
  },
  {
    title: "Client home",
    description: "An activity chart, allowances, and a friendly plan summary.",
    composition: "mosaic",
    route: "usage",
    category: "Client / Dashboard",
  },
];

export interface WorkspaceSettings {
  name: string;
  language: string;
  publicWebsite: string;
  publishing: boolean;
  notifications: boolean;
}
export const initialSettings: WorkspaceSettings = {
  name: "Northstar Studio",
  language: "English",
  publicWebsite: "northstar.example",
  publishing: false,
  notifications: true,
};
