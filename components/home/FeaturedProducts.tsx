import { getFeaturedProducts } from '@/services/products'
import ProductCard from '@/components/ui/ProductCard'

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-subtle">
        <p className="text-lg">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}