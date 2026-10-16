// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import { useMemo, useState } from "react"
import {
  DataGrid,
  DataGridContainer,
  dataGridFeatures,
  type DataGridFeatures,
} from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid.tsx"
import { DataGridPagination } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-pagination.tsx"
import { DataGridScrollArea } from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-scroll-area.tsx"
import {
  DataGridTableDndRowHandle,
  DataGridTableDndRows,
} from "../../supporting/registry-reui/bases/radix/reui/data-grid/data-grid-table-dnd-rows.tsx"
import { DragEndEvent, Modifier, UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { ColumnDef, useTable } from "@tanstack/react-table"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../adapters/layout.tsx"

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

// Let the carried row follow the pointer sideways as well as up and down.
// The default restriction pins it to the column it came from, which puts the
// clone directly on top of the rows you are trying to read; drifting it a
// little to the side lifts it clear of them, so the drop indicator underneath
// stays visible and the seam you are aiming at is much easier to judge. The
// primitive still rails the vertical axis, so the row cannot leave the grid.
const FOLLOW_POINTER: Modifier[] = [({ transform }) => transform]

const demoData: IData[] = [
  {
    id: "1",
    name: "Alex Johnson",
    availability: "online",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    status: "active",
    flag: "us",
    email: "alex@apple.com",
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
    email: "sarah@openai.com",
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
    email: "michael@meta.com",
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
    email: "emma@tesla.com",
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
    email: "david@sap.com",
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
    email: "aron@keenthemes.com",
    company: "Keenthemes",
    role: "Director",
    joined: "Feb, 2022",
    location: "Malaysia",
    balance: 6214.22,
  },
]

export default function Pattern() {
  const columns = useMemo<ColumnDef<DataGridFeatures, IData>[]>(
    () => [
      {
        id: "drag",
        cell: () => <DataGridTableDndRowHandle />,
        size: 30,
      },
      {
        accessorKey: "name",
        id: "name",
        header: "Name",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
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
              <a
                href="#"
                className="text-foreground hover:text-primary font-medium"
              >
                {row.original.name}
              </a>
            </div>
          )
        },
        size: 170,
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "email",
        id: "email",
        header: "Email",
        cell: (info) => (
          <a
            href={`mailto:${info.getValue()}`}
            className="hover:text-primary text-truncate hover:underline"
          >
            {info.getValue() as string}
          </a>
        ),
        size: 150,
        meta: {
          headerClassName: "",
          cellClassName: "",
        },
      },
      {
        accessorKey: "location",
        id: "location",
        header: "Location",
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
        size: 170,
        meta: {
          headerClassName: "",
          cellClassName: "text-start",
        },
      },
    ],
    []
  )

  const [data, setData] = useState(demoData)

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id),
    [data]
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  const table = useTable({
    features: dataGridFeatures,
    // No pagination row model on v8, so every row rendered. The shared
    // bundle registers one, and manualPagination is v9's way to say the
    // data is already the page - it keeps the pagination APIs while
    // leaving the rows unsliced.
    manualPagination: true,
    columns,
    data,
    getRowId: (row: IData) => row.id,
  })

  return (
    <DataGrid
      table={table}
      recordCount={data?.length || 0}
      tableLayout={{ rowsDraggable: true }}
    >
      <div className="w-full space-y-2.5">
        <DataGridContainer>
          <DataGridScrollArea>
            <DataGridTableDndRows
              handleDragEnd={handleDragEnd}
              dataIds={dataIds}
              modifiers={FOLLOW_POINTER}
            />
          </DataGridScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  )
}
