import { preprocessMeltUI, sequence } from "@melt-ui/pp";
import { mdsvex, escapeSvelte } from "mdsvex";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-vercel";
import { getHighlighter } from "shiki/bundle/full";

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".md", ".svx"],
	highlight: {
		highlighter: async (code, lang = "text") => {
			const highlighter = await getHighlighter({
				themes: ["github-dark", "github-light"],
				langs: [lang],
			});
			//@ts-ignore
			await highlighter.loadLanguage(lang);
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

/** @type {import('@sveltejs/kit').Config}*/
export default {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: [".svelte", ".svx", ".md"],
	preprocess: sequence([
		vitePreprocess({}),
		preprocessMeltUI(),
		// @ts-ignore
		mdsvex(mdsvexOptions),
	]),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			runtime: "nodejs20.x",
			// runtime: "edge",
		}),
		csrf: {
			checkOrigin: false,
		},
	},
};
