import {  Tabs } from "expo-router";
import { ArrowLeftRight, CreditCard, Home, PlusCircle, ScanText, Settings, User2 } from "lucide-react-native";
import React, { Suspense, useEffect } from "react";
import { ActivityIndicator, StatusBar, TouchableOpacity, View } from "react-native";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";


import "../global.css";

// Pour la gestion des gestes
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Importer le gestionnaire de gestes
import { addDummyData } from "@/db/seed";

export const DATABASE_NAME = "spendly";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const expoDb = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDb);
  const {success, error}  = useMigrations(db, migrations)

  useEffect(() => {
    if (success) {
      addDummyData(db);
    }
    if (error) {
      console.error("Migration error:", error);
    }
  }, [success, error]);

  return (
    <Suspense fallback={<ActivityIndicator size="large" style={{ backgroundColor: "#000000" }} />}>
      <SQLiteProvider databaseName={DATABASE_NAME} options={{ enableChangeListener: true }} useSuspense>
        <StatusBar hidden={true} />
        <View style={{ flex: 1, backgroundColor: "#000000" }}>
          {children}
        </View>
      </SQLiteProvider>
    </Suspense>
  );
};

export default function RootLayout() {
  return (
    <LayoutProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#818cf8",
            tabBarButton: (props: any) => <TouchableOpacity {...props} />,
            tabBarStyle: {
              backgroundColor: "#000000",
              height: 80,
              paddingBottom: 8,
              paddingTop: 10,
              borderWidth: 1,
              borderTopWidth: 1,
              borderRadius: 20,
              borderColor: "#818cf8",
              marginBottom: 25,
              marginHorizontal: 10,
              position: "absolute",
            },
          }}
        >
          <Tabs.Screen
            name="(tabs)/index"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => <Home color={color} size={24} />,
            }}
          />
          <Tabs.Screen
            name="(tabs)/transactions"
            options={{
              tabBarLabel: "Transactions",
              tabBarIcon: ({ color }) => <ArrowLeftRight color={color} size={24} />,
            }}
          />
          <Tabs.Screen
            name="(tabs)/add"
            options={{
              href: null,
              tabBarLabel: "New",
              tabBarIcon: ({ color }) => <PlusCircle color={color} size={24} />,
            }}
          />
          <Tabs.Screen
            name="(tabs)/cards"
            options={{
              tabBarLabel: "Cards",
              tabBarIcon: ({ color }) => <CreditCard color={color} size={24} />,
            }}
          />
          <Tabs.Screen
            name="(tabs)/profile"
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => <User2 color={color} size={24} />,
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </LayoutProvider>
  );
}
