import { readFile } from "fs/promises";
import path from "path";
import { expect, test } from "vitest";
import { bridgeRepair } from "./bridge-repair.js";

test("testing day-7-bridge-repair", async () => {
  const sample = await readFile(path.join(__dirname, "sample.txt"), "utf-8");
  const {
    totalCalibrationResult: sampleTotalCalibrationResult,
    adjustedTotalCalibrationResult: sampleAdjustedTotalCalibrationResult,
  } = bridgeRepair(sample);
  expect(sampleTotalCalibrationResult).toBe(3749);
  expect(sampleAdjustedTotalCalibrationResult).toBe(11387);

  const input = await readFile(path.join(__dirname, "input.txt"), "utf-8");
  const { totalCalibrationResult, adjustedTotalCalibrationResult } = bridgeRepair(input);
  expect(totalCalibrationResult).toBe(5837374519342);
  expect(adjustedTotalCalibrationResult).toBe(492383931650959);
});
