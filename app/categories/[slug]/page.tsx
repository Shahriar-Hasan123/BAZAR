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
  clothes:     'from-pink-500 to-rose-600',
  electronics: 'from-blue-500 to-indigo-600',
  furniture:   'from-amber-500 to-orange-600',
  shoes:       'from-green-500 to-emerald-600',
  others:      'from-purple-500 to-violet-600',
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
          <div className="text-center py-20">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </p>
            <p className="text-gray-500 text-sm mb-6">
              This category has no products yet.
            </p>
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>

    </div>
  )
}