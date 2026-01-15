import { forwardRef } from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-800 backdrop-blur-md ${className}`}
      {...props}
    />
  )
)
Card.displayName = 'Card'

export { Card }