import { expect, it, vi } from "vitest";
import {
  localRead,
  transferChunks,
} from "../../../apps/playground/src/examples/experience-adapters";
it("cancels fictional reads before a stale identity can resolve", async () => {
  const controller = new AbortController();
  const read = localRead("one", controller.signal);
  controller.abort();
  await expect(read).rejects.toMatchObject({ name: "AbortError" });
});
it("cancelled chunk transfers do not produce a final Blob", async () => {
  const controller = new AbortController();
  const progress = vi.fn(() => controller.abort());
  await expect(
    transferChunks(controller.signal, progress, false),
  ).rejects.toMatchObject({ name: "AbortError" });
  expect(progress).toHaveBeenCalledTimes(1);
});
it("a deliberate local transfer failure is distinguishable from completion", async () => {
  await expect(
    transferChunks(new AbortController().signal, () => {}, true),
  ).rejects.toMatchObject({ message: "FICTIONAL_TRANSFER_FAILED" });
});
