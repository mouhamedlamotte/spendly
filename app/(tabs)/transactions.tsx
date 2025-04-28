import { Row } from "@/components/row";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/Text";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { Plus, Search } from "lucide-react-native";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as schema from "@/db/schema";
import { cn, formatCurrency } from "@/lib/utils";
import FloatingButton from "@/components/floating-button";

const Transactions = () => {
  const [filter, setFilter] = React.useState<"all" | "incomes" | "expenses">(
    "all"
  );
  const [q, setQ] = React.useState("");

  const handleFilterChange = (newFilter: "all" | "incomes" | "expenses") => {
    setFilter(filter === newFilter ? "all" : newFilter);
  };

  const db = useSQLiteContext();
  const drizzleDB = drizzle(db, { schema });

  const { data: allTransactions = [] } = useLiveQuery(
    drizzleDB.select().from(schema.transactions)
  );
  const transactions = React.useMemo(() => {
    let filtered = allTransactions;

    if (filter === "incomes") {
      filtered = filtered.filter((t) => t.type === "income");
    } else if (filter === "expenses") {
      filtered = filtered.filter((t) => t.type === "expense");
    }

    if (q.trim() !== "") {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(q.trim().toLowerCase())
      );
    }

    return filtered;
  }, [filter, q, allTransactions]);

  return (
    <SafeAreaView className="px-3 flex-1 pt-6 bg-background">
      <Text size="2xl" weight="bold">
        Transactions
      </Text>
      <Input
        placeholder="Recherche"
        className="w-full mt-4 rounded-full"
        icon={<Search size={20} color="#818cf8" />}
        value={q}
        onChangeText={setQ}
      />
      <Row
        justify="between"
        className="mt-6 border border-muted-light rounded-full p-1 overflow-hidden"
      >
        <Button
          size="lg"
          className="rounded-full flex-1"
          title="Incomes"
          variant={filter === "incomes" ? "default" : "ghost"}
          onPress={() => handleFilterChange("incomes")}
        />
        <Button
          size="lg"
          className="rounded-full flex-1"
          title="Expenses"
          variant={filter === "expenses" ? "default" : "ghost"}
          onPress={() => handleFilterChange("expenses")}
        />
      </Row>

      <FlatList
        data={transactions}
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
              {item.type === "income" ? "+" : "-"} {formatCurrency(item.amount)}
            </Text>
          </View>
        )}
        className="mt-4"
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <Text className="text-base text-muted-light">
              Aucune transaction trouvée
            </Text>
          </View>
        )}
      />
            <FloatingButton
      Icon={Plus}
      onPressAction={()=>{}} // Change icon on press
    />
    </SafeAreaView>
  );
};

export default Transactions;
