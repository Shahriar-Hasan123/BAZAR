'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { checkoutSchema, type CheckoutFormData } from '@/lib/checkoutSchema'
import FormField from '@/components/ui/FormField'
import { formatPrice } from '@/utils/format'

// Input class — reused across all inputs
const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow'

const errorInputClass =
  'w-full px-4 py-2.5 rounded-xl border border-red-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-shadow bg-red-50'

export default function CheckoutForm() {
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  // =========================================
  // SUBMIT HANDLER
  // In a real app this would call a payment API
  // For now we simulate a delay and redirect
  // =========================================
  async function onSubmit(data: CheckoutFormData) {
    setIsSubmitting(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Clear cart after successful order
    clearCart()

    // Redirect to success page
    router.push('/checkout/success')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >

      {/* ── LEFT: FORM FIELDS ── */}
      <div className="lg:col-span-2 space-y-6">

        {/* Contact Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
            <StepBadge number={1} />
            Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <FormField label="Full Name" error={errors.fullName?.message} required>
              <input
                {...register('fullName')}
                placeholder="John Doe"
                className={errors.fullName ? errorInputClass : inputClass}
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

            <FormField label="Phone" error={errors.phone?.message} required>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+1 234 567 8900"
                className={errors.phone ? errorInputClass : inputClass}
              />
            </FormField>

          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
            <StepBadge number={2} />
            Shipping Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <FormField
              label="Street Address"
              error={errors.address?.message}
              required
            >
              <input
                {...register('address')}
                placeholder="123 Main Street"
                className={`${errors.address ? errorInputClass : inputClass} sm:col-span-2`}
              />
            </FormField>

            <FormField label="City" error={errors.city?.message} required>
              <input
                {...register('city')}
                placeholder="New York"
                className={errors.city ? errorInputClass : inputClass}
              />
            </FormField>

            <FormField label="ZIP Code" error={errors.zipCode?.message} required>
              <input
                {...register('zipCode')}
                placeholder="10001"
                className={errors.zipCode ? errorInputClass : inputClass}
              />
            </FormField>

            <FormField label="Country" error={errors.country?.message} required>
              <select
                {...register('country')}
                className={errors.country ? errorInputClass : inputClass}
              >
                <option value="">Select country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="BD">Bangladesh</option>
                <option value="IN">India</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
              </select>
            </FormField>

          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
            <StepBadge number={3} />
            Payment Details
          </h2>
          <p className="text-xs text-gray-400 mb-5 ml-8">
            This is a demo. Use any 16-digit number.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <FormField
              label="Card Number"
              error={errors.cardNumber?.message}
              required
            >
              <input
                {...register('cardNumber')}
                placeholder="1234567890123456"
                maxLength={16}
                className={`${errors.cardNumber ? errorInputClass : inputClass} sm:col-span-2`}
              />
            </FormField>

            <FormField label="Expiry Date" error={errors.cardExpiry?.message} required>
              <input
                {...register('cardExpiry')}
                placeholder="MM/YY"
                maxLength={5}
                className={errors.cardExpiry ? errorInputClass : inputClass}
              />
            </FormField>

            <FormField label="CVC" error={errors.cardCvc?.message} required>
              <input
                {...register('cardCvc')}
                placeholder="123"
                maxLength={3}
                className={errors.cardCvc ? errorInputClass : inputClass}
              />
            </FormField>

          </div>
        </div>

      </div>

      {/* ── RIGHT: ORDER SUMMARY ── */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">

          <h2 className="text-base font-bold text-gray-900 mb-5">
            Order Summary
          </h2>

          {/* Items list */}
          <div className="space-y-3 mb-5 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-gray-600 line-clamp-1 flex-1 mr-2">
                  {item.product.title}
                  <span className="text-gray-400 ml-1">×{item.quantity}</span>
                </span>
                <span className="font-medium text-gray-900 flex-shrink-0">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 py-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Subtotal ({getTotalItems()} items)
              </span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 border-t border-gray-100 mb-5">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <SpinnerIcon />
                Processing...
              </>
            ) : (
              `Place Order — ${formatPrice(total)}`
            )}
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            🔒 Secured by 256-bit SSL encryption
          </p>

        </div>
      </div>

    </form>
  )
}

// ── HELPER COMPONENTS ──
function StepBadge({ number }: { number: number }) {
  return (
    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
      {number}
    </span>
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