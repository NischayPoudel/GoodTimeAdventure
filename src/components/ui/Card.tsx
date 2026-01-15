import { forwardRef } from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-2xl glass text-white shadow-2xl transition-all duration-500 hover:shadow-2xl hover:bg-white/12 group cursor-pointer transform hover:scale-105 ${className}`}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export { Card }