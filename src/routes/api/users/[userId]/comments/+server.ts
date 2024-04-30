import { db } from "$lib/server/database.js";
import { articlesTable } from "$lib/server/schema/articles.js";
import { commentsTable } from "$lib/server/schema/comments.js";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function GET(req) {
	const comments = await db
		.select({
			id: commentsTable.id,
			article: {
				id: articlesTable.id,
				title: articlesTable.title,
			},
			createdAt: commentsTable.createdAt,
			content: commentsTable.content,
		})
		.from(commentsTable)
		.where(eq(commentsTable.authorId, req.params["userId"]))
		.leftJoin(articlesTable, eq(articlesTable.id, commentsTable.articleId));

	return json(comments);
}
