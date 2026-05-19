'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import type { Category } from '@/types'

interface ProductsFilterProps {
  categories: Category[]
}

export default function ProductsFilter({
  categories,
}: ProductsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategoryId = searchParams.get('categoryId')
  const currentTitle = searchParams.get('title') || ''

  // Local state for the search input
  // This updates instantly as user types
  const [searchValue, setSearchValue] = useState(currentTitle)

  // Debounced value — only updates 500ms after
  // user stops typing
  const debouncedSearch = useDebounce(searchValue, 500)

  // =========================================
  // SYNC DEBOUNCED SEARCH TO URL
  // Only runs when debouncedSearch changes
  // NOT on every keystroke
  // =========================================
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedSearch) {
      params.set('title', debouncedSearch)
    } else {
      params.delete('title')
    }

    params.delete('offset')
    router.push(`/products?${params.toString()}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  // =========================================
  // UPDATE SINGLE URL PARAM
  // Preserves all other existing params
  // =========================================
  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())

    if (value === null) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    params.delete('offset')
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-4">

      {/* ── SEARCH INPUT ── */}
      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <SearchIcon />
        </div>

        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow"
        />

        {/* Clear button — only shows when there is text */}
        {searchValue && (
          <button
            onClick={() => setSearchValue('')}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* ── CATEGORY TABS ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">

        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Category
        </h3>

        <div className="flex gap-2 overflow-x-auto pb-1">

          <button
            onClick={() => updateParam('categoryId', null)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!currentCategoryId
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateParam('categoryId', String(category.id))}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${currentCategoryId === String(category.id)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category.name}
            </button>
          ))}

        </div>
      </div>

    </div>
  )
}

// =========================================
// ICONS
// =========================================
function SearchIcon() {
  return (
    <svg
      className="w-4 h-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}