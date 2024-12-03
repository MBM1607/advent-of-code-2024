export const mullItOver = (input: string, mullRegex = /mul\((\d+),(\d+)\)/gm): number => {
  let total = 0;

  while (true) {
    const match = mullRegex.exec(input);
    if (match === null) {
      break;
    }

    const [, a, b] = match;

    total += Number(a) * Number(b);
  }

  return total;
};

export const mullItOverWithInstructions = (input: string): number => {
  const newInput = input.replaceAll(
    /don't\(\)[\s\S]*?(?:do\(\))|don't\(\)[\s\S]*(?!do\(\))/gm,
    "",
  );
  return mullItOver(newInput);
};
