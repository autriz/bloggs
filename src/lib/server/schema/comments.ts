import { usersTable } from "./users.js";
import { articlesTable } from "./articles.js";

import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const commentsTable = sqliteTable("comment", {
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
export const insertCommentsSchema = createInsertSchema(commentsTable);
export const selectCommentsSchema = createSelectSchema(commentsTable);

export const articleCommentTable = sqliteTable("article_comment", {
	article_id: integer("article_id")
		.notNull()
		.references(() => articlesTable.id),
	commentId: integer("comment_id")
		.notNull()
		.references(() => commentsTable.id),
});
export const insertArticleCommentSchema =
	createInsertSchema(articleCommentTable);
export const selectArticleCommentSchema =
	createSelectSchema(articleCommentTable);
