import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-medium font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-95 hover:shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-blue-500/30 active:bg-blue-700',
        destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-red-500/30 active:bg-red-700',
        outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-900',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
        ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
        link: 'underline-offset-4 hover:underline text-blue-500 font-normal',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-3 text-xs rounded-lg',
        lg: 'h-12 px-8 rounded-xl text-base',
        icon: 'h-10 w-10 rounded-full',
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
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }