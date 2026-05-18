import { Suspense } from 'react'
import Link from 'next/link'
import HeroSection from '@/components/home/HeroSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import {
  ProductGridSkeleton,
  CategoriesGridSkeleton,
} from '@/components/ui/Skeletons'

export const metadata = {
  title: 'ShopNext — Modern eCommerce Store',
  description: 'Discover amazing products at unbeatable prices.',
}

export default function HomePage() {
  return (
    <div>

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── CATEGORIES ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">
                Explore
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Shop by Category
              </h2>
            </div>
          </div>

          <Suspense fallback={<CategoriesGridSkeleton />}>
            <CategoriesSection />
          </Suspense>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">
                Handpicked
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Featured Products
              </h2>
            </div>
          </div>

          <Suspense fallback={<ProductGridSkeleton count={8} />}>
            <FeaturedProducts />
          </Suspense>

          {/* ── VIEW ALL LINK ── */}
          <div className="mt-16 mb-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all text-sm sm:text-base shadow-sm"
            >
              View All Products
              <ArrowRightIcon />
            </Link>
          </div>

        </div>
      </section>

    </div>
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