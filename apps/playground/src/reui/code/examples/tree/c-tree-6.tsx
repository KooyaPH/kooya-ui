// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import {
  Tree,
  TreeItem,
  TreeItemLabel,
} from "../../supporting/registry-reui/bases/radix/reui/tree.tsx"
import { hotkeysCoreFeature, syncDataLoaderFeature } from "@headless-tree/core"
import { useTree } from "@headless-tree/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"

interface OrgItem {
  name: string
  role?: string
  avatar?: string
  children?: string[]
}

const items: Record<string, OrgItem> = {
  company: { name: "Acme Inc.", children: ["ceo"] },
  ceo: {
    name: "Sarah Chen",
    role: "CEO",
    avatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    children: ["cto", "coo", "cfo"],
  },
  cto: {
    name: "Alex Johnson",
    role: "CTO",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    children: ["eng-lead", "design-lead"],
  },
  coo: {
    name: "Emma Wilson",
    role: "COO",
    avatar:
      "/reui-assets/images/dbc92c73c5f6acf7373d.jpg",
    children: ["ops-mgr", "hr-mgr"],
  },
  cfo: {
    name: "David Kim",
    role: "CFO",
    avatar:
      "/reui-assets/images/2bc0a75442d5cf52e4cb.jpg",
    children: ["finance-mgr"],
  },
  "eng-lead": {
    name: "Michael Rodriguez",
    role: "Engineering Lead",
    avatar:
      "/reui-assets/images/823cc7e47d4e7e6cb0b4.jpg",
    children: ["dev-1", "dev-2"],
  },
  "design-lead": {
    name: "Lisa Park",
    role: "Design Lead",
    avatar:
      "/reui-assets/images/240c6b87e9fc32d07637.jpg",
  },
  "ops-mgr": {
    name: "James Brown",
    role: "Operations Manager",
    avatar:
      "/reui-assets/images/833451dbb99bcf927d1b.jpg",
  },
  "hr-mgr": {
    name: "Amy Taylor",
    role: "HR Manager",
    avatar:
      "/reui-assets/images/1d09296b721df419b995.jpg",
  },
  "finance-mgr": {
    name: "Robert Davis",
    role: "Finance Manager",
    avatar:
      "/reui-assets/images/99f5b111c8dfb9bdaae5.jpg",
  },
  "dev-1": {
    name: "Tom Harris",
    role: "Senior Developer",
    avatar:
      "/reui-assets/images/c6064767ae24420606fc.jpg",
  },
  "dev-2": {
    name: "Nina Patel",
    role: "Developer",
    avatar:
      "/reui-assets/images/7da2efac125ddc6e0086.jpg",
  },
}

const indent = 24

export default function Pattern() {
  const tree = useTree<OrgItem>({
    initialState: {
      expandedItems: ["ceo", "cto"],
    },
    indent,
    rootItemId: "company",
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId].children ?? [],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
  })

  return (
    <div className="mx-auto w-full grow place-self-start lg:w-xs">
      <Tree indent={indent} tree={tree}>
        {tree.getItems().map((item) => {
          const data = item.getItemData()
          const initials = data.name
            .split(" ")
            .map((n) => n[0])
            .join("")

          return (
            <TreeItem key={item.getId()} item={item}>
              <TreeItemLabel className="gap-2 py-1">
                <Avatar className="size-6 shrink-0">
                  <AvatarImage src={data.avatar} alt={data.name} />
                  <AvatarFallback className="text-[9px]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="flex flex-col items-start">
                  <span className="text-sm leading-tight">{data.name}</span>
                  {data.role && (
                    <span className="text-muted-foreground text-[10px] leading-tight">
                      {data.role}
                    </span>
                  )}
                </span>
              </TreeItemLabel>
            </TreeItem>
          )
        })}
      </Tree>
    </div>
  )
}
