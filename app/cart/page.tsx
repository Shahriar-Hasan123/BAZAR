'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import CartItem from '@/features/cart/CartItem'
import OrderSummary from '@/features/cart/OrderSummary'

export default function CartPage() {
  const { items, clearCart } = useCartStore()

  // ── EMPTY CART STATE ──
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm w-full">

          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="w-full h-full bg-subtle rounded-full flex items-center justify-center">
              <CartIcon />
            </div>
            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[11px] font-medium rounded-full flex items-center justify-center border-2 border-white">
              0
            </span>
          </div>

          <h1 className="text-2xl font-bold text-base mb-3">
            Your cart is empty
          </h1>
          <p className="text-subtle mb-8 leading-relaxed">
            You haven't added anything yet. Browse our products and find something you'll love.
          </p>

          <div className="flex flex-col mt-3 gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl border border-base text-subtle text-sm hover:bg-subtle transition-colors"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        {/* ── PAGE HEADER ── */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-base">
            Shopping Cart
            <span className="text-lg font-normal text-subtle ml-3">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </h1>

          {/* Clear all button */}
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Clear all
          </button>
        </div>

        {/*
          Single column on mobile
          Two columns on lg and up
          Cart items take 60%, summary takes 40%
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── CART ITEMS ── */}
          <div className="lg:col-span-2">
            <div className="card px-6">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>

        </div>

      </div>
    </div>
  )
}

function CartIcon() {
  return (
    <svg className="w-9 h-9 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}