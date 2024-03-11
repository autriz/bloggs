import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types.js";
import { compile, escapeSvelte, type MdsvexCompileOptions } from "mdsvex";
import { getHighlighter } from "shiki";
import sanitizeHtml from "sanitize-html";

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
};

export const load: PageServerLoad = async ({ fetch, params }) => {
	const url = values[params["articleId"] as keyof typeof values];

	if (!url) throw fail(500, { message: "Invalid test url" });

	const response = await fetch(url);

	const content = await response.text();
	const transformedContent = await compile(content, mdsvexOptions);

	if (!transformedContent)
		throw fail(500, { message: "Failed to compile markdown file" });

	return { content: transformedContent.code };
};

export const actions: Actions = {};
