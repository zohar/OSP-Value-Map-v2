import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-sm hover:shadow-md hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm hover:shadow-md hover:bg-destructive/90",
        outline: "text-foreground border-border hover:bg-accent/10 hover:text-accent-foreground hover:border-accent/50",
        success:
          "border-transparent bg-success text-success-foreground shadow-sm hover:shadow-md hover:bg-success/90",
        warning:
          "border-transparent bg-warning text-warning-foreground shadow-sm hover:shadow-md hover:bg-warning/90",
        info:
          "border-transparent bg-info text-info-foreground shadow-sm hover:shadow-md hover:bg-info/90",
        gradient:
          "border-transparent bg-gradient-accent text-accent-foreground shadow-md hover:shadow-lg",
        glass:
          "glass text-foreground shadow-md hover:shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }