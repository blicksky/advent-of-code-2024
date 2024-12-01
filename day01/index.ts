export function parseInput(input: string): [number[], number[]] {
  const lines = input.trim().split("\n");

  const leftList: number[] = [];
  const rightList: number[] = [];

  for (const line of lines) {
    const [left, right] = line.trim().split(/\s+/).map(Number);
    leftList.push(left);
    rightList.push(right);
  }

  return [leftList, rightList];
}

export function calculateTotalDistanceBetweenLists(
  leftList: number[],
  rightList: number[],
): number {
  const sortedLeftList = leftList.sort((a, b) => a - b);
  const sortedRightList = rightList.sort((a, b) => a - b);

  return sortedLeftList
    .map((leftItem, index) => {
      return Math.abs(leftItem - sortedRightList[index]);
    })
    .reduce((sum, distance) => sum + distance, 0);
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

  return leftList.reduce((totalScore, item) => {
    const score = item * (rightOccurrenceMap.get(item) ?? 0)
    return totalScore + score;
  }, 0);
}
