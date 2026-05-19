import type { Product } from '@/types'

export type SortOption = 'default' | 'price_asc' | 'price_desc'

// =========================================
// SORT PRODUCTS CLIENT SIDE
// API does not support sorting
// We sort after fetching
// =========================================
export function sortProducts(
  products: Product[],
  sort: SortOption
): Product[] {
  const sorted = [...products] // never mutate original array

  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price)
    default:
      return sorted
  }
}