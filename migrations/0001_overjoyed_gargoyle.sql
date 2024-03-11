ALTER TABLE `users` RENAME COLUMN `hashed_password` TO `password_hash`;--> statement-breakpoint
ALTER TABLE `user_session` DROP COLUMN `fresh`;