import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../reui/adapters/selection"
import { Button } from "../../reui/adapters/controls"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../reui/adapters/layout"
import { IconPlaceholder } from "../../reui/adapters/icons"

const items = [
  {
    value: "plans",
    trigger: "What subscription plans do you offer?",
    content: (
      <>
        <p>
          <a href="#" className="text-primary hover:underline">
            Annual billing is available
          </a>{" "}
          with a 20% discount. All plans include a 14-day free trial with no
          credit card required.
        </p>
        <Button size="sm" className="mt-4">
          View plans
          <IconPlaceholder
            lucide="ArrowUpRightIcon"
            tabler="IconArrowUpRight"
            hugeicons="ArrowUpRight01Icon"
            phosphor="ArrowUpRightIcon"
            remixicon="RiArrowRightUpLine"
            className="size-4"
          />
        </Button>
      </>
    ),
  },
  {
    value: "billing",
    trigger: "How does billing work?",
    content: (
      <>
        <p>
          Billing occurs automatically at the start of each billing cycle. We
          accept all major credit cards, PayPal, and ACH transfers for
          enterprise customers.
        </p>
      </>
    ),
  },
  {
    value: "security",
    trigger: "Is my data secure?",
    content: (
      <>
        <p>
          We take security seriously. All data is encrypted at rest using
          AES-256 and in transit via TLS 1.3. We perform regular third-party
          security audits and maintain SOC 2 Type II compliance.
        </p>
        <p>
          You can also enable multi-factor authentication (MFA) and single
          sign-on (SSO) for additional security.
        </p>
      </>
    ),
  },
]

export default function Pattern({ profile = "default" }: { profile?: string }) {
  if (!["default", "long-heading", "unbroken-heading", "long-content", "unbroken-content", "long-description"].includes(profile)) throw Error("Unknown Accordion4 fixture profile");
  return (
    <div className="ku-accordion-4 mx-auto mb-auto w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
          <CardDescription>
            Common questions about your account, plans, and payments{profile === "long-description" && " — Review subscription details for distributed teams working across departments, countries and time zones with unusually long account descriptions."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={["plans"]}>
            {items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{profile === "unbroken-heading" ? "X".repeat(256) : profile === "long-heading" ? `${item.trigger} Review subscription details for distributed teams working across departments, countries and time zones with unusually long account descriptions.` : item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}{profile === "long-content" && Array.from({ length: 5 }, (_, index) => <p key={index}>Paragraph {index + 1}: Account details and billing information must remain readable while users review unusually long descriptions, resize the interface and navigate through every panel. Final paragraph content remains reachable.</p>)}{profile === "unbroken-content" && <p>{"X".repeat(256)}</p>}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
