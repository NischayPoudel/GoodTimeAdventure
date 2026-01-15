'use client'

import { motion } from 'framer-motion'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
  // Show max 7 pages at a time
  const maxPagesToShow = 7
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }
  
  const visiblePages = pages.slice(startPage - 1, endPage)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  return (
    <motion.div 
      className="flex justify-center items-center space-x-2 mt-12 flex-wrap gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Previous Button */}
      <motion.button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Previous
      </motion.button>

      {/* Page Numbers */}
      {startPage > 1 && (
        <>
          <motion.button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold transition-all duration-200"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            1
          </motion.button>
          {startPage > 2 && <span className="text-gray-500 px-2">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <motion.button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            page === currentPage
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
              : 'border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {page}
        </motion.button>
      ))}

      {/* End ellipsis and last page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-gray-500 px-2">...</span>}
          <motion.button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold transition-all duration-200"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {totalPages}
          </motion.button>
        </>
      )}

      {/* Next Button */}
      <motion.button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next →
      </motion.button>
    </motion.div>
  )
}