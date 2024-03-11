export const prerender = false;

import { goto } from "$app/navigation";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = async () => {
	goto("/", { invalidateAll: true, replaceState: true });
};
