import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { parseInput, part1, part2 } from "./index.ts";

const example = await Deno.readTextFile(
  new URL("./example.txt", import.meta.url),
);
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

Deno.test("part 1 - example", () => {
  const parsedInput = parseInput(example);
  assertEquals(part1(parsedInput), 143);
});

Deno.test("part 1 - input", () => {
  const parsedInput = parseInput(input);
  assertEquals(part1(parsedInput), 4462);
});

Deno.test("part 2 - example", () => {
  const parsedInput = parseInput(example);
  assertEquals(part2(parsedInput), 123);
});

Deno.test("part 2 - input", () => {
  const parsedInput = parseInput(input);
  assertEquals(part2(parsedInput), 6767);
});
