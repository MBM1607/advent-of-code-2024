import { readFile } from "fs/promises";
import path from "path";

import { expect, test } from "vitest";
import { safeReports } from "./red-nosed-reports.js";

test("testing day-2-red-nosed-reports", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  const sampleInput = sample
    .trim()
    .split("\n")
    .map(line => line.split(" ").map(Number));
  expect(safeReports(sampleInput)).toBe(2);
  expect(safeReports(sampleInput, true)).toBe(4);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  const parsedInput = input
    .trim()
    .split("\n")
    .map(line => line.split(" ").map(Number));
  expect(safeReports(parsedInput)).toBe(639);
  expect(safeReports(parsedInput, true)).toBe(674);
});
