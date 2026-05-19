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
    <div className="card h-fit sticky top-24">

      <h2 className="text-lg font-bold text-base mb-6">
        Order Summary
      </h2>

      {/* ── LINE ITEMS ── */}
      <div className="space-y-3 mb-6">

        <div className="flex justify-between text-sm">
          <span className="text-subtle">
            Subtotal ({getTotalItems()} items)
          </span>
          <span className="font-medium text-base">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-subtle">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-base'}`}>
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
      <div className="flex justify-between items-center py-4 border-t border-base mb-6">
        <span className="font-bold text-base">Total</span>
        <span className="text-xl font-bold text-base">
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
        className="block w-full py-3 mt-3 rounded-2xl border border-base text-base font-medium text-center hover:bg-subtle transition-colors text-sm"
      >
        Continue Shopping
      </Link>

      {/* Trust badges */}
      <div className="mt-6 pt-6 border-t border-base space-y-2">
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