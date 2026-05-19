import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* Success icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon />
        </div>

        <h1 className="text-3xl font-bold text-base mb-3">
          Order Placed!
        </h1>
        <p className="text-subtle mb-2 leading-relaxed">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        <p className="text-sm text-subtle mb-8">
          A confirmation email has been sent to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
              className="px-8 py-3 rounded-xl border border-base text-base font-semibold hover:bg-subtle transition-colors"
          >
            Go Home
          </Link>
        </div>

      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}