'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { updateUser } from '@/services/auth'
import { getSafeImageUrl } from '@/utils/image'

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, accessToken, setAuth, refreshToken } =
    useAuthStore()
  const { items, getTotalItems, getTotalPrice } = useCartStore()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [isAuthenticated, router, user])

  if (!user) return null

  function handleLogout() {
    logout()
    router.push('/')
  }

  async function handleSave() {
    if (!user || !accessToken) return

    setIsSaving(true)
    setSaveError('')
    setSaveSuccess(false)

    try {
      const updated = await updateUser(
        user.id,
        { name, email },
        accessToken
      )
      // Update auth store with new user data
      setAuth(updated, accessToken, refreshToken || '')
      setIsEditing(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch {
      setSaveError('Failed to update profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const avatarUrl = getSafeImageUrl(
    user.avatar,
    `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
  )

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ── PROFILE CARD ── */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">

              {/* Avatar */}
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={avatarUrl}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover border-4 border-blue-50"
                />
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{user.email}</p>

              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
                }`}>
                {user.role}
              </span>

              <button
                onClick={handleLogout}
                className="w-full mt-6 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>

            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="md:col-span-2 space-y-6">

            {/* ── EDIT PROFILE ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-gray-900">
                  Profile Information
                </h3>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {/* Success message */}
              {saveSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-100 text-sm text-green-600">
                  Profile updated successfully!
                </div>
              )}

              {/* Error message */}
              {saveError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                  {saveError}
                </div>
              )}

              <div className="space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 px-4 py-2.5 bg-gray-50 rounded-xl">
                      {user.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  ) : (
                    <p className="text-sm text-gray-900 px-4 py-2.5 bg-gray-50 rounded-xl">
                      {user.email}
                    </p>
                  )}
                </div>

                {/* Role — read only */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Role
                  </label>
                  <p className="text-sm text-gray-900 px-4 py-2.5 bg-gray-50 rounded-xl capitalize">
                    {user.role}
                  </p>
                </div>

              </div>

              {/* Edit action buttons */}
              {isEditing && (
                <div className="flex gap-3 mt-5">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <SpinnerIcon />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setName(user.name)
                      setEmail(user.email)
                      setSaveError('')
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

            </div>

            {/* ── CART SUMMARY ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Cart Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {getTotalItems()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Items in Cart</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    ${getTotalPrice().toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Cart Total</p>
                </div>
              </div>
              {items.length > 0 && (
                <Link
                  href="/cart"
                  className="block w-full mt-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold text-center hover:bg-blue-700 transition-colors"
                >
                  View Cart
                </Link>
              )}
            </div>

            {/* ── QUICK LINKS ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Browse Products', href: '/products' },
                  { label: 'View Cart', href: '/cart' },
                  { label: 'Checkout', href: '/checkout' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {link.label}
                    </span>
                    <ChevronRightIcon />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}