import { db } from "$lib/server/database.js";
import { articlesTable } from "$lib/server/schema/articles.js";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function GET(req) {
	const posts = await db
		.select({
			id: articlesTable.id,
			title: articlesTable.title,
			titleImage: articlesTable.titleImage,
			createdAt: articlesTable.createdAt,
		})
		.from(articlesTable)
		.where(eq(articlesTable.authorId, req.params["userId"]));

	return json(posts);
}
