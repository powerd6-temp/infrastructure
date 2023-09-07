import * as github from "@pulumi/github";

const org = new github.OrganizationSettings("powerd6", {
    name: "powerd6",
    description: "An exciting way to create, extend, and share tabletop role-playing games.",
    billingEmail: "contact@powerd6.org",
    email: "contact@powerd6.org",
    location: "Spain",
    blog: "powerd6.org",
    // twitterUsername: "",

    // Permissions
    defaultRepositoryPermission: "read",
    membersCanCreatePrivateRepositories: false,
    membersCanCreatePublicRepositories: false, // Enforce repositories as part of IaC
    membersCanCreateRepositories: false,
    membersCanForkPrivateRepositories: true,

    // Projects
    hasOrganizationProjects: true,
    hasRepositoryProjects: true,
    
    // Github Pages
    membersCanCreatePages: true,
    membersCanCreatePrivatePages: false,
    membersCanCreatePublicPages: true,

    // Security features
    advancedSecurityEnabledForNewRepositories: true,
    dependabotAlertsEnabledForNewRepositories: true,
    dependabotSecurityUpdatesEnabledForNewRepositories: true,
    dependencyGraphEnabledForNewRepositories: true,
    secretScanningEnabledForNewRepositories: true,
    secretScanningPushProtectionEnabledForNewRepositories: true,
    webCommitSignoffRequired: true,
}, {
    protect: true,
});

const infraRepo = new github.Repository("infrastructure", {
    name: "infrastructure",
    description: "The shared infrastructure for the powerd6 project.",
});


const brandRepo = new github.Repository("branding", {
    name: "branding",
    description: "The branding artifacts for the project.",
});

export const organization = org.name
export const infrastructureRepository = infraRepo.name
export const brandingRepository = brandRepo.name