import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  countBadLevels,
  isReportSafe,
  isReportSafeWithDampener,
  parseInput,
} from "./index.ts";
import { dirname } from "@std/path/dirname";
import { fromFileUrl } from "@std/path/from-file-url";
import { join } from "@std/path/join";

const puzzleDir = dirname(fromFileUrl(import.meta.url));

const readPuzzleFile = async (fileName: string): Promise<string> => {
  return await Deno.readTextFile(join(puzzleDir, fileName));
};

Deno.test("parseInput parses example input", async () => {
  const input = await readPuzzleFile("example.txt");

  const expected = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ];

  assertEquals(parseInput(input), expected);
});

Deno.test("isReportSafe correctly identifies safe reports in example input", async () => {
  const input = await readPuzzleFile("example.txt");

  const safeReportCount = parseInput(input).filter(isReportSafe).length;
  assertEquals(safeReportCount, 2);
});

Deno.test("isReportSafe correctly identifies safe reports in input", async () => {
  const input = await readPuzzleFile("input.txt");

  const safeReportCount = parseInput(input).filter(isReportSafe).length;
  assertEquals(safeReportCount, 411);
});

Deno.test(
  "isReportSafeWithDampener correctly identifies safe reports in example input",
  async () => {
    const input = await readPuzzleFile("example.txt");

    const safeReportCount = parseInput(input).filter(isReportSafeWithDampener)
      .length;
    assertEquals(safeReportCount, 4);
  },
);

Deno.test(
  "isReportSafeWithDampener correctly identifies safe reports in input",
  async () => {
    const input = await readPuzzleFile("input.txt");

    const safeReportCount = parseInput(input).filter(isReportSafeWithDampener)
      .length;
    assertEquals(safeReportCount, 465);
  },
);
