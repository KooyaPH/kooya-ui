// Owned correction for the adapted REUI recipe; retain the local adapters.
// Keep security-alert content readable in narrow catalog previews.
// @ts-expect-error Generated upstream recipe has no declaration file.
import OriginalPattern from "../../../runtime/source/registry-reui/bases/radix/components/alert/c-alert-10.jsx";

const narrowContentStyles = `
  .ku-alert-10 [data-slot="alert"] {
    align-items: start;
    grid-template-columns: 12px minmax(0, 1fr);
    border-color: var(--color-border);
    background-color: var(--color-card);
    color: var(--color-card-foreground);
  }

  .ku-alert-10 [data-slot="alert-title"],
  .ku-alert-10 [data-slot="alert-description"] {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .ku-alert-10 [data-slot="alert-title"] {
    display: block;
    overflow: visible;
    -webkit-line-clamp: unset;
  }

  .ku-alert-10 [data-slot="alert-description"] {
    color: var(--ku-muted);
  }

  .ku-alert-10 [data-slot="alert-action"] {
    flex-wrap: wrap;
  }

  .ku-alert-10 [data-slot="alert-action"] .ant-btn {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }
`;

export default function Pattern() {
  return (
    <div className="ku-alert-10" style={{ width: "100%", minWidth: 0 }}>
      <style>{narrowContentStyles}</style>
      <OriginalPattern />
    </div>
  );
}
