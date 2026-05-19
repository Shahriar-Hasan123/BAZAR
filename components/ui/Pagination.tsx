'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // =========================================
  // GO TO PAGE
  // Preserves all existing filter params
  // Only updates offset
  // =========================================
  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    const offset = (page - 1) * 12

    if (offset === 0) {
      params.delete('offset')
    } else {
      params.set('offset', String(offset))
    }

    router.push(`/products?${params.toString()}`)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // =========================================
  // BUILD PAGE NUMBERS TO SHOW
  // Shows max 5 page numbers at a time
  // with ellipsis for large page counts
  // =========================================
  function getPageNumbers(): (number | '...')[] {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | '...')[] = []

    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Show pages around current
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // Always show last page
    pages.push(totalPages)

    return pages
  }

  // Don't render if only one page
  if (totalPages <= 1) return null

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center gap-2 mt-12">

      {/* ── PREVIOUS BUTTON ── */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={!hasPrevPage}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeftIcon />
        Prev
      </button>

      {/* ── PAGE NUMBERS ── */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) =>
          page === '...' ? (
            // Ellipsis
            <span
              key={`ellipsis-${index}`}
              className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
            >
              ...
            </span>
          ) : (
            // Page number button
            <button
              key={page}
              onClick={() => goToPage(page as number)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* ── NEXT BUTTON ── */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={!hasNextPage}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <ChevronRightIcon />
      </button>

    </div>
  )
}

function ChevronLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}