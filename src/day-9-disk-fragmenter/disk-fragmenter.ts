type FileBlock = {
  id: number;
  size: number;
  position: number;
};

type Block = number | null;

const calculateTotalLength = (files: FileBlock[]) => {
  const lastFile = files[files.length - 1] as FileBlock;
  return lastFile.position + lastFile.size;
};

const calculateChecksum = (blocks: number[]) =>
  blocks.reduce((sum, block, index) => sum + index * block, 0);

const countConsecutiveBlocks = (blocks: Block[], start: number, id: number) => {
  let count = 0;
  for (let i = start; i < blocks.length && blocks[i] === id; i++) {
    count++;
  }
  return count;
};

const findLeftmostFreeSpaceForFile = (blocks: Block[], size: number) => {
  for (let i = 0; i < blocks.length; i++) {
    let hasEnoughSpace = true;
    for (let j = 0; j < size; j++) {
      if (blocks[i + j] !== null) {
        hasEnoughSpace = false;
        break;
      }
    }
    if (hasEnoughSpace) {
      return i;
    }
  }
  return blocks.length;
};

const moveFile = (blocks: Block[], from: number, to: number, size: number) => {
  const fileId = blocks[from] as Block;
  for (let i = 0; i < size; i++) {
    blocks[from + i] = null;
  }
  for (let i = 0; i < size; i++) {
    blocks[to + i] = fileId;
  }
};

const parseDiskMap = (input: string): FileBlock[] => {
  const numbers = input.split("").map(Number);
  const files: FileBlock[] = [];
  let position = 0;
  let id = 0;

  for (let i = 0; i < numbers.length; i += 2) {
    const size = numbers[i] as number;
    const freeSpace = numbers[i + 1] || 0;
    files.push({
      id,
      size,
      position,
    });
    position += size + freeSpace;
    id++;
  }

  return files;
};

export const compactDiskPart1 = (blocks: Block[]): number => {
  // Compact files one block at a time from right to left
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];
    if (block === undefined || block === null) continue;

    let targetPosition = blocks.indexOf(null); // Get the first null (free space) index
    if (targetPosition >= i) continue;

    blocks[targetPosition] = block;
    blocks[i] = null;
  }

  const leftMostFreeSpace = blocks.indexOf(null);
  const blocksWithFiles = blocks.slice(0, leftMostFreeSpace) as number[];

  return calculateChecksum(blocksWithFiles);
};

export function compactDiskPart2(files: FileBlock[], blocks: Block[]): number {
  // Sort files by ID in descending order
  const sortedFiles = [...files].sort((a, b) => b.id - a.id);

  // Move each file to leftmost possible position if there is enough free space
  for (const file of sortedFiles) {
    const currentPos = blocks.indexOf(file.id);
    const fileSize = countConsecutiveBlocks(blocks, currentPos, file.id);
    const targetPos = findLeftmostFreeSpaceForFile(blocks, fileSize);

    if (targetPos < currentPos) {
      // Move the entire file
      moveFile(blocks, currentPos, targetPos, fileSize);
    }
  }

  return calculateChecksum(blocks.map(block => block ?? 0));
}

export const diskFragmenter = (input: string) => {
  const files = parseDiskMap(input);
  const blocks: Block[] = new Array(calculateTotalLength(files)).fill(null);

  for (const file of files) {
    for (let i = 0; i < file.size; i++) {
      blocks[file.position + i] = file.id;
    }
  }

  return {
    part1Checksum: compactDiskPart1([...blocks]),
    part2Checksum: compactDiskPart2(files, [...blocks]),
  };
};
