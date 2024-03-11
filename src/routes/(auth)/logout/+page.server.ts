export const prerender = false;

import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { userSessionTable } from "$lib/server/schema/users.js";
import { db } from "$lib/server/database.js";
import { auth } from "$lib/server/lucia.js";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.userData || !locals.session) {
		throw redirect(302, "/");
	}

	const { session, user } = await auth.validateSession(locals.session.id);

	if (!session) throw redirect(302, "/");

	await db
		.delete(userSessionTable)
		.where(eq(userSessionTable.id, session.id));

	const sessionCookie = auth.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes,
	});

	locals.userData = null;
	locals.session = null;
};
