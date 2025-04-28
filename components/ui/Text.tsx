import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-white",
      muted: "text-muted",
      primary: "text-primary",
      secondary: "text-secondary",
      error: "text-error",
      success: "text-success",
      warning: "text-warning",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "base",
    weight: "normal",
    align: "left",
  },
});

interface TextProps
  extends RNTextProps,
    VariantProps<typeof textVariants> {
  className?: string;
}

export function Text({
  children,
  variant,
  size,
  weight,
  align,
  className,
  ...props
}: TextProps) {
  return (
    <RNText
      className={cn(textVariants({ variant, size, weight, align }), className)}
      {...props}
    >
      {children}
    </RNText>
  );
}
