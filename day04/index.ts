type Letter = "X" | "M" | "A" | "S";
type WordSearch = Letter[][];
type DirectionValue = -1 | 0 | 1;
type Direction = readonly [DirectionValue, DirectionValue];
type DirectionPair = readonly [Direction, Direction];

const RIGHT: Direction = [0, 1];
const LEFT: Direction = [0, -1];
const DOWN: Direction = [1, 0];
const UP: Direction = [-1, 0];
const DOWN_RIGHT: Direction = [1, 1];
const DOWN_LEFT: Direction = [1, -1];
const UP_RIGHT: Direction = [-1, 1];
const UP_LEFT: Direction = [-1, -1];

export function parseInput(input: string): WordSearch {
  return input.split("\n").map((line) => line.split("") as Letter[]);
}

export function part1(input: WordSearch) {
  const directions: ReadonlyArray<Direction> = [
    RIGHT,
    LEFT,
    DOWN,
    UP,
    DOWN_RIGHT,
    DOWN_LEFT,
    UP_RIGHT,
    UP_LEFT,
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
  const diagonals: ReadonlyArray<DirectionPair> = [
    [DOWN_RIGHT, UP_LEFT],
    [DOWN_LEFT, UP_RIGHT],
  ] as const;

  function checkMAS(
    startRow: number,
    startCol: number,
    diagonal: DirectionPair,
  ): boolean {
    const [delta1, delta2] = diagonal;
    const row1 = startRow + delta1[0];
    const col1 = startCol + delta1[1];
    const row2 = startRow + delta2[0];
    const col2 = startCol + delta2[1];

    if (
      row1 < 0 || row1 >= input.length || col1 < 0 || col1 >= input[0].length ||
      row2 < 0 || row2 >= input.length || col2 < 0 || col2 >= input[0].length
    ) {
      return false;
    }

    // Check if we have M in one direction and S in the other
    return (input[row1][col1] === "M" && input[row2][col2] === "S") ||
      (input[row1][col1] === "S" && input[row2][col2] === "M");
  }

  let count = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] === "A") {
        // For each A, check both diagonal pairs
        const matches = diagonals.map((diagonal) =>
          checkMAS(row, col, diagonal)
        );
        // Only count if both diagonal pairs form valid MAS patterns
        if (matches.every((match) => match)) {
          count++;
        }
      }
    }
  }
  return count;
}
