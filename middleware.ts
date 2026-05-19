import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = [
  '/checkout',
  '/account',
]

const AUTH_ROUTES = [
  '/login',
  '/register',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // =========================================
  // Read the token cookie we set in authStore
  // This works on the server — localStorage does not
  // =========================================
  const token = request.cookies.get('bazar-token')
  const isAuthenticated = !!token?.value

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