import { sum } from "../common/index.ts";

export function parseInput(input: string): [number[], number[]] {
  const leftList: number[] = [];
  const rightList: number[] = [];

  input.trim().split("\n").forEach((line) => {
    const [left, right] = line.trim().split(/\s+/).map(Number);

    leftList.push(left);
    rightList.push(right);
  });

  return [leftList, rightList];
}

export function calculateTotalDistanceBetweenLists(
  leftList: number[],
  rightList: number[],
): number {
  const sortedLeftList = leftList.sort((a, b) => a - b);
  const sortedRightList = rightList.sort((a, b) => a - b);

  return sum(sortedLeftList
    .map((leftItem, index) => {
      return Math.abs(leftItem - sortedRightList[index]);
    }));
}

function buildOccurrenceMap(list: number[]): Map<number, number> {
  return list.reduce((map, item) => {
    const currentCount = map.get(item) ?? 0;
    map.set(item, currentCount + 1);
    return map;
  }, new Map<number, number>());
}

export function calculateSimilarityScore(
  leftList: number[],
  rightList: number[],
): number {
  const rightOccurrenceMap = buildOccurrenceMap(rightList);

  return sum(
    leftList.map((item) => item * (rightOccurrenceMap.get(item) ?? 0)),
  );
}
