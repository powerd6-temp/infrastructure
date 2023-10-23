import * as github from "@pulumi/github";
import { Repository } from "@pulumi/github/repository";
import { Branch } from "@pulumi/github/branch";
import { BranchProtection } from "@pulumi/github/branchProtection";
import { readFileSync } from "fs";
import { resolve } from "path";


const files: Map<string, string> = new Map([
  ["License", "LICENSE.md"],
  ["Contributing", "CONTRIBUTING.md"],
]);


function getFileContent(filename: String) {
  return readFileSync(
  resolve(__dirname, `../content/${filename}`),
  "utf-8"
)
  }

export function getRepositoryFiles(r: github.RepositoryArgs & { name: string; }, repo: Repository, mainBranch: Branch, mainBranchProtection: BranchProtection) {
  const resources = [];
  for (let fileEntry of files.entries()) {
    resources.push(
      new github.RepositoryFile(
        `${r.name}/Files/${fileEntry[0]}`,
        {
          repository: repo.name,
          branch: mainBranch.branch,
          file: fileEntry[1],
          content: getFileContent(fileEntry[1]),
          commitAuthor: "powerd6/infrastructure",
          commitEmail: "infrastructure@powerd6.org",
          commitMessage: `Updating ${fileEntry[1]} . Managed by infrastructure.`,
          overwriteOnCreate: true,
        },
        {
          dependsOn: [mainBranch, mainBranchProtection],
          parent: repo,
        }
      )
    )
  }
  return resources;
}

