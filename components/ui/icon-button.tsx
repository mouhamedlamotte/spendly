import { Pressable, PressableProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react-native";

const iconButtonVariants = cva(
  "items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-border bg-transparent",
        ghost: "bg-transparent",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface IconButtonProps extends PressableProps, VariantProps<typeof iconButtonVariants> {
  icon: LucideIcon;   // << ici on attend juste le composant (pas instancié)
  iconColor?: string; // couleur custom optionnelle
}

export const IconButton = ({
  icon: Icon, // << ici je renomme directement pour l'utiliser
  iconColor = "white",
  variant,
  size,
  className,
  ...props
}: IconButtonProps) => {
  const iconSize = size === "sm" ? 16 : size === "md" ? 20 : 24;

  return (
    <Pressable
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      <Icon size={iconSize} color={iconColor} />
    </Pressable>
  );
};
