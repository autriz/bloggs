import type { Actions } from "./$types.js";

function prepareArticle(text: string) {}

export const actions: Actions = {
	previewArticle: (data) => {
		console.log();
	},

	postArticle: (data) => {
		console.log("post");
	},
};
