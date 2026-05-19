'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // ← Real cart count from Zustand store
    const totalItems = useCartStore((state) => state.getTotalItems())

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* ── LOGO ── */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-xl text-blue-600"
                    >
                        <BagIcon />
                        <span>ShopNext</span>
                    </Link>

                    {/* ── DESKTOP NAV ── */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* ── RIGHT ACTIONS ── */}
                    <div className="flex items-center gap-2">

                        {/* Cart with real count */}
                        <Link
                            href="/cart"
                            className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label={`Shopping cart with ${totalItems} items`}
                        >
                            <CartIcon />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Sign In */}
                        <Link
                            href="/login"
                            className="hidden sm:block px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Sign In
                        </Link>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>

                    </div>
                </div>
            </div>

            {/* ── MOBILE MENU ── */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 mt-1 border-t border-gray-100">
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                Sign In
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}

function BagIcon() {
    return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
    )
}

function CartIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    )
}

function MenuIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    )
}

function CloseIcon() {
    return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}