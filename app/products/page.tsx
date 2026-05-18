import { Suspense } from 'react'
import { getCategories } from '@/services/categories'
import { getProducts } from '@/services/products'
import ProductCard from '@/components/ui/ProductCard'
import { ProductGridSkeleton } from '@/components/ui/Skeletons'
import ProductsFilter from '@/features/products/ProductsFilter'

// =========================================
// searchParams comes from the URL
// Example: /products?categoryId=1&title=shirt
// Next.js passes it automatically to page.tsx
// =========================================
interface SearchParams {
  categoryId?: string
  title?: string
  price_min?: string
  price_max?: string
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>
}

export const metadata = {
  title: 'All Products',
  description: 'Browse our full collection of products.',
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // In Next.js 15, searchParams is a Promise
  const params = await searchParams

  // Convert string params to correct types for the API
  const apiParams = {
    categoryId: params.categoryId ? Number(params.categoryId) : undefined,
    title: params.title || undefined,
    price_min: params.price_min ? Number(params.price_min) : undefined,
    price_max: params.price_max ? Number(params.price_max) : undefined,
    limit: 12,
    offset: 0,
  }

  // Fetch products and categories in parallel
  const [products, categories] = await Promise.all([
    getProducts(apiParams),
    getCategories(),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── PAGE HEADER ── */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-500">
            {products.length} products found
          </p>
        </div>

        {/* ── FILTERS ── */}
        <ProductsFilter
          categories={categories}
          currentParams={params}
        />

        {/* ── PRODUCTS GRID ── */}
        <div className="mt-8">
          <Suspense fallback={<ProductGridSkeleton count={12} />}>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </Suspense>
        </div>

      </div>
    </div>
  )
}

// =========================================
// EMPTY STATE
// Shows when no products match the filters
// =========================================
function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <BoxIcon />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-gray-500 text-sm">
        Try adjusting your filters or search term.
      </p>
    </div>
  )
}

function BoxIcon() {
  return (
    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}