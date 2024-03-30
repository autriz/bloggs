import { db } from "$lib/server/database.js";
import z from "zod";
import {
	insertUserSchema,
	updateUserSchema,
	usersTable,
} from "$lib/server/schema/users.js";
import { fail, json, error } from "@sveltejs/kit";
import { eq, getTableColumns } from "drizzle-orm";

async function getUser(userId: string) {
	const { email, passwordHash, ...otherFields } = getTableColumns(usersTable);

	const [user] = await db
		.select(otherFields)
		.from(usersTable)
		.where(eq(usersTable.id, userId));

	if (!user) {
		throw error(404, { message: "User not found" });
	}

	return user;
}

async function updateUser(userId: string, data: typeof updateUserSchema._type) {
	const parse = updateUserSchema.safeParse(data);

	if (parse.success) {
		const parsedData = updateUserSchema.parse(data);

		await db
			.update(usersTable)
			.set(parsedData)
			.where(eq(usersTable.id, userId));
	}
}

async function removeUser(userId: string) {
	const [{ id }] = await db
		.delete(usersTable)
		.where(eq(usersTable.id, userId))
		.returning({ id: usersTable.id });

	return id === typeof "";
}

// get
export async function GET(req) {
	const user = await getUser(req.params["userId"]);

	return json(user);
}

// create
export async function POST() {}

// update
export async function PATCH({ locals, params, request }) {
	if (!locals.userData || !locals.session)
		return error(401, { message: "Unauthorized" });

	if (locals.userData.id !== params["userId"])
		return error(403, { message: "Forbidden" });

	const form = await request.formData();

	console.log(form.entries());

	// await db.update(usersTable).set();
}

// create / replace
export async function PUT() {}

export async function DELETE({ locals, params }) {
	if (!locals.userData || !locals.session)
		return error(401, { message: "Unauthorized" });

	if (locals.userData.id !== params["userId"])
		return error(403, { message: "Forbidden" });

	return error(500, { message: "Still a no-no zone" });

	await removeUser(params["userId"]);

	return json({ done: true });
}
