import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'
import React from 'react'

const textVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-sm",
        xl: "scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl",
        lg: "text-3xl font-bold tracking-tight transition-colors",
        md: "text-sm",
        sm: "text-xs"
      }
    }
  }
)

export interface TextProps
  extends React.ButtonHTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean
}

const Text = React.forwardRef<HTMLHeadingElement, TextProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot :
      variant === "xl" ? "h1" :
      variant === "lg" ? "h3" : "p"
    return (
      <Comp
        className={cn(textVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Text.displayName = "Text"

export { Text, textVariants}