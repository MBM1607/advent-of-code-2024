// Nice Math Trick to get digits without having to convert number to string
// This helps to avoid converting odd numbers to strings in our case.
const numDigits = (num: number) => (Math.log(num) * Math.LOG10E + 1) | 0;

const map = new Map<string, number>();

const saveInMap = (key: string, result: number): number => {
  map.set(key, result);
  return result;
};

export const countAfterBlink = (stone: number, blinkCount: number): number => {
  // Check if value is already calculated and use that value if so
  const key = `${stone}-${blinkCount}`;
  const countInMap = map.get(key);
  if (countInMap) {
    return countInMap;
  }

  // Base Case: We return single stone here
  if (blinkCount == 0) return 1;

  if (stone === 0) {
    return saveInMap(key, countAfterBlink(1, blinkCount - 1));
  } else if (numDigits(stone) % 2 === 0) {
    const stoneStr = stone.toString();
    const midpoint = stoneStr.length / 2;
    const firstStone = Number(stoneStr.slice(0, midpoint));
    const secondStone = Number(stoneStr.slice(midpoint));
    return saveInMap(
      key,
      saveInMap(key, countAfterBlink(firstStone, blinkCount - 1)) +
        saveInMap(key, countAfterBlink(secondStone, blinkCount - 1)),
    );
  }

  return saveInMap(key, countAfterBlink(stone * 2024, blinkCount - 1));
};

export const plutonianPebbles = (input: string, blinkCount: number) => {
  let stones = input.trim().split(" ").map(Number);
  let stoneCount = 0;

  for (const stone of stones) {
    stoneCount += countAfterBlink(stone, blinkCount);
  }

  return {
    stoneCount,
  };
};
