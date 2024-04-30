import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
	const response = await fetch("/api/users/" + params["userId"] + "/posts");

	if (response.status !== 200) {
		const { message } = await response.json();

		throw error(response.status, { message });
	}

	const posts: {
		id: number;
		title: string;
		titleImage: string | null;
		createdAt: Date | null;
	}[] = await response.json();

	return { posts };
}
