// Owned responsive correction to the actual attributed REUI recipe.
import { Button } from "../adapters/controls";
import { ButtonGroup } from "../adapters/controls";
import { IconPlaceholder } from "../adapters/icons";

const attachment = {
  name: "Q4-Product-Roadmap.pdf",
  size: "2.4 MB",
};

export default function Pattern() {
  return (
    <ButtonGroup
      role="group"
      aria-label="Attachment actions"
      style={{ width: "100%", maxWidth: 310, minWidth: 0 }}
    >
      <Button
        variant="outline"
        size="xs"
        style={{ flex: "1 1 0%", minWidth: 0 }}
      >
        <IconPlaceholder
          style={{ flexShrink: 0 }}
          lucide="PaperclipIcon"
          tabler="IconPaperclip"
          hugeicons="Attachment02Icon"
          phosphor="PaperclipIcon"
          remixicon="RiAttachment2"
          aria-hidden="true"
        />
        <span
          style={{
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={attachment.name}
        >
          {attachment.name}
        </span>
        <span className="opacity-60" style={{ flexShrink: 0 }}>
          ({attachment.size})
        </span>
      </Button>
      <Button
        variant="outline"
        size="icon-xs"
        aria-label="Download attachment"
        style={{ flexShrink: 0 }}
      >
        <IconPlaceholder
          lucide="DownloadIcon"
          tabler="IconDownload"
          hugeicons="Download01Icon"
          phosphor="DownloadSimpleIcon"
          remixicon="RiDownload2Line"
          aria-hidden="true"
        />
      </Button>
    </ButtonGroup>
  );
}
