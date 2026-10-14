// Adapted recipe. Keep supporting modules from the Kooya recipes bundle.
"use client"

import * as React from "react"

import { cn } from "cn"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../../../adapters/layout.tsx"
import { Button } from "../../../adapters/controls.tsx"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "../../supporting/registry/bases/radix/ui/combobox.tsx"
import { Field } from "../../../adapters/layout.tsx"
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "../../../adapters/layout.tsx"
import { IconPlaceholder } from "../../../adapters/icons.tsx"

type TeamMember = {
  id: string
  value: string
  label: string
  avatar?: string
  initials: string
  isCurrentUser?: boolean
}

type EmptyMembersOption = {
  id: "no-members"
  value: "none"
  label: string
  searchText: string
}

type MemberSelectionItem = EmptyMembersOption | TeamMember

const noMembersOption: EmptyMembersOption = {
  id: "no-members",
  value: "none",
  label: "No members",
  searchText: "No members clear members remove members empty",
}

const teamMembers: TeamMember[] = [
  {
    id: "member-1",
    value: "alex-morgan",
    label: "Alex Morgan",
    avatar:
      "/reui-assets/images/833451dbb99bcf927d1b.jpg",
    initials: "AM",
    isCurrentUser: true,
  },
  {
    id: "member-2",
    value: "emma-carter",
    label: "Emma Carter",
    avatar:
      "/reui-assets/images/c6e9e0d487c842b94fea.jpg",
    initials: "EC",
  },
  {
    id: "member-3",
    value: "ryan-mitchell",
    label: "Ryan Mitchell",
    initials: "RM",
  },
  {
    id: "member-4",
    value: "olivia-bennett",
    label: "Olivia Bennett",
    avatar:
      "/reui-assets/images/efb8484410f45934d56a.jpg",
    initials: "OB",
  },
  {
    id: "member-5",
    value: "ethan-brooks",
    label: "Ethan Brooks",
    avatar:
      "/reui-assets/images/b2bda5d4122155a0381c.jpg",
    initials: "EB",
  },
  {
    id: "member-6",
    value: "sophia-reed",
    label: "Sophia Reed",
    avatar:
      "/reui-assets/images/5785adb882eb815215aa.jpg",
    initials: "SR",
  },
  {
    id: "member-7",
    value: "lucas-hayes",
    label: "Lucas Hayes",
    avatar:
      "/reui-assets/images/db62bd4fecdc9df2e323.jpg",
    initials: "LH",
  },
  {
    id: "member-8",
    value: "ava-sinclair",
    label: "Ava Sinclair",
    initials: "AS",
  },
  {
    id: "member-9",
    value: "mia-parker",
    label: "Mia Parker",
    avatar:
      "/reui-assets/images/ccbc5e77aa9f9a4b17a0.jpg",
    initials: "MP",
  },
  {
    id: "member-10",
    value: "noah-foster",
    label: "Noah Foster",
    avatar:
      "/reui-assets/images/e93553df2422635515ee.jpg",
    initials: "NF",
  },
  {
    id: "member-11",
    value: "grace-collins",
    label: "Grace Collins",
    initials: "GC",
  },
  {
    id: "member-12",
    value: "jack-turner",
    label: "Jack Turner",
    avatar:
      "/reui-assets/images/833451dbb99bcf927d1b.jpg",
    initials: "JT",
  },
]

const memberSelectionOptions: MemberSelectionItem[] = [
  noMembersOption,
  ...teamMembers,
]

function isNoMembersOption(
  item: MemberSelectionItem
): item is EmptyMembersOption {
  return item.id === noMembersOption.id
}

function isMemberSelectionItemEqual(
  item: MemberSelectionItem,
  value: MemberSelectionItem
) {
  return item.id === value.id
}

function UsersGlyph({ className }: { className?: string }) {
  return (
    <IconPlaceholder
      lucide="UsersIcon"
      tabler="IconUsers"
      hugeicons="UserMultiple02Icon"
      phosphor="UsersIcon"
      remixicon="RiGroupLine"
      className={cn("size-4 shrink-0", className)}
    />
  )
}

function MemberAvatar({
  member,
  className,
  fallbackClassName,
}: {
  member: TeamMember
  className?: string
  fallbackClassName?: string
}) {
  return (
    <Avatar className={className}>
      {member.avatar ? (
        <AvatarImage src={member.avatar} alt={member.label} />
      ) : null}
      <AvatarFallback
        className={cn("text-foreground text-[9px]", fallbackClassName)}
      >
        {member.initials}
      </AvatarFallback>
    </Avatar>
  )
}

function MembersTriggerSummary({
  selectedMembers,
}: {
  selectedMembers: TeamMember[]
}) {
  if (!selectedMembers.length) {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <UsersGlyph className="text-muted-foreground" />
        <span className="truncate">Members</span>
      </span>
    )
  }

  const visibleMembers = selectedMembers.slice(0, 4)
  const hiddenMemberCount = selectedMembers.length - visibleMembers.length
  const selectedLabel = selectedMembers.map((member) => member.label).join(", ")
  const countLabel =
    selectedMembers.length === 1
      ? "1 member"
      : hiddenMemberCount > 0
        ? `+${hiddenMemberCount} ${hiddenMemberCount === 1 ? "member" : "members"}`
        : `${selectedMembers.length} members`

  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="sr-only">Selected members: {selectedLabel}</span>
      <AvatarGroup className="-space-x-1">
        {visibleMembers.map((member) => (
          <MemberAvatar
            key={member.id}
            member={member}
            className="size-5"
            fallbackClassName="text-[9px]"
          />
        ))}
      </AvatarGroup>
      <span className="truncate">{countLabel}</span>
    </span>
  )
}

function MemberListRow({ member }: { member: TeamMember }) {
  return (
    <Item size="xs" className="p-0">
      <ItemMedia>
        <MemberAvatar member={member} className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="gap-1 whitespace-nowrap">
          <span>{member.label}</span>
          {member.isCurrentUser ? (
            <span className="text-muted-foreground font-normal">(You)</span>
          ) : null}
        </ItemTitle>
      </ItemContent>
    </Item>
  )
}

function MemberSelectionRow({ option }: { option: MemberSelectionItem }) {
  if (isNoMembersOption(option)) {
    return (
      <span className="flex min-w-0 items-center gap-2">
        <UsersGlyph className="text-muted-foreground" />
        <span className="truncate">{option.label}</span>
      </span>
    )
  }

  return <MemberListRow member={option} />
}

export default function Pattern() {
  const [members, setMembers] = React.useState<TeamMember[]>(
    teamMembers.slice(0, 5)
  )

  function handleMembersChange(nextMembers: MemberSelectionItem[]) {
    if (nextMembers.some(isNoMembersOption)) {
      setMembers([])
      return
    }

    setMembers(
      nextMembers.filter(
        (member): member is TeamMember => !isNoMembersOption(member)
      )
    )
  }

  return (
    <Field className="max-w-xs">
      <Combobox
        multiple
        items={memberSelectionOptions}
        value={members}
        onValueChange={handleMembersChange}
        itemToStringValue={(item: MemberSelectionItem) =>
          isNoMembersOption(item) ? item.searchText : item.label
        }
        isItemEqualToValue={isMemberSelectionItemEqual}
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
          <ComboboxValue placeholder="Members">
            {(selectedMembers: TeamMember[]) => (
              <MembersTriggerSummary selectedMembers={selectedMembers ?? []} />
            )}
          </ComboboxValue>
        </ComboboxTrigger>

        <ComboboxContent className="max-w-(--anchor-width) min-w-(--anchor-width)">
          <ComboboxInput
            showTrigger={false}
            placeholder="Select members"
            className="mb-1"
          />
          <ComboboxEmpty>No members found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxItem value={noMembersOption}>
              <MemberSelectionRow option={noMembersOption} />
            </ComboboxItem>
            <ComboboxSeparator />

            {teamMembers.map((member) => (
              <ComboboxItem key={member.id} value={member}>
                <MemberSelectionRow option={member} />
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  )
}
