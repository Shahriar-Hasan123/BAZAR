'use client'

import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm sm:text-base"
    >
      Add to Cart
    </button>
  )
}