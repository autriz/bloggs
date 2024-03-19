import { db } from "$lib/server/database.js";
import { usersTable } from "$lib/server/schema/users.js";
import { error, json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function POST({ locals, params, request }) {
	if (!locals.userData || !locals.session)
		return error(401, { message: "Unauthorized" });

	if (locals.userData.id !== params["userId"])
		return error(403, { message: "Forbidden" });

	const formData = await request.formData();
	const base64Image = formData.get("image");

	if (!base64Image) return error(404, { message: "Image not found" });

	await db
		.update(usersTable)
		.set({ avatar: base64Image.toString() })
		.where(eq(usersTable.id, locals.userData.id));

	return new Response();
}
