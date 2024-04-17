export const prerender = false;

import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import userStore from "$lib/stores/userStore.js";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = async (data) => {
	if (browser) {
		userStore.set(undefined);
		goto("/", { invalidateAll: true, replaceState: true });
	} else {
		throw redirect(302, "/");
	}
};
