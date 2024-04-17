import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";
import userStore from "$lib/stores/userStore.js";
import { get } from "svelte/store";

export const load: PageLoad = async (data) => {
	if (browser) {
		console.log("goto");

		const { userData, session } = await data.parent();

		userStore.set(userData ?? undefined);

		goto("/articles");
	} else {
		console.log("redirect");
		throw redirect(302, "/articles");
	}
};
