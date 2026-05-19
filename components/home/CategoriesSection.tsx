import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '@/services/categories'
import { getSafeImageUrl } from '@/utils/image'

// =========================================
// FALLBACK COLORS PER CATEGORY SLUG
// When the API image fails to load,
// we show a colored background instead
// =========================================
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

// =========================================
// SERVER COMPONENT
// async keyword lets us await data directly
// No useEffect, no useState, no loading flash
// =========================================
export default async function CategoriesSection() {
  const categories = await getCategories()

  // Filter out invalid or test categories
  const validCategories = categories.filter(
    (cat) =>
      cat.name &&
      cat.image &&
      !cat.name.toLowerCase().includes('error') &&
      !cat.name.toLowerCase().includes('illham')
  )

  // Show only 6 categories on homepage
  const displayed = validCategories.slice(0, 6)

  return (
    <>
      {/* ── CATEGORY GRID ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayed.map((category) => {
          const slug = category.slug?.toLowerCase() || 'others'
          const bgColor = CATEGORY_COLORS[slug] || 'bg-gray-100'
          const emoji = CATEGORY_EMOJI[slug] || '🛍️'
          const imageUrl = getSafeImageUrl(category.image)

          return (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
              className="group flex flex-col items-center"
            >

              {/* ── IMAGE CARD ── */}
              <div className={`relative w-full aspect-square rounded-2xl overflow-hidden ${bgColor} mb-3`}>

                {/* Emoji shows behind the image as fallback */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {emoji}
                </div>

                {/* Real image from API on top */}
                <Image
                  src={imageUrl}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

              </div>

              {/* ── CATEGORY NAME ── */}
              <p className="text-sm font-medium text-base group-hover:text-blue-600 transition-colors text-center capitalize">
                {category.name}
              </p>

            </Link>
          )
        })}
      </div>

      {/* ── MOBILE VIEW ALL ── */}
      <div className="sm:hidden mt-8 text-center">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all categories
          <ArrowRightIcon />
        </Link>
      </div>
    </>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  )
}