import { assertEquals } from "@std/assert/equals";
import {
  calculateSimilarityScore,
  calculateTotalDistanceBetweenLists,
  parseInput,
} from "./index.ts";
import { dirname, fromFileUrl, join } from "@std/path";

const puzzleDir = dirname(fromFileUrl(import.meta.url));

const readPuzzleFile = async (fileName: string): Promise<string> => {
  return await Deno.readTextFile(join(puzzleDir, fileName));
};

const getExampleLists = async () => {
  const example = await readPuzzleFile("example.txt");
  return parseInput(example);
};

const getInputLists = async () => {
  const input = await readPuzzleFile("input.txt");
  return parseInput(input);
};

Deno.test("parses part 1 example", async () => {
  const [leftList, rightList] = await getExampleLists();

  assertEquals(leftList, [3, 4, 2, 1, 3, 3]);
  assertEquals(rightList, [4, 3, 5, 3, 9, 3]);
});

Deno.test("solves part 1 example", async () => {
  const [leftList, rightList] = await getExampleLists();

  assertEquals(calculateTotalDistanceBetweenLists(leftList, rightList), 11);
});

Deno.test("solves part 1 input", async () => {
  const [leftList, rightList] = await getInputLists();

  assertEquals(
    calculateTotalDistanceBetweenLists(leftList, rightList),
    1603498,
  );
});

Deno.test("solves part 2 example", async () => {
  const [leftList, rightList] = await getExampleLists();

  assertEquals(calculateSimilarityScore(leftList, rightList), 31);
});

Deno.test("solves part 2 input", async () => {
  const [leftList, rightList] = await getInputLists();

  assertEquals(calculateSimilarityScore(leftList, rightList), 25574739);
});
