import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { parseInput } from "./index.ts";

Deno.test("parseInput", () => {
  assertEquals(
    parseInput("2333133121414131402"),
    "00...111...2...333.44.5555.6666.777.888899",
  );
});
