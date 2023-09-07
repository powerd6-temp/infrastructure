import * as gandi from "@pulumiverse/gandi";
import * as pulumi from "@pulumi/pulumi"
import { nameservers, rootDomain } from "./domains";

// DNS records for mailserver functionality
export const CNAME_gm1domainkeyDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/CNAME-gm1domainkeyDnsRecord', {
    name: 'gm1._domainkey',
    ttl: 10800,
    type: 'CNAME',
    values: ['gm1.gandimail.net.'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const CNAME_gm2domainkeyDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/CNAME-gm2domainkeyDnsRecord', {
    name: 'gm2._domainkey',
    ttl: 10800,
    type: 'CNAME',
    values: ['gm2.gandimail.net.'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const CNAME_gm3domainkeyDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/CNAME-gm3domainkeyDnsRecord', {
    name: 'gm3._domainkey',
    ttl: 10800,
    type: 'CNAME',
    values: ['gm3.gandimail.net.'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const CNAME_webmailDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/CNAME-webmailDnsRecord', {
    name: 'webmail',
    ttl: 10800,
    type: 'CNAME',
    values: ['webmail.gandi.net.'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const MX_atDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/MX-atDnsRecord', {
    name: '@',
    ttl: 10800,
    type: 'MX',
    values: [
        '50 fb.mail.gandi.net.',
        '10 spool.mail.gandi.net.'
    ],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const SRV_imaptcpDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/SRV-imaptcpDnsRecord', {
    name: '_imap._tcp',
    ttl: 10800,
    type: 'SRV',
    values: ['0 0 0 .'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const SRV_imapstcpDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/SRV-imapstcpDnsRecord', {
    name: '_imaps._tcp',
    ttl: 10800,
    type: 'SRV',
    values: ['0 1 993 mail.gandi.net.'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const SRV_pop3tcpDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/SRV-pop3tcpDnsRecord', {
    name: '_pop3._tcp',
    ttl: 10800,
    type: 'SRV',
    values: ['0 0 0 .'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const SRV_pop3stcpDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/SRV-pop3stcpDnsRecord', {
    name: '_pop3s._tcp',
    ttl: 10800,
    type: 'SRV',
    values: ['10 1 995 mail.gandi.net.'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

export const SRV_submissiontcpDnsRecord = new gandi.livedns.Record('powerd6/rootDomain/nameServer/SRV-submissiontcpDnsRecord', {
    name: '_submission._tcp',
    ttl: 10800,
    type: 'SRV',
    values: ['0 1 465 mail.gandi.net.'],
    zone: rootDomain.id,
}, {
    dependsOn: [nameservers],
    parent: nameservers,
})

const cfg = new pulumi.Config()

const contactEmail = new gandi.email.Mailbox('powerd6/emails/contact', {
    domain: rootDomain.name,
    login: "contact",
    mailboxType: "standard",
    password: cfg.requireSecret("email-contact-password"),
}, {
    dependsOn: [rootDomain],
    parent: rootDomain
})

export const emails = [contactEmail].map(e => e.login)