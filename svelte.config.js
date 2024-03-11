import { preprocessMeltUI, sequence } from "@melt-ui/pp";
import { mdsvex, code_highlighter } from "mdsvex";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-vercel";

/**
 * @param {string} code
 */
function highlighter(code, lang = "") {
	console.log(code);
	return `<pre class="${lang}"><code>${code}</code></pre>`;
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [".svx", ".md"],
	highlight: {
		highlighter,
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
	},
};
