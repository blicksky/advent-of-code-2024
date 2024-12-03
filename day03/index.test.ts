import { dirname } from "@std/path/dirname";
import { fromFileUrl } from "@std/path/from-file-url";
import { join } from "@std/path/join";
import { executeCorruptedProgram } from "./index.ts";
import { assertEquals } from "@std/assert/equals";

const puzzleDir = dirname(fromFileUrl(import.meta.url));

const readPuzzleFile = async (fileName: string): Promise<string> => {
  return await Deno.readTextFile(join(puzzleDir, fileName));
};

Deno.test("solves example", async () => {
  const input = await readPuzzleFile("example.txt");

  assertEquals(executeCorruptedProgram(input), 161);
});

Deno.test("solves input", async () => {
  const input = await readPuzzleFile("input.txt");

  assertEquals(executeCorruptedProgram(input), 192767529);
});
