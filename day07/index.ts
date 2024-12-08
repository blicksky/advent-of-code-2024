import { sum } from "../common/index.ts";

type Operator = (a: number, b: number) => number;
const additionOperator: Operator = (a, b) => a + b;
const multiplicationOperator: Operator = (a, b) => a * b;
const concatenationOperator: Operator = (a, b) => Number(`${a}${b}`);

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

function equationCanBeTrue(
  equation: Equation,
  operators: ReadonlyArray<Operator>,
): boolean {
  const [operand1, operand2, ...remainingOperands] = equation.operands;

  if (remainingOperands.length === 0) {
    return operators.some((operator) =>
      operator(operand1, operand2) === equation.testValue
    );
  }

  return operators.some((operator) =>
    equationCanBeTrue({
      testValue: equation.testValue,
      operands: [operator(operand1, operand2), ...remainingOperands],
    }, operators)
  );
}

export const part1 = (equations: Equation[]) => {
  return sum(
    equations
      .filter((equation) =>
        equationCanBeTrue(equation, [additionOperator, multiplicationOperator])
      )
      .map((equation) => equation.testValue),
  );
};

export const part2 = (equations: Equation[]) => {
  return sum(
    equations
      .filter((equation) =>
        equationCanBeTrue(equation, [
          additionOperator,
          multiplicationOperator,
          concatenationOperator,
        ])
      )
      .map((equation) => equation.testValue),
  );
};
