'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '@/lib/authSchema'
import { register as registerUser } from '@/services/auth'
import { login, getProfile } from '@/services/auth'
import { useAuthStore } from '@/store/authStore'
import FormField from '@/components/ui/FormField'

const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-base text-sm text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-base'
const errorInputClass = 'w-full px-4 py-2.5 rounded-xl border border-red-300 text-sm text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-shadow bg-red-50'

export default function RegisterPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true)
    setApiError('')

    try {
      // =========================================
      // REMOVED: checkEmailAvailable check
      // The Platzi API returns isAvailable: false
      // for ALL emails — it does not work reliably
      // So we just attempt registration directly
      // =========================================

      // Register the user
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`,
      })

      // Auto login after register
      const tokens = await login({
        email: data.email,
        password: data.password,
      })

      const user = await getProfile(tokens.access_token)
      setAuth(user, tokens.access_token, tokens.refresh_token)

      router.push('/')

    } catch (error: unknown) {
      // =========================================
      // Handle specific API errors
      // =========================================
      if (error instanceof Error) {
        const msg = error.message.toLowerCase()

        if (msg.includes('email') || msg.includes('already')) {
          setApiError('This email is already registered. Please sign in.')
        } else {
          setApiError('Something went wrong. Please try again.')
        }
      } else {
        setApiError('Something went wrong. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-subtle flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Bazar
          </Link>
          <h1 className="text-2xl font-bold text-base mt-6 mb-2">
            Create an account
          </h1>
          <p className="text-subtle text-sm">
            Join Bazar and start shopping today
          </p>
        </div>

        {/* Card */}
        <div className="card p-8 shadow-sm">

          {apiError && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <FormField label="Full Name" error={errors.name?.message} required>
              <input
                {...register('name')}
                placeholder="John Doe"
                className={errors.name ? errorInputClass : inputClass}
              />
            </FormField>

            <FormField label="Email" error={errors.email?.message} required>
              <input
                {...register('email')}
                type="email"
                placeholder="john@example.com"
                className={errors.email ? errorInputClass : inputClass}
              />
            </FormField>

            <FormField label="Password" error={errors.password?.message} required>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 4 characters"
                  className={`${errors.password ? errorInputClass : inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </FormField>

            <FormField
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              required
            >
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Repeat your password"
                className={errors.confirmPassword ? errorInputClass : inputClass}
              />
            </FormField>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

          </form>
        </div>

        <p className="text-center text-sm text-subtle mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
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