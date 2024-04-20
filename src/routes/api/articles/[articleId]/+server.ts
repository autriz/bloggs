import { db } from "$lib/server/database.js";
import { articlesTable } from "$lib/server/schema/articles.js";
import { commentsTable } from "$lib/server/schema/comments.js";
import { usersTable } from "$lib/server/schema/users.js";
import { error, json } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";

export async function GET(req) {
	const [article] = await db
		.select()
		.from(articlesTable)
		.where(eq(articlesTable.id, Number(req.params["articleId"])));

	if (!article) {
		throw error(404, { message: "Article not found" });
	}

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
		.where(eq(commentsTable.articleId, article.id))
		.leftJoin(usersTable, eq(commentsTable.authorId, usersTable.id))
		.orderBy(desc(commentsTable.createdAt));

	return json({ ...article, comments });
}

export async function PATCH() {}

export async function DELETE({ params, locals }) {
	if (!locals.userData || !locals.session)
		return error(401, { message: "Unauthorized" });

	const [article] = await db
		.select()
		.from(articlesTable)
		.where(eq(articlesTable.id, Number(params["articleId"])));

	if (locals.userData.id !== article.authorId)
		return error(403, { message: "Forbidden" });

	const [{ id }] = await db
		.delete(articlesTable)
		.where(eq(articlesTable.id, Number(params["articleId"])))
		.returning({ id: articlesTable.id });

	return json({ done: typeof id === "number" });
}
