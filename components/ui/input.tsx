import { TextInput, TextInputProps, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react-native";

const inputVariants = cva(
  "w-full rounded-md border border-white bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "border-border",
        error: "border-destructive",
      },
      size: {
        sm: "h-10 px-2 text-sm",
        md: "h-12 px-3 text-base",
        lg: "h-14 px-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface InputProps extends TextInputProps, VariantProps<typeof inputVariants> {
  containerClassName?: string;
  icon?: React.ReactNode;
}

export const Input = ({
    icon,
  variant,
  size,
  className,
  containerClassName,
  ...props
}: InputProps) => {
  return (
    <View className={cn("relative",containerClassName)}>
      <TextInput
        style={{
            borderColor: "#818cf8",
        }}
        className={cn("ps-12 py-6",inputVariants({ variant, size }), className)}
        placeholderTextColor="#A1A1AA" // Tailwind muted color
        {...props}
      />
      {
        icon && (
          <View 
            style={{
                position: "absolute",
                left: 10,
                top: 25,
            }}
          >
            {icon}
          </View>
        )}
      {/* Search icon */}
    </View>
  );
};
