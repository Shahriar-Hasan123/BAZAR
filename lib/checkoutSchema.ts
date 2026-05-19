import { z } from 'zod'

// =========================================
// CHECKOUT FORM SCHEMA
// Zod validates every field automatically
// =========================================
export const checkoutSchema = z.object({

  // Contact
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  phone: z
    .string()
    .min(6, 'Please enter a valid phone number'),

  // Shipping
  address: z
    .string()
    .min(5, 'Please enter your full address'),

  city: z
    .string()
    .min(2, 'Please enter your city'),

  zipCode: z
    .string()
    .min(3, 'Please enter a valid ZIP code'),

  country: z
    .string()
    .min(2, 'Please select a country'),

  // Payment (mock)
  cardNumber: z
    .string()
    .length(16, 'Card number must be 16 digits')
    .regex(/^\d+$/, 'Card number must contain only digits'),

  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use format MM/YY'),

  cardCvc: z
    .string()
    .length(3, 'CVC must be 3 digits')
    .regex(/^\d+$/, 'CVC must contain only digits'),
})

// TypeScript type derived from the schema
export type CheckoutFormData = z.infer<typeof checkoutSchema>