export type Letter = "X" | "M" | "A" | "S";
export type WordSearch = Letter[][];

export function parseInput(input: string): WordSearch {
  return input.split("\n").map((line) => line.split("") as Letter[]);
}

export function part1(input: WordSearch) {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === "X") {
        // Check right
        if (
          j + 3 < input[i].length && input[i][j + 1] === "M" &&
          input[i][j + 2] === "A" && input[i][j + 3] === "S"
        ) {
          count++;
        }
        // Check left
        if (
          j - 3 >= 0 && input[i][j - 1] === "M" && input[i][j - 2] === "A" &&
          input[i][j - 3] === "S"
        ) {
          count++;
        }
        // Check down
        if (
          i + 3 < input.length && input[i + 1][j] === "M" &&
          input[i + 2][j] === "A" && input[i + 3][j] === "S"
        ) {
          count++;
        }
        // Check up
        if (
          i - 3 >= 0 && input[i - 1][j] === "M" && input[i - 2][j] === "A" &&
          input[i - 3][j] === "S"
        ) {
          count++;
        }
        // Check diagonal down-right
        if (
          i + 3 < input.length && j + 3 < input[i].length &&
          input[i + 1][j + 1] === "M" && input[i + 2][j + 2] === "A" &&
          input[i + 3][j + 3] === "S"
        ) {
          count++;
        }
        // Check diagonal down-left
        if (
          i + 3 < input.length && j - 3 >= 0 &&
          input[i + 1][j - 1] === "M" && input[i + 2][j - 2] === "A" &&
          input[i + 3][j - 3] === "S"
        ) {
          count++;
        }
        // Check diagonal up-right
        if (
          i - 3 >= 0 && j + 3 < input[i].length &&
          input[i - 1][j + 1] === "M" && input[i - 2][j + 2] === "A" &&
          input[i - 3][j + 3] === "S"
        ) {
          count++;
        }
        // Check diagonal up-left
        if (
          i - 3 >= 0 && j - 3 >= 0 &&
          input[i - 1][j - 1] === "M" && input[i - 2][j - 2] === "A" &&
          input[i - 3][j - 3] === "S"
        ) {
          count++;
        }
      }
    }
  }
  return count;
}

export function part2(input: WordSearch) {
  // TODO: Implement part 2
  return 0;
}
