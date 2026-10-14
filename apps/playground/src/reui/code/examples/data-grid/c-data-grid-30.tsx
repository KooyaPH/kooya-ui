// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useEffect, useMemo, useState } from "react"
import { Badge } from "../../../adapters/structured.tsx"
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid.tsx"
import { DataGridColumnHeader } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-column-header.tsx"
import { DataGridPagination } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-pagination.tsx"
import { DataGridScrollArea } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-scroll-area.tsx"
import {
  DataGridTable,
  DataGridTableRowExpand,
} from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-table.tsx"
import {
  ColumnDef,
  ExpandedState,
  PaginationState,
  SortingState,
  useTable,
} from "@tanstack/react-table"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Card } from "../../../adapters/layout.tsx"

interface IData {
  id: string
  name: string
  type: "department" | "team" | "member"
  status: "active" | "inactive"
  role?: string
  avatar?: string
  flag?: string
  location?: string
  children?: IData[]
}

const demoData: IData[] = [
  {
    id: "eng",
    name: "Engineering",
    type: "department",
    status: "active",
    children: [
      {
        id: "eng-platform",
        name: "Platform",
        type: "team",
        status: "active",
        children: [
          {
            id: "eng-platform-1",
            name: "Alex Johnson",
            type: "member",
            status: "active",
            role: "Staff Engineer",
            avatar:
              "/reui-assets/images/e93553df2422635515ee.jpg",
            flag: "us",
            location: "United States",
          },
          {
            id: "eng-platform-2",
            name: "Sarah Chen",
            type: "member",
            status: "active",
            role: "Senior Engineer",
            avatar:
              "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
            flag: "gb",
            location: "United Kingdom",
          },
          {
            id: "eng-platform-3",
            name: "Michael Rodriguez",
            type: "member",
            status: "inactive",
            role: "Frontend Engineer",
            avatar:
              "/reui-assets/images/4349381d8a8476edbc4c.jpg",
            flag: "ca",
            location: "Canada",
          },
        ],
      },
      {
        id: "eng-mobile",
        name: "Mobile",
        type: "team",
        status: "active",
        children: [
          {
            id: "eng-mobile-1",
            name: "Emma Wilson",
            type: "member",
            status: "active",
            role: "iOS Engineer",
            avatar:
              "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
            flag: "au",
            location: "Australia",
          },
          {
            id: "eng-mobile-2",
            name: "David Kim",
            type: "member",
            status: "active",
            role: "Android Engineer",
            avatar:
              "/reui-assets/images/973d47055c51440af7dc.jpg",
            flag: "de",
            location: "Germany",
          },
        ],
      },
    ],
  },
  {
    id: "design",
    name: "Design",
    type: "department",
    status: "active",
    children: [
      {
        id: "design-product",
        name: "Product Design",
        type: "team",
        status: "active",
        children: [
          {
            id: "design-product-1",
            name: "Aron Thompson",
            type: "member",
            status: "active",
            role: "Design Lead",
            avatar:
              "/reui-assets/images/df73db9a2c25069a422d.jpg",
            flag: "my",
            location: "Malaysia",
          },
          {
            id: "design-product-2",
            name: "Maria Garcia",
            type: "member",
            status: "active",
            role: "Product Designer",
            avatar:
              "/reui-assets/images/067c566cd567259bb9aa.jpg",
            flag: "jp",
            location: "Japan",
          },
          {
            id: "design-product-3",
            name: "James Brown",
            type: "member",
            status: "inactive",
            role: "UX Researcher",
            avatar:
              "/reui-assets/images/c75592a667f30cfd44b0.jpg",
            flag: "es",
            location: "Spain",
          },
        ],
      },
      {
        id: "design-brand",
        name: "Brand",
        type: "team",
        status: "active",
        children: [
          {
            id: "design-brand-1",
            name: "Nick Johnson",
            type: "member",
            status: "active",
            role: "Brand Designer",
            avatar:
              "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
            flag: "fr",
            location: "France",
          },
          {
            id: "design-brand-2",
            name: "Liam Thompson",
            type: "member",
            status: "inactive",
            role: "Motion Designer",
            avatar:
              "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
            flag: "it",
            location: "Italy",
          },
        ],
      },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    type: "department",
    status: "active",
    children: [
      {
        id: "marketing-growth",
        name: "Growth",
        type: "team",
        status: "active",
        children: [
          {
            id: "marketing-growth-1",
            name: "Olivia Martin",
            type: "member",
            status: "active",
            role: "Growth Lead",
            avatar:
              "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
            flag: "us",
            location: "United States",
          },
          {
            id: "marketing-growth-2",
            name: "Ethan Clark",
            type: "member",
            status: "active",
            role: "Performance Marketer",
            avatar:
              "/reui-assets/images/e93553df2422635515ee.jpg",
            flag: "ca",
            location: "Canada",
          },
        ],
      },
      {
        id: "marketing-content",
        name: "Content",
        type: "team",
        status: "active",
        children: [
          {
            id: "marketing-content-1",
            name: "Sofia Rossi",
            type: "member",
            status: "active",
            role: "Content Lead",
            avatar:
              "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
            flag: "it",
            location: "Italy",
          },
          {
            id: "marketing-content-2",
            name: "Lucas Meyer",
            type: "member",
            status: "inactive",
            role: "Copywriter",
            avatar:
              "/reui-assets/images/4349381d8a8476edbc4c.jpg",
            flag: "de",
            location: "Germany",
          },
        ],
      },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    type: "department",
    status: "active",
    children: [
      {
        id: "operations-finance",
        name: "Finance",
        type: "team",
        status: "active",
        children: [
          {
            id: "operations-finance-1",
            name: "Grace Lee",
            type: "member",
            status: "active",
            role: "Finance Lead",
            avatar:
              "/reui-assets/images/067c566cd567259bb9aa.jpg",
            flag: "kr",
            location: "South Korea",
          },
          {
            id: "operations-finance-2",
            name: "Daniel Novak",
            type: "member",
            status: "active",
            role: "Accountant",
            avatar:
              "/reui-assets/images/973d47055c51440af7dc.jpg",
            flag: "cz",
            location: "Czechia",
          },
        ],
      },
      {
        id: "operations-people",
        name: "People",
        type: "team",
        status: "active",
        children: [
          {
            id: "operations-people-1",
            name: "Chloe Dubois",
            type: "member",
            status: "active",
            role: "People Lead",
            avatar:
              "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
            flag: "fr",
            location: "France",
          },
          {
            id: "operations-people-2",
            name: "Ryan Walsh",
            type: "member",
            status: "active",
            role: "Recruiter",
            avatar:
              "/reui-assets/images/df73db9a2c25069a422d.jpg",
            flag: "ie",
            location: "Ireland",
          },
        ],
      },
    ],
  },
  {
    id: "sales",
    name: "Sales",
    type: "department",
    status: "active",
    children: [
      {
        id: "sales-accounts",
        name: "Accounts",
        type: "team",
        status: "active",
        children: [
          {
            id: "sales-accounts-1",
            name: "Mia Park",
            type: "member",
            status: "active",
            role: "Account Executive",
            avatar:
              "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
            flag: "kr",
            location: "South Korea",
          },
          {
            id: "sales-accounts-2",
            name: "Noah Fischer",
            type: "member",
            status: "inactive",
            role: "Account Manager",
            avatar:
              "/reui-assets/images/c75592a667f30cfd44b0.jpg",
            flag: "at",
            location: "Austria",
          },
        ],
      },
    ],
  },
]

// Collapsed rows are unmounted, so their images would load only when a
// branch is first expanded and pop in after the fallback renders. Warming
// them once at mount keeps expansion flicker-free.
function collectImageUrls(rows: IData[]): string[] {
  return rows.flatMap((row) => [
    ...(row.avatar ? [row.avatar] : []),
    ...(row.flag ? [`https://flagcdn.com/${row.flag.toLowerCase()}.svg`] : []),
    ...(row.children ? collectImageUrls(row.children) : []),
  ])
}

export default function Pattern() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({
    eng: true,
    "eng-platform": true,
  })

  useEffect(() => {
    for (const src of collectImageUrls(demoData)) {
      const image = new Image()
      image.src = src
    }
  }, [])

  const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataGridColumnHeader title="Name" column={column} />
        ),
        cell: ({ row }) => {
          const item = row.original

          return (
            <div className="flex items-center gap-1">
              <DataGridTableRowExpand row={row} className="-ms-1.5 -me-1" />
              {item.type === "member" ? (
                <>
                  <Avatar className="size-6 shrink-0">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <a
                    href="#"
                    className="text-foreground hover:text-primary font-medium"
                  >
                    {item.name}
                  </a>
                </>
              ) : (
                <span className="text-foreground font-medium">{item.name}</span>
              )}
            </div>
          )
        },
        minSize: 260,
        enableSorting: true,
        enableHiding: false,
        meta: {
          autoSize: true,
        },
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <DataGridColumnHeader title="Role" column={column} />
        ),
        cell: ({ row }) => {
          const item = row.original

          return (
            <div className="text-muted-foreground">
              {item.role ??
                (item.type === "department" ? "Department" : "Team")}
            </div>
          )
        },
        size: 180,
      },
      {
        accessorKey: "location",
        header: ({ column }) => (
          <DataGridColumnHeader title="Location" column={column} />
        ),
        cell: ({ row }) => {
          const item = row.original

          if (!item.location || !item.flag) {
            return <span className="text-muted-foreground">-</span>
          }

          return (
            <div className="flex items-center gap-1.5">
              <img
                src={`https://flagcdn.com/${item.flag.toLowerCase()}.svg`}
                alt={item.flag}
                className="size-4 rounded-full object-cover"
              />
              <div className="text-foreground font-medium">{item.location}</div>
            </div>
          )
        },
        size: 180,
      },
      {
        accessorKey: "status",
        id: "status",
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => {
          if (row.original.status === "active") {
            return <Badge variant="success-outline">Active</Badge>
          }

          return <Badge variant="warning-outline">Inactive</Badge>
        },
        size: 130,
      },
    ],
    []
  )

  const table = useTable({
    features: dataGridFeatures,
    columns,
    data: demoData,
    pageCount: Math.ceil((demoData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => row.id,
    getSubRows: (row) => row.children,
    state: {
      pagination,
      sorting,
      expanded,
    },
    // Keep expanded children on the same page as their parent.
    paginateExpandedRows: false,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
  })

  return (
    <DataGrid
      table={table}
      recordCount={demoData?.length || 0}
      tableLayout={{
        columnsResizable: true,
        columnsMovable: true,
        columnsVisibility: true,
      }}
    >
      <div className="w-full space-y-2.5">
        <Card className="overflow-hidden p-0">
          <DataGridContainer>
            <DataGridScrollArea>
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>
        </Card>
        <DataGridPagination sizes={[4, 8, 16]} />
      </div>
    </DataGrid>
  )
}
