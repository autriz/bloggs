import { db } from "$lib/server/database.js";
import { commentsTable } from "$lib/server/schema/comments.js";
import { usersTable } from "$lib/server/schema/users.js";
import { json } from "@sveltejs/kit";
import { eq, and } from "drizzle-orm";

export async function GET({ locals, params, request }) {
	const [comment] = await db
		.select({
			id: commentsTable.id,
			articleId: commentsTable.articleId,
			author: {
				id: usersTable.id,
				avatar: usersTable.avatar,
				username: usersTable.username,
			},
			createdAt: commentsTable.createdAt,
			updatedAt: commentsTable.updatedAt,
			content: commentsTable.content,
		})
		.from(commentsTable)
		.where(
			and(
				eq(commentsTable.id, Number(params["commentId"])),
				eq(commentsTable.articleId, Number(params["articleId"])),
			),
		)
		.leftJoin(usersTable, eq(commentsTable.authorId, usersTable.id));

	return json(comment);
}

export async function PATCH(req) {
	return json({ done: true });
}

export async function DELETE(req) {
	return json({ done: true });
}
