import { Transaction } from "@/db/schema";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import * as schema from "@/db/schema";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { Row } from "@/components/row";
import { Bell, Eye, EyeOff, Plus } from "lucide-react-native";
import { IconButton } from "@/components/ui/icon-button";
import { cn, formatCurrency } from "@/lib/utils";
import { BankCard } from "@/components/BankCard";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

export default function Index() {
  const db = useSQLiteContext();
  const drizzleDB = drizzle(db, { schema });
  useDrizzleStudio(db);

  const { data } = useLiveQuery(drizzleDB.select().from(schema.transactions));

  const [showBalance, setShowBalance] = React.useState(false);
  const toggleShowBalance = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <SafeAreaView className="px-3 flex-1 pt-6 bg-background">
      {/* Header */}
      <Row>
        <View className="gap-1">
          <Text className="text-2xl font-bold text-primary">Spendly</Text>
          <Text className="text-muted-light font-bold">Mouhamed Lamotte</Text>
        </View>
        <IconButton className="ml-auto" icon={Bell} />
      </Row>
      <View
        className="mt-4 border  rounded-xl bg-black py-4 ps-4"
        style={{
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
        }}
      >
        {/* Balance */}
        <View className=" gap-2">
          <Text className="text-xl font-bold">Solde</Text>
          <Row className="items-centers gap-2">
            <Text className="text-3xl font-bold text-primary">
              {showBalance ? formatCurrency(24000) : "• • • • • • • "}
            </Text>
            <IconButton
              icon={showBalance ? EyeOff : Eye}
              variant="outline"
              onPress={toggleShowBalance}
              className="border-0"
            />
          </Row>
        </View>
        {/* Cards */}
        <Row className="mt-2 items-center" gap="lg">
          {/* Première partie (Titre + Bouton) */}
          <Row className="items-center gap-4">
            <Text className="text-xl font-bold">Cartes</Text>
            <IconButton icon={Plus} />
          </Row>

          <FlatList
            data={[
              // Carte bancaire
              {
                id: "1",
                type: "visa",
                isMobileMoney: false,
                identifier: "1234567890123456",
                holderName: "M. Lamotte",
                expiryDate: "09/25",
                balance: 150000,
                isPrimary: true,
              },
              // Compte mobile money
              {
                id: "2",
                type: "orange-money",
                isMobileMoney: true,
                identifier: "+221 77093 42 13",
                holderName: "M. Lamotte",
                balance: 50000,
              },
              {
                id: "3",
                type: "wave",
                isMobileMoney: true,
                identifier: "+221 77093 42 13",
                holderName: "M. Lamotte",
                balance: 75000,
              },
            ]}
            renderItem={({ item }) => (
              <BankCard
                type={
                  item.type as "visa" | "mastercard" | "orange-money" | "wave"
                }
                isMobileMoney={item.isMobileMoney}
                identifier={item.identifier}
                holderName={item.holderName}
                expiryDate={item.expiryDate}
                balance={item.balance}
                isPrimary={item.isPrimary}
                className="w-72"
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 16, paddingHorizontal: 8 }}
            className="py-2 rounded-2xl overflow-hidden"
          />
        </Row>
      </View>
      {/* Recent transactions */}
      <View className="mt-8 flex-1 grow h-full">
        <Row>
          <Text className="text-xl font-bold">Transactions récentes</Text>
          <Text className="text-muted-light text-sm font-semibold ml-auto">
            Voir tout
          </Text>
        </Row>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between mt-4">
              <View className="flex-row items-center gap-2">
                <View>
                  <Text className="text-base font-semibold">{item.title}</Text>
                  <Text className="text-sm text-muted-light">
                    {item.createdAt.split(" ")[0]}
                  </Text>
                </View>
              </View>
              <Text
                className={cn(
                  "text-base font-semibold",
                  item.type === "income" ? "text-green-500" : "text-red-500"
                )}
              >
                {item.type === "income" ? "+" : "-"}{" "}
                {formatCurrency(item.amount)}
              </Text>
            </View>
          )}
          className="mt-4"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </SafeAreaView>
  );
}
