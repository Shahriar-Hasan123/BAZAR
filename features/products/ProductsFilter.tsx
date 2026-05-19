'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import type { Category } from '@/types'
import type { SortOption } from '@/utils/sort'

interface ProductsFilterProps {
  categories: Category[]
}

// Sort options for the dropdown
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
]

export default function ProductsFilter({
  categories,
}: ProductsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read current values from URL
  const currentCategoryId = searchParams.get('categoryId')
  const currentSort = searchParams.get('sort') || 'default'
  const currentTitle = searchParams.get('title') || ''
  const currentPriceMin = searchParams.get('price_min') || ''
  const currentPriceMax = searchParams.get('price_max') || ''

  // Local state
  const [searchValue, setSearchValue] = useState(currentTitle)
  const [priceMin, setPriceMin] = useState(currentPriceMin)
  const [priceMax, setPriceMax] = useState(currentPriceMax)

  // Debounced values
  const debouncedSearch = useDebounce(searchValue, 500)
  const debouncedPriceMin = useDebounce(priceMin, 700)
  const debouncedPriceMax = useDebounce(priceMax, 700)

  // =========================================
  // SYNC SEARCH TO URL
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
  // SYNC PRICE RANGE TO URL
  // =========================================
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    if (debouncedPriceMin) {
      params.set('price_min', debouncedPriceMin)
    } else {
      params.delete('price_min')
    }

    if (debouncedPriceMax) {
      params.set('price_max', debouncedPriceMax)
    } else {
      params.delete('price_max')
    }

    params.delete('offset')
    router.push(`/products?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPriceMin, debouncedPriceMax])

  // =========================================
  // UPDATE SINGLE URL PARAM
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

  // =========================================
  // CLEAR ALL FILTERS
  // =========================================
  function clearAllFilters() {
    setSearchValue('')
    setPriceMin('')
    setPriceMax('')
    router.push('/products')
  }

  // Check if any filter is active
  const hasActiveFilters =
    currentCategoryId ||
    currentTitle ||
    currentPriceMin ||
    currentPriceMax ||
    currentSort !== 'default'

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
          className="w-full pl-11 pr-10 py-3 rounded-2xl border border-base bg-base text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-shadow"
        />
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

      {/* ── CATEGORY + SORT ROW ── */}
      <div className="card space-y-4">

        {/* Category tabs */}
        <div>
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
                onClick={() =>
                  updateParam('categoryId', String(category.id))
                }
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

        {/* ── PRICE RANGE + SORT ── */}
        {/*
          Stack on mobile
          Side by side on md and up
        */}
        <div className="flex flex-col md:flex-row gap-4 pt-2 border-t border-base">

          {/* Price Range */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-base mb-3">
              Price Range
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="Min"
                  min={0}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-base bg-base text-base text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <span className="text-gray-400 text-sm flex-shrink-0">to</span>
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">
                  $
                </span>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="Max"
                  min={0}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-base bg-base text-base text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="md:w-56">
            <h3 className="text-sm font-semibold text-base mb-3">
              Sort By
            </h3>
            <select
              value={currentSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-base text-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-base"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* ── CLEAR ALL FILTERS ── */}
      {/* Only shows when at least one filter is active */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

    </div>
  )
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}