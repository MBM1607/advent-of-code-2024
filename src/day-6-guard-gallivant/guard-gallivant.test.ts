import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { getGuardPositions } from "./guard-gallivant.js";

test("testing day-6-guard-gallivant", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  expect(getGuardPositions(sample)).toBe(41);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  expect(getGuardPositions(input)).toBe(4758);
});
