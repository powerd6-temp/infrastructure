import { local } from "@pulumi/command";
import * as pulumi from "@pulumi/pulumi"
import { readFileSync } from "fs";
import { resolve } from "path";

// From: https://improvmx.com/api/

interface AliasArgs {
    alias: pulumi.Input<string>,
    forward: pulumi.Input<string>,
    domain: pulumi.Input<string>,
    apiKey: pulumi.Input<string>,
}

export class ImprovMxAlias extends pulumi.ComponentResource {
    public aliasId: pulumi.Output<string>;

    constructor(name: string, args: AliasArgs, opts?: pulumi.ComponentResourceOptions) {
        super("improvmx:improvmx:Alias", name, args, opts);

        const alias = new local.Command("alias", {
            create: readFileSync(resolve(__dirname, "./create_alias.sh"), 'utf-8'),
            delete: readFileSync(resolve(__dirname, "./delete_alias.sh"), 'utf-8'),
            environment: {
                API_KEY: args.apiKey,
                DOMAIN: args.domain,
                ALIAS: args.alias,
                FORWARD: args.forward,
            },
        }, {
            parent: this
        })

        const response = alias.stdout.apply(JSON.parse);
        this.aliasId = response.apply((x: any) => x.alias.id as string);
    }
}