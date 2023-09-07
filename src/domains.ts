import * as gandi from "@pulumiverse/gandi";

const domainOwner = {
    city: 'Malpica de Bergantiños',
    country: 'ES',
    dataObfuscated: true,
    email: 'hector.zacharias@gmail.com',
    extraParameters: {
        birth_city: '',
        birth_country: '',
        birth_date: '',
        birth_department: ''
    },
    familyName: 'Castelli Zacharias',
    givenName: 'Héctor',
    mailObfuscated: true,
    phone: '+34.677059383',
    state: 'ES-C',
    streetAddr: 'Rua Canido 57',
    type: 'person',
    zip: '15113'
}

// const rootDomain = new gandi.domains.Domain('powerd6/rootDomain', {
//     name: "powerd6.org",

//     admin: domainOwner,
//     billing: domainOwner,
//     owner: domainOwner,
//     tech: domainOwner,

//     autorenew: true,

//     tags: ['powerd6', 'root']
// }, {
//     protect: true,
// })

// export const nameservers = new gandi.domains.Nameservers('powerd6/rootDomain/nameServers', {
//     domain: rootDomain.name,
//     nameservers: [
//       'ns-168-a.gandi.net',
//       'ns-138-b.gandi.net',
//       'ns-19-c.gandi.net'
//     ]
//   }, {
//     dependsOn: [rootDomain]
//   })


// export const domains = [rootDomain,].map(d=>d.name)

export const domains = []