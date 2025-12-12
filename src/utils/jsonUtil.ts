import fs from 'fs-extra';

export async function readJSON(filePath: string) {
  return fs.readJson(filePath);
}

export async function writeJSON(filePath: string, data: any) {
  return fs.writeJson(filePath, data, { spaces: 2 });
}
