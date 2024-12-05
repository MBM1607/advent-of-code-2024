const constructOrderMap = (orderingRules: string[]): Map<string, string[]> => {
  const map = new Map<string, string[]>();

  orderingRules.forEach(rule => {
    const [parent, child] = rule.split("|");
    if (!parent || !child) throw new Error(`Invalid ordering rule: ${rule}`);

    if (!map.has(parent)) map.set(parent, []);
    map.get(parent)?.push(child);
  });

  return map;
};

const isValidOrdering = (orderMap: Map<string, string[]>, numbers: string[]): boolean => {
  const seen = new Set<string>();

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i] as string;

    if (orderMap.has(current)) {
      const children = orderMap.get(current) as string[];

      for (const next of seen) {
        if (children.includes(next)) {
          return false;
        }
      }
    }

    seen.add(current);
  }
  return true;
};

const getMiddlePage = (pages: string[]): number => {
  const middleIndex = Math.floor(pages.length / 2);
  return Number(pages[middleIndex]);
};

const correctInvalidOrder = (orderMap: Map<string, string[]>, numbers: string[]): string[] => {
  const seen = new Set<string>();

  for (let i = 0; i < numbers.length; i++) {
    const current = numbers[i] as string;

    if (orderMap.has(current)) {
      const children = orderMap.get(current) as string[];
      const invalidNumbers = new Set<string>();
      if (orderMap.has(current)) {
        const children = orderMap.get(current) as string[];

        for (const prev of seen) {
          if (children.includes(prev)) {
            invalidNumbers.add(prev);
          }
        }
      }
      for (const num of invalidNumbers) {
        seen.delete(num);
      }
      seen.add(current);
      for (const num of invalidNumbers) {
        seen.add(num);
      }
    } else {
      seen.add(current);
    }
  }

  return Array.from(seen);
};

export const printQueue = (inputString: string): number => {
  const instructions = inputString.trim().split("\n");
  const splitIndex = instructions.findIndex(instruction => instruction === "");

  const orderingRules = instructions.slice(0, splitIndex);
  const queue = instructions.slice(splitIndex + 1).map(instruction => instruction.split(","));

  const orderMap = constructOrderMap(orderingRules);
  const validInstructions = queue.filter(instruction => isValidOrdering(orderMap, instruction));

  return validInstructions.reduce((acc, curr) => acc + getMiddlePage(curr), 0);
};

export const printInvalidQueue = (inputString: string): number => {
  const instructions = inputString.trim().split("\n");
  const splitIndex = instructions.findIndex(instruction => instruction === "");

  const orderingRules = instructions.slice(0, splitIndex);
  const queue = instructions.slice(splitIndex + 1).map(instruction => instruction.split(","));

  const orderMap = constructOrderMap(orderingRules);
  const invalidInstructions = queue.filter(instruction => !isValidOrdering(orderMap, instruction));
  const correctedInstructions = invalidInstructions.map(instruction =>
    correctInvalidOrder(orderMap, instruction),
  );

  return correctedInstructions.reduce((acc, curr) => acc + getMiddlePage(curr), 0);
};
