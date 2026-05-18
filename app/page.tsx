import HeroSection from '@/components/home/HeroSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'

export const metadata = {
  title: 'ShopNext — Modern eCommerce Store',
  description: 'Discover amazing products at unbeatable prices.',
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
    </div>
  )
}