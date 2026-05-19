'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { getSafeImageUrl } from '@/utils/image'
import { formatPrice } from '@/utils/format'
import { useCartStore } from '@/store/cartStore'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getSafeImageUrl(product.images[0])
  const addItem = useCartStore((state) => state.addItem)

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">

      {/* ── PRODUCT IMAGE ── */}
      <Link
        href={`/products/${product.id}`}
        className="block relative aspect-square overflow-hidden bg-gray-50"
      >
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/400x400/e2e8f0/94a3b8?text=No+Image'
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-gray-600">
            {product.category.name}
          </span>
        </div>
      </Link>

      {/* ── PRODUCT INFO ── */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-3 min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>

          {/* ← Now calls addItem from Zustand */}
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
            aria-label={`Add ${product.title} to cart`}
          >
            Add
            <CartIcon />
          </button>
        </div>
      </div>

    </article>
  )
}

function CartIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}