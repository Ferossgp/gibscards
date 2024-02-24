import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  cn("inline-flex w-full h-full items-center justify-center whitespace-nowrap rounded-xl text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    "transition-all duration-200 ease-in-out transform -translate-y-1 -translate-x-1 hover:translate-x-0 hover:translate-y-0 disabled:translate-x-0 disabled:translate-y-0",),

  {
    variants: {
      variant: {
        default: "bg-[#f84f39] border-2 border-neutral-900 text-neutral-900 hover:bg-[#f84f39]/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-[#6b66da] text-primary-foreground border-2 border-neutral-900 hover:bg-[#6b66da]/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-4",
        sm: "h-9  px-3",
        lg: "h-11  px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const containerVariants = cva(
  "flex bg-neutral-800",
  {
    variants: {
      size: {
        default: "rounded-2xl pb-1 pr-1",
        sm: "rounded-xl pb-0 pr-0",
        lg: "rounded-2xl pb-1 pr-1",
        icon: "rounded-2xl pb-1 pr-1",
      },
    },
    defaultVariants: {
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
    const Comp = asChild ? Slot : "button"
    return (
      <div className={cn(containerVariants({ size }))}>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
