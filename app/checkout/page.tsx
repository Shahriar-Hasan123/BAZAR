'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import CheckoutForm from '@/features/cart/CheckoutForm'

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items)

  // Redirect to cart if empty
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-6">
            Add some products before checking out.
          </p>
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── HEADER ── */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-500 text-sm">
            <Link href="/cart" className="text-blue-600 hover:underline">
              ← Back to cart
            </Link>
          </p>
        </div>

        <CheckoutForm />

      </div>
    </div>
  )
}