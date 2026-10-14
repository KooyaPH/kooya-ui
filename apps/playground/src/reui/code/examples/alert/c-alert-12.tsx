// Owned correction for the adapted REUI recipe; retain the local adapters.
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../supporting/registry-reui/bases/radix/reui/alert"
import { Frame, FramePanel } from "../../supporting/registry-reui/bases/radix/reui/frame"
import { IconPlaceholder } from "../../../adapters/icons"

export default function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg min-w-0">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert
            className="min-w-0 !grid-cols-[16px_minmax(0,1fr)] border-0 shadow-none"
            style={{
              backgroundColor: "var(--ku-surface)",
              color: "var(--ku-ink)",
              borderColor: "var(--ku-line)",
            }}
          >
            <IconPlaceholder
              lucide="InfoIcon"
              tabler="IconInfoCircle"
              hugeicons="InformationCircleIcon"
              phosphor="InfoIcon"
              remixicon="RiInformationLine"
              className="text-destructive"
              style={{ color: "var(--ku-danger)" }}
            />
            <AlertTitle className="!line-clamp-none min-w-0 whitespace-normal [overflow-wrap:anywhere]">
              System Update
            </AlertTitle>
            <AlertDescription
              className="min-w-0 [overflow-wrap:anywhere]"
              style={{ color: "var(--ku-muted)" }}
            >
              A new system update is available. Please restart your application to apply the changes.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}
