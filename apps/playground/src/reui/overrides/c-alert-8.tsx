// Keep the complete error heading visible in the narrow catalog preview.
// @ts-expect-error Generated upstream recipe has no declaration file.
import OriginalPattern from "../runtime/source/registry-reui/bases/radix/components/alert/c-alert-8.jsx";

const narrowTitleStyles = `
  .ku-alert-8 [data-slot="alert-title"] {
    display: block;
    min-width: 0;
    overflow: visible;
    overflow-wrap: anywhere;
    color: var(--ku-text);
    -webkit-line-clamp: unset;
  }

  .ku-alert-8 [data-slot="alert-description"] {
    min-width: 0;
    overflow-wrap: anywhere;
    color: var(--ku-muted);
  }

  [data-mode="dark"] .ku-alert-8 [data-slot="alert"] > svg {
    color: var(--ku-danger) !important;
  }
`;

export default function Pattern() {
  return (
    <div className="ku-alert-8" style={{ width: "100%", minWidth: 0 }}>
      <style>{narrowTitleStyles}</style>
      <OriginalPattern />
    </div>
  );
}
