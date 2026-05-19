'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/types'

interface ProductsFilterProps {
  categories: Category[]
}

export default function ProductsFilter({
  categories,
}: ProductsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current active category from URL
  const currentCategoryId = searchParams.get('categoryId')

  // =========================================
  // UPDATE URL PARAMS
  // Builds a new URL with updated params
  // Keeps existing params intact
  // =========================================
  function updateParam(key: string, value: string | null) {
    // Copy all current params
    const params = new URLSearchParams(searchParams.toString())

    if (value === null) {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    // Always reset to first page when filter changes
    params.delete('offset')

    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-4">

      {/* ── CATEGORY TABS ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">

        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Category
        </h3>

        {/*
          Horizontal scroll on mobile
          Wrap on larger screens
        */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">

          {/* ALL tab */}
          <button
            onClick={() => updateParam('categoryId', null)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              !currentCategoryId
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>

          {/* Category tabs */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateParam('categoryId', String(category.id))}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                currentCategoryId === String(category.id)
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