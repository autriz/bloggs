import type { selectUserSchema } from "$lib/server/schema/users.js";
import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
	const response = await fetch("/api/users/" + params["userId"]);

	if (response.status !== 200) {
		const { message } = await response.json();

		throw error(response.status, { message });
	}

	const user: typeof selectUserSchema._type = await response.json();

	return { user };
}
