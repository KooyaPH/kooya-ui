"use client"

import { useMemo, useState } from "react"
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "../../reui/data-grid/data-grid.tsx"
import { DataGridPagination } from "../../reui/data-grid/data-grid-pagination.tsx"
import { DataGridScrollArea } from "../../reui/data-grid/data-grid-scroll-area.tsx"
import { DataGridTable } from "../../reui/data-grid/data-grid-table.tsx"
import {
  ColumnDef,
  ColumnOrderState,
  PaginationState,
  SortingState,
  useTable,
} from "@tanstack/react-table"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Card } from "../../../../../../../adapters/layout.tsx"

interface IData {
  id: string
  name: string
  availability: "online" | "away" | "busy" | "offline"
  avatar: string
  status: "active" | "inactive"
  flag: string // Emoji flags
  email: string
  company: string
  role: string
  joined: string
  location: string
  balance: number
}

const users = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    initials: "AJ",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    initials: "SC",
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael@example.com",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    initials: "MR",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar:
      "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    initials: "EW",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@example.com",
    avatar:
      "/reui-assets/images/973d47055c51440af7dc.jpg",
    initials: "DK",
  },
  {
    id: "6",
    name: "Aron Thompson",
    email: "lisa@example.com",
    avatar:
      "/reui-assets/images/df73db9a2c25069a422d.jpg",
    initials: "LT",
  },
  {
    id: "7",
    name: "James Brown",
    email: "james@example.com",
    avatar:
      "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    initials: "JB",
  },
  {
    id: "8",
    name: "Maria Garcia",
    email: "maria@example.com",
    avatar:
      "/reui-assets/images/067c566cd567259bb9aa.jpg",
    initials: "MG",
  },
  {
    id: "9",
    name: "Nick Johnson",
    email: "nick@example.com",
    avatar:
      "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
    initials: "NJ",
  },
  {
    id: "10",
    name: "Liam Thompson",
    email: "liam@example.com",
    avatar:
      "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
    initials: "LT",
  },
]

const demoData: IData[] = users.map((user, index) => ({
  ...user,
  availability: (["online", "away", "busy", "offline"] as const)[index % 4],
  status: (index % 2 === 0 ? "active" : "inactive") as "active" | "inactive",
  flag: (["us", "gb", "ca", "au", "de", "my", "es", "jp", "fr", "it"] as const)[
    index % 10
  ],
  company: (
    [
      "Apple",
      "OpenAI",
      "Meta",
      "Tesla",
      "SAP",
      "Keenthemes",
      "BBVA",
      "Sony",
      "LVMH",
      "ENI",
    ] as const
  )[index % 10],
  role: (
    [
      "CEO",
      "CTO",
      "Designer",
      "Developer",
      "Lawyer",
      "Director",
      "Product Manager",
      "Marketing Lead",
      "Data Scientist",
      "Engineer",
    ] as const
  )[index % 10],
  joined: "Jan, 2024",
  location: (
    [
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "Germany",
      "Malaysia",
      "Spain",
      "Japan",
      "France",
      "Italy",
    ] as const
  )[index % 10],
  balance: 5143.03 + index * 100,
}))

export default function Pattern() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ])
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])

  const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: "Name",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage
                  src={row.original.avatar}
                  alt={row.original.name}
                />
                <AvatarFallback>
                  {row.original.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-px">
                <div className="text-foreground font-medium">
                  {row.original.name}
                </div>
                <div className="text-muted-foreground">
                  {row.original.email}
                </div>
              </div>
            </div>
          )
        },
        size: 250,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "company",
        header: "Company",
        cell: (info) => <span>{info.getValue() as string}</span>,
        size: 100,
        meta: {
          headerClassName: "",
        },
      },
      {
        accessorKey: "role",
        header: "Occupation",
        cell: (info) => <span>{info.getValue() as string}</span>,
        size: 100,
        meta: {
          headerClassName: "",
        },
      },
      {
        accessorKey: "balance",
        header: "Salary",
        cell: (info) => (
          <span className="font-semibold">
            ${(info.getValue() as number).toFixed(2)}
          </span>
        ),
        size: 100,
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
    state: {
      pagination,
      sorting,
      columnOrder,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
  })

  return (
    <DataGrid
      table={table}
      recordCount={demoData?.length || 0}
      tableLayout={{
        cellBorder: true,
      }}
    >
      <div className="w-full space-y-2.5">
        <Card className="p-0">
          <DataGridContainer>
            <DataGridScrollArea>
              <DataGridTable />
            </DataGridScrollArea>
          </DataGridContainer>
        </Card>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}
