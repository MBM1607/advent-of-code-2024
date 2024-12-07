type Coords = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";

const getGridFromInput = (input: string) => {
  const grid = input
    .trim()
    .split("\n")
    .map(row => row.split(""));

  const gridMap = new Map<string, string>();

  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      gridMap.set(`${x},${y}`, cell);
    });
  });

  return { grid, gridMap };
};

const isLoopingObstruction = (grid: string[][], obstacle: Coords, start: Coords) => {
  const visitedMap = new Map<string, Set<Direction>>();

  let currentX = start.x;
  let currentY = start.y;

  let currentDirection: Direction = "up";

  while (true) {
    const nextX =
      currentDirection === "up"
        ? currentX - 1
        : currentDirection === "down"
        ? currentX + 1
        : currentX;
    const nextY =
      currentDirection === "left"
        ? currentY - 1
        : currentDirection === "right"
        ? currentY + 1
        : currentY;

    if (nextX < 0 || nextY < 0 || !grid[nextX] || !grid[nextX][nextY]) break;

    if (grid[nextX][nextY] === "#" || (nextX === obstacle.x && nextY === obstacle.y)) {
      const visitedDirections = visitedMap.get(`${currentX},${currentY}`) || new Set();
      if (visitedDirections.has(currentDirection)) {
        return true;
      }

      visitedDirections.add(currentDirection);
      visitedMap.set(`${currentX},${currentY}`, visitedDirections);

      currentDirection =
        currentDirection === "up"
          ? "right"
          : currentDirection === "right"
          ? "down"
          : currentDirection === "down"
          ? "left"
          : "up";
      continue;
    }

    currentX = nextX;
    currentY = nextY;
  }

  return false;
};

export const getGuardPositions = (input: string) => {
  const { grid, gridMap } = getGridFromInput(input);
  const newGrid = grid.map(row => [...row]);
  let guardX = grid.findIndex(row => row.includes("^"));
  let guardY = grid[guardX]?.indexOf("^") as number;
  const start = { x: guardX, y: guardY };
  let loopObstacles = new Set<string>();

  let guardDirection: Direction = "up";

  while (true) {
    const nextX =
      guardDirection === "up" ? guardX - 1 : guardDirection === "down" ? guardX + 1 : guardX;
    const nextY =
      guardDirection === "left" ? guardY - 1 : guardDirection === "right" ? guardY + 1 : guardY;

    if (nextX < 0 || nextY < 0 || !grid[nextX] || !grid[nextX][nextY]) break;

    if (gridMap.get(`${nextX},${nextY}`) === "#") {
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
      if (isLoopingObstruction(grid, { x: guardX, y: guardY }, start)) {
        loopObstacles.add(`${guardX},${guardY}`);
      }
    }
  }

  return {
    distinctPositions: newGrid.flat().filter(cell => cell === "X").length,
    loopingObstructionPositions: loopObstacles.size,
  };
};
