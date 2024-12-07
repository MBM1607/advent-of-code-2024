import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { getGuardPositions } from "./guard-gallivant.js";

test("testing day-6-guard-gallivant", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  const {
    distinctPositions: sampleDistinctPositions,
    loopingObstructionPositions: sampleLoopingObstructionPositions,
  } = getGuardPositions(sample);
  expect(sampleDistinctPositions).toBe(41);
  expect(sampleLoopingObstructionPositions).toBe(6);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  const { distinctPositions, loopingObstructionPositions } = getGuardPositions(input);
  expect(distinctPositions).toBe(4758);
  expect(loopingObstructionPositions).toBe(1670);
});
