type Grid = [number[], ...number[][]];

const calculateTrailheadScore = (
  grid: Grid,
  i: number,
  j: number,
  set: Set<string> = new Set<string>(),
) => {
  const row = grid[i];
  if (!row) throw new Error("No row found");
  const cell = row[j];
  if (cell === undefined) throw new Error("No cell found");
  if (cell === 9) {
    set.add(`${i},${j}`);
    return;
  }

  const neighbors: [number, number][] = [];
  if (i > 0) {
    const neighbor = grid[i - 1]?.[j] as number;
    if (neighbor === cell + 1) {
      neighbors.push([i - 1, j]);
    }
  }
  if (i < grid.length - 1) {
    const neighbor = grid[i + 1]?.[j] as number;
    if (neighbor === cell + 1) {
      neighbors.push([i + 1, j]);
    }
  }
  if (j > 0) {
    const neighbor = grid[i]?.[j - 1] as number;
    if (neighbor === cell + 1) {
      neighbors.push([i, j - 1]);
    }
  }
  if (j < grid[0].length - 1) {
    const neighbor = grid[i]?.[j + 1] as number;
    if (neighbor === cell + 1) {
      neighbors.push([i, j + 1]);
    }
  }

  for (const [i, j] of neighbors) {
    calculateTrailheadScore(grid, i, j, set);
  }

  if (cell === 0) return set.size;
};

export const hoofIt = (input: string) => {
  const grid = input
    .trim()
    .split("\n")
    .map(row => row.split("").map(Number)) as Grid;

  let trailheadScore = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const row = grid[i];
      if (!row) throw new Error("No row found");
      const cell = row[j];
      if (cell === undefined) throw new Error("No cell found");

      if (cell === 0) {
        const score = calculateTrailheadScore(grid, i, j);
        if (score) trailheadScore += score;
      }
    }
  }

  return {
    trailheadScore,
  };
};
