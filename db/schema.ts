// schema.ts
import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// Définir un ENUM pour le type de transaction
export const transactionType = {
  INCOME: "income",
  EXPENSE: "expense",
} as const;

export type TransactionType = (typeof transactionType)[keyof typeof transactionType];

// Définir la table principale
export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey().notNull(), // UUID ou ID custom (string)
  title: text("title").notNull(),         // Titre de la transaction
  amount: real("amount").notNull(),       // Montant (positif ou négatif)
  type: text("type", { enum: ["income", "expense"] }).notNull(), // Type de transaction
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`), // Date de création
});

export type Transaction = typeof transactions.$inferSelect;