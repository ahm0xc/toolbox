import fs from "fs/promises";
import path from "path";

export async function getTools() {
  try {
    const directory = path.join(process.cwd(), "/src/app");
    const files = await fs.readdir(directory);
    const folders = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fs.stat(filePath);

      if (stat.isDirectory()) {
        folders.push(file);
      }
    }
    return folders;
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}
