// addDummyData.ts
import { transactions } from "./schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import AsyncStorage from "expo-sqlite/kv-store"; // pour mémoriser que c'est déjà seed
import { transactionType } from "./schema";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  const alreadySeeded = await AsyncStorage.getItem("dbInitialized");

  if (alreadySeeded) {
    console.log("✅ DB already initialized");
    return;
  }

  console.log("🔵 Inserting dummy transactions...");

  await db.insert(transactions).values([
    {
      id: "1",
      title: "Déjeuner au resto",
      amount: 25.99,
      type: transactionType.EXPENSE,
    },
    {
      id: "2",
      title: "Salaire mensuel",
      amount: 3000.00,
      type: transactionType.INCOME,
    },
    {
      id: "3",
      title: "Netflix abonnement",
      amount: 12.99,
      type: transactionType.EXPENSE,
    },
    {
      id: "4",
      title: "Vente Freelance",
      amount: 450.00,
      type: transactionType.INCOME,
    },
    {
      id: "5",
      title: "Courses semaine",
      amount: 110.75,
      type: transactionType.EXPENSE,
    },
  ]);

  console.log("✅ Dummy data inserted");

  await AsyncStorage.setItem("dbInitialized", "true");
};
