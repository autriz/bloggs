import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = async () => {
	if (browser) {
		console.log("goto");
		goto("/articles");
	} else {
		console.log("redirect");
		throw redirect(302, "/articles");
	}
};
