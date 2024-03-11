import { json } from "@sveltejs/kit";
import type { Article } from "$lib/types.js";

async function getArticles() {
	let articles: Article[] = [];

	const paths = import.meta.glob("/src/articles/*.svx", { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split("/").at(-1)?.replace(".svx", "");

		if (file && typeof file === "object" && "metadata" in file && slug) {
			const metadata = file.metadata as Omit<Article, "slug">;
			const post = { ...metadata, slug } satisfies Article;
			post.published && articles.push(post);
		}
	}

	articles = articles.sort(
		(first, second) =>
			new Date(second.date).getTime() - new Date(first.date).getTime(),
	);

	return articles;
}

async function createPost(newPostData: any) {}

export async function GET() {
	const articles = await getArticles();
	return json(articles);
}

export async function POST({ locals, fetch, request }) {
	const form = await request.formData();

	return json({ todo: true });
}
