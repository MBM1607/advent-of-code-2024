import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { resonantCollinearity } from "./resonant-collinearity.js";

test("testing day-8-resonant-collinearity", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  const { antinodes: sampleAntinodes, adjustedAntinodes: sampleAdjustedAntinodes } =
    resonantCollinearity(sample);
  expect(sampleAntinodes).toBe(14);
  expect(sampleAdjustedAntinodes).toBe(34);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  const { antinodes, adjustedAntinodes } = resonantCollinearity(input);
  expect(antinodes).toBe(305);
  expect(adjustedAntinodes).toBe(1150);
});
