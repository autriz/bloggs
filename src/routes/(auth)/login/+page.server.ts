import { auth } from "$lib/server/lucia.js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { db } from "$lib/server/database.js";
import { usersTable } from "$lib/server/schema/users.js";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { argon2Verify } from "hash-wasm";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.userData && locals.session) throw redirect(302, "/");
	return {};
};

export const actions: Actions = {
	logIn: async ({ request, locals, cookies }) => {
		const formData = await request.formData();
		const email = formData.get("email");
		const password = formData.get("password");
		// basic check
		if (
			typeof email !== "string" ||
			!email.includes("@") ||
			email.length < 1 ||
			email.length > 31
		) {
			return fail(400, {
				message: "Invalid username",
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 1 ||
			password.length > 255
		) {
			return fail(400, {
				message: "Invalid password",
			});
		}

		// find user by email
		// and validate password
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.get();

		if (!user) {
			return fail(400, { message: "Invalid email or password" });
		}
		const isValidPassword = await argon2Verify({
			hash: user.passwordHash,
			password,
		});

		if (isValidPassword) {
			const session = await auth.createSession(
				user.id,
				{},
				{
					sessionId: generateId(20),
				},
			);
			const sessionCookie = auth.createSessionCookie(session.id);

			// set session cookie
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes,
			});
		} else {
			return fail(400, { message: "Invalid email or password" });
		}

		// redirect to /
		throw redirect(302, "/");
	},
};
