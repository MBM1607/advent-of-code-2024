const getLastNonFreeSpaceIndex = (blocks: string[]) => {
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i] !== ".") return [i, blocks[i] as string] as const;
  }
  throw new Error("No non-free space found");
};

export const diskFragmenter = (input: string) => {
  const diskmap = input.trim().split("");
  let diskCount = 0;
  let blocks = diskmap.reduce<string[]>((acc, curr, i) => {
    let character = ".";
    if (i % 2 === 0) {
      character = diskCount.toString();
      diskCount++;
    }

    for (let i = 0; i < Number(curr); i++) {
      acc.push(character);
    }
    return acc;
  }, []);

  while (true) {
    const freeSpaceIndex = blocks.indexOf(".");
    const lastFreeSpaceIndex = blocks.lastIndexOf(".");

    if (!blocks.slice(freeSpaceIndex, lastFreeSpaceIndex).some(block => block !== ".")) {
      // If there is a non-dot character in the free space, we need to move it to the start
      break;
    }

    const [lastNonFreeSpaceIndex, lastDiskFileBlock] = getLastNonFreeSpaceIndex(blocks);

    blocks[freeSpaceIndex] = lastDiskFileBlock;
    blocks[lastNonFreeSpaceIndex] = ".";
  }

  const freeSpaceIndex = blocks.indexOf(".");

  let checksum = blocks.slice(0, freeSpaceIndex).reduce((acc, curr, i) => {
    return acc + i * Number(curr);
  }, 0);

  return {
    checksum,
  };
};
