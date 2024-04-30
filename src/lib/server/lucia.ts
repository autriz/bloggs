import { Lucia, TimeSpan } from "lucia";
import { dev } from "$app/environment";
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite";
import { client } from "./database.js";

let adapter = new LibSQLAdapter(client, {
	user: "users",
	session: "user_session",
});

export const auth = new Lucia(adapter, {
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			email: attributes.email,
			firstName: attributes.first_name,
			lastName: attributes.last_name,
			avatar: attributes.avatar,
			aboutMe: attributes.about_me,
		};
	},
	sessionExpiresIn: new TimeSpan(7, "d"),
	sessionCookie: {
		name: "session",
		expires: true,
		attributes: {
			secure: dev ? false : true,
		},
	},
});

export type Auth = typeof auth;

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof auth;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes {
	username: string;
	email: string;
	first_name: string | null;
	last_name: string | null;
	avatar: string | null;
	about_me: string | null;
}
