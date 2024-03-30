import { db } from "$lib/server/database.js";
import { usersTable } from "$lib/server/schema/users.js";
import { error } from "@sveltejs/kit";
import { argon2Verify, argon2id } from "hash-wasm";
import { eq } from "drizzle-orm";

export async function POST({ locals, params, request }) {
	if (!locals.userData || !locals.session)
		error(401, { message: "Unauthorized" });

	try {
		const formData = await request.formData();
		const currentPassword = formData.get("current_password")?.toString();
		const newEmail = formData.get("new_email")?.toString();
		const newEmailConfirm = formData.get("new_email_confirm")?.toString();

		if (!currentPassword || !newEmail || !newEmailConfirm)
			error(406, { message: "Malformed POST request" });

		if (newEmail !== newEmailConfirm)
			error(406, { message: "Email confirm does not match with email" });

		const [{ passwordHash }] = await db
			.select({ passwordHash: usersTable.passwordHash })
			.from(usersTable)
			.where(eq(usersTable.id, locals.userData.id));

		const isValidPassword = await argon2Verify({
			hash: passwordHash,
			password: currentPassword,
		});

		if (!isValidPassword) error(406, { message: "Invalid password" });

		await db
			.update(usersTable)
			.set({ email: newEmail })
			.where(eq(usersTable.id, locals.userData.id));

		return new Response();
	} catch (e) {
		console.log(e);

		error(500, { message: "Internal error" });
	}
}
