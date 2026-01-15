import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-md border border-white/20',
  {
    variants: {
      variant: {
        default: 'glass text-cyan-200 hover:bg-white/15',
        secondary: 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white hover:from-purple-500/60 hover:to-pink-500/60',
        destructive: 'bg-gradient-to-r from-red-500/40 to-orange-500/40 text-white hover:from-red-500/60 hover:to-orange-500/60',
        outline: 'glass text-white border border-white/40 hover:bg-white/10',
        success: 'bg-gradient-to-r from-green-500/40 to-emerald-500/40 text-white hover:from-green-500/60 hover:to-emerald-500/60',
        warning: 'bg-gradient-to-r from-yellow-500/40 to-amber-500/40 text-white hover:from-yellow-500/60 hover:to-amber-500/60',
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