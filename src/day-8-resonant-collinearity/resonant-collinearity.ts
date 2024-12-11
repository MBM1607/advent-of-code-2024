type Grid = [string[], ...string[][]];
export const resonantCollinearity = (input: string) => {
  const grid = input
    .trim()
    .split("\n")
    .map(row => row.split("")) as Grid;

  const rows = grid.length;
  const cols = grid[0].length;

  function isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < cols && y >= 0 && y < rows;
  }

  // Find all antennas and group them by frequency
  const antennas: Map<string, Array<[number, number]>> = new Map();

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const row = grid[x];
      if (!row) continue;

      const char = row[y];
      if (!char || char === ".") continue;

      if (!antennas.has(char)) {
        antennas.set(char, []);
      }
      antennas.get(char)!.push([x, y]);
    }
  }

  // Set to store unique antinode locations
  const antinodes = new Set<string>();
  const adjustedAntinodes = new Set<string>();

  // For each frequency, check all pairs of antennas
  // for (const antenna of antennas.values()) {
  //   for (const firstAntenna of antenna) {
  //     const [firstX, firstY] = firstAntenna;
  //     for (const secondAntenna of antenna) {
  //       const [secondX, secondY] = secondAntenna;
  //       if (firstX === secondX && firstY === secondY) continue;

  //       const dx = Math.abs(secondX - firstX);
  //       const dy = Math.abs(secondY - firstY);

  //       const x1 = firstX < secondX ? firstX - dx : firstX + dx;
  //       const y1 = firstY < secondY ? firstY - dy : firstY + dy;

  //       if (isInBounds(x1, y1)) {
  //         antinodes.add(`${x1},${y1}`);
  //       }

  //       const x2 = firstX < secondX ? firstX + dx : firstX - dx;
  //       const y2 = firstY < secondY ? firstY + dy : firstY - dy;

  //       if (isInBounds(x2, y2)) {
  //         antinodes.add(`${x2},${y2}`);
  //       }
  //     }
  //   }
  // }

  for (const antenna of antennas.values()) {
    for (const start of antenna) {
      const [startX, startY] = start;
      for (const end of antenna) {
        const [endX, endY] = end;
        if (startX === endX && startY === endY) continue;
        const xDiff = endX - startX;
        const yDiff = endY - startY;
        const xDiffAbs = Math.abs(endX - startX);
        const yDiffAbs = Math.abs(endY - startY);
        const x1 = startX < endX ? startX - xDiffAbs : startX + xDiffAbs;
        const y1 = startY < endY ? startY - yDiffAbs : startY + yDiffAbs;
        const row1 = grid[x1];
        if (row1?.[y1]) {
          antinodes.add(`${x1},${y1}`);
          row1[y1] = "#";
        }

        const x2 = startX < endX ? endX + xDiffAbs : endX - xDiffAbs;
        const y2 = startY < endY ? endY + yDiffAbs : endY - yDiffAbs;
        const row2 = grid[x2];
        if (row2?.[y2]) {
          antinodes.add(`${x2},${y2}`);
          row2[y2] = "#";
        }

        // adjusted calculation
        adjustedAntinodes.add(`${startX},${startY}`);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        grid[startX]![startY] = "#";
        adjustedAntinodes.add(`${endX},${endY}`);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        grid[endX]![endY] = "#";
        const x1Count = Math.floor((xDiff > 0 ? startX : rows - startX) / xDiffAbs);
        const y1Count = Math.floor((yDiff > 0 ? startY : cols - startY) / yDiffAbs);
        for (let i = 1; i <= Math.min(x1Count, y1Count); i++) {
          const currX = xDiff > 0 ? startX - i * xDiffAbs : startX + i * xDiffAbs;
          const currY = yDiff > 0 ? startY - i * yDiffAbs : startY + i * yDiffAbs;
          if (!grid[currX]?.[currY]) continue;
          adjustedAntinodes.add(`${currX},${currY}`);
          grid[currX][currY] = "#";
        }

        const x2Count = Math.floor((xDiff > 0 ? rows - endX : endX) / xDiffAbs);
        const y2Count = Math.floor((yDiff > 0 ? cols - endY : endY) / yDiffAbs);

        for (let i = 1; i <= Math.min(x2Count, y2Count); i++) {
          const currX = xDiff > 0 ? endX + i * xDiffAbs : endX - i * xDiffAbs;
          const currY = yDiff > 0 ? endY + i * yDiffAbs : endY - i * yDiffAbs;
          if (!grid[currX]?.[currY]) continue;
          adjustedAntinodes.add(`${currX},${currY}`);
          grid[currX][currY] = "#";
        }
      }
    }
  }

  return {
    antinodes: antinodes.size,
    adjustedAntinodes: adjustedAntinodes.size,
  };
};
