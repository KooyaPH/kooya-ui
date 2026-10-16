// Owned correction for the adapted REUI recipe; retain the local adapters.
// Keep the billing warning readable in constrained catalog previews.
// @ts-ignore Generated upstream JSX has no declaration file (TS7016).
import OriginalPattern from "../../../runtime/source/registry-reui/bases/radix/components/alert/c-alert-16.jsx";

const narrowContentStyles = `
  .ku-alert-16 [data-slot="alert"] {
    min-width: 0;
    grid-template-columns: 16px minmax(0, 1fr);
  }

  .ku-alert-16 [data-slot="alert-title"],
  .ku-alert-16 [data-slot="alert-description"] {
    min-width: 0;
    max-width: 100%;
    overflow-wrap: anywhere;
    white-space: normal;
  }

  .ku-alert-16 [data-slot="alert-title"] {
    display: block;
    overflow: visible;
    -webkit-line-clamp: unset;
  }

  .ku-alert-16 [data-slot="alert-description"] {
    color: var(--ku-muted);
  }

  [data-mode="dark"] .ku-alert-16 [data-slot="alert"] > svg {
    color: var(--ku-danger) !important;
  }

  .ku-alert-16 [data-slot="alert-action"] {
    min-width: 0;
    max-width: 100%;
    flex-wrap: wrap;
  }

  .ku-alert-16 [data-slot="alert-action"] .ant-btn {
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }
`;

export default function Pattern() {
  return (
    <div className="ku-alert-16" style={{ width: "100%", minWidth: 0 }}>
      <style>{narrowContentStyles}</style>
      <OriginalPattern />
    </div>
  );
}
