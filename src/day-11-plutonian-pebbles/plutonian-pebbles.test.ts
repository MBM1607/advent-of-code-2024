import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { plutonianPebbles } from "./plutonian-pebbles.js";

test("testing day-11-plutonian-pebbles", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  const { stoneCount: sampleStoneCount } = plutonianPebbles(sample, 25);
  const { stoneCount: sampleStoneCountPartTwo } = plutonianPebbles(sample, 75);
  expect(sampleStoneCount).toBe(55312);
  expect(sampleStoneCountPartTwo).toBe(65601038650482);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  const { stoneCount } = plutonianPebbles(input, 25);
  const { stoneCount: stoneCountPartTwo } = plutonianPebbles(input, 75);
  expect(stoneCount).toBe(212655);
  expect(stoneCountPartTwo).toBe(253582809724830);
});
