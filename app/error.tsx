'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
    // Log error to console in development
    useEffect(() => {
        console.error('Page error:', error)
    }, [error])

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">

                {/* Icon */}
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertIcon />
                </div>

                {/* Message */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Something went wrong
                </h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                    We could not load this page. This is usually a temporary issue.
                    Please try again.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-semibold text-base hover:from-blue-700 hover:to-indigo-800 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/40"
                    >
                        Try again
                    </button>

                    <Link
                        href="/"
                        className="px-8 py-3.5 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-base hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        Go home
                    </Link>
            </div>
        </div>
    </div>
  )
}

function AlertIcon() {
    return (
        <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
        </svg>
    )
}