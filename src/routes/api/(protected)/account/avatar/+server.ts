import { db } from "$lib/server/database.js";
import { usersTable } from "$lib/server/schema/users.js";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function POST({ locals, params, request }) {
	if (!locals.userData || !locals.session)
		error(401, { message: "Unauthorized" });

	console.log("authorized");

	try {
		const formData = await request.formData();
		const avatarUrl = formData.get("avatar_url");

		if (!avatarUrl) error(404, { message: "Image URL not found" });

		await db
			.update(usersTable)
			.set({ avatar: avatarUrl.toString() })
			.where(eq(usersTable.id, locals.userData.id));

		console.log("updated");

		return new Response();
	} catch (e) {
		console.log(e);

		error(500, { message: "Internal error" });
	}
}
