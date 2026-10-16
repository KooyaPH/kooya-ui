"use client"

import * as React from "react"

import { cn } from "cn"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../adapters/layout.tsx"
import { Button } from "../../../../../../../adapters/controls.tsx"
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "../../../../../registry/bases/radix/ui/combobox.tsx"
import { Field } from "../../../../../../../adapters/layout.tsx"
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../../../../../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../../../../../adapters/icons.tsx"

type NoLeadOption = {
  type: "none"
  value: "none"
  label: "No lead"
}

type TeamMember = {
  type: "member"
  id: string
  value: string
  label: string
  avatar: string
  initials: string
  isCurrentUser?: boolean
}

type LeadOption = NoLeadOption | TeamMember

const noLeadOption: NoLeadOption = {
  type: "none",
  value: "none",
  label: "No lead",
}

const teamMembers: TeamMember[] = [
  {
    type: "member",
    id: "member-1",
    value: "shuhrat-saipov",
    label: "Shuhrat Saipov",
    avatar:
      "/reui-assets/images/833451dbb99bcf927d1b.jpg",
    initials: "SS",
    isCurrentUser: true,
  },
  {
    type: "member",
    id: "member-2",
    value: "nadia-karimova",
    label: "Nadia Karimova",
    avatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    initials: "NK",
  },
  {
    type: "member",
    id: "member-3",
    value: "bekzod-rakhimov",
    label: "Bekzod Rakhimov",
    avatar:
      "/reui-assets/images/c6064767ae24420606fc.jpg",
    initials: "BR",
  },
  {
    type: "member",
    id: "member-4",
    value: "lina-bauer",
    label: "Lina Bauer",
    avatar:
      "/reui-assets/images/efb8484410f45934d56a.jpg",
    initials: "LB",
  },
  {
    type: "member",
    id: "member-5",
    value: "omar-haddad",
    label: "Omar Haddad",
    avatar:
      "/reui-assets/images/b2bda5d4122155a0381c.jpg",
    initials: "OH",
  },
  {
    type: "member",
    id: "member-6",
    value: "priya-nand",
    label: "Priya Nand",
    avatar:
      "/reui-assets/images/5785adb882eb815215aa.jpg",
    initials: "PN",
  },
  {
    type: "member",
    id: "member-7",
    value: "kenji-watan",
    label: "Kenji Watan",
    avatar:
      "/reui-assets/images/db62bd4fecdc9df2e323.jpg",
    initials: "KW",
  },
  {
    type: "member",
    id: "member-8",
    value: "ava-sinclair",
    label: "Ava Sinclair",
    avatar:
      "/reui-assets/images/7da2efac125ddc6e0086.jpg",
    initials: "AS",
  },
  {
    type: "member",
    id: "member-9",
    value: "nia-okafor",
    label: "Nia Okafor",
    avatar:
      "/reui-assets/images/ccbc5e77aa9f9a4b17a0.jpg",
    initials: "NO",
  },
  {
    type: "member",
    id: "member-10",
    value: "matteo-sosa",
    label: "Matteo Sosa",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    initials: "MS",
  },
  {
    type: "member",
    id: "member-11",
    value: "salma-rahman",
    label: "Salma Rahman",
    avatar:
      "/reui-assets/images/36d650ee9968995d8e0a.jpg",
    initials: "SR",
  },
  {
    type: "member",
    id: "member-12",
    value: "jonas-meyer",
    label: "Jonas Meyer",
    avatar:
      "/reui-assets/images/833451dbb99bcf927d1b.jpg",
    initials: "JM",
  },
]

const leadOptions: LeadOption[] = [noLeadOption, ...teamMembers]

function UserGlyph({ className }: { className?: string }) {
  return (
    <IconPlaceholder
      lucide="UserIcon"
      tabler="IconUser"
      hugeicons="UserIcon"
      phosphor="UserIcon"
      remixicon="RiUserLine"
      className={cn("size-4 shrink-0", className)}
    />
  )
}

function LeadTriggerLabel({ option }: { option: LeadOption }) {
  if (option.type === "none") {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <UserGlyph className="text-muted-foreground" />
        <span className="truncate">{option.label}</span>
      </span>
    )
  }

  return (
    <span className="flex min-w-0 items-center gap-2">
      <Avatar className="size-5">
        <AvatarImage src={option.avatar} alt={option.label} />
        <AvatarFallback className="text-[9px]">
          {option.initials}
        </AvatarFallback>
      </Avatar>
      <span className="truncate">{option.label}</span>
    </span>
  )
}

function LeadListRow({ option }: { option: LeadOption }) {
  if (option.type === "none") {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <UserGlyph className="text-muted-foreground" />
        <span className="truncate">{option.label}</span>
      </span>
    )
  }

  return (
    <Item size="xs" className="p-0">
      <ItemMedia>
        <Avatar className="size-5">
          <AvatarImage src={option.avatar} alt={option.label} />
          <AvatarFallback className="text-[9px]">
            {option.initials}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="gap-1 whitespace-nowrap">
          <span>{option.label}</span>
          {option.isCurrentUser ? (
            <span className="text-muted-foreground font-normal">(You)</span>
          ) : null}
        </ItemTitle>
      </ItemContent>
    </Item>
  )
}

export default function Pattern() {
  const [lead, setLead] = React.useState<LeadOption | null>(noLeadOption)

  return (
    <Field className="max-w-xs">
      <Combobox
        items={leadOptions}
        value={lead}
        onValueChange={setLead}
        itemToStringValue={(item: LeadOption) => item.label}
        autoHighlight
      >
        <ComboboxTrigger
          render={
            <Button
              type="button"
              variant="outline"
              className="w-full justify-between font-normal"
            />
          }
        >
          <ComboboxValue placeholder="No lead">
            {(selectedLead: LeadOption | null) =>
              selectedLead ? (
                <LeadTriggerLabel option={selectedLead} />
              ) : (
                <span className="text-muted-foreground">No lead</span>
              )
            }
          </ComboboxValue>
        </ComboboxTrigger>

        <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
          <ComboboxInput
            showTrigger={false}
            placeholder="Select lead"
            className="mb-1"
          />
          <ComboboxEmpty>No team members found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxItem value={noLeadOption}>
              <LeadListRow option={noLeadOption} />
            </ComboboxItem>

            <ComboboxGroup items={teamMembers}>
              <ComboboxLabel>Team members</ComboboxLabel>
              <ComboboxCollection>
                {(member: TeamMember) => (
                  <ComboboxItem key={member.id} value={member}>
                    <LeadListRow option={member} />
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
