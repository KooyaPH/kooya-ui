import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../reui/adapters/selection";

// Private real-prop fixture for c-accordion-1. Uses shipped adapter/Ant Collapse.
// Copy to src/qa/fixtures/c-accordion-1.tsx; no implementation proxy.
const originalItems = [
  { value: "item-1", trigger: "Is it accessible ?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
  { value: "item-2", trigger: "Is it styled?", content: "Yes. It comes with default styles that matches the other components' aesthetic." },
  { value: "item-3", trigger: "Is it animated?", content: "Yes. It's animated by default, but you can disable it if you prefer." },
];
const sentence = "Can the international engineering and customer support workspace safely preserve every heading, explanation, and interactive state when this accordion is displayed inside a constrained container?";
const token = "AccordionContentWithoutWhitespace".repeat(8).slice(0,256);
export default function Accordion1AuditFixture({ profile = "default" }: { profile?: string }) {
  if (!["default", "long-heading", "unbroken", "multiline", "disabled", "controlled", "noncollapsible", "noncollapsible-default"].includes(profile)) throw Error("Unknown Accordion1 fixture profile");
  const [value, setValue] = useState("item-1");
  const [calls, setCalls] = useState<string[]>([]);
  const controlled = profile === "controlled";
  const items = originalItems.map((item, index) => ({
    ...item,
    trigger: profile === "long-heading" ? `${sentence} ${index + 1}` : profile === "unbroken" ? token : item.trigger,
    content: profile === "unbroken" ? token : profile === "multiline" ? Array.from({ length:5 }, (_, paragraph) => <p key={paragraph}>{paragraph + 1}. {sentence} {item.content}</p>) : item.content,
    disabled: profile === "disabled" && index === 1,
  }));
  const stateProps = controlled ? { value } : { defaultValue:"item-1" };
  // Upstream Radix single contract defaults collapsible=false; explicit false
  // must retain expanded item on a repeat click/Enter/Space, while switching is legal.
  const collapseProps = profile === "noncollapsible-default" ? {} : { collapsible: profile !== "noncollapsible" };
  return <div data-accordion-fixture={profile} style={{width:"100%",maxWidth:512,minWidth:0,marginInline:"auto"}}>
    <Accordion type="single" {...collapseProps} {...stateProps} onValueChange={(next) => {
      const scalar = Array.isArray(next) ? next[0] ?? "" : next;
      setCalls(previous => [...previous, scalar]);
      if (controlled) setValue(scalar);
    }}>
      {items.map(item => <AccordionItem key={item.value} value={item.value} disabled={item.disabled}>
        <AccordionTrigger>{item.trigger}</AccordionTrigger>
        <AccordionContent>{item.content}</AccordionContent>
      </AccordionItem>)}
    </Accordion>
    <output data-audit-value style={{display:"block",overflowWrap:"anywhere"}}>{controlled ? value : "uncontrolled"}</output>
    <output data-audit-calls style={{display:"block",overflowWrap:"anywhere"}}>{JSON.stringify(calls)}</output>
  </div>;
}
