import fs from "node:fs";
import path from "node:path";
export function readJsonArray<T>(file: string): T[] {
  if (!fs.existsSync(file)) throw new Error(`File not found: ${file}`);
  const v = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(v)) throw new Error(`Expected JSON array: ${file}`);
  return v as T[];
}
export function writeJson(file: string, v: unknown) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(v, null, 2), "utf8");
}
