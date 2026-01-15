import { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-12 w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }