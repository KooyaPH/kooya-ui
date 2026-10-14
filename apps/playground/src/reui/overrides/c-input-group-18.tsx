// Owned responsive correction to the actual attributed REUI recipe.
"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../adapters/menus";
import { Field } from "../adapters/layout";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "../adapters/layout";
import { Kbd } from "../code/supporting/registry/bases/radix/ui/kbd";
import { IconPlaceholder } from "../adapters/icons";

export default function Pattern() {
  const [model, setModel] = useState("GPT-4o");

  return (
    <Field
      className="max-w-xs"
      style={{ width: "100%", maxWidth: 320, minWidth: 0 }}
    >
      <InputGroup>
        <InputGroupTextarea
          aria-label="Message"
          placeholder="Ask AI anything..."
          className="min-h-24 pb-12"
        />
        <InputGroupAddon
          align="block-end"
          style={{ flexWrap: "wrap", gap: 8, minWidth: 0 }}
        >
          <div
            className="flex items-center gap-1"
            style={{ flexWrap: "wrap", flex: "1 1 240px", minWidth: 0 }}
          >
            <InputGroupButton variant="ghost" size="icon-xs" aria-label="Add">
              <IconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
                className="size-4"
              />
            </InputGroupButton>
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              aria-label="Voice input"
            >
              <IconPlaceholder
                lucide="MicIcon"
                tabler="IconMicrophone"
                hugeicons="Mic02Icon"
                phosphor="MicrophoneIcon"
                remixicon="RiMicLine"
                className="size-4"
              />
            </InputGroupButton>
            <InputGroupButton variant="ghost" className="h-7 px-2 text-xs">
              <IconPlaceholder
                lucide="GlobeIcon"
                tabler="IconWorld"
                hugeicons="Globe02Icon"
                phosphor="GlobeSimpleIcon"
                remixicon="RiGlobalLine"
                className="mr-1 size-3.5"
              />
              Search
            </InputGroupButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupButton
                  variant="ghost"
                  className="h-7 px-2 text-xs"
                  aria-label={`Select AI model: ${model}`}
                  style={{
                    maxWidth: "100%",
                    whiteSpace: "normal",
                    height: "auto",
                    minHeight: "var(--ant-control-height)",
                  }}
                >
                  <Kbd className="border-border rounded-sm border">Σ</Kbd>
                  {model}
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                    className="ml-1 size-3.5 opacity-60"
                  />
                </InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-32">
                <DropdownMenuItem onClick={() => setModel("GPT-4o")}>
                  GPT-4o
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel("GPT-4")}>
                  GPT-4
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel("Claude 3.5")}>
                  Claude 3.5
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <InputGroupButton
            variant="default"
            size="icon-xs"
            aria-label="Send message"
            className="ml-auto"
          >
            <IconPlaceholder
              lucide="ArrowUpIcon"
              tabler="IconArrowUp"
              hugeicons="ArrowUp02Icon"
              phosphor="ArrowUpIcon"
              remixicon="RiArrowUpLine"
              className="size-4"
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
