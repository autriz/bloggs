export type Categories = "sveltekit" | "svelte";

export type Article = {
	id: number;
	title: string;
	titleImage: string;
	author: {
		id: string;
		username: string;
		avatar: string;
	};
	createdAt: Date;
};

export type FullArticle = Article & {
	updatedAt: Date;
	content: string;
	comments: Comment[];
};

export type Comment = {
	id: number;
	articleId: number;
	author: {
		id: string;
		avatar: string;
		username: string;
	};
	createdAt: Date;
	updatedAt: Date | null;
	content: string;
};
