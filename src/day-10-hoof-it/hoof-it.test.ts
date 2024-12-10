import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { hoofIt } from "./hoof-it.js";

test("testing day-10-hoof-it", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  const { trailheadScore: sampleTrailheadScore } = hoofIt(sample);
  expect(sampleTrailheadScore).toBe(36);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  const { trailheadScore } = hoofIt(input);
  expect(trailheadScore).toBe(694);
});