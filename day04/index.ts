export type Letter = "X" | "M" | "A" | "S";
export type WordSearch = Letter[][];

export function parseInput(input: string): WordSearch {
  return input.split("\n").map((line) => line.split("") as Letter[]);
}

export function part1(input: WordSearch) {
  const directions: ReadonlyArray<readonly [number, number]> = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
    [1, 1], // diagonal down-right
    [1, -1], // diagonal down-left
    [-1, 1], // diagonal up-right
    [-1, -1], // diagonal up-left
  ] as const;

  function checkXMAS(
    startRow: number,
    startCol: number,
    deltaRow: number,
    deltaCol: number,
  ): boolean {
    const pattern = ["X", "M", "A", "S"] as const;

    for (let position = 0; position < 4; position++) {
      const currentRow = startRow + position * deltaRow;
      const currentCol = startCol + position * deltaCol;

      if (
        currentRow < 0 || currentRow >= input.length ||
        currentCol < 0 || currentCol >= input[0].length ||
        input[currentRow][currentCol] !== pattern[position]
      ) {
        return false;
      }
    }
    return true;
  }

  return input.reduce(
    (count, row, rowIndex) =>
      count +
      row.reduce((rowCount, cell, colIndex) =>
        cell === "X"
          ? rowCount + directions.reduce((dirCount, [deltaRow, deltaCol]) =>
            dirCount +
            (checkXMAS(rowIndex, colIndex, deltaRow, deltaCol) ? 1 : 0), 0)
          : rowCount, 0),
    0,
  );
}

export function part2(input: WordSearch) {
  // TODO: Implement part 2
  return 0;
}
