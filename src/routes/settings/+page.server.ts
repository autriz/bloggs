import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async (data) => {
	if (!data.locals.userData || !data.locals.session) throw redirect(302, "/");
};
