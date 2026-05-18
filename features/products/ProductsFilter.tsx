'use client'

import type { Category } from '@/types'

interface ProductsFilterProps {
  categories: Category[]
  currentParams: {
    categoryId?: string
    title?: string
    price_min?: string
    price_max?: string
  }
}

export default function ProductsFilter({
  categories,
  currentParams,
}: ProductsFilterProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <p className="text-sm text-gray-500">
        Filters coming in next lesson...
      </p>
    </div>
  )
}