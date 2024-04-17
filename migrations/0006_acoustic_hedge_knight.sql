DROP TABLE `articles`;--> statement-breakpoint
DROP TABLE `article_comment`;--> statement-breakpoint
DROP TABLE `article_tag`;--> statement-breakpoint

CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`author_id` text NOT NULL,
	`title_image` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer,
	`content` text NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `article_comment` (
	`article_id` integer NOT NULL,
	`comment_id` integer NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`comment_id`) REFERENCES `comment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `article_tag` (
	`article_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
