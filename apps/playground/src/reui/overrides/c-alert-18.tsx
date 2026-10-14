import { useState } from "react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "../code/supporting/registry-reui/bases/radix/reui/alert";
import {
  Frame,
  FramePanel,
} from "../code/supporting/registry-reui/bases/radix/reui/frame";

import { Button } from "../adapters/controls";
import { IconPlaceholder } from "../adapters/icons";

const alertStyles = `
  .ku-alert-18 [data-slot="alert"] {
    min-width: 0;
    grid-template-columns: 16px minmax(0, 1fr);
  }

  .ku-alert-18 [data-slot="alert-title"],
  .ku-alert-18 [data-slot="alert-description"] {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .ku-alert-18 [data-slot="alert-title"] {
    display: block;
    overflow: visible;
    -webkit-line-clamp: unset;
  }

  .ku-alert-18 [data-slot="alert-description"] {
    color: var(--ku-muted);
  }

  .ku-alert-18 [data-slot="alert-action"] {
    min-width: 0;
    max-width: 100%;
    flex-wrap: wrap;
  }

  .ku-alert-18 [data-slot="alert-action"] .ant-btn {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }

  .ku-alert-18 [data-slot="alert-description"] > .ant-btn-link {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    white-space: normal;
    color: #1d46d9 !important;
  }

  [data-mode="dark"] .ku-alert-18 [data-slot="alert"] > svg {
    color: #9fb1ff !important;
  }

  [data-mode="dark"] .ku-alert-18 .ant-btn-link {
    color: #9fb1ff !important;
  }
`;

export default function Pattern() {
  const [visible, setVisible] = useState(true);
  const [previewMessage, setPreviewMessage] = useState("");

  if (!visible) return null;

  return (
    <div className="ku-alert-18 mx-auto mb-auto w-full max-w-lg min-w-0">
      <style>{alertStyles}</style>
      <Frame variant="ghost">
        <FramePanel className="min-w-0 overflow-hidden p-0!">
          <Alert variant="info" className="min-w-0 border-0 shadow-none">
            <IconPlaceholder
              lucide="LightbulbIcon"
              tabler="IconBulb"
              hugeicons="Idea01Icon"
              phosphor="LightbulbIcon"
              remixicon="RiLightbulbLine"
            />
            <AlertTitle className="!line-clamp-none min-w-0 [overflow-wrap:anywhere]">
              New: Advanced Analytics
            </AlertTitle>
            <AlertAction className="min-w-0 flex-wrap">
              <Button
                aria-label="Dismiss alert"
                size="xs"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground -mt-1 -mr-2 size-7 p-0 hover:bg-transparent"
                onClick={() => setVisible(false)}
              >
                <IconPlaceholder
                  lucide="XIcon"
                  tabler="IconX"
                  hugeicons="MultiplicationSignIcon"
                  phosphor="XIcon"
                  remixicon="RiCloseLine"
                  className="size-3.5"
                />
              </Button>
            </AlertAction>
            <AlertDescription className="min-w-0 [overflow-wrap:anywhere]">
              We&apos;ve just released a new dashboard for tracking your
              team&apos;s performance.
              <Button
                variant="link"
                size="sm"
                className="text-info h-auto p-0 underline"
                aria-describedby={
                  previewMessage ? "alert-18-preview-status" : undefined
                }
                onClick={() =>
                  setPreviewMessage(
                    "Feature navigation is not configured in this preview.",
                  )
                }
              >
                Explore features
              </Button>
              {previewMessage && (
                <span
                  id="alert-18-preview-status"
                  role="status"
                  className="max-w-full text-muted-foreground"
                >
                  {previewMessage}
                </span>
              )}
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  );
}
