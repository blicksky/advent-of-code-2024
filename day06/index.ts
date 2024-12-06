enum Direction {
  Up = "^",
  Right = ">",
  Down = "v",
  Left = "<",
}

type Position = {
  x: number;
  y: number;
};

class Lab {
  readonly #width: number;
  readonly #height: number;
  readonly #guard: {
    position: Position;
    direction: Direction;
  };
  readonly #obstructions: Set<string>;

  constructor(
    width: number,
    height: number,
    guard: {
      position: Position;
      direction: Direction;
    },
    obstructions: Position[],
  ) {
    this.#width = width;
    this.#height = height;
    this.#guard = guard;
    this.#obstructions = new Set(
      obstructions.map((p) => `${p.x},${p.y}`),
    );
  }

  print(): string {
    const map: string[][] = Array(this.#height)
      .fill(null)
      .map(() => Array(this.#width).fill("."));

    // Add obstructions
    for (const pos of this.#obstructions) {
      const [x, y] = pos.split(",").map(Number);
      if (x >= 0 && x < this.#width && y >= 0 && y < this.#height) {
        map[y][x] = "#";
      }
    }

    // Add guard
    const { x, y } = this.#guard.position;
    if (x >= 0 && x < this.#width && y >= 0 && y < this.#height) {
      map[y][x] = this.#guard.direction;
    }

    return map.map((row) => row.join("")).join("\n");
  }

  moveGuard(): boolean {
    let nextPosition = this.#getNextPosition();

    // If obstructed, rotate clockwise and try again
    if (this.#isObstructed(nextPosition)) {
      this.#rotateGuardClockwise();
      nextPosition = this.#getNextPosition();
    }

    // Update guard position
    this.#guard.position = nextPosition;
    return true;
  }

  #rotateGuardClockwise(): void {
    switch (this.#guard.direction) {
      case Direction.Up:
        this.#guard.direction = Direction.Right;
        break;
      case Direction.Right:
        this.#guard.direction = Direction.Down;
        break;
      case Direction.Down:
        this.#guard.direction = Direction.Left;
        break;
      case Direction.Left:
        this.#guard.direction = Direction.Up;
        break;
    }
  }

  #getNextPosition(): Position {
    const { x, y } = this.#guard.position;

    switch (this.#guard.direction) {
      case Direction.Up:
        return { x, y: y - 1 };
      case Direction.Right:
        return { x: x + 1, y };
      case Direction.Down:
        return { x, y: y + 1 };
      case Direction.Left:
        return { x: x - 1, y };
    }
  }

  #isObstructed(position: Position): boolean {
    return this.#obstructions.has(`${position.x},${position.y}`);
  }

  isGuardInLab(): boolean {
    const { x, y } = this.#guard.position;
    return x >= 0 && x < this.#width && y >= 0 && y < this.#height;
  }

  getGuardPosition(): Position {
    return { ...this.#guard.position };
  }
}

export function parseInput(input: string): Lab {
  const lines = input.trim().split("\n");
  const height = lines.length;
  const width = lines[0].length;

  let startX = 0;
  let startY = 0;
  let startDirection = Direction.Up;
  const obstructions: Position[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = lines[y][x];
      if (Object.values(Direction).includes(cell as Direction)) {
        startX = x;
        startY = y;
        startDirection = cell as Direction;
      } else if (cell === "#") {
        obstructions.push({ x, y });
      }
    }
  }

  return new Lab(
    width,
    height,
    {
      position: { x: startX, y: startY },
      direction: startDirection,
    },
    obstructions,
  );
}

export function part1(lab: Lab): number {
  const visitedPositions = new Set<string>();
  while (lab.isGuardInLab()) {
    const { x, y } = lab.getGuardPosition();
    visitedPositions.add(`${x},${y}`);
    lab.moveGuard();
  }
  return visitedPositions.size;
}

export function part2(input: Lab): number {
  // Implement part 2
  throw new Error("Not implemented");
}
