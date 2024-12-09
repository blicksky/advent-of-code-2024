export const parseInput = (input: string): string => {
  return input
    .split("")
    .map(Number)
    .reduce((blocks, digit, index) => {
      return blocks +
        ((index % 2 === 1)
          ? ".".repeat(digit)
          : Math.floor(index / 2).toString().repeat(digit));
    }, "");
};
