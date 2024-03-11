import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia.js";
import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async ({ locals, route }) => {
	return locals;
};
