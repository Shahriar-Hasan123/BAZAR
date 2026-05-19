'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/utils/format'

export default function OrderSummary() {
  const { getTotalPrice, getTotalItems, items } = useCartStore()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit sticky top-24">

      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Order Summary
      </h2>

      {/* ── LINE ITEMS ── */}
      <div className="space-y-3 mb-6">

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({getTotalItems()} items)
          </span>
          <span className="font-medium text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        {/* Free shipping notice */}
        {shipping > 0 && (
          <p className="text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
            Add {formatPrice(50 - subtotal)} more for free shipping
          </p>
        )}

      </div>

      {/* ── TOTAL ── */}
      <div className="flex justify-between items-center py-4 border-t border-gray-100 mb-6">
        <span className="font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">
          {formatPrice(total)}
        </span>
      </div>

      {/* ── CHECKOUT BUTTON ── */}
      <Link
        href="/checkout"
        className="block w-full py-3.5 rounded-2xl bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        Proceed to Checkout
      </Link>

      {/* Continue shopping */}
      <Link
        href="/products"
        className="block w-full py-3 mt-3 rounded-2xl border border-gray-200 text-gray-700 font-medium text-center hover:bg-gray-50 transition-colors text-sm"
      >
        Continue Shopping
      </Link>

      {/* Trust badges */}
      <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
        {[
          '🔒 Secure checkout',
          '↩️ Free returns',
          '🚚 Fast delivery',
        ].map((badge) => (
          <p key={badge} className="text-xs text-gray-500 text-center">
            {badge}
          </p>
        ))}
      </div>

    </div>
  )
}