import { sum } from "../common/index.ts";

enum Operator {
  Add = "+",
  Multiply = "*",
}

type TestValue = number;
type Operand = number;
type Equation = {
  testValue: TestValue;
  operands: Operand[];
};

export const parseInput = (input: string): Equation[] => {
  return input.split("\n").map((line) => {
    const [testValue, operandsInput] = line.split(": ");
    return {
      testValue: Number(testValue),
      operands: operandsInput.split(" ").map(Number),
    };
  });
};

function equationCanBeTrue(equation: Equation): boolean {
  const [operand1, operand2, ...remainingOperands] = equation.operands;

  if (remainingOperands.length === 0) {
    return (
      operand1 + operand2 === equation.testValue ||
      operand1 * operand2 === equation.testValue
    );
  }

  return (
    equationCanBeTrue({
      testValue: equation.testValue,
      operands: [operand1 + operand2, ...remainingOperands],
    }) ||
    equationCanBeTrue({
      testValue: equation.testValue,
      operands: [operand1 * operand2, ...remainingOperands],
    })
  );
}

export const part1 = (equations: Equation[]) => {
  return sum(
    equations
      .filter(equationCanBeTrue)
      .map((equation) => equation.testValue),
  );
};
