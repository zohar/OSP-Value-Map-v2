import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5",
        outline: "border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-accent/10 hover:text-accent-foreground hover:border-accent/50 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground shadow-md hover:shadow-lg hover:bg-secondary/80 hover:-translate-y-0.5",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-accent",
        success: "bg-success text-success-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5",
        warning: "bg-warning text-warning-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5",
        info: "bg-info text-info-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5",
        gradient: "bg-gradient-accent text-accent-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-105",
        glass: "glass text-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }