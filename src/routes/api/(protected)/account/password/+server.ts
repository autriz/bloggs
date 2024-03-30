import { db } from "$lib/server/database.js";
import { usersTable } from "$lib/server/schema/users.js";
import { error } from "@sveltejs/kit";
import { argon2Verify, argon2id } from "hash-wasm";
import { eq } from "drizzle-orm";
import { getRandomValues } from "node:crypto";

export async function POST({ locals, params, request }) {
	if (!locals.userData || !locals.session)
		error(401, { message: "Unauthorized" });

	try {
		const formData = await request.formData();
		const currentPassword = formData.get("current_password")?.toString();
		const newPassword = formData.get("new_password")?.toString();
		const newPasswordConfirm = formData
			.get("new_password_confirm")
			?.toString();

		if (!currentPassword || !newPassword || !newPasswordConfirm)
			error(406, { message: "Malformed POST request" });

		if (newPassword !== newPasswordConfirm)
			error(406, {
				message: "Password confirm does not match with password",
			});

		const [{ passwordHash }] = await db
			.select({ passwordHash: usersTable.passwordHash })
			.from(usersTable)
			.where(eq(usersTable.id, locals.userData.id));

		const isValidPassword = await argon2Verify({
			hash: passwordHash,
			password: currentPassword,
		});

		if (!isValidPassword) error(406, { message: "Invalid password" });

		let salt = new Uint8Array(16);
		salt = getRandomValues(salt);

		const newPasswordHash = await argon2id({
			password: newPassword,
			salt,
			parallelism: 1,
			iterations: 256,
			memorySize: 512,
			hashLength: 32,
			outputType: "encoded",
		});

		await db
			.update(usersTable)
			.set({ passwordHash: newPasswordHash })
			.where(eq(usersTable.id, locals.userData.id));

		return new Response();
	} catch (e) {
		console.log(e);

		error(500, { message: "Internal error" });
	}
}
