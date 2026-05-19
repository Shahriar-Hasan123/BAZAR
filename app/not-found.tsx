import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* 404 number */}
        <h1 className="text-8xl sm:text-9xl font-bold text-blue-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-base mb-3">
          Page not found
        </h2>

        <p className="text-subtle mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/products"
            className="px-6 py-2.5 rounded-xl border border-base text-base font-medium hover:bg-subtle transition-colors"
          >
            Browse products
          </Link>
        </div>

      </div>
    </div>
  )
}