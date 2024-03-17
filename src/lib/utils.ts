import { error } from "@sveltejs/kit";
import DOMPurify from "isomorphic-dompurify";
import { Carta } from "carta-md";
import { code } from "@cartamd/plugin-code";
import { anchor } from "@cartamd/plugin-anchor";
import { getHighlighter } from "shiki/bundle/full";

type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export function formatDate(
	date: string,
	dateStyle: DateStyle = "medium",
	locales = "en",
) {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll("-", "/"));
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}

export function getCarta() {
	return new Carta({
		sanitizer: DOMPurify.sanitize,
		extensions: [
			anchor(),
			code({
				defaultLanguage: "text",
				customHighlight: {
					highlighter: async (code, lang = "text") => {
						const highlighter = await getHighlighter({
							themes: ["github-dark", "github-light"],
							langs: [lang],
						});
						await highlighter.loadLanguage(lang as any);
						const html = highlighter.codeToHtml(code, {
							lang,
							themes: {
								dark: "github-dark",
								light: "github-light",
							},
						});
						console.log(html);
						return html;
					},
					langPrefix: "language-",
				},
			}),
		],
	});
}
