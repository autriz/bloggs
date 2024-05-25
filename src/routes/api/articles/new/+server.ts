import { db } from '$lib/server/database.js';
import { articlesTable } from '$lib/server/schema/articles.js';
import { error, json, redirect } from '@sveltejs/kit';

export async function POST({ locals, params, request }) {
    if (!locals.userData || !locals.session)
		error(401, { message: "Unauthorized" });

    let title: string | undefined = undefined;
    let content: string | undefined = undefined;

    try {
		const formData = await request.formData();

		title = formData.get("title")?.toString();
        content = formData.get("content")?.toString();
	} catch (e) {
		console.log(e);

		error(500, { message: "Internal error" });
	}

    if (!title) error(404, { message: "Article title not found" });
    if (!content) error(404, { message: "Article content not found" });

    const [{ id }] = await db
			.insert(articlesTable)
			.values({
                title,
                authorId: locals.userData.id,
                content
            })
            .returning({ id: articlesTable.id });

    throw redirect(302, `/articles/${id}`);
}