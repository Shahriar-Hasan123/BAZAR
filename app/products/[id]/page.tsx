import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductById, getRelatedProducts } from '@/services/products'
import ProductGallery from '@/features/products/ProductGallery'
import ProductCard from '@/components/ui/ProductCard'
import { formatPrice } from '@/utils/format'
import type { Metadata } from 'next'
import type { Product } from '@/types'
// Add this import at the top
import AddToCartButton from '@/features/products/AddToCartButton'

// =========================================
// PARAMS TYPE
// In Next.js 15 params is a Promise
// =========================================
interface ProductPageProps {
    params: Promise<{ id: string }>
}

// =========================================
// DYNAMIC METADATA
// Each product gets its own title and description
// Great for SEO
// =========================================
export async function generateMetadata(
    { params }: ProductPageProps
): Promise<Metadata> {
    const { id } = await params

    try {
        const product = await getProductById(Number(id))
        return {
            title: product.title,
            description: product.description,
        }
    } catch {
        return {
            title: 'Product Not Found',
        }
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params

    // Fetch product — if not found, show 404
    let product
    try {
        product = await getProductById(Number(id))
    } catch {
        notFound()
    }

    // Fetch related products in parallel
    let relatedProducts: Product[] = []
    try {
        relatedProducts = await getRelatedProducts(Number(id))
        // Exclude current product from related
        relatedProducts = relatedProducts
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
    } catch {
        relatedProducts = []
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* ── BREADCRUMB ── */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-gray-700 transition-colors">
                        Home
                    </Link>
                    <ChevronRightIcon />
                    <Link href="/products" className="hover:text-gray-700 transition-colors">
                        Products
                    </Link>
                    <ChevronRightIcon />
                    <span className="text-gray-900 font-medium line-clamp-1">
                        {product.title}
                    </span>
                </nav>

                {/* ── PRODUCT MAIN SECTION ── */}
                {/*
          Single column on mobile
          Two columns on md and up
        */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

                    {/* ── LEFT: IMAGE GALLERY ── */}
                    <ProductGallery
                        images={product.images}
                        title={product.title}
                    />

                    {/* ── RIGHT: PRODUCT INFO ── */}
                    <div className="flex flex-col">

                        {/* Category */}
                        <Link
                            href={`/products?categoryId=${product.category.id}`}
                            className="inline-flex w-fit mb-3"
                        >
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
                                {product.category.name}
                            </span>
                        </Link>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                            {product.title}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-gray-900">
                                {formatPrice(product.price)}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 mb-6" />

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                                Description
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                {product.description}
                            </p>
                        </div>

                        {/* ── ADD TO CART ── */}
                        <div className="space-y-3 mt-auto">
                            <AddToCartButton product={product} />
                            <button className="w-full py-3.5 rounded-2xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base">
                                Add to Wishlist
                            </button>
                        </div>


                        {/* Trust badges */}
                        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-100">
                            {[
                                '✓ Free returns',
                                '✓ Secure checkout',
                                '✓ Fast shipping',
                            ].map((badge) => (
                                <span key={badge} className="text-xs text-gray-500">
                                    {badge}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>

                {/* ── RELATED PRODUCTS ── */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16 lg:mt-24">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.map((related) => (
                                <ProductCard key={related.id} product={related} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

function ChevronRightIcon() {
    return (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
    )
}