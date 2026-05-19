import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '@/services/categories'
import { getSafeImageUrl } from '@/utils/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all product categories.',
}

const CATEGORY_COLORS: Record<string, string> = {
  clothes:     'bg-pink-100',
  electronics: 'bg-blue-100',
  furniture:   'bg-amber-100',
  shoes:       'bg-green-100',
  others:      'bg-purple-100',
}

const CATEGORY_EMOJI: Record<string, string> = {
  clothes:     '👕',
  electronics: '💻',
  furniture:   '🛋️',
  shoes:       '👟',
  others:      '📦',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  const validCategories = categories.filter(
    (cat) =>
      cat.name &&
      !cat.name.toLowerCase().includes('error') &&
      !cat.name.toLowerCase().includes('illham')
  )

  return (
    <div className="min-h-screen bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── HEADER ── */}
        <div className="mb-10">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">
            Browse
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-base">
            All Categories
          </h1>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {validCategories.map((category) => {
            const slug = category.slug?.toLowerCase() || 'others'
            const bgColor = CATEGORY_COLORS[slug] || 'bg-gray-100'
            const emoji = CATEGORY_EMOJI[slug] || '🛍️'
            const imageUrl = getSafeImageUrl(category.image)

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group"
              >
                <div className={`relative aspect-square rounded-2xl overflow-hidden ${bgColor} mb-3`}>

                  {/* Emoji fallback */}
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">
                    {emoji}
                  </div>

                  {/* Real image */}
                  <Image
                    src={imageUrl}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Name over image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm capitalize drop-shadow">
                      {category.name}
                    </p>
                    <p className="text-white/70 text-xs mt-0.5">
                      Shop now →
                    </p>
                  </div>

                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}