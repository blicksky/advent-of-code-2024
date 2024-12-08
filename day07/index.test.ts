import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { parseInput, part1 } from "./index.ts";

const example = await Deno.readTextFile(
  new URL("./example.txt", import.meta.url),
);
const input = await Deno.readTextFile(new URL("./input.txt", import.meta.url));

Deno.test("parseInput - example", () => {
  const parsed = parseInput(example);
  console.log(parsed);
  assertEquals(
    parsed,
    [
      { testValue: 190, operands: [10, 19] },
      { testValue: 3267, operands: [81, 40, 27] },
      { testValue: 83, operands: [17, 5] },
      { testValue: 156, operands: [15, 6] },
      { testValue: 7290, operands: [6, 8, 6, 15] },
      { testValue: 161011, operands: [16, 10, 13] },
      { testValue: 192, operands: [17, 8, 14] },
      { testValue: 21037, operands: [9, 7, 18, 13] },
      { testValue: 292, operands: [11, 6, 16, 20] },
    ],
  );
});

Deno.test("part 1 - example", () => {
  const parsed = parseInput(example);
  assertEquals(part1(parsed), 3749);
});

Deno.test("part 1 - input", () => {
  const lab = parseInput(input);
  assertEquals(part1(lab), 5153);
});

// Deno.test("part 2 - example", () => {
//   const parsedInput = parseInput(example);
//   assertEquals(part2(parsedInput), 6);
// });

// Deno.test("part 2 - input", () => {
//   const parsedInput = parseInput(input);
//   assertEquals(part2(parsedInput), 6767);
// });
