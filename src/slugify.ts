import * as pulumi from "@pulumi/pulumi";

export function slugify(text: pulumi.Input<string>): string {
	return text.toString().toLowerCase().trim()
		.normalize('NFD') // separate accent from letter
		.replace(/[\u0300-\u036f]/g, '') // remove all separated accents
		.replace(/\s+/g, '-') // replace spaces with -
		.replace(/&/g, '-and-') // replace & with 'and'
		.replace(/[^\w\-]+/g, '') // remove all non-word chars
		.replace(/\-\-+/g, '-'); // replace multiple '-' with single '-'
}
