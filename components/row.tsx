import { View, ViewProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rowVariants = cva("flex-row", {
  variants: {
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    gap: {
      none: "",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    padding: {
      none: "",
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    align: "center",
    justify: "start",
    gap: "sm",
    padding: "none",
  },
});

interface RowProps extends ViewProps, VariantProps<typeof rowVariants> {}

export const Row = ({ className, align, justify, gap, padding, ...props }: RowProps) => {
  return (
    <View
      className={cn(rowVariants({ align, justify, gap, padding }), className)}
      {...props}
    />
  );
};
