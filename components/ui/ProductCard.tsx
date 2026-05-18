'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { getSafeImageUrl } from '@/utils/image'
import { formatPrice } from '@/utils/format'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getSafeImageUrl(product.images[0])

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

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-gray-600">
            {product.category.name}
          </span>
        </div>
      </Link>

      {/* ── PRODUCT INFO ── */}
      <div className="p-4">

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-3 min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        {/* Price and Add to Cart */}
        <div className="flex flex-col gap-3">
          
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>

          <button
            className="w-full group flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white font-bold text-sm hover:from-blue-700 hover:via-blue-700 hover:to-indigo-800 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 relative overflow-hidden"
            aria-label={`Add ${product.title} to cart`}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse" />
            
            {/* Icon */}
            <CartIcon />
            
            {/* Text */}
            <span className="relative z-10">Add to Cart</span>
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