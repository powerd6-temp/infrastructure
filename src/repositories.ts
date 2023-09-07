import * as github from "@pulumi/github"
import { readFileSync } from "fs"
import { resolve } from "path";

const bypassesUsers = [
	"/HectorCastelli",
]

const defaultRepositoryOptions = {
	// Metadata
	topics: ["powerd6",],
	visibility: "public",
	isTemplate: false,
	archived: false,
	autoInit: true,

	// Merge Behaviour
	allowAutoMerge: false,
	allowMergeCommit: false,
	allowRebaseMerge: false,
	allowSquashMerge: true,
	deleteBranchOnMerge: true,
	allowUpdateBranch: true,
	archiveOnDestroy: true,
	mergeCommitMessage: "PR_BODY",
	mergeCommitTitle: "PR_TITLE",
	squashMergeCommitMessage: "PR_BODY",
	squashMergeCommitTitle: "PR_TITLE",

	// Features
	hasDiscussions: false,
	hasDownloads: false,
	hasIssues: true,
	hasProjects: true,
	hasWiki: false,
	// pages: undefined,
	// homepageUrl: "",

	// Security
	ignoreVulnerabilityAlertsDuringRead: true,
	vulnerabilityAlerts: true,
	securityAndAnalysis: {
		// advancedSecurity: {
		// 	status: "enabled",
		// },
		secretScanning: {
			status: "enabled",
		},
		secretScanningPushProtection: {
			status: "enabled",
		},
	},

}

const licenseFileContent = readFileSync(resolve(__dirname, '../content/LICENSE.md'), 'utf-8');
const contributingFileContent = readFileSync(resolve(__dirname, '../content/CONTRIBUTING.md'), 'utf-8');


const repoConfigurations: Array<github.RepositoryArgs & { name: string }> = [
	{
		name: "infrastructure",
		description: "The shared infrastructure for the powerd6 project.",
	},
	{
		name: "branding",
		description: "The branding artifacts for the project.",
	},
]

export const repositories = repoConfigurations.map((r) => {
	const repo = new github.Repository(r.name, {
		...defaultRepositoryOptions,
		...r,
	})

	// TODO: Create main branch
	const mainBranch = new github.Branch(`${r.name}MainBranch`, {
		branch: "main",
		repository: repo.name,
	}, {
		dependsOn: [repo,],
	})

	// TODO: Protect branch
	const branchProtection = new github.BranchProtection(`${r.name}MainBranchProtection`, {
		repositoryId: repo.nodeId,
		pattern: mainBranch.branch,

		allowsDeletions: false,
		allowsForcePushes: false,
		blocksCreations: true,
		lockBranch: false,

		requireConversationResolution: true,
		// requireSignedCommits: true,
		requiredLinearHistory: true,

		requiredPullRequestReviews: [
			{
				dismissStaleReviews: false,
				requireLastPushApproval: true,
				restrictDismissals: true,
				pullRequestBypassers: bypassesUsers,
			},
		],

		requiredStatusChecks: [
			{
				strict: true,
			},
		],

		enforceAdmins: true,
		forcePushBypassers: bypassesUsers,

	}, {
		dependsOn: [mainBranch,],
	})

	const licenseFile = new github.RepositoryFile(`${r.name}LicenseFile`, {
		repository: repo.name,
		branch: mainBranch.branch,
		file: "LICENSE.md",
		content: licenseFileContent,
		commitAuthor: "powerd6/infrastructure",
		commitEmail: "infrastructure@powerd6.org",
		commitMessage: "Updating LICENSE.md . Managed by infrastructure.",
		overwriteOnCreate: true,
	}, {
		dependsOn: [mainBranch, branchProtection],
	})

	const contributingFile = new github.RepositoryFile(`${r.name}ContributingFile`, {
		repository: repo.name,
		branch: mainBranch.branch,
		file: "CONTRIBUTING.md",
		content: contributingFileContent,
		commitAuthor: "powerd6/infrastructure",
		commitEmail: "infrastructure@powerd6.org",
		commitMessage: "Updating CONTRIBUTING.md . Managed by infrastructure.",
		overwriteOnCreate: true,
	}, {
		dependsOn: [mainBranch, branchProtection],
	})



	return repo
})