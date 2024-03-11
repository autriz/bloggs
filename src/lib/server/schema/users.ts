import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { generateId } from "lucia";

export const usersTable = sqliteTable("users", {
	id: text("id", { length: 20 })
		.primaryKey()
		.$defaultFn(() => generateId(20)),
	createdAt: integer("created_at", { mode: "timestamp" }).default(
		sql`(strftime('%s', 'now'))`,
	),
	updatedAt: integer("updated_at", { mode: "timestamp" }).default(
		sql`(strftime('%s', 'now'))`,
	),
	firstName: text("first_name"),
	lastName: text("last_name"),
	username: text("username", { length: 32 }).notNull(),
	aboutMe: text("about_me"),
	avatar: text("avatar"),
	email: text("email").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
});
export const insertUserSchema = createInsertSchema(usersTable, {
	email: (schema) => schema.email.email(),
});
export const selectUserSchema = createSelectSchema(usersTable);
export const updateUserSchema = selectUserSchema
	.partial()
	.omit({ id: true, createdAt: true, updatedAt: true });
export const deleteUserSchema = selectUserSchema.pick({ id: true })._type;

export const userSessionTable = sqliteTable("user_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id, {
			onDelete: "cascade",
			onUpdate: "no action",
		}),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
export const insertUserSessionSchema = createInsertSchema(userSessionTable);
export const selectUserSessionSchema = createSelectSchema(userSessionTable);
