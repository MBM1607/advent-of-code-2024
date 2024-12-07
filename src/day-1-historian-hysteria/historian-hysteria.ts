export const listDistance = (firstList: number[], secondList: number[]): number => {
  const sortedFirstList = firstList.sort((a, b) => a - b);
  const sortedSecondList = secondList.sort((a, b) => a - b);

  if (sortedFirstList.length !== sortedSecondList.length)
    throw new Error("Lists must be of equal length");

  return sortedFirstList.reduce((acc, curr, i) => {
    return acc + Math.abs(curr - (sortedSecondList[i] || 0));
  }, 0);
};

export const similarityScore = (firstList: number[], secondList: number[]): number =>
  firstList.reduce(
    (acc, firstListElement) =>
      acc +
      firstListElement *
        secondList.filter(secondListElement => secondListElement === firstListElement).length,
    0,
  );
