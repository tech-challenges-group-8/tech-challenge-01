import { promises as fs } from "fs";
import path from "path";

export async function readMockData(fileName: string) {
  const filePath = path.join(process.cwd(), "src/database", fileName);
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveMockData(fileName: string, data: any) {
  const filePath = path.join(process.cwd(), "src/database", fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
