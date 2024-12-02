import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { listDistance, similarityScore } from "./historian-hysteria.js";

test("testing day-1-historian-hysteria", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  const sampleInput = sample
    .trim()
    .split("\n")
    .map(line => line.split("   ").map(Number));
  const firstList = sampleInput.map(([a]) => a) as number[];
  const secondList = sampleInput.map(([, b]) => b) as number[];
  expect(listDistance(firstList, secondList)).toBe(11);
  expect(similarityScore(firstList, secondList)).toBe(31);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  const parsedInput = input
    .trim()
    .split("\n")
    .map(line => line.split("   ").map(Number));
  const firstListInput = parsedInput.map(([a]) => a) as number[];
  const secondListInput = parsedInput.map(([, b]) => b) as number[];
  expect(listDistance(firstListInput, secondListInput)).toBe(1579939);
  expect(similarityScore(firstListInput, secondListInput)).toBe(20351745);
});
