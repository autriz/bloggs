import { db } from "$lib/server/database.js";
import { usersTable } from "$lib/server/schema/users.js";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function POST({ locals, params, request }) {
	if (!locals.userData || !locals.session)
		error(401, { message: "Unauthorized" });

	try {
		const formData = await request.formData();
		const firstName = formData.get("firstName");

		if (!firstName) error(404, { message: "First name not provided" });

		await db
			.update(usersTable)
			.set({ firstName: firstName.toString() })
			.where(eq(usersTable.id, locals.userData.id));

		return new Response();
	} catch (e) {
		console.log(e);

		error(500, { message: "Internal error" });
	}
}
