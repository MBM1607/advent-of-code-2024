type Grid = [number[], ...number[][]];

const calculateTrail = (grid: Grid, i: number, j: number, ends: string[] = []) => {
  const row = grid[i];
  if (!row) throw new Error("No row found");
  const cell = row[j];
  if (cell === undefined) throw new Error("No cell found");
  if (cell === 9) {
    ends.push(`${i},${j}`);
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
    calculateTrail(grid, i, j, ends);
  }

  if (cell === 0) return { score: new Set(ends).size, rating: ends.length };
};

export const hoofIt = (input: string) => {
  const grid = input
    .trim()
    .split("\n")
    .map(row => row.split("").map(Number)) as Grid;

  let trailheadScore = 0;
  let trailheadRating = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const row = grid[i];
      if (!row) throw new Error("No row found");
      const cell = row[j];
      if (cell === undefined) throw new Error("No cell found");

      if (cell === 0) {
        const trail = calculateTrail(grid, i, j);
        if (trail) {
          trailheadScore += trail.score;
          trailheadRating += trail.rating;
        }
      }
    }
  }

  return {
    trailheadScore,
    trailheadRating,
  };
};
