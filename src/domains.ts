import * as gandi from "@pulumiverse/gandi";
import { slugify } from "./helpers/slugify";

const domainOwner = {
  city: "Malpica de Bergantiños",
  country: "ES",
  dataObfuscated: true,
  email: "hector.zacharias@gmail.com",
  extraParameters: {
    birth_city: "",
    birth_country: "",
    birth_date: "",
    birth_department: "",
  },
  familyName: "Castelli Zacharias",
  givenName: "Héctor",
  mailObfuscated: true,
  phone: "+34.677059383",
  state: "ES-C",
  streetAddr: "Rua Canido 57",
  type: "person",
  zip: "15113",
};

export const rootDomain = new gandi.domains.Domain(
  "powerd6/rootDomain",
  {
    name: "powerd6.org",

    admin: domainOwner,
    billing: domainOwner,
    owner: domainOwner,
    tech: domainOwner,

    autorenew: true,
  },
  {
    protect: true,
  },
);

export const nameservers = new gandi.domains.Nameservers(
  "powerd6/rootDomain/nameServers",
  {
    domain: rootDomain.name,
    nameservers: [
      "ns-168-a.gandi.net",
      "ns-138-b.gandi.net",
      "ns-19-c.gandi.net",
    ],
  },
  {
    dependsOn: [rootDomain],
    parent: rootDomain,
  },
);

// Github pages
export const A_atDnsRecord = new gandi.livedns.Record(
  "powerd6/rootDomain/nameServer/A-atDnsRecord",
  {
    name: "@",
    ttl: 3600,
    type: "A",
    values: [
      "185.199.109.153",
      "185.199.111.153",
      "185.199.108.153",
      "185.199.110.153",
    ],
    zone: rootDomain.id,
  },
  {
    dependsOn: [nameservers],
    parent: nameservers,
  },
);

export const AAAA_atDnsRecord = new gandi.livedns.Record(
  "powerd6/rootDomain/nameServer/AAAA-atDnsRecord",
  {
    name: "@",
    ttl: 3600,
    type: "AAAA",
    values: [
      "2606:50c0:8000::153",
      "2606:50c0:8003::153",
      "2606:50c0:8002::153",
      "2606:50c0:8001::153",
    ],
    zone: rootDomain.id,
  },
  {
    dependsOn: [nameservers],
    parent: nameservers,
  },
);

// Github pages verification
const githubPagesChallenges = [
  {
    name: "_github-pages-challenge-powerd6",
    value: "521616339ac469a83d727cdff6a20a",
  },
];

githubPagesChallenges.map(
  (challenge) =>
    new gandi.livedns.Record(
      `powerd6/rootDomain/nameServer/githubPages/challenge/${slugify(
        challenge.name,
      )}`,
      {
        name: challenge.name,
        ttl: 10800,
        type: "TXT",
        values: [challenge.value],
        zone: rootDomain.id,
      },
      {
        dependsOn: [nameservers],
        parent: nameservers,
      },
    ),
);

// Github pages subdomains
const githubPagesSubdomains = [
  "www",
  // "specification"
];

githubPagesSubdomains.map(
  (subdomain) =>
    new gandi.livedns.Record(
      `powerd6/rootDomain/nameServer/githubPages/${slugify(subdomain)}`,
      {
        name: subdomain,
        ttl: 10800,
        type: "TXT",
        values: ["powerd6.github.io"],
        zone: rootDomain.id,
      },
      {
        dependsOn: [nameservers],
        parent: nameservers,
      },
    ),
);

export const domains = [rootDomain].map((d) => d.name);
