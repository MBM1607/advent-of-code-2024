import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { xMasSymbolSearch, xmasWordSearch } from "./ceres-search.js";

test("testing day-4-ceres-search", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  expect(xmasWordSearch(sample)).toBe(18);
  expect(xMasSymbolSearch(sample)).toBe(9);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  expect(xmasWordSearch(input)).toBe(2583);
  expect(xMasSymbolSearch(input)).toBe(1978);
});
