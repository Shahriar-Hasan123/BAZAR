import { Suspense } from 'react'
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

      {/* Hero has no data fetching — no Suspense needed */}
      <HeroSection />

      {/* Categories — show skeleton while fetching */}
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

      {/* Featured Products — show skeleton while fetching */}
      <section className="py-16 lg:py-20 bg-gray-50">
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
        </div>
      </section>

    </div>
  )
}