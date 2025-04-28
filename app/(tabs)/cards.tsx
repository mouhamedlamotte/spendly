import { BankCard } from "@/components/BankCard";
import { Text } from "@/components/ui/Text";
import React, { useCallback } from "react";
import { SafeAreaView, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import FloatingButton from "@/components/floating-button";
import { Plus } from "lucide-react-native";

const { width: screenWidth } = Dimensions.get("window");

const Cards = () => {
  const [activeCardId, setActiveCardId] = React.useState("1");
  const carouselRef = React.useRef<ICarouselInstance>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const data = [
    {
      id: "1",
      type: "visa" as const,
      isMobileMoney: false,
      identifier: "1234567890123456",
      holderName: "M. Lamotte",
      expiryDate: "09/25",
      balance: 150000,
      isPrimary: true,
    },
    {
      id: "2",
      type: "orange-money" as const,
      isMobileMoney: true,
      identifier: "+221 77093 42 13",
      holderName: "M. Lamotte",
      balance: 50000,
    },
    {
      id: "3",
      type: "wave" as const,
      isMobileMoney: true,
      identifier: "+221 77093 42 13",
      holderName: "M. Lamotte",
      balance: 75000,
    },
  ];

  // Optimisation de la fonction handleSnapToItem
  const handleSnapToItem = useCallback((index: number) => {
    setCurrentIndex(index);
    const activeItem = data[index];
    if (activeItem.id !== activeCardId) {
      setActiveCardId(activeItem.type);
      console.log("Carte active:", activeItem.id);
    }
  }, [activeCardId, data]);

  const goToCard = (index: number) => {
    carouselRef.current?.scrollTo({ index, animated: true });
  };

  return (
    <SafeAreaView className="px-3 flex-1 pt-6 bg-background relative">
      <Text size="2xl" weight="bold">
        Mes cartes
      </Text>
      
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={({ item }) => (
          <BankCard
            type={item.type}
            isMobileMoney={item.isMobileMoney}
            identifier={item.identifier}
            holderName={item.holderName}
            expiryDate={item.expiryDate}
            balance={item.balance}
            isPrimary={item.id === activeCardId}
            className="w-full h-full"
          />
        )}
        width={screenWidth * 0.9}
        height={200}
        mode="horizontal-stack"
        loop={false}
        modeConfig={{
          snapDirection: "left",
          stackInterval: 18,
        }}
        onSnapToItem={handleSnapToItem}
        style={{ width: "100%", marginTop: 16, paddingTop: 40 }}
      />

      {/* Indicateurs de pagination optimisés */}
      <View className="flex-row justify-center items-center mt-4 space-x-2 gap-1">
        {data.map((item, index) => (
          <View
            key={item.id}
            style={{
              width: index === currentIndex ? 25 : 6,
              height: 6,
              borderRadius: 4,
              backgroundColor: index === currentIndex ? "#6366f1" : "#d1d5db", // Indigo pour actif, gris pour inactif
            }}
          />
        ))}
      </View>

      <Text className="mt-4">Carte active: {activeCardId}</Text>
      <FloatingButton
      Icon={Plus}
      onPressAction={()=>{}} // Change icon on press
    />
    </SafeAreaView>
  );
};

export default Cards;
