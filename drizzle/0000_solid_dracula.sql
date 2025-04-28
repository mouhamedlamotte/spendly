CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`amount` real NOT NULL,
	`type` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
