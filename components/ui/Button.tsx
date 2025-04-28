import { Pressable, PressableProps, Text, ActivityIndicator, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-border bg-transparent text-foreground",
        ghost: "bg-transparent text-foreground",
      },
      size: {
        sm: "h-9 px-3 rounded-md",
        md: "h-10 px-4 rounded-md",
        lg: "h-12 px-6 rounded-lg",
        icon: "h-10 w-10 p-0", // bouton rond pour icône
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  title?: string;  // devient optionnel car pour icon only on a pas de texte
  isLoading?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = ({
  title,
  variant,
  size,
  isLoading = false,
  disabled = false,
  iconLeft,
  iconRight,
  className,
  ...props
}: ButtonProps) => {
  const isIconOnly = size === "icon";

  return (
    <Pressable
      className={cn(
        buttonVariants({ variant, size }),
        disabled && "opacity-50",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <View className="flex-row items-center justify-center space-x-2">
          {iconLeft && <View>{iconLeft}</View>}
          {!isIconOnly && title && (
            <Text className="text-base font-medium">{title}</Text>
          )}
          {iconRight && <View>{iconRight}</View>}
        </View>
      )}
    </Pressable>
  );
};
