type Operator = "+" | "*" | "||";

const canNumbersMakeTarget = (
  target: number,
  numbers: number[],
  operators: Operator[] = ["+", "*"],
  total = 0,
  string = "",
): boolean => {
  if (numbers.length === 0) return total === target;

  const [first, ...rest] = numbers as [number, ...number[]];

  if (total === 0) return canNumbersMakeTarget(target, rest, operators, first, first.toString());

  return operators.some(operator => {
    if (operator === "+") {
      return canNumbersMakeTarget(target, rest, operators, total + first);
    } else if (operator === "*") {
      return canNumbersMakeTarget(target, rest, operators, total * first);
    } else {
      const newTotal = parseInt(total.toString() + first.toString());
      return canNumbersMakeTarget(target, rest, operators, newTotal);
    }
  });
};

export const bridgeRepair = (input: string) => {
  const values = input
    .trim()
    .split("\n")
    .map(row => {
      const [target, options] = row.split(":").map(value => value.trim());
      return { target: Number(target), options: options?.split(" ").map(Number) || [] };
    });

  let totalCalibrationResult = 0;
  let adjustedTotalCalibrationResult = 0;

  for (const value of values) {
    const { target, options } = value;

    if (canNumbersMakeTarget(target, options)) {
      totalCalibrationResult += target;
    }
    if (canNumbersMakeTarget(target, options, ["+", "*", "||"])) {
      adjustedTotalCalibrationResult += target;
    }
  }

  return {
    totalCalibrationResult,
    adjustedTotalCalibrationResult,
  };
};
