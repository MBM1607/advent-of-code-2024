import { readFile } from "fs/promises";
import path from "path";

import { expect, test } from "vitest";
import { mullItOver, mullItOverWithInstructions } from "./mull-it-over.js";

test("testing day-3-mull-it-over", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  expect(mullItOver(sample)).toBe(161);
  expect(mullItOverWithInstructions(sample)).toBe(48);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  expect(mullItOver(input)).toBe(188741603);
  expect(mullItOverWithInstructions(input)).toBe(67269798);
});
