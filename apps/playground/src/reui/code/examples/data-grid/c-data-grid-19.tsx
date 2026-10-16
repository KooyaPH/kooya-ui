// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useMemo, useState } from "react"
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
import { DataGridTable } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-table.tsx"
import {
  ColumnDef,
  PaginationState,
  SortingState,
  useTable,
} from "@tanstack/react-table"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Button } from "../../../adapters/controls.tsx"
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

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

const demoData: IData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    availability: "online",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    status: "active",
    flag: "us",
    email: "alex@example.com",
    company: "Apple",
    role: "CEO",
    joined: "Jan, 2024",
    location: "United States",
    balance: 5143.03,
  },
  {
    id: "2",
    name: "Sarah Chen",
    availability: "away",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    status: "inactive",
    flag: "gb",
    email: "sarah@example.com",
    company: "OpenAI",
    role: "CTO",
    joined: "Mar, 2023",
    location: "United Kingdom",
    balance: 4321.87,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    availability: "busy",
    avatar:
      "/reui-assets/images/4349381d8a8476edbc4c.jpg",
    status: "active",
    flag: "ca",
    email: "michael@example.com",
    company: "Meta",
    role: "Designer",
    joined: "Jun, 2022",
    location: "Canada",
    balance: 7654.98,
  },
  {
    id: "4",
    name: "Emma Wilson",
    availability: "offline",
    avatar:
      "/reui-assets/images/046af0b7d159f9f4fd2b.jpg",
    status: "inactive",
    flag: "au",
    email: "emma@example.com",
    company: "Tesla",
    role: "Developer",
    joined: "Sep, 2024",
    location: "Australia",
    balance: 3456.45,
  },
  {
    id: "5",
    name: "David Kim",
    availability: "online",
    avatar:
      "/reui-assets/images/973d47055c51440af7dc.jpg",
    status: "active",
    flag: "de",
    email: "david@example.com",
    company: "SAP",
    role: "Lawyer",
    joined: "Nov, 2023",
    location: "Germany",
    balance: 9876.54,
  },
  {
    id: "6",
    name: "Aron Thompson",
    availability: "away",
    avatar:
      "/reui-assets/images/df73db9a2c25069a422d.jpg",
    status: "active",
    flag: "my",
    email: "lisa@example.com",
    company: "Keenthemes",
    role: "Director",
    joined: "Feb, 2022",
    location: "Malaysia",
    balance: 6214.22,
  },
  {
    id: "7",
    name: "James Brown",
    availability: "busy",
    avatar:
      "/reui-assets/images/c75592a667f30cfd44b0.jpg",
    status: "inactive",
    flag: "es",
    email: "james@example.com",
    company: "BBVA",
    role: "Product Manager",
    joined: "Aug, 2024",
    location: "Spain",
    balance: 5321.77,
  },
  {
    id: "8",
    name: "Maria Garcia",
    availability: "offline",
    avatar:
      "/reui-assets/images/067c566cd567259bb9aa.jpg",
    status: "active",
    flag: "jp",
    email: "maria@example.com",
    company: "Sony",
    role: "Marketing Lead",
    joined: "Dec, 2023",
    location: "Japan",
    balance: 8452.39,
  },
  {
    id: "9",
    name: "Nick Johnson",
    availability: "online",
    avatar:
      "/reui-assets/images/f1d4253436738aaf8fdf.jpg",
    status: "active",
    flag: "fr",
    email: "nick@example.com",
    company: "LVMH",
    role: "Data Scientist",
    joined: "Apr, 2022",
    location: "France",
    balance: 7345.1,
  },
  {
    id: "10",
    name: "Liam Thompson",
    availability: "away",
    avatar:
      "/reui-assets/images/a3afee2f77d259ce6a59.jpg",
    status: "inactive",
    flag: "it",
    email: "liam@example.com",
    company: "ENI",
    role: "Engineer",
    joined: "Jul, 2024",
    location: "Italy",
    balance: 5214.88,
  },
  {
    id: "11",
    name: "Alex Johnson",
    availability: "busy",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    status: "active",
    flag: "br",
    email: "alex@example.com",
    company: "Vale",
    role: "Software Engineer",
    joined: "May, 2023",
    location: "Brazil",
    balance: 9421.5,
  },
  {
    id: "12",
    name: "Sarah Chen",
    availability: "offline",
    avatar:
      "/reui-assets/images/dfed3098ae0011e5a5a3.jpg",
    status: "active",
    flag: "in",
    email: "sarah@example.com",
    company: "Tata",
    role: "Sales Manager",
    joined: "Oct, 2024",
    location: "India",
    balance: 4521.67,
  },
]

export default function Pattern() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: true },
  ])

  const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
    () => [
      {
        accessorKey: "name",
        id: "name",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="User"
            visibility={true}
            column={column}
          />
        ),
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
        minSize: 200,
        meta: {
          autoSize: true,
        },
        enableSorting: true,
        enableHiding: false,
        enableResizing: true,
      },
      {
        accessorKey: "location",
        id: "location",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Location"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1.5">
              <img
                src={`https://flagcdn.com/${row.original.flag.toLowerCase()}.svg`}
                alt={row.original.flag}
                className="size-4 rounded-full object-cover"
              />
              <div className="text-foreground font-medium">
                {row.original.location}
              </div>
            </div>
          )
        },
        size: 200,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
      },
      {
        accessorKey: "status",
        id: "status",
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Status"
            visibility={true}
            column={column}
          />
        ),
        cell: ({ row }) => {
          const status = row.original.status

          if (status == "active") {
            return <Badge variant="primary-outline">Approved</Badge>
          } else {
            return <Badge variant="destructive-outline">Pending</Badge>
          }
        },
        size: 200,
        enableSorting: true,
        enableHiding: true,
        enableResizing: false,
      },
    ],
    []
  )

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string)
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
      tableClassNames={{
        edgeCell: "px-5",
      }}
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsMovable: true,
        columnsVisibility: true,
      }}
    >
      <Card className="w-full gap-3 py-3.5">
        <CardHeader className="flex items-center justify-between px-3.5">
          <CardTitle>Users</CardTitle>
          <CardAction>
            <Button size="sm">
              <IconPlaceholder
                lucide="UserPlusIcon"
                tabler="IconUserPlus"
                hugeicons="UserAdd01Icon"
                phosphor="UserPlusIcon"
                remixicon="RiUserAddLine"
                aria-hidden="true"
              />
              Add User
            </Button>
          </CardAction>
        </CardHeader>
        <DataGridContainer className="border-y">
          <DataGridScrollArea>
            <DataGridTable />
          </DataGridScrollArea>
        </DataGridContainer>
        <CardFooter className="border-none bg-transparent! px-3.5 py-0">
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  )
}
