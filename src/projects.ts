import * as github from "@pulumi/github";
import { org } from ".";

/*
* FIXME: re-enable this feature when GitHub's API supports project creation without failing.
* Currently, the following error is returned: `410 Projects are disabled for this organization` regardless of the settings.
*/

export const roadmapProject = new github.OrganizationProject("powerd6/Projects/roadmap", {
	name: "Roadmap",
	body: "A visual representation of the short, and long term priorities and goals.",
}, {
	dependsOn: [org],
	parent: org,
});
export const ideasProject = new github.OrganizationProject("powerd6/Projects/moduleIdeas", {
	name: "Module Ideas",
	body: "A collection of module ideas, open for anyone to add, comment, and even implement.",
}, {
	dependsOn: [org],
	parent: org,
});
