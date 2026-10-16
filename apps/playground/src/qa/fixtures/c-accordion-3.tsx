import { useState } from "react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "../../reui/adapters/selection";

// Private real-prop audit fixture, attributed to the actual REUI Accordion3
// records. This renders the production adapter; no text/CSS DOM interception.
const originalItems = [
  { value: "billing", trigger: "How does billing work?", content: "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members. There are no hidden fees or setup costs." },
  { value: "security", trigger: "Is my data secure?", content: "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols. We also offer optional two-factor authentication and single sign-on for enterprise customers." },
  { value: "integration", trigger: "What integrations do you support?", content: <><p>We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks. </p><p>Our API documentation includes code examples in 10+ programming languages.</p></> },
];
const longHeading = "How does billing work when multiple teams share an annual subscription, add new members during the current billing period, change their workspace ownership, and need an itemized explanation of every charge before the next renewal?";
const token = "X".repeat(256);
const paragraphs = Array.from({ length: 5 }, (_, i) => <p key={i}>Paragraph {i + 1}. This is supplied through the real AccordionContent children prop. A growing team needs enough room to read the complete sentence and distinguish it from the next paragraph. END-{i + 1}.</p>);
export default function Accordion3ContentReview({ profile: requested = "original" }: { profile?: string }) {
  const profile = requested === "default" ? "original" : requested;
  if (!["original", "long-heading", "token", "paragraphs", "controlled-disabled"].includes(profile)) throw Error("Unknown Accordion3 fixture profile");
  const [value, setValue] = useState("billing");
  const [events, setEvents] = useState<string[]>([]);
  const controlled = profile === "controlled-disabled";
  const items = originalItems.map(item => ({
    ...item,
    trigger: profile === "long-heading" && item.value === "billing" ? longHeading : item.trigger,
    content: item.value === "billing" && profile === "token" ? token : item.value === "billing" && profile === "paragraphs" ? paragraphs : item.content,
  }));
  return <div style={{ width: "100%", minWidth: 0, maxWidth: 512, marginInline: "auto" }} data-review-profile={profile}>
    <Accordion type="single" collapsible {...(controlled ? { value } : { defaultValue: "billing" })} onValueChange={next => {
      const actual = Array.isArray(next) ? next[0] ?? "" : next;
      setValue(actual);
      setEvents(previous => [...previous, actual]);
    }}>
      {items.map(item => <AccordionItem key={item.value} value={item.value} disabled={controlled && item.value === "security"}>
        <AccordionTrigger>{item.trigger}</AccordionTrigger>
        <AccordionContent>{item.content}</AccordionContent>
      </AccordionItem>)}
    </Accordion>
    <output aria-label="Accordion review state" style={{ display: "block", overflowWrap: "anywhere", maxWidth: "100%" }}>{JSON.stringify({ value, events })}</output>
  </div>;
}
