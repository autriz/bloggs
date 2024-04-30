import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
	const response = await fetch(
		"/api/users/" + params["userId"] + "/comments",
	);

	if (response.status !== 200) {
		const { message } = await response.json();

		throw error(response.status, { message });
	}

	const comments: {
		id: number;
		article: {
			id: number;
			title: string;
		};
		createdAt: Date | null;
		content: string;
	}[] = await response.json();

	return { comments };
}
