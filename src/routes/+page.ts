import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = async () => {
	if (browser) {
		goto("/articles");
	} else {
		throw redirect(302, "/articles");
	}
};
