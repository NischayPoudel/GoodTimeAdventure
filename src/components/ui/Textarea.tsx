import { forwardRef } from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[120px] w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-0 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800 resize-none ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }