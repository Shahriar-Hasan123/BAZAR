import { fetcher } from '@/lib/api'
import type { Category, Product } from '@/types'

// Get all categories
export async function getCategories(): Promise<Category[]> {
  return fetcher<Category[]>('/categories')
}

// Get single category by ID
export async function getCategoryById(id: number): Promise<Category> {
  return fetcher<Category>(`/categories/${id}`)
}

// Get single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category> {
  return fetcher<Category>(`/categories/slug/${slug}`)
}

// Get all products inside a category
export async function getProductsByCategory(id: number): Promise<Product[]> {
  return fetcher<Product[]>(`/categories/${id}/products`)
}