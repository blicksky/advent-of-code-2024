export function executeCorruptedProgram(program: string) {
  return program
    .matchAll(/mul\(\d{1,3},\d{1,3}\)/g)
    .map((instructionMatch) => {
      const [instruction] = instructionMatch;
      const [operand1, operand2] = instruction
        .matchAll(/\d+/g)
        .map((operandMatch) => {
          const [operand] = operandMatch;
          return parseInt(operand, 10);
        });
      return operand1 * operand2;
    });
}

export function removeDisabledInstructions(program: string) {
  return program
    .split(/do\(\)/gs)
    .map((s) => s.replace(/don't\(\).*/gs, ""))
    .join("");
}
