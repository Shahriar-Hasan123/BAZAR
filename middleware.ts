import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// =========================================
// PROTECTED ROUTES
// Any route listed here requires login
// =========================================
const PROTECTED_ROUTES = [
    '/checkout',
    '/account',
]

// =========================================
// AUTH ROUTES
// Logged in users should not see these
// =========================================
const AUTH_ROUTES = [
    '/login',
    '/register',
]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Read auth from localStorage via cookie
    // Zustand persist saves to localStorage
    // We check the cookie for SSR-safe auth check
    const authCookie = request.cookies.get('shopnext-auth')

    let isAuthenticated = false

    if (authCookie) {
        try {
            const authData = JSON.parse(authCookie.value)
            isAuthenticated = authData?.state?.isAuthenticated === true
        } catch {
            isAuthenticated = false
        }
    }

    // ── PROTECT ROUTES ──
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    )

    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // ── REDIRECT LOGGED IN USERS FROM AUTH PAGES ──
    const isAuthRoute = AUTH_ROUTES.some((route) =>
        pathname.startsWith(route)
    )

    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/checkout/:path*',
        '/account/:path*',
        '/login',
        '/register',
    ],
}