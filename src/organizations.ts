import * as github from "@pulumi/github";

export const organization = new github.OrganizationSettings(
  "powerd6",
  {
    name: "powerd6",
    description:
      "An exciting way to create, extend, and share tabletop role-playing games.",
    billingEmail: "contact@powerd6.org",
    email: "contact@powerd6.org",
    location: "Spain",
    blog: "powerd6.org",
    // twitterUsername: "",

    // Permissions
    defaultRepositoryPermission: "read",
    membersCanForkPrivateRepositories: true,
    membersCanCreatePrivateRepositories: false,
    membersCanCreatePublicRepositories: false, // Enforce repositories as part of IaC
    membersCanCreateRepositories: false,

    // Projects
    hasOrganizationProjects: true,
    hasRepositoryProjects: true,

    // Github Pages
    membersCanCreatePages: true,
    membersCanCreatePrivatePages: false,
    membersCanCreatePublicPages: true,

    // Security features
    dependabotAlertsEnabledForNewRepositories: true,
    dependabotSecurityUpdatesEnabledForNewRepositories: true,
    dependencyGraphEnabledForNewRepositories: true,
    secretScanningEnabledForNewRepositories: true,
    secretScanningPushProtectionEnabledForNewRepositories: true,
    webCommitSignoffRequired: true,
  },
  {
    protect: true,
  },
);
