import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        'outline-primary': 'border border-primary/40 bg-background hover:bg-primary/5 text-primary',
        'outline-destructive': 'border border-destructive/40 bg-background hover:bg-destructive/10 text-destructive',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        transparent: 'bg-transparent hover:bg-white/10 hover:text-white text-white',
        gray: 'bg-neutral-100 text-secondary-foreground hover:bg-neutral-200',
      },
      size: {
        default: 'h-10 px-4 py-2 [&_svg]:w-4 [&_svg]:h-4',
        sm: 'h-9 px-3 [&_svg]:w-4 [&_svg]:h-4 rounded-sm',
        lg: 'h-11 text-base px-8 [&_svg]:w-5 [&_svg]:h-5',
        icon: 'h-9 w-9 [&_svg]:w-4 [&_svg]:h-4',
        'icon-xs': 'h-6 w-6 [&_svg]:w-4 [&_svg]:h-4 rounded-sm',
        inline: 'h-auto px-2 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
