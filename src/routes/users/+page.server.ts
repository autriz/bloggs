import { selectUserSchema } from "$lib/server/schema/users.js";

const requestSchema = selectUserSchema.pick({
	id: true,
	username: true,
	firstName: true,
	lastName: true,
});

export async function load({ fetch }) {
	const response = await fetch("/api/users");
	const users: (typeof requestSchema._type)[] = await response.json();

	console.log(users);

	return { users };
}
