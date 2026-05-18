import Link from 'next/link'
import { getFeaturedProducts } from '@/services/products'
import ProductCard from '@/components/ui/ProductCard'

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── SECTION HEADER ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-blue-600 text-lg font-semibold uppercase tracking-wider mb-2">
              Handpicked
            </p>
            <h2 className="text-1xl sm:text-2xl font-bold text-gray-900">
              Featured Products
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all
            <ArrowRightIcon />
          </Link>
        </div>

        {/* ── PRODUCT GRID ── */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No products found.</p>
          </div>
        )}

        {/* Mobile view all */}
        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all products
            <ArrowRightIcon />
          </Link>
        </div>

      </div>
    </section>
  )
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}