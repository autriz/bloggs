import { usersTable } from "./users";

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const articlesTable = sqliteTable("articles", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	authorId: text("author_id")
		.notNull()
		.references(() => usersTable.id),
	createdAt: integer("created_at", { mode: "timestamp" }).default(
		sql`(strftime('%s', 'now'))`,
	),
	updatedAt: integer("updated_at", { mode: "timestamp" }),
	content: text("content").notNull(),
});
export const insertArticleSchema = createInsertSchema(articlesTable);
export const selectArticleSchema = createSelectSchema(articlesTable);
