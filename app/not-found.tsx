import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* 404 number */}
        <h1 className="text-8xl sm:text-9xl font-bold text-blue-600 mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Page not found
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-semibold text-base hover:from-blue-700 hover:to-indigo-800 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/40"
          >
            Go home
          </Link>
          <Link
            href="/products"
            className="px-8 py-3.5 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold text-base hover:bg-blue-50 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Browse products
          </Link>
        </div>

      </div>
    </div>
  )
}