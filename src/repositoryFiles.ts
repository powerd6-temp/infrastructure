import { readFileSync } from "fs";
import { resolve } from "path";

export const licenseFileContent = readFileSync(
  resolve(__dirname, "../content/LICENSE.md"),
  "utf-8"
);
export const contributingFileContent = readFileSync(
  resolve(__dirname, "../content/CONTRIBUTING.md"),
  "utf-8"
);
