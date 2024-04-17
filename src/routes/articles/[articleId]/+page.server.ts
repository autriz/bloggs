import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { compile, escapeSvelte, type MdsvexCompileOptions } from "mdsvex";
import { getHighlighter } from "shiki/bundle/full";
import { insertCommentsSchema } from "$lib/server/schema/comments.js";
import { ZodError } from "zod";
import type { Article, FullArticle } from "$lib/types.js";

const mdsvexOptions: MdsvexCompileOptions = {
	extensions: [".md", ".svx"],
	highlight: {
		highlighter: async (code, lang = "text") => {
			const highlighter = await getHighlighter({
				themes: ["github-dark", "github-light"],
				langs: [lang],
			});
			await highlighter.loadLanguage(lang as any);
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang,
					themes: { dark: "github-dark", light: "github-light" },
				}),
			);
			return html;
		},
	},
};

// test only
const values = {
	"1": "https://raw.githubusercontent.com/markedjs/marked/master/README.md",
	"2": "https://raw.githubusercontent.com/huntabyte/shadcn-svelte/main/README.md",
	"3": "https://raw.githubusercontent.com/shikijs/shiki/main/README.md",
	"4": "https://raw.githubusercontent.com/cure53/DOMPurify/main/README.md",
	"5": "https://raw.githubusercontent.com/BearToCode/carta/master/README.md",
};

const internal_values = {
	"1": "../../../posts/1.svx",
	"2": "../../../posts/2.svx",
};

export const load: PageServerLoad = async ({ fetch, params }) => {
	const response = await fetch("/api/articles/" + params["articleId"]);

	if (response.status !== 200) {
		const { message } = await response.json();

		throw error(response.status, { message });
	}

	let { content, ...articleData }: FullArticle = await response.json();

	content = content.replaceAll("\\n", "\n");

	const transformedContent = await compile(content, mdsvexOptions);

	return { content: transformedContent, meta: articleData };
};

export const actions: Actions = {
	newComment: async ({ locals, request, params }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const input = insertCommentsSchema.parse(formData);

			console.log(input);

			return { success: true, data: null, errors: null };
		} catch (err) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				console.log(errors);
				return fail(400, {
					success: false,
					data: formData,
					errors,
				});
			}
		}
	},
};
