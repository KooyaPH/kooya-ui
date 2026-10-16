import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "../code/supporting/registry-reui/bases/radix/reui/alert";
import { Button } from "../adapters/controls";
import { IconPlaceholder } from "../adapters/icons";

export default function Pattern() {
  return (
    <Alert
      className="min-w-0 grid-cols-[16px_minmax(0,1fr)] items-start gap-x-2.5"
      style={{
        backgroundColor: "var(--ku-surface)",
        color: "var(--ku-ink)",
        borderColor: "var(--ku-line)",
      }}
    >
      <IconPlaceholder
        lucide="ShieldCheckIcon"
        tabler="IconShieldCheck"
        hugeicons="ShieldEnergyIcon"
        phosphor="ShieldCheckIcon"
        remixicon="RiShieldCheckLine"
      />
      <AlertTitle className="min-w-0 line-clamp-none whitespace-normal [overflow-wrap:anywhere]">
        Security Update
      </AlertTitle>
      <AlertDescription
        className="col-start-2 min-w-0 [overflow-wrap:anywhere]"
        style={{ color: "var(--ku-muted)" }}
      >
        Update your password and enable 2FA.
      </AlertDescription>
      <AlertAction className="col-start-2 mt-2 min-w-0 w-full flex-col items-stretch sm:col-start-2 sm:col-span-1 sm:row-start-3 sm:justify-start sm:flex-row sm:flex-wrap [&_button]:w-full [&_button]:max-w-full sm:[&_button]:w-auto">
        <Button variant="outline" size="xs">
          Dismiss
        </Button>
        <Button size="xs">Update</Button>
      </AlertAction>
    </Alert>
  );
}
