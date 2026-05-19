import { notFound } from 'next/navigation'
import { getCategoryBySlug } from '@/services/categories'
import { getProducts } from '@/services/products'
import ProductCard from '@/components/ui/ProductCard'
import Link from 'next/link'
import Image from 'next/image'
import { getSafeImageUrl } from '@/utils/image'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const category = await getCategoryBySlug(slug)
    return {
      title: category.name,
      description: `Browse all ${category.name} products.`,
    }
  } catch {
    return { title: 'Category Not Found' }
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  clothes: 'from-pink-500 to-rose-600',
  electronics: 'from-blue-500 to-indigo-600',
  furniture: 'from-amber-500 to-orange-600',
  shoes: 'from-green-500 to-emerald-600',
  others: 'from-purple-500 to-violet-600',
}

export default async function CategoryDetailPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params

  let category
  try {
    category = await getCategoryBySlug(slug)
  } catch {
    notFound()
  }

  const products = await getProducts({
    categoryId: category.id,
    limit: 20,
    offset: 0,
  })

  const gradient =
    CATEGORY_COLORS[slug.toLowerCase()] || 'from-gray-500 to-gray-700'
  const imageUrl = getSafeImageUrl(category.image)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO BANNER ── */}
      <div className={`relative bg-gradient-to-r ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <Image
            src={imageUrl}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
            <span>/</span>
            <span className="text-white capitalize">{category.name}</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold text-white capitalize mb-3">
            {category.name}
          </h1>
          <p className="text-white/80 text-lg">
            {products.length} products available
          </p>

        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-20 px-4">
            <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-sm text-gray-500 mb-8 max-w-xs leading-relaxed">
              This category doesn't have any products yet. Check back soon or explore our full catalogue.
            </p>

            <div className="flex flex-col gap-3 w-full max-w-[220px]">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                Browse all products
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to home
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}