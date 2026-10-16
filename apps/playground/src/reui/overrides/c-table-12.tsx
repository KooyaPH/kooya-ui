// Owned containment correction around the actual attributed REUI table recipe.
// @ts-expect-error attributed generated REUI module has no declaration file
import OriginalPattern from "../runtime/source/registry-reui/bases/radix/components/table/c-table-12.jsx";

export default function Pattern() {
  return (
    <div style={{ width: "100%", minWidth: 0 }} className="[&_.ant-card-body]:min-w-0 [&_.ant-card-body]:w-full [&_tbody_.ant-table-row>td:first-child>div]:max-w-60 [&_tbody_.ant-table-row>td:first-child>div]:whitespace-normal [&_tbody_.ant-table-row>td:first-child>div]:[overflow-wrap:anywhere]">
      <OriginalPattern />
    </div>
  );
}
