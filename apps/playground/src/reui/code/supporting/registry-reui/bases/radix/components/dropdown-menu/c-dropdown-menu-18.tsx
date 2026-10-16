"use client"

import type { ReactNode } from "react"

import { ClaudeAiIcon } from "../../../../../components/ui/svgs/claudeAiIcon.tsx"
import { Gemini } from "../../../../../components/ui/svgs/gemini.tsx"
import { Openai } from "../../../../../components/ui/svgs/openai.tsx"
import { OpenaiDark } from "../../../../../components/ui/svgs/openaiDark.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../../../../adapters/menus.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

interface MenuItem {
  id: string
  label: string
  logo: ReactNode
  logoDark?: ReactNode
}

const menuItems: Array<MenuItem> = [
  {
    id: "gpt4o",
    label: "GPT-5.4",
    logo: <Openai />,
    logoDark: <OpenaiDark />,
  },
  {
    id: "claude",
    label: "Claude 4.6 Opus",
    logo: <ClaudeAiIcon />,
  },
  { id: "gemini", label: "Gemini 3.1 Pro", logo: <Gemini /> },
]

export default function Pattern() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-36">
          Select model
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            className="ml-auto"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Model</DropdownMenuLabel>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.id}>
              {item.logoDark ? (
                <>
                  <span aria-hidden className="dark:hidden">
                    {item.logo}
                  </span>
                  <span aria-hidden className="hidden dark:block">
                    {item.logoDark}
                  </span>
                </>
              ) : (
                item.logo
              )}
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
