import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-md',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={badgeVariants({ variant, className })} {...props} />
  )
}

export { Badge, badgeVariants }