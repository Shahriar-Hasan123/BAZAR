'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/authSchema'
import { login, getProfile } from '@/services/auth'
import { useAuthStore } from '@/store/authStore'
import FormField from '@/components/ui/FormField'

const inputClass = 'w-full px-5 py-4 rounded-lg border border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white'
const errorInputClass = 'w-full px-5 py-4 rounded-lg border border-red-400 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-red-50'

export default function LoginPage() {
    const router = useRouter()
    const { setAuth } = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true)
        setApiError('')

        try {
            const tokens = await login(data)
            const user = await getProfile(tokens.access_token)
            setAuth(user, tokens.access_token, tokens.refresh_token)
            router.push('/')
        } catch {
            setApiError('Invalid email or password. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-0 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

            <div className="w-full max-w-2xl relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <Link href="/" className="inline-block text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-12">
                        Bazar
                    </Link>
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Welcome back
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Sign in to your account to continue shopping
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-12 shadow-2xl">

                    {/* API Error */}
                    {apiError && (
                        <div className="mb-8 p-5 rounded-xl bg-red-500/20 border border-red-400/50 text-base text-red-300 flex items-start gap-4">
                            <WarningIcon />
                            <span>{apiError}</span>
                        </div>
                    )}

                    {/* Demo credentials */}
                    <div className="mb-8 p-5 rounded-xl bg-blue-500/15 border border-blue-400/30">
                        <div className="flex items-center gap-3 mb-3">
                            <InfoIcon />
                            <p className="font-semibold text-blue-300 text-base">Demo credentials:</p>
                        </div>
                        <div className="text-blue-200/80 space-y-2 ml-8 text-base">
                            <p><span className="font-mono">john@mail.com</span></p>
                            <p><span className="font-mono">changeme</span></p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

                        <FormField label="Email" error={errors.email?.message} required>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="you@example.com"
                                className={errors.email ? errorInputClass : inputClass}
                            />
                        </FormField>

                        <FormField label="Password" error={errors.password?.message} required>
                            <div className="relative">
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    className={`${errors.password ? errorInputClass : inputClass} pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </FormField>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 mt-8 shadow-lg hover:shadow-xl"
                        >
                            {isLoading ? (
                                <>
                                    <SpinnerIcon />
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <span>Sign In</span>
                            )}
                        </button>

                    </form>
                </div>

                <p className="text-center text-base text-gray-400 mt-10">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                        Create one
                    </Link>
                </p>

            </div>
        </div>
    )
}

function EyeIcon() {
    return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    )
}

function EyeOffIcon() {
    return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
        </svg>
    )
}

function SpinnerIcon() {
    return (
        <svg className="animate-spin w-6 h-6" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
    )
}

function InfoIcon() {
    return (
        <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

function WarningIcon() {
    return (
        <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}