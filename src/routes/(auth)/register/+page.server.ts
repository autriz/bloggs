import { auth } from "$lib/server/lucia.js";
import { generateId } from "lucia";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import argon2 from "argon2";
import { db, client } from "$lib/server/database.js";
import { usersTable } from "$lib/server/schema/users.js";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, "/");
	return {};
};

export const actions: Actions = {
	register: async ({ request, locals, cookies }) => {
		const formData = await request.formData();
		const email = formData.get("email");
		const username = formData.get("username");
		const password = formData.get("password");
		// basic check
		if (
			typeof email !== "string" ||
			email.length < 6 ||
			email.length > 60
		) {
			return fail(400, {
				message: "Invalid email",
			});
		}
		if (
			typeof username !== "string" ||
			username.length < 4 ||
			username.length > 60
		) {
			return fail(400, {
				message: "Invalid username",
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 6 ||
			password.length > 255
		) {
			return fail(400, {
				message: "Invalid password",
			});
		}

		const passwordHash = await argon2.hash(password);

		const [user] = await db
			.insert(usersTable)
			.values({
				email,
				username,
				passwordHash,
			})
			.returning({ id: usersTable.id });
		console.log("create user");
		console.log(user);

		try {
			const session = await auth.createSession(user.id, {});
			console.log("create session");
			const sessionCookie = auth.createSessionCookie(session.id);

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes,
			}); // set session cookie

			console.log("??");

			// redirect to /
			throw redirect(302, "/");
		} catch (e) {
			return fail(500, { message: "Failed to create session" });
		}
	},
};
