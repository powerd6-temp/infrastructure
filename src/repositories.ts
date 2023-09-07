import * as github from "@pulumi/github"

const defaultRepositoryOptions = {
	// Metadata
	topics: ["powerd6",],
	visibility: "public",
	isTemplate: false,
	archived: true,
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
		advancedSecurity: {
			status: "enabled",
		},
		secretScanning: {
			status: "enabled",
		},
		secretScanningPushProtection: {
			status: "enabled",
		},
	},

}

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

export const repositories = repoConfigurations.map((r) => new github.Repository(r.name, {
	...defaultRepositoryOptions,
	...r,
}))