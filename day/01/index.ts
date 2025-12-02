const max = 99;
const min = 0;

type Direction = "L" | "R";
type Instruction = { dir: Direction; clicks: number };

async function readInstructions(filename: string): Promise<Instruction[]> {
  const file = Bun.file(filename);
  const text = await file.text();
  const data = text.trim().split("\n");

  return data.map((item) => {
    const dir = item[0] as Direction;
    const clicks = parseInt(item.slice(1), 10);
    return { dir, clicks };
  });
}

const testInstructions = await readInstructions("test-data.txt");
const instructions = await readInstructions("data.txt");

async function run(desc: string, instructions: Instruction[]) {
  var curr = 50;
  var zeroCount = 0;

  console.log(`run() called for: ${desc}`);
  console.log(`position: ${curr}`);

  for (const instruction of instructions) {
    const step = instruction.dir === "R" ? 1 : -1;

    Array.from({ length: instruction.clicks }).forEach(() => {
      curr = curr + step;

      if (curr > max) {
        curr = min;
      } else if (curr < min) {
        curr = max;
      }

      if (curr === 0) {
        zeroCount++;
      }
    });

    console.log(`position: ${curr}`);
  }

  console.log(`answer: ${zeroCount}`);
}

async function main() {
  await run("test data", testInstructions);
  await run("real data", instructions);
}

await main();
