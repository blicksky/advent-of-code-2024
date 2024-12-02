export function parseInput(input: string): number[][] {
  return input.trim().split("\n").map((line) =>
    line.trim().split(/\s+/).map(Number)
  );
}

export function isReportSafe(report: number[]): boolean {
  if (report[0] === report[1]) {
    return false;
  }

  if (report[0] > report[1]) {
    report.reverse();
  }

  return report.every((level, index) => {
    if (index === 0) {
      return true;
    }

    const difference = level - report[index - 1];
    return 1 <= difference && difference <= 3;
  });
}
