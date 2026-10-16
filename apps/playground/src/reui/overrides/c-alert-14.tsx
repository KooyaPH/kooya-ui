// Keep security actions and long content inside the alert at catalog preview widths.
// @ts-expect-error Generated upstream recipe has no declaration file.
import OriginalPattern from "../runtime/source/registry-reui/bases/radix/components/alert/c-alert-14.jsx";

const narrowContentStyles = `
  .ku-alert-14 [data-slot="alert"] {
    align-items: start;
    grid-template-columns: 12px minmax(0, 1fr);
    border-color: var(--color-border);
    background-color: var(--color-card);
    color: var(--color-card-foreground);
  }

  .ku-alert-14 [data-slot="alert-title"],
  .ku-alert-14 [data-slot="alert-description"] {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .ku-alert-14 [data-slot="alert-title"] {
    display: block;
    overflow: visible;
    -webkit-line-clamp: unset;
  }

  .ku-alert-14 [data-slot="alert-description"] {
    color: var(--ku-muted);
  }

  .ku-alert-14 [data-slot="alert-action"] {
    min-width: 0;
    max-width: 100%;
    flex-wrap: wrap;
  }

  .ku-alert-14 [data-slot="alert-action"] .ant-btn {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }
`;

export default function Pattern() {
  return (
    <div className="ku-alert-14" style={{ width: "100%", minWidth: 0 }}>
      <style>{narrowContentStyles}</style>
      <OriginalPattern />
    </div>
  );
}
