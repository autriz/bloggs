import { db } from "$lib/server/database.js";
import { usersTable } from "$lib/server/schema/users.js";
import { json } from "@sveltejs/kit";
import { eq, getTableColumns } from "drizzle-orm";

async function getUsers() {
	const { email, passwordHash, createdAt, updatedAt, ...otherFields } =
		getTableColumns(usersTable);

	const users = await db.select(otherFields).from(usersTable);

	return users;
}

export async function GET() {
	const users = await getUsers();

	return json(users);
}

export async function POST() {}

export async function PUT() {}

export async function PATCH() {}

export async function DELETE() {}
