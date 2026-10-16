// Owned correction for the adapted REUI recipe; retain the local adapters.
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../supporting/registry-reui/bases/radix/reui/alert";
import { IconPlaceholder } from "../../../adapters/icons";

export default function Pattern() {
  return (
    <Alert
      className="min-w-0"
      style={{
        gridTemplateColumns: "16px minmax(0, 1fr)",
        backgroundColor: "var(--ku-surface)",
        color: "var(--ku-ink)",
        borderColor: "var(--ku-line)",
      }}
    >
      <IconPlaceholder
        lucide="CircleCheckIcon"
        tabler="IconCircleCheck"
        hugeicons="CheckmarkCircle01Icon"
        phosphor="CheckCircleIcon"
        remixicon="RiCheckboxCircleLine"
      />
      <AlertTitle
        style={{
          minWidth: 0,
          display: "block",
          overflow: "visible",
          overflowWrap: "anywhere",
          WebkitLineClamp: "unset",
        }}
      >
        Alert!
      </AlertTitle>
      <AlertDescription
        style={{
          minWidth: 0,
          color: "var(--ku-muted)",
          overflowWrap: "anywhere",
        }}
      >
        This is an alert with icon, title and description.
      </AlertDescription>
    </Alert>
  );
}
