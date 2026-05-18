import { fetcher } from '@/lib/api'
import type { Product, ProductsParams } from '@/types'

export async function getProducts(
  params?: ProductsParams
): Promise<Product[]> {
  const searchParams = new URLSearchParams()

  if (params?.limit)        searchParams.set('limit', String(params.limit))
  if (params?.offset)       searchParams.set('offset', String(params.offset))
  if (params?.title)        searchParams.set('title', params.title)
  if (params?.price_min)    searchParams.set('price_min', String(params.price_min))
  if (params?.price_max)    searchParams.set('price_max', String(params.price_max))
  if (params?.categoryId)   searchParams.set('categoryId', String(params.categoryId))
  if (params?.categorySlug) searchParams.set('categorySlug', params.categorySlug)

  const query = searchParams.toString()
  const endpoint = `/products${query ? `?${query}` : ''}`

  return fetcher<Product[]>(endpoint)
}

export async function getProductById(id: number): Promise<Product> {
  return fetcher<Product>(`/products/${id}`)
}

export async function getProductBySlug(slug: string): Promise<Product> {
  return fetcher<Product>(`/products/slug/${slug}`)
}

export async function getRelatedProducts(id: number): Promise<Product[]> {
  return fetcher<Product[]>(`/products/${id}/related`)
}

// =========================================
// FEATURED PRODUCTS
// We define the limit here explicitly
// Then slice as a safety net on top
// Double guarantee: API limit + client slice
// =========================================
const FEATURED_PRODUCTS_COUNT = 8 // ← change to 12 anytime in one place

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts({
    limit: FEATURED_PRODUCTS_COUNT,
    offset: 0,
  })

  // Safety net — slice even if API ignores limit param
  return products.slice(0, FEATURED_PRODUCTS_COUNT)
}