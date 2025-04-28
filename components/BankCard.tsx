import { View, Image, ImageBackground } from "react-native";
import { cn } from "@/lib/utils";
import { Row } from "./row";
import { Text } from "./ui/Text";

type CardType = "visa" | "mastercard" | "orange-money" | "wave";

type BankCardProps = {
  className?: string;
  type: CardType;
  isMobileMoney: boolean;
  identifier: string; // Numéro de carte OU numéro de téléphone
  holderName: string;
  expiryDate?: string; // Uniquement pour les cartes bancaires
  balance: number;
  isPrimary?: boolean;
  currency?: string;
};

const cardColors = {
  base: "bg-[#0A0A0A]",
  text: "text-white",
  primaryBorder: "border border-yellow-400",
  borders: {
    "orange-money": "border border-orange-500",
    wave: "border border-blue-500",
    visa: "border border-blue-700",
    mastercard: "border border-red-500",
  },
};

export function BankCard({
  type,
  isMobileMoney,
  identifier,
  holderName,
  expiryDate,
  balance,
  isPrimary = false,
  currency = "FCFA",
  className,
}: BankCardProps) {
  const renderLogo = () => {
    switch (type) {
      case "orange-money":
        return (
          <Image
            source={require("@/assets/images/logos/orange-money.png")}
            className="h-10 w-10"
            resizeMode="contain"
          />
        );
      case "wave":
        return (
          <Image
            source={require("@/assets/images/logos/wave.png")}
            className="h-10 w-10"
            resizeMode="contain"
          />
        );
      default:
        return (
          <Image
            source={require("@/assets/images/logos/visa.png")}
            className="h-10 w-10"
            resizeMode="contain"
          />
        );
    }
  };

  return (
    <ImageBackground
    source={require("../assets/images/motif.png")}
    className={cn(
      "p-5 rounded-2xl justify-between overflow-hidden",
      cardColors.text,
      cardColors.borders[type],
      className,
    )}
    resizeMode="cover"
  >

      <Row className="justify-between items-center">
        {renderLogo()}
        {!isMobileMoney && expiryDate && (
          <View className="items-end">
            <Text className="text-xs">Expire le</Text>
            <Text className="font-semibold">{expiryDate}</Text>
          </View>
        )}
      </Row>

      {/* Identifiant (numéro de carte ou téléphone) */}
      <View className="mt-4">
        <Text className="text-lg font-mono tracking-widest">
          {isMobileMoney ? (
            identifier // Affiche le numéro de téléphone en clair
          ) : (
            <>•••• •••• •••• {identifier.slice(-4)}</>
          )}
        </Text>
      </View>

      {/* Footer avec infos spécifiques */}
      <Row className="justify-between items-end mt-6">
        <Text className="font-semibold">{holderName}</Text>
        <Text className="font-bold text-lg">
          {balance.toLocaleString()} {currency}
        </Text>
      </Row>
    </ImageBackground>
  );
}
