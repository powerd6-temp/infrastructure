import * as github from "@pulumi/github";
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

export function getRepositoryFiles(r: github.RepositoryArgs & { name: string; }, repo, mainBranch, mainBranchProtection) {
  const licenseFile = new github.RepositoryFile(
    `${r.name}/Files/License`,
    {
      repository: repo.name,
      branch: mainBranch.branch,
      file: "LICENSE.md",
      content: licenseFileContent,
      commitAuthor: "powerd6/infrastructure",
      commitEmail: "infrastructure@powerd6.org",
      commitMessage: "Updating LICENSE.md . Managed by infrastructure.",
      overwriteOnCreate: true,
    },
    {
      dependsOn: [mainBranch, mainBranchProtection],
      parent: repo,
    }
  );

  const contributingFile = new github.RepositoryFile(
    `${r.name}/Files/Contributing`,
    {
      repository: repo.name,
      branch: mainBranch.branch,
      file: "CONTRIBUTING.md",
      content: contributingFileContent,
      commitAuthor: "powerd6/infrastructure",
      commitEmail: "infrastructure@powerd6.org",
      commitMessage: "Updating CONTRIBUTING.md . Managed by infrastructure.",
      overwriteOnCreate: true,
    },
    {
      dependsOn: [mainBranch, mainBranchProtection],
      parent: repo,
      deletedWith: repo
    }
  );
  return { licenseFile, contributingFile };
}

