import * as github from "@pulumi/github"
import * as pulumi from "@pulumi/pulumi"
import {org} from './organizations'
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

const labelConfiguration: Array<{
	name: pulumi.Input<string>; description: pulumi.Input<string>; color: pulumi.Input<string>;
}> = [
		{
			name: "goal: addition",
			description: "Addition of a new feature",
			color: "ffffff",
		},
		{
			name: "goal: improvement",
			description: "Improvement to an existing feature",
			color: "ffffff",
		},
		{
			name: "goal: fix",
			description: "Bug fix",
			color: "ffffff",
		},
		{
			name: "good first issue",
			description: "New-contributor friendly",
			color: "7f0799",
		},
		{
			name: "help wanted",
			description: "Open to participation from the community",
			color: "7f0799",
		},
		{
			name: "priority: high",
			description: "Stalls work on the project or its dependents",
			color: "ff9f1c",
		},
		{
			name: "priority: medium",
			description: "Not blocking but should be fixed soon",
			color: "ffcc00",
		},
		{
			name: "priority: low",
			description: "Low priority and doesn't need to be rushed",
			color: "cfda2c",
		},
	]

export const repositories = repoConfigurations.map((r) => {
	const repo = new github.Repository(r.name, {
		...defaultRepositoryOptions,
		...r,
	}, {
		parent: org
	})

	const mainBranch = new github.Branch(`${r.name}/Branch/Main`, {
		branch: "main",
		repository: repo.name,
	}, {
		dependsOn: [repo,],
		parent: repo
	})

	const mainBranchProtection = new github.BranchProtection(`${r.name}/BranchProtection/Main`, {
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
		parent: mainBranch
	})

	const licenseFile = new github.RepositoryFile(`${r.name}/Files/License`, {
		repository: repo.name,
		branch: mainBranch.branch,
		file: "LICENSE.md",
		content: licenseFileContent,
		commitAuthor: "powerd6/infrastructure",
		commitEmail: "infrastructure@powerd6.org",
		commitMessage: "Updating LICENSE.md . Managed by infrastructure.",
		overwriteOnCreate: true,
	}, {
		dependsOn: [mainBranch, mainBranchProtection],
		parent: repo
	})

	const contributingFile = new github.RepositoryFile(`${r.name}/Files/Contributing`, {
		repository: repo.name,
		branch: mainBranch.branch,
		file: "CONTRIBUTING.md",
		content: contributingFileContent,
		commitAuthor: "powerd6/infrastructure",
		commitEmail: "infrastructure@powerd6.org",
		commitMessage: "Updating CONTRIBUTING.md . Managed by infrastructure.",
		overwriteOnCreate: true,
	}, {
		dependsOn: [mainBranch, mainBranchProtection],
		parent: repo
	})

	const labels = labelConfiguration.map(labelConfig =>
		new github.IssueLabel(`${r.name}/IssueLabel/${slugify(labelConfig.name)}`, {
			repository: repo.name,
			...labelConfig,
		}, {
			dependsOn: [repo],
			parent: repo
		})
	)

	return {
		repository: repo.name,
		branches: [
			mainBranch.branch,
		],
		branchProtection: [
			mainBranchProtection.id,
		],
		files: [
			licenseFile.file,
			contributingFile.file,
		],
		labels: labels.map(l => l.name)
	}
})

function slugify(text: pulumi.Input<string>): string {
	return text.toString().toLowerCase().trim()
		.normalize('NFD') 				 // separate accent from letter
		.replace(/[\u0300-\u036f]/g, '') // remove all separated accents
		.replace(/\s+/g, '-')            // replace spaces with -
		.replace(/&/g, '-and-')          // replace & with 'and'
		.replace(/[^\w\-]+/g, '')        // remove all non-word chars
		.replace(/\-\-+/g, '-')          // replace multiple '-' with single '-'
}