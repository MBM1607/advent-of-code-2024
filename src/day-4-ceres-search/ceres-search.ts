const regex = /XMAS/gm;

const countXmasWord = (input: string): number =>
  (input.match(regex)?.length || 0) +
  (input.split("").toReversed().join("").match(regex)?.length || 0);

export const xmasWordSearch = (input: string): number => {
  const horizontals = input.trim().split("\n");
  const verticals: string[] = [];
  const diagonals: Record<string, string> = {};

  if (!horizontals[0]) throw new Error("Input needs to have at least one line");

  for (let i = 0; i < horizontals[0].length; i++) {
    if (!verticals[i]) verticals[i] = "";

    for (let j = 0; j < horizontals.length; j++) {
      verticals[i] += horizontals[j]?.[i] || ".";

      const primaryDiagonalIdx = `p-${j - i}`;
      const secondaryDiagonalIdx = `s-${j + i}`;
      if (!diagonals[primaryDiagonalIdx]) diagonals[primaryDiagonalIdx] = "";
      if (!diagonals[secondaryDiagonalIdx]) diagonals[secondaryDiagonalIdx] = "";
      diagonals[primaryDiagonalIdx] += horizontals[j]?.[i] || ".";
      diagonals[secondaryDiagonalIdx] += horizontals[j]?.[i] || ".";
    }
  }

  console.log({ horizontals, verticals, diagonals: Object.values(diagonals) });

  return (
    horizontals.reduce((acc, row) => acc + countXmasWord(row), 0) +
    verticals.reduce((acc, row) => acc + countXmasWord(row), 0) +
    Object.values(diagonals).reduce((acc, row) => acc + countXmasWord(row), 0)
  );
};

const strToGrid = (input: string) =>
  input.split("\n").map(row => row.split("")) as [string[], ...string[][]];
const transpose = (input: [string[], ...string[][]]) =>
  input[0].map((_, i) => input.map(row => row[i] as string)) as [string[], ...string[][]];
const getAll3x3Grid = (input: [string[], ...string[][]]): string[] => {
  const grids: string[] = [];

  for (let i = 0; i < input.length - 2; i++) {
    for (let j = 0; j < input[0].length - 2; j++) {
      const grid = input
        .slice(i, i + 3)
        .map(row => row.slice(j, j + 3).join(""))
        .join("\n");
      grids.push(grid);
    }
  }

  return grids;
};

export const xMasSymbolSearch = (input: string): number => {
  const grid = strToGrid(input);
  const regex = /M.S\n.A.\nM.S/gm;
  const grids = [...getAll3x3Grid(grid), ...getAll3x3Grid(transpose(grid))];

  console.log(grids);

  return grids.reduce((acc, grid) => {
    return acc + (grid.match(regex) || grid.split("").toReversed().join("").match(regex) ? 1 : 0);
  }, 0);
};
