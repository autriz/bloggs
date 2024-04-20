import { usersTable } from "./users";
import { articlesTable } from "./articles";

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { generateId } from "lucia";

export const commentsTable = sqliteTable("comment", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	authorId: text("author_id")
		.notNull()
		.references(() => usersTable.id),
	articleId: integer("article_id")
		.notNull()
		.references(() => articlesTable.id),
	createdAt: integer("created_at", { mode: "timestamp" }).default(
		sql`(strftime('%s', 'now'))`,
	),
	updatedAt: integer("updated_at", { mode: "timestamp" }),
	content: text("content").notNull(),
});
export const insertCommentsSchema = createInsertSchema(commentsTable);
export const selectCommentsSchema = createSelectSchema(commentsTable);
