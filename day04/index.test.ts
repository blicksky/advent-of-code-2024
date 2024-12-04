import { dirname } from "@std/path/dirname";
import { fromFileUrl } from "@std/path/from-file-url";
import { join } from "@std/path/join";
import { parseInput, part1, part2 } from "./index.ts";
import { assertEquals } from "@std/assert/equals";

const puzzleDir = dirname(fromFileUrl(import.meta.url));

const readPuzzleFile = async (fileName: string): Promise<string> => {
  return await Deno.readTextFile(join(puzzleDir, fileName));
};

Deno.test("solves example for part 1", async () => {
  const input = await readPuzzleFile("example.txt");
  assertEquals(part1(parseInput(input)), 18);
});

Deno.test("solves input for part 1", async () => {
  const input = await readPuzzleFile("input.txt");
  assertEquals(part1(parseInput(input)), 2336);
});

Deno.test("solves example for part 2", async () => {
  const input = await readPuzzleFile("example.txt");
  assertEquals(part2(input), 0);
});

Deno.test("solves input for part 2", async () => {
  const input = await readPuzzleFile("input.txt");
  assertEquals(part2(input), 0);
});
