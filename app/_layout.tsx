import { Stack, Tabs } from "expo-router";
import { ArrowLeftRight, CreditCard, Home, PlusCircle, ScanText, Settings, User2 } from "lucide-react-native";
import React, { Suspense, useEffect } from "react";
import { ActivityIndicator, StatusBar, TouchableOpacity } from "react-native";
import {openDatabaseSync, SQLiteProvider} from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { addDummyData } from "@/db/seed";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

import "../global.css";


export const DATABASE_NAME = "spendly";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

  const expoDb = openDatabaseSync(DATABASE_NAME)
  const db = drizzle(expoDb)
  const {success, error} = useMigrations(db, migrations)
  // use the dribble studio plugin


  return (
    <Suspense fallback={<ActivityIndicator size="large" className="bg-background"/> }>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{enableChangeListener: true}}
        useSuspense
      >
      <StatusBar hidden={true}  />
      {children}
      </SQLiteProvider>
    </Suspense>
  );
};

export default function RootLayout() {
  return (
    <LayoutProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: (props: any) => <TouchableOpacity {...props} />,
          tabBarStyle: {
            backgroundColor: "#080808",
            height: 80,
            borderTopWidth: 2,
            borderColor: "#1f1f1f",
            paddingBottom: 10,
            paddingTop: 10,
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
            href:null,
            tabBarLabel: "New",
            tabBarIcon: ({ color }) => <PlusCircle color={color} size={24} />,
          }}
        />
        <Tabs.Screen
          name="(tabs)/cards"
          options={{
            tabBarLabel: "Catres",
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
    </LayoutProvider>
  );
}
