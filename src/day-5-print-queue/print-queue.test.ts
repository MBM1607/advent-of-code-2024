import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { printInvalidQueue, printQueue } from "./print-queue.js";

test("testing day-5-print-queue", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  expect(printQueue(sample)).toBe(143);
  expect(printInvalidQueue(sample)).toBe(123);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  expect(printQueue(input)).toBe(5329);
  expect(printInvalidQueue(input)).toBe(5833);
});
