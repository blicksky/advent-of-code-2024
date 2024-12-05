import { sum } from "../common/index.ts";

type Page = number;
type OrderingRule = readonly [Page, Page];
type OrderingRules = readonly OrderingRule[];
type Manual = readonly Page[];

type ParsedInput = {
  rules: OrderingRules;
  manuals: Manual[];
};

export function parseInput(input: string): ParsedInput {
  const [rulesInput, manualsInput] = input.split("\n\n");

  const rules: OrderingRules = rulesInput
    .split("\n")
    .map((line) => {
      const [firstPage, secondPage] = line.split("|").map(Number);
      return [firstPage, secondPage];
    });

  const manuals: Manual[] = manualsInput.split("\n").map((line) =>
    line.split(",").map(Number)
  );

  return { rules, manuals };
}

function areManualsEqual(a: Manual, b: Manual): boolean {
  return a.length === b.length &&
    a.every((value, index) => value === b[index]);
}

function getMiddlePage(manual: Manual): Page {
  return manual[Math.floor(manual.length / 2)];
}

function buildOrderingRulesMap(
  orderingRules: OrderingRules,
): Map<Page, Page[]> {
  const orderingRulesMap = new Map<Page, Page[]>();

  for (const [firstPage, secondPage] of orderingRules) {
    const currentSecondPages = orderingRulesMap.get(firstPage) ?? [];
    orderingRulesMap.set(firstPage, [...currentSecondPages, secondPage]);
  }

  return orderingRulesMap;
}

export function part1({ rules, manuals }: ParsedInput): number {
  const orderingRulesMap = buildOrderingRulesMap(rules);

  const correctManuals = manuals.filter((manual) =>
    areManualsEqual(
      manual,
      manual.toSorted((a, b) => orderingRulesMap.get(a)?.includes(b) ? -1 : 0),
    )
  );

  return sum(correctManuals.map(getMiddlePage));
}

export function part2(input: string): number {
  return 0;
}
