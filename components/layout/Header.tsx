'use client'

import { useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
]

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const cartCount = 0

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">

            {/* MAIN NAV */}
            <nav className="relative h-16 md:h-20 flex items-center justify-between px-6 md:px-10">

                {/* LEFT — Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 z-10"
                >
                    <BagIcon />
                    <span className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight">
                        Bazar
                    </span>
                </Link>

                {/* CENTER — Desktop Nav (absolutely centered) */}
                <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="text-gray-600 font-medium hover:text-blue-600 transition-colors"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* RIGHT — Cart + Sign In + Hamburger */}
                <div className="flex items-center gap-4 md:gap-6 z-10">

                    {/* Cart */}
                    <Link
                        href="/cart"
                        className="relative text-gray-700 hover:text-blue-600 transition-colors"
                        aria-label="Shopping cart"
                    >
                        <CartIcon />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                                {cartCount > 99 ? '99+' : cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Sign In */}
                    <Link
                        href="/login"
                        className="hidden sm:inline-block text-sm font-medium text-gray-700 border border-gray-300 rounded-full px-5 py-2 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                        Sign In
                    </Link>

                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="block md:hidden text-gray-700 hover:text-blue-600 transition-colors focus:outline-none"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>

                </div>
            </nav>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 w-full bg-white border-b border-gray-200 shadow-md flex flex-col items-center gap-4 py-6 z-50">

                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-gray-700 font-medium hover:text-blue-600 w-full text-center py-2 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Sign In — only on very small screens */}
                    <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="sm:hidden w-4/5 text-center text-sm font-medium text-gray-700 border border-gray-300 rounded-full py-2 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                        Sign In
                    </Link>

                </div>
            )}

        </header>
    )
}

// ICONS
function BagIcon() {
    return (
        <svg className="w-6 h-6 md:w-7 md:h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
    )
}

function CartIcon() {
    return (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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