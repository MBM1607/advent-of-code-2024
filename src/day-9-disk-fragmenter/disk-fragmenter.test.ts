import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { diskFragmenter } from "./disk-fragmenter.js";

test("testing day-9-disk-fragmenter", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  const { checksum: sampleChecksum } = diskFragmenter(sample);
  expect(sampleChecksum).toBe(1928);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  const { checksum } = diskFragmenter(input);
  expect(checksum).toBe(6399153661894);
});
