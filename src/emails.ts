import * as gandi from "@pulumiverse/gandi"
import * as pulumi from "@pulumi/pulumi"
import { local } from "@pulumi/command"

import { rootDomain, nameservers } from "./domains";
import { ImprovMxAlias } from "./custom/improvmx/alias";

// DNS records for mailserver functionality
export const mxEntries = new gandi.livedns.Record('powerd6/rootDomain/nameServer/improvMX/MX', {
    name: '@',
    ttl: 10800,
    type: 'MX',
    values: [
        '10 mx1.improvmx.com.',
        '20 mx2.improvmx.com.'
    ],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const spfRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/improvMX/TXT', {
    name: '@',
    ttl: 10800,
    type: 'TXT',
    values: ['v=spf1 include:spf.improvmx.com ~all'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,

})

const cfg = new pulumi.Config();

const contactAlias = new ImprovMxAlias("powerd6/email/contact", {
    alias: "contact",
    forward: "hector.zacharias@gmail.com",
    domain: rootDomain.name,
    apiKey: cfg.requireSecret("improvmx-api-key"),
});


export const emails = [contactAlias].map(e => e.aliasId);