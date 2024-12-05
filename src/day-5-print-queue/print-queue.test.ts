import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { printQueue } from "./print-queue.js";

test("testing day-4-ceres-search", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  expect(printQueue(sample)).toBe(143);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  expect(printQueue(input)).toBe(5329);
});
