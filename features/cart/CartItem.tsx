'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { getSafeImageUrl } from '@/utils/image'
import { formatPrice } from '@/utils/format'
import type { CartItem as CartItemType } from '@/store/cartStore'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()
  const { product, quantity } = item
  const imageUrl = getSafeImageUrl(product.images[0])

  return (
    <div className="flex gap-4 py-6 border-b border-base last:border-0">

      {/* ── PRODUCT IMAGE ── */}
      <Link
        href={`/products/${product.id}`}
        className="flex-shrink-0"
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-subtle">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
      </Link>

      {/* ── ITEM INFO ── */}
      <div className="flex-1 min-w-0">

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium text-base hover:text-blue-600 transition-colors line-clamp-2 mb-1">
            {product.title}
          </h3>
        </Link>

        {/* Category */}
        <p className="text-xs text-subtle mb-3 capitalize">
          {product.category.name}
        </p>

        {/* Price + Controls row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">

          {/* Price */}
          <span className="text-base font-bold text-base">
            {formatPrice(product.price * quantity)}
          </span>

          {/* ── QUANTITY CONTROLS ── */}
          <div className="flex items-center gap-1">

            {/* Decrease */}
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-8 h-8 rounded-lg border border-base flex items-center justify-center text-subtle hover:bg-subtle transition-colors disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <MinusIcon />
            </button>

            {/* Quantity display */}
            <span className="w-8 text-center text-sm font-semibold text-base">
              {quantity}
            </span>

            {/* Increase */}
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-8 h-8 rounded-lg border border-base flex items-center justify-center text-subtle hover:bg-subtle transition-colors"
              aria-label="Increase quantity"
            >
              <PlusIcon />
            </button>

            {/* Remove */}
            <button
              onClick={() => removeItem(product.id)}
              className="ml-2 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label="Remove item"
            >
              <TrashIcon />
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

function MinusIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
}