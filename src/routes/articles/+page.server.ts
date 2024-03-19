import type { Article } from "$lib/types.js";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types.js";

export async function load({ fetch, locals }) {
	const response = await fetch("api/articles");
	const posts: Article[] = await response.json();
	return { posts };
}

export const actions: Actions = {};
