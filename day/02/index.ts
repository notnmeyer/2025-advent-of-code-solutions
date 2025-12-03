async function readData(filename: string): Promise<string[]> {
  const file = Bun.file(filename);
  const text = await file.text();
  return text.trim().split(",");
}

const testData = await readData("day/02/test-data.txt");
const data = await readData("day/02/data.txt");

async function run(desc: string, data: string[]) {
  let total = 0;
  console.log(`running: ${desc}`);

  for (const range of data) {
    console.log(`checking range: ${range}`);

    const [low, high] = range.split("-").map(Number) as [number, number];
    let curr = low;
    while (curr <= high) {
      const numStr = curr.toString();
      const repeatPattern = /^(\d+?)\1$/;
      if (repeatPattern.test(numStr)) {
        console.log(`pattern found: ${curr}`);
        total += curr;
      }
      curr++;
    }
  }

  console.log(`answer: ${total}`);
}

async function main() {
  await run("test data", testData);
  await run("real data", data);
}

await main();
