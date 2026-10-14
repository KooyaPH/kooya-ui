export function filterRows<T extends { name: string; status: string }>(
  rows: T[],
  query: string,
  status: string,
): T[] {
  const term = query.trim().toLowerCase();
  return rows.filter(
    (row) =>
      row.name.toLowerCase().includes(term) &&
      (status === "All" || row.status === status),
  );
}
export function cartTotal(
  rows: { price: number; quantity: number }[],
  coupon: string,
) {
  return (
    Math.round(
      rows.reduce(
        (total, row) => total + row.price * Math.max(0, row.quantity),
        0,
      ) *
        (coupon.trim().toUpperCase() === "KOOYA10" ? 0.9 : 1) *
        100,
    ) / 100
  );
}
export function moveTask<T extends { id: string; stage: string }>(
  tasks: T[],
  id: string,
  stage: string,
): T[] {
  return tasks.map((task) => (task.id === id ? { ...task, stage } : task));
}
export function downloadText(
  filename: string,
  content: string | Blob,
  type = "text/plain",
) {
  const url = URL.createObjectURL(
    content instanceof Blob ? content : new Blob([content], { type }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
