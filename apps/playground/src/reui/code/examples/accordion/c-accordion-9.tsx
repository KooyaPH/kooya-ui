// Owned correction for the adapted REUI recipe; retain the local adapters.
// Preserve the catalog recipe while keeping user names and descriptions legible
// inside the constrained preview widths used for embedded account lists.
// @ts-expect-error Generated upstream recipe has no declaration file.
import OriginalPattern from "../../../runtime/source/registry-reui/bases/radix/components/accordion/c-accordion-9.jsx";

const narrowStyles = `
  @layer utilities {
  @container (max-width: 220px) {
    .ku-accordion-9 [data-slot="frame-panel"] { padding-inline: 6px !important; }
    .ku-accordion-9 .ant-collapse-header { padding: 8px !important; }
    .ku-accordion-9 .ant-collapse-title { flex: 1 1 0% !important; min-width: 0; }
    .ku-accordion-9 .ant-collapse-title > .flex {
      display: grid;
      grid-template-columns: 32px minmax(0, 1fr);
      min-width: 0;
      gap: 8px;
    }
    .ku-accordion-9 .ant-collapse-title > .flex > .ant-avatar { grid-column: 1; }
    .ku-accordion-9 .ant-collapse-title > .flex > .ant-avatar + div {
      grid-column: 1 / -1;
      display: flex;
      flex-wrap: wrap;
      min-width: 0;
      gap: 8px;
    }
    .ku-accordion-9 .ant-collapse-title [data-slot="badge"] { flex: 0 0 auto; }
    .ku-accordion-9 .ant-collapse-body {
      padding-inline: 0 8px !important;
      overflow-wrap: normal !important;
      word-break: normal !important;
    }
  }
  }
`;

export default function Pattern() {
  return (
    <div
      className="ku-accordion-9"
      style={{ width: "100%", minWidth: 0, containerType: "inline-size" }}
    >
      <style>{narrowStyles}</style>
      <OriginalPattern />
    </div>
  );
}
