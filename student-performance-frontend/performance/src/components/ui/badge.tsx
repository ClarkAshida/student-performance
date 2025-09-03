import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-danger-500 text-white shadow hover:bg-danger-600",
        outline: "text-foreground",
        success:
          "border-transparent bg-success-100 text-success-800 border-success-200 hover:bg-success-200",
        warning:
          "border-transparent bg-warning-100 text-warning-800 border-warning-200 hover:bg-warning-200",
        danger:
          "border-transparent bg-danger-100 text-danger-800 border-danger-200 hover:bg-danger-200",
        neutral:
          "border-transparent bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
        approved:
          "border-transparent bg-success-100 text-success-800 border-success-200",
        failed:
          "border-transparent bg-danger-100 text-danger-800 border-danger-200",
        pending:
          "border-transparent bg-warning-100 text-warning-800 border-warning-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
