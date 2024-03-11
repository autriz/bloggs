import { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

/** @type {import('drizzle-kit').Config}*/
export default {
	schema: "./src/lib/server/schema",
	out: "./migrations",
	driver: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
		authToken: process.env.DATABASE_AUTH_TOKEN || "",
	},
};
