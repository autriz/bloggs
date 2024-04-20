import { db } from "$lib/server/database.js";
import {
	commentsTable,
	insertCommentsSchema,
} from "$lib/server/schema/comments.js";
import { usersTable } from "$lib/server/schema/users.js";
import { error, json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function GET({ locals, params }) {
	const comments = await db
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
		.where(eq(commentsTable.articleId, Number(params["articleId"])))
		.leftJoin(usersTable, eq(commentsTable.authorId, usersTable.id));

	return json(comments);
}

export async function POST({ locals, params, request }) {
	if (!locals.userData || !locals.session)
		return error(401, { message: "Unauthorized" });

	const formData = Object.fromEntries(await request.formData());
	const content = formData["content"];

	const parsedComment = insertCommentsSchema.parse({ content });

	console.log(parsedComment);

	return json({ done: true });
}

export async function DELETE(req) {
	return json({ done: true });
}
