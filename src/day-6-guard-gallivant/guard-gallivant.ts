type Direction = "up" | "down" | "left" | "right";

const getGridFromInput = (input: string): string[][] => {
  return input
    .trim()
    .split("\n")
    .map(row => row.split(""));
};

export const getGuardPositions = (input: string): number => {
  const grid = getGridFromInput(input);
  const newGrid = grid.map(row => [...row]);
  let guardX = grid.findIndex(row => row.includes("^"));
  let guardY = grid[guardX]?.indexOf("^") as number;

  let guardDirection: Direction = "up";

  while (true) {
    const nextX =
      guardDirection === "up" ? guardX - 1 : guardDirection === "down" ? guardX + 1 : guardX;
    const nextY =
      guardDirection === "left" ? guardY - 1 : guardDirection === "right" ? guardY + 1 : guardY;

    if (nextX < 0 || nextY < 0 || !grid[nextX] || !grid[nextX][nextY]) break;

    if (grid[nextX] && grid[nextX][nextY] === "#") {
      guardDirection =
        guardDirection === "up"
          ? "right"
          : guardDirection === "right"
          ? "down"
          : guardDirection === "down"
          ? "left"
          : "up";
      continue;
    }

    guardX = nextX;
    guardY = nextY;

    const row = newGrid[guardX];
    if (row) {
      row[guardY] = "X";
    }
  }

  return newGrid.flat().filter(cell => cell === "X").length;
};
