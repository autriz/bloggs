import { articlesTable } from "./articles";

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tagsTable = sqliteTable("tags", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name", { length: 20 }).notNull().unique(),
});
export const insertTagsSchema = createInsertSchema(tagsTable);
export const selectTagsSchema = createSelectSchema(tagsTable);

export const articleTagTable = sqliteTable("article_tag", {
	articleId: integer("article_id")
		.notNull()
		.references(() => articlesTable.id),
	tagId: integer("tag_id")
		.notNull()
		.references(() => tagsTable.id),
});
export const insertArticleTagSchema = createInsertSchema(articleTagTable);
export const selectArticleTagSchema = createSelectSchema(articleTagTable);
