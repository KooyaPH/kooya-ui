import React, { useState } from "react";
import { Button } from "@kooyaph/ui/components";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../reui/adapters/selection";
import { IconPlaceholder } from "../../reui/adapters/icons";

const originalItems = [
  { value: "security", trigger: "Data Security", content: "We use industry-standard AES-256 encryption to protect your sensitive information at rest and in transit." },
  { value: "integration", trigger: "API Integration", content: "Seamlessly connect with your favorite tools using our robust REST API and pre-built connectors." },
  { value: "collaboration", trigger: "Team Collaboration", content: "Invite team members, assign roles, and work together in real-time on shared projects and documents." },
] as const;
const profiles = ["default", "long-heading", "unbroken-heading", "long-content", "disabled", "controlled", "unusual-keys"] as const;
type Profile = typeof profiles[number];
const longHeading = "Data security controls for distributed teams that collaborate across departments, countries, and time zones while protecting every sensitive project document";
const unbroken = "ABCDEFGHIJKLMNOPQRSTUVWXYZ012345".repeat(8); // Exactly 256 characters.
const paragraphs = [
  "Protect sensitive project information with encryption at rest and in transit. Review how every authorized team member receives access to shared documents.",
  "Connect existing tools through a documented API. Integration settings remain readable when the interface appears inside a constrained application panel.",
  "Invite colleagues, assign appropriate roles, and review permissions before sharing. Changes to the available space must preserve the currently expanded panels.",
  "日本語 中文 العربية: support international teams. Names such as José, Zoë, and é remain understandable alongside emoji such as 🔐 and 🤝.",
  "This final paragraph must remain reachable after scrolling. Closing and reopening its panel must preserve the entire authored content without truncation or concealed final words.",
];

/** Test composition of the actual shared Accordion/parts, not modified Pattern props. */
export default function AccordionTwoFixture({ profile: requested }: { profile: string }) {
  if (!profiles.includes(requested as Profile)) throw Error(`Unsupported Accordion2 fixture profile: ${requested}`);
  const profile = requested as Profile;
  const activeItems = profile === "unusual-keys" ? originalItems.map((item, index) => ({ ...item, value: ["security\ud800", "integration /?#", "collaboration🧪"][index] })) : originalItems;
  const [value, setValue] = useState<string[]>([activeItems[0].value]);
  const [events, setEvents] = useState<string[][]>([]);
  const controlled = profile === "controlled" || profile === "unusual-keys";
  return <div className="ku-accordion-2 mb-auto w-full min-w-0" data-accordion-profile={profile}>
    <div className="mx-auto w-full max-w-lg">
      <Accordion type="multiple" {...(controlled ? { value, onValueChange: (next: string | string[]) => { const keys = Array.isArray(next) ? next : [next]; setValue(keys); setEvents(previous => [...previous, keys]); } } : { defaultValue: [activeItems[0].value] })}>
        {activeItems.map((item, index) => <AccordionItem key={item.value} value={item.value} disabled={profile === "disabled" && item.value === "integration"}>
          <AccordionTrigger className="hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden">
            <span>{index === 0 && profile === "long-heading" ? longHeading : index === 0 && profile === "unbroken-heading" ? unbroken : item.trigger}</span>
            <IconPlaceholder lucide="PlusIcon" className="text-muted-foreground ml-auto size-3.5 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:hidden" />
            <IconPlaceholder lucide="MinusIcon" className="text-muted-foreground ml-auto hidden size-3.5 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:inline" />
          </AccordionTrigger>
          <AccordionContent>{profile === "long-content" && index === 0 ? paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex} style={{ marginBlock: paragraphIndex === 0 ? "0 1em" : "1em" }}>{paragraph}</p>) : item.content}</AccordionContent>
        </AccordionItem>)}
      </Accordion>
      {controlled && <>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          <Button onClick={() => setValue(activeItems.map(item => item.value))}>Expand all from owner</Button>
          <Button onClick={() => setValue([])}>Collapse all from owner</Button>
          <Button onClick={() => setValue([activeItems[0].value])}>Reset from owner</Button>
        </div>
        <output aria-label="Accordion controlled value" style={{ display: "block", overflowWrap: "anywhere" }}>{JSON.stringify(value)}</output>
        <output aria-label="Accordion callback events" style={{ display: "block", overflowWrap: "anywhere" }}>{JSON.stringify(events)}</output>
      </>}
    </div>
  </div>;
}
