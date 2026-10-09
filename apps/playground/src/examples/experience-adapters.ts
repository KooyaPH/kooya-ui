/** Fictional, in-memory teaching adapters. No fetch, sockets or persistence. */
export function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Cancelled", "AbortError"));
      return;
    }
    const abort = () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", abort);
      reject(new DOMException("Cancelled", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", abort);
      resolve();
    }, ms);
    signal.addEventListener("abort", abort, { once: true });
  });
}
export async function localRead(
  scope: string,
  signal: AbortSignal,
  fail = false,
) {
  await delay(650, signal);
  if (fail) throw new Error("FICTIONAL_READ_FAILED");
  return {
    title: `${scope} fictional brief`,
    summary: "A local sample for the design review. No customer records.",
    updatedAt: Date.now(),
  };
}
export async function transferChunks(
  signal: AbortSignal,
  onProgress: (bytes: number) => void,
  fail: boolean,
): Promise<Blob> {
  const chunks: string[] = [];
  for (let i = 1; i <= 10; i++) {
    await delay(150, signal);
    if (fail && i === 4) throw new Error("FICTIONAL_TRANSFER_FAILED");
    chunks.push(`Fictional Kooya sample chunk ${i}\n`);
    onProgress(i * 100);
    if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
  }
  return new Blob(chunks, { type: "text/plain" });
}
export function permitsIntent(dataSaver: boolean): boolean {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  return (
    !dataSaver &&
    navigator.onLine !== false &&
    !connection?.saveData &&
    !["slow-2g", "2g"].includes(connection?.effectiveType ?? "")
  );
}
