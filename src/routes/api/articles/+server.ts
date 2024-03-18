import { error, json } from "@sveltejs/kit";
import type { Article } from "$lib/types.js";
import { db } from "$lib/server/database.js";
import { articlesTable } from "$lib/server/schema/articles.js";

async function getArticles() {
	// let articles: Article[] = [];

	// const paths = import.meta.glob("/src/articles/*.svx", { eager: true });

	// for (const path in paths) {
	// 	const file = paths[path];
	// 	const slug = path.split("/").at(-1)?.replace(".svx", "");

	// 	if (file && typeof file === "object" && "metadata" in file && slug) {
	// 		const metadata = file.metadata as Omit<Article, "slug">;
	// 		const post = { ...metadata, slug } satisfies Article;
	// 		post.published && articles.push(post);
	// 	}
	// }

	// articles = articles.sort(
	// 	(first, second) =>
	// 		new Date(second.date).getTime() - new Date(first.date).getTime(),
	// );

	const articles = await db.select().from(articlesTable);

	return articles;
}

async function createArticle(newArticleData: any) {}

export async function GET() {
	const articles = await getArticles();
	return json(articles);
}

export async function POST({ locals, fetch, request }) {
	if (!locals.userData || !locals.session)
		return error(401, { message: "Unauthorized" });

	const form = await request.formData();

	return json({ todo: true });
}
