// TODO: parse data as necessary
async function readData(filename: string): Promise<string> {
  const file = Bun.file(filename);
  const text = await file.text();
  return text;
}

// TODO: set the current day
const testData = await readData("day/00/test-data.txt");
// const data = await readData("day/02/data.txt");

async function run(desc: string, data: string) {
  console.log(`${desc}: ${data}`);
}

async function main() {
  await run("test data", testData);
  // await run("real data", data);
}

await main();
