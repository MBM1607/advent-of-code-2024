import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { diskFragmenter } from "./disk-fragmenter.js";

test("testing day-9-disk-fragmenter", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  const { part1Checksum: samplePart1Checksum, part2Checksum: samplePart2Checksum } =
    diskFragmenter(sample);
  expect(samplePart1Checksum).toBe(1928);
  expect(samplePart2Checksum).toBe(2858);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  const { part1Checksum: inputPart1Checksum, part2Checksum: inputPart2Checksum } =
    diskFragmenter(input);
  expect(inputPart1Checksum).toBe(6399153661894);
  expect(inputPart2Checksum).toBe(6421724645083);
});
